const fs = require("node:fs");
const path = require("node:path");

const BOOTSTRAP_MARKER = "data-itch-entry-bootstrap";

function createItchBootstrapScript() {
  return `
    (function () {
      var base = document.querySelector("base");
      base.href = new URL(".", window.location.href).href;

      if (
        /(^|\\.)itch\\.zone$/i.test(window.location.hostname) &&
        /^\\/html\\/[^/]+\\/index\\.html$/i.test(window.location.pathname)
      ) {
        window.history.replaceState(window.history.state, "", "/");
      }
    })();
  `;
}

function prepareItchHtml(html) {
  if (html.includes(BOOTSTRAP_MARKER)) {
    return html;
  }

  if (!/<head(?:\s[^>]*)?>/i.test(html)) {
    throw new Error("Could not find the <head> element in dist/index.html");
  }

  const bootstrap = `<base href="./">\n<script ${BOOTSTRAP_MARKER}>${createItchBootstrapScript()}</script>`;
  return html.replace(/<head(?:\s[^>]*)?>/i, (head) => `${head}\n${bootstrap}`);
}

function prepareBuild() {
  const htmlPath = path.join("dist", "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  fs.writeFileSync(htmlPath, prepareItchHtml(html));
}

if (require.main === module) {
  prepareBuild();
}

module.exports = { createItchBootstrapScript, prepareItchHtml };