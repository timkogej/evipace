import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const repo = new URL(".", root).pathname;
const read = (path) => readFile(new URL(path, root), "utf8");

const git = (args) =>
  execFileSync("git", args, { cwd: repo, encoding: "utf8" }).trim();

/**
 * Stable baselines, pinned to full hashes.
 *
 * These guards ask "what changed since the approved state", so they must
 * never resolve against `HEAD`: once the change is committed, `HEAD` becomes
 * the changed state and the guard either inverts or silently degrades into
 * comparing a file with itself.
 *
 * BASELINE       a19f655 "feat: complete evipace website implementation" —
 *                the tree immediately before the About/copy/homepage round.
 * HERO_CHECKPOINT c6563b4 "feat: redesign homepage evidence desk hero" —
 *                the commit that approved the evidence-desk hero itself.
 */
const BASELINE = "a19f6552e86582debba62c52eec611640450ff92";
const HERO_CHECKPOINT = "c6563b44f6061a4727d399822c876c56bda04bb0";

const [dataReuse, howItWorks, customerRequest, content, german, passport, spine, plate, requestStream, globals] =
  await Promise.all([
    read("components/evipace/english-home/DataReuse.tsx"),
    read("components/evipace/english-home/HowItWorks.tsx"),
    read("components/evipace/english-home/CustomerRequest.tsx"),
    read("components/evipace/english-home/content.ts"),
    read("components/evipace/GermanHomePage.tsx"),
    read("components/evipace/home-sections/ReuseDataPassport.tsx"),
    read("components/evipace/home-sections/ProcessSpine.tsx"),
    read("components/evipace/home-sections/EditorialPlate.tsx"),
    read("components/evipace/home-sections/RequestStream.tsx"),
    read("app/globals.css")
  ]);

/**
 * The hero's CSS block with every `.hero-desk__title*` rule removed. The
 * heading scale is under active design (the hero now carries a whole
 * sentence), so these guards pin the parts that define the approved
 * composition — plate, scrim, annotation, labels, copy column — rather than
 * the type sizes on top of them.
 */
function heroCssWithoutTitleRules(source) {
  const start = source.indexOf("   Homepage hero \u2014 evidence desk");
  assert.ok(start > -1, "hero CSS block not found");
  const meeting = source.indexOf("   Homepage hero \u2014 meeting photograph", start);
  const next =
    meeting > start
      ? meeting
      : source.indexOf("   Homepage sections \u2014 evidence board", start);
  const end = next > start ? source.lastIndexOf("/*", next) : -1;
  const block = source.slice(start, end > start ? end : undefined);
  return block
    .replace(/(\/\*[^*]*\*\/\n)?[ ]*\.hero-desk__title[^{]*\{[^}]*\}\n\n?/g, "")
    .trimEnd();
}

/** Indices of each needle, asserting they appear and stay in order. */
function assertOrdered(source, needles, label) {
  let previous = -1;
  for (const needle of needles) {
    const at = source.indexOf(needle);
    assert.ok(at > -1, `${label}: missing ${needle}`);
    assert.ok(at > previous, `${label}: out of order at ${needle}`);
    previous = at;
  }
}

test("the locked statement is byte-for-byte unchanged", () => {
  // Exact wording, both lines.
  assert.ok(dataReuse.includes("The questionnaire may change."));
  assert.ok(dataReuse.includes("The company reality underneath it does not."));

  // The approved two-line structure: one <p>, an explicit <br />, and the
  // second line carried by the orange span.
  const block = dataReuse.slice(
    dataReuse.indexOf('<div className="mt-12 border-t')
  );
  assert.ok(
    block.includes(
      '<p className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.96] text-ink">'
    )
  );
  assert.ok(block.includes("<br />"));
  assert.ok(block.includes('<span className="text-orange">'));

  // And the treatment itself has not drifted since the checkpoint.
  const committed = git([
    "show",
    `${BASELINE}:components/evipace/english-home/DataReuse.tsx`
  ]);
  const quoteOf = (source) =>
    source.slice(source.indexOf('<div className="mt-12 border-t')).replace(/\s+/g, " ").trim();
  assert.equal(quoteOf(dataReuse), quoteOf(committed));
});

test("all six reuse destinations survive, in order", () => {
  assertOrdered(
    dataReuse,
    [
      '["Customer", "Electricity consumption"]',
      '["Another customer", "Scope 2"]',
      '["EcoVadis", "Environmental evidence"]',
      '["IntegrityNext", "Assessment information"]',
      '["Bank", "Sustainability information"]',
      '["Voluntary report", "The underlying datapoint again"]'
    ],
    "destinations"
  );
  assert.ok(dataReuse.includes("<ReuseDataPassport"));
  assert.ok(dataReuse.includes('recordLabel="A better structure"'));
});

test("all eight structured-data fields survive, in order", () => {
  assertOrdered(
    content,
    [
      '"ESG datapoint"',
      '"Owner"',
      '"Source"',
      '"Reporting period"',
      '"Evidence"',
      '"Calculation"',
      '"Last review"',
      '"Reusable outputs"'
    ],
    "fields"
  );
  assert.ok(dataReuse.includes("fields={reuseSteps}"));
  // The record is one document, not a grid of cells.
  assert.ok(passport.includes('className="reuse__fields"'));
  assert.ok(passport.includes("reuse__field--out"));

  // Supporting copy and the link are still there.
  assert.ok(
    dataReuse.includes(
      "Reuse still includes checking the reporting period, scope and"
    )
  );
  assert.ok(dataReuse.includes('href="/en/resources/reusable-esg-data"'));
  assert.ok(dataReuse.includes("See how reusable ESG data works"));
});

test("how evipace works keeps every step, its order and its links", () => {
  assertOrdered(
    content,
    [
      '"Send us the request"',
      '"We map what is needed"',
      '"We prepare the work"',
      '"Your company confirms the facts"',
      '"The output becomes reusable"'
    ],
    "workflow steps"
  );
  assert.ok(howItWorks.includes("steps={workflowSteps}"));
  assert.ok(howItWorks.includes('eyebrow="How evipace works"'));
  assert.ok(
    howItWorks.includes('heading="From customer request to a usable answer."')
  );
  assert.ok(
    howItWorks.includes(
      "The useful part should not disappear after one questionnaire."
    )
  );

  // German keeps its own six steps, order and the CTA on step one.
  assertOrdered(
    german,
    [
      '"Anfrage senden"',
      '"Vorhandene Unterlagen bereitstellen"',
      '"Wir strukturieren die Arbeit"',
      '"Kennzahlen und Inhalte vorbereiten"',
      '"Sie prüfen die Unternehmensangaben"',
      '"Ergebnis verwenden"'
    ],
    "german process steps"
  );
  assert.ok(german.includes("<ProcessSpine"));
  assert.ok(german.includes("href={SEND_REQUEST_HREF}"));

  // Open spine, not a stack of bordered cards.
  assert.ok(spine.includes('className="spine__list"'));
  assert.ok(spine.includes("spine__node"));
  assert.ok(spine.includes("spine__link"));
  assert.ok(spine.includes("<ol"));
});

test("when the request arrives keeps its checklist and panel copy", () => {
  assertOrdered(
    content,
    [
      '"What are they asking for?"',
      '"Where does the information exist?"',
      '"Who owns it internally?"',
      '"What needs to be calculated?"',
      '"What evidence supports the answer?"',
      '"What is genuinely missing?"'
    ],
    "checklist"
  );
  assert.ok(
    customerRequest.includes(
      "You do not need another ESG platform just to understand the"
    )
  );
  assert.ok(customerRequest.includes("That is where we start."));
  assert.ok(customerRequest.includes('href="/en/esg-customer-requests"'));
  assert.ok(customerRequest.includes('href="/en/resources"'));
  assert.ok(customerRequest.includes("Customer ESG request support"));
  assert.ok(customerRequest.includes("Explore practical ESG guides and tools"));

  // Joined stage: an edge-to-edge plate, no rounded image card.
  assert.ok(customerRequest.includes("<EditorialPlate"));
  assert.ok(!customerRequest.includes("rounded-[1.25rem]"));
  assert.ok(plate.includes('className="plate__image"'));
  // The plate reserves its box, so media cannot shift the layout.
  assert.ok(plate.includes("--plate-ratio"));
});

test("the request stream is preserved, deduplicated and reduced-motion safe", () => {
  assert.ok(customerRequest.includes("<RequestStream"));
  assert.ok(customerRequest.includes("items={requestTypes}"));

  // Only the loop duplicate is hidden; the real list keeps its name.
  assert.ok(requestStream.includes("<Track items={items} />"));
  assert.ok(requestStream.includes("<Track hidden items={items} />"));
  assert.ok(requestStream.includes('aria-hidden={hidden ? "true" : undefined}'));
  assert.ok(requestStream.includes("aria-label={label}"));

  // Reduced motion stops the rail, drops only the duplicate, and leaves
  // every request type reachable by scrolling.
  const reduced = globals.slice(globals.indexOf("@media (prefers-reduced-motion: reduce)"));
  assert.ok(reduced.includes(".reqstream__rail"));
  assert.ok(reduced.includes('.reqstream__track[aria-hidden="true"]'));
  assert.ok(reduced.includes("overflow-x: auto"));

  for (const item of [
    '"Excel questionnaire"',
    '"EcoVadis assessment"',
    '"IntegrityNext invitation"',
    '"Supplier portal"',
    '"Scope 1 and Scope 2 request"',
    '"Sustainability report"',
    '"Email requesting ESG documents"'
  ]) {
    assert.ok(content.includes(item), item);
  }
});

test("each homepage still has exactly one h1 and no client sections", () => {
  // The hero owns the only h1 on each locale.
  const englishHomeSources = [dataReuse, howItWorks, customerRequest];
  for (const source of englishHomeSources) {
    assert.equal(source.match(/<h1/g), null);
  }
  assert.equal(german.match(/<h1/g)?.length, 1);

  // The section components stay server-rendered; only InView is a client
  // boundary, and it is not one of these.
  for (const source of [
    dataReuse,
    howItWorks,
    customerRequest,
    german,
    passport,
    spine,
    plate,
    requestStream
  ]) {
    assert.ok(!source.includes('"use client"'));
  }
});

test("the approved Evidence Desk fallback remains available and untouched", async () => {
  // The old photography, crop and annotation remain frozen as an explicit
  // rollback path. The active homepage registry intentionally moved to the
  // meeting hero and is covered by the focused meeting-hero tests.
  const heroPaths = [
    "components/evipace/hero-evidence-desk/EvidenceDeskHero.tsx",
    "components/evipace/hero-evidence-desk/process-labels.ts",
    "components/evipace/Hero.tsx",
    "public/images/evipace/homepage/hero-evidence-desk-desktop.webp",
    "public/images/evipace/homepage/hero-evidence-desk-mobile.webp"
  ];
  assert.equal(git(["diff", "--stat", HERO_CHECKPOINT, "--", ...heroPaths]), "");

  const heroPath = "components/evipace/english-home/HomeHero.tsx";
  const heroSource = await read(heroPath);
  assert.ok(heroSource.includes("<AnimatedMarkHero"));
  assert.ok(heroSource.includes('headingId="hero-title"'));
  assert.equal(heroSource.match(/<h1/g)?.length, 1);
  assert.ok(!heroSource.includes("hero-desk"));
  assert.ok(!heroSource.includes("<EvidenceDeskHero"));
  assert.ok(!heroSource.includes("<MeetingHero"));
  assert.ok(!heroSource.includes("use client"));

  // The old hero's CSS composition is unchanged since the checkpoint.
  assert.equal(
    heroCssWithoutTitleRules(globals),
    heroCssWithoutTitleRules(git(["show", `${HERO_CHECKPOINT}:app/globals.css`]))
  );
});

test("the other approved sections are unchanged since the checkpoint", () => {
  // Everything from round two except the request-arrival host section, which
  // an earlier round rebuilt, and the evidence assembly board, whose source
  // cards were intentionally redesigned — the scattered slips and their
  // hairline connectors became one aligned card grid. Its own guards live in
  // home-sections.test.mjs and evidence-board.test.mjs.
  const approved = [
    "components/evipace/english-home/ServicesSection.tsx",
    "components/evipace/english-home/Deliverables.tsx",
    "components/evipace/home-sections/ServiceImageCard.tsx",
    "components/evipace/home-sections/DeliveryDossier.tsx",
    "components/evipace/home-sections/service-images.ts",
    "components/evipace/home-sections/InView.tsx",
    "components/evipace/home-sections/RequestStream.tsx"
  ];
  assert.equal(git(["diff", "--stat", BASELINE, "--", ...approved]), "");
});

test("the scattered-data section changed only by its approved line break", async () => {
  // One approved edit since the pinned baseline: the heading's second sentence
  // now sits on a line of its own. Undoing exactly that must restore the
  // committed file byte for byte — the section is otherwise frozen.
  const file = "components/evipace/english-home/ScatteredData.tsx";
  const working = await read(file);
  const applied = `heading={
              <>
                Your ESG data is probably not missing.{" "}
                <span className="block">It is scattered.</span>
              </>
            }`;
  const original =
    'heading="Your ESG data is probably not missing. It is scattered."';
  assert.ok(working.includes(applied), "line break missing");
  assert.equal(
    working.replace(applied, original),
    `${git(["show", `${BASELINE}:${file}`])}\n`,
    "ScatteredData changed beyond the line break"
  );
});
