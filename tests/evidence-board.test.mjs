import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

/**
 * Focused coverage for the evidence assembly board — the "the data is usually
 * already there" visual.
 *
 * Its source cards used to sit at hand-picked scattered offsets with hairline
 * curves converging on the dossier. That read as busy and fussy at desktop
 * widths, so the composition now says the same thing through order alone: one
 * aligned grid of equal inputs above the single output they resolve into.
 *
 * These guards replace the blanket "frozen since the checkpoint" checks the
 * board used to sit under in home-round-3 and evipace-capitalization.
 */

const [board, globals, scattered, german] = await Promise.all([
  read("components/evipace/home-sections/EvidenceAssemblyBoard.tsx"),
  read("app/globals.css"),
  read("components/evipace/english-home/ScatteredData.tsx"),
  read("components/evipace/GermanHomePage.tsx")
]);

/** The board's own CSS block, so a guard cannot pass on someone else's rules. */
function boardCss(css) {
  const from = css.indexOf("/* ── 1. Evidence assembly board");
  const to = css.indexOf("/* ── 2. Request stream", from);
  assert.ok(from > -1 && to > from, "evidence board CSS block not found");
  return css.slice(from, to);
}

const css = boardCss(globals);
const cssRules = css.replace(/\/\*[\s\S]*?\*\//g, "");

test("the connectors and their scatter are gone from the markup", () => {
  for (const banned of [
    "evb__links",
    "evb__link",
    "evb__nodes",
    "evb__node",
    "slipLayout",
    "linkOrigins",
    "convergeX",
    "CONVERGE_Y",
    "<svg",
    "<path",
    "preserveAspectRatio",
    "--evb-l",
    "--evb-t",
    "--evb-w",
    "--evb-nx",
    "--evb-ny"
  ]) {
    assert.ok(!board.includes(banned), banned);
  }
});

test("the connectors and their scatter are gone from the stylesheet", () => {
  for (const banned of [
    ".evb__links",
    ".evb__link",
    ".evb__nodes",
    ".evb__node",
    "evb-draw",
    "evb-node",
    "stroke-dash",
    "--evb-l",
    "--evb-t",
    "--evb-w"
  ]) {
    assert.ok(!cssRules.includes(banned), banned);
  }
  // Nothing in the whole stylesheet still refers to the removed parts.
  assert.ok(!globals.includes(".evb__link"));
  assert.ok(!globals.includes(".evb__node"));
  assert.ok(!globals.includes("@keyframes evb-"));
});

test("the source cards are one aligned grid at every width", () => {
  assert.ok(cssRules.includes(".evb__slips {"));
  assert.ok(cssRules.includes("grid-template-columns: repeat(2, minmax(0, 1fr));"));
  assert.ok(cssRules.includes("align-items: stretch;"));

  // No absolute placement and no reserved board height any more: the grid and
  // the dossier below it size themselves. (The dossier's own stacked page
  // edges and tab still position themselves against it — deliberately
  // untouched, this change was only ever about the source cards.)
  const cardRegion = cssRules.slice(
    cssRules.indexOf(".evb__slips {"),
    cssRules.indexOf(".evb__dossier {")
  );
  assert.ok(cardRegion.length > 0);
  assert.ok(!cardRegion.includes("position: absolute"));
  assert.ok(!cssRules.includes("min-height"));
  assert.ok(!cssRules.includes("nth-child"));
  // The dossier is no longer pinned into the board's coordinate space.
  assert.ok(cssRules.includes(".evb__dossier {\n  position: relative;"));
  assert.ok(!/\.evb__dossier \{\s*position: absolute/.test(cssRules));

  // The dossier simply follows the cards.
  assert.ok(cssRules.includes(".evb__dossier {\n  margin-top: 1.5rem;\n}"));
});

test("a card is one calm surface in the site's own language", () => {
  const card = cssRules.slice(
    cssRules.indexOf(".evb__slip {"),
    cssRules.indexOf(".evb__slip-label")
  );
  assert.ok(card.includes("background: #ffffff;"));
  assert.ok(card.includes("border: 1px solid var(--border);"));
  assert.ok(card.includes("border-radius: 0.5rem;"));

  // The stacked-paper edge, the tinted gradients, the orange rail and the
  // drop shadow are all gone.
  assert.ok(!card.includes("linear-gradient"));
  assert.ok(!card.includes("box-shadow"));
  assert.ok(!card.includes("border-left"));
  assert.ok(!cssRules.includes(".evb__slip::before"));

  // The label keeps its small orange treatment; the text stays muted.
  assert.ok(cssRules.includes(".evb__slip-label"));
  assert.ok(cssRules.includes("color: var(--orange);"));
  assert.ok(cssRules.includes(".evb__slip-text"));
});

test("the board stays a server component that works without JavaScript", () => {
  assert.ok(!board.includes('"use client"'));
  assert.ok(!board.includes("useState"));
  assert.ok(!board.includes("useEffect"));
  assert.ok(board.includes("<InView"));

  // Semantics unchanged: a list of sources, an ordered index in the dossier.
  assert.ok(board.includes("<ul className=\"evb__slips\">"));
  assert.ok(board.includes("<li"));
  assert.ok(board.includes("<ol className=\"evb__dossier-index\">"));

  // The reveal stays additive — the base state is the finished composition,
  // and only rules nested under the attribute hide anything.
  assert.ok(css.includes('[data-evi-reveal="pending"] .evb__slip'));
  assert.ok(css.includes('[data-evi-reveal="in"] .evb__slip'));
  assert.ok(!cssRules.includes("infinite"));
  assert.ok(!cssRules.includes("alternate"));
});

test("both locales still feed the board their own copy", () => {
  assert.ok(scattered.includes("<EvidenceAssemblyBoard"));
  assert.ok(german.includes("<EvidenceAssemblyBoard"));

  // English: six departments and a four-item structured output.
  assert.ok(scattered.includes('eyebrow="The data is usually already there"'));
  assert.ok(scattered.includes('output={{ label: "Structured output", items: outputs }}'));
  for (const item of ["ESG answers", "Calculations", "Evidence", "Reporting outputs"]) {
    assert.ok(scattered.includes(item), item);
  }

  // German: its own sources, label and closing statement.
  assert.ok(german.includes('sourcesLabel="Datenquellen"'));
  assert.ok(german.includes("Evipace bringt diese Informationen zusammen."));
  assert.ok(german.includes("sourceLocations.map"));

  // The board itself stays copy-free, so English cannot leak into a locale.
  for (const english of [
    "Finance",
    "Structured output",
    "workforce data",
    "certificates"
  ]) {
    assert.ok(!board.includes(english), english);
  }
});
