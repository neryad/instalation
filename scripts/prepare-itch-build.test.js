import { describe, expect, it } from "vitest";
import vm from "node:vm";
import {
  createItchBootstrapScript,
  prepareItchHtml,
} from "./prepare-itch-build.js";

describe("itch.io HTML preparation", () => {
  it("preserves the game asset base and normalizes itch's entry route", () => {
    const historyChanges = [];
    const window = {
      location: new URL(
        "https://html-classic.itch.zone/html/20805097/index.html?v=1795570157",
      ),
      history: {
        state: { key: "entry" },
        replaceState(state, title, url) {
          historyChanges.push({ state, title, url });
        },
      },
    };
    const document = {
      head: {
        base: { tagName: "base", href: "./" },
        prepend(element) {
          this.base = element;
        },
      },
      querySelector(selector) {
        return selector === "base" ? this.head.base : null;
      },
      createElement(tagName) {
        return { tagName, href: "" };
      },
    };

    vm.runInNewContext(createItchBootstrapScript(), { window, document, URL });

    expect(document.head.base.tagName).toBe("base");
    expect(document.head.base.href).toBe(
      "https://html-classic.itch.zone/html/20805097/",
    );
    expect(historyChanges).toEqual([
      { state: window.history.state, title: "", url: "/" },
    ]);
  });

  it("inserts the bootstrap before the exported app bundle", () => {
    const html =
      '<html><head><title>SANITY</title></head><body><script src="./bundle.js" defer></script></body></html>';

    const preparedHtml = prepareItchHtml(html);

    expect(preparedHtml.indexOf("data-itch-entry-bootstrap")).toBeLessThan(
      preparedHtml.indexOf('./bundle.js'),
    );
    expect(preparedHtml).toContain('<base href="./">');
  });
});