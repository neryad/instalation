const { withDangerousMod, createRunOncePlugin } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

/**
 * Ensures the Podfile has a post_install block.
 * If not, adds one at the end.
 */
function ensurePostInstall(podfile) {
  if (podfile.includes("post_install do |installer|")) {
    return podfile;
  }
  return `${podfile}\npost_install do |installer|\nend\n`;
}

/**
 * Injects the deployment target patch inside the post_install block.
 *
 * The key fix: use a GREEDY regex ([\s\S]+) to capture EVERYTHING between
 * "post_install do |installer|" and the LAST "end" before the next top-level
 * statement. The previous non-greedy version ([\s\S]*?) stopped at the FIRST
 * "end" inside the block, which broke nested Ruby blocks.
 */
function injectPodfilePatch(podfileContent, deploymentTarget) {
  // Check if already patched
  if (podfileContent.includes("IPHONEOS_DEPLOYMENT_TARGET") && podfileContent.includes("to_f <")) {
    return podfileContent;
  }

  const SNIPPET = `
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      current = config.build_settings['IPHONEOS_DEPLOYMENT_TARGET']
      if current && current.to_f < ${deploymentTarget}.to_f
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${deploymentTarget}'
      end
    end
  end`;

  // First ensure there's a post_install block
  podfileContent = ensurePostInstall(podfileContent);

  // Use GREEDY regex: capture everything from post_install to the LAST "end"
  // before a blank line or another top-level keyword (use_frameworks!, target, etc.)
  // The pattern matches: post_install ... [anything] ... end\n followed by end of file
  // or another top-level statement
  return podfileContent.replace(
    /post_install do \|installer\|([\s\S]+?)end(\s*$|\s+(?:use_frameworks!|target |install!))/m,
    (match, body, after) => {
      if (body.includes("IPHONEOS_DEPLOYMENT_TARGET")) {
        return match; // Already patched
      }
      return `post_install do |installer|${body}\n${SNIPPET}\nend${after}`;
    }
  );
}

const withPodDeploymentTarget = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (modConfig) => {
      // Safely get deployment target from config, falling back to 15.0
      let deploymentTarget = 15.0;
      try {
        const expoConfig = modConfig.modRequest.projectConfig;
        if (expoConfig && expoConfig.ios && expoConfig.ios.deploymentTarget) {
          deploymentTarget = expoConfig.ios.deploymentTarget;
        }
      } catch (e) {
        // Fallback to default if config is not accessible
        console.log(`[with-pod-deployment-target] Using default deployment target 15.0`);
      }

      const podfilePath = path.join(modConfig.modRequest.platformProjectRoot, "Podfile");
      if (fs.existsSync(podfilePath)) {
        const original = fs.readFileSync(podfilePath, "utf8");
        const updated = injectPodfilePatch(original, deploymentTarget);
        if (updated !== original) {
          fs.writeFileSync(podfilePath, updated, "utf8");
          console.log(
            `[with-pod-deployment-target] Patched Podfile to force iOS ${deploymentTarget} deployment target for all pods.`
          );
        }
      }
      return modConfig;
    },
  ]);
};

module.exports = createRunOncePlugin(
  withPodDeploymentTarget,
  "with-pod-deployment-target",
  "1.0.0"
);
