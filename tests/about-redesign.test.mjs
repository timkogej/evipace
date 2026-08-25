import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

/**
 * Every production source file, read straight from disk.
 *
 * Deliberately not `git grep` or `git ls-files`: a guard must not change its
 * answer depending on whether a file happens to be untracked, staged or
 * committed. `tests/` is never walked, so a guard can never match the very
 * assertion literals it uses to describe what must be absent.
 */
const PRODUCTION_DIRS = ["app", "components", "lib"];

function productionSourceFiles() {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(new URL(`${dir}/`, root), {
      withFileTypes: true
    })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (/\.(ts|tsx|mjs|js|css)$/.test(entry.name)) files.push(path);
    }
  };
  for (const dir of PRODUCTION_DIRS) walk(dir);
  return files;
}

const EN_ABOUT = "components/evipace/EnglishAboutPage.tsx";
const DE_ABOUT = "components/evipace/GermanAboutPage.tsx";
const COMPOSITION = "components/evipace/about/AboutComposition.tsx";

const [englishAbout, germanAbout, composition, inView, globals] =
  await Promise.all([
    read(EN_ABOUT),
    read(DE_ABOUT),
    read(COMPOSITION),
    read("components/evipace/home-sections/InView.tsx"),
    read("app/globals.css")
  ]);

const aboutSources = [
  ["English", englishAbout],
  ["German", germanAbout]
];

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Heading levels in source order. `AboutSection` renders exactly one `h2`
 * (asserted separately), so every occurrence of the component contributes a
 * level-2 heading at that point in the tree.
 */
function headingLevels(source) {
  const levels = [];
  const pattern = /<h([1-6])[\s>]|<AboutSection[\s>]/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    levels.push(match[1] ? Number(match[1]) : 2);
  }
  return levels;
}

/* ── Founder section ─────────────────────────────────────────────── */

test("the About founder headings are exactly the approved new wording", () => {
  assert.ok(
    englishAbout.includes('heading="Founded on practical work."'),
    "English founder heading"
  );
  assert.ok(
    germanAbout.includes(
      'heading="Aus der Praxis entstanden."'
    ),
    "German founder heading"
  );
});

test("the founder heading names no person; the signature block does", () => {
  const heading = (source) =>
    source.slice(source.indexOf('eyebrow="Founder"') >= 0 ? source.indexOf('eyebrow="Founder"') : source.indexOf('eyebrow="Gründer"'))
      .match(/heading="([^"]+)"/)[1];
  for (const [label, source] of aboutSources) {
    const text = heading(source);
    assert.ok(!/Tim/.test(text), `${label}: heading names Tim`);
  }
  // The founder stays clearly identified alongside the heading.
  for (const [label, source] of aboutSources) {
    assert.ok(source.includes("about-signature__name"), label);
    assert.ok(source.includes("{founder.name}"), label);
    assert.ok(source.includes("{founder.role}"), label);
  }
});

test("the previous founder headings are gone from both About pages", () => {
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes("Founded by Tim Kogej."), label);
    assert.ok(!source.includes("Gegründet von Tim Kogej."), label);
  }
});

test("the founder body copy and attribution survive the redesign", () => {
  const english = [
    "Tim Kogej founded evipace with the goal of making ESG work more practical, understandable and accessible for smaller and mid-sized companies.",
    "The starting point is not how much a company can say about ESG. It is a more practical question:",
    "How do you turn a concrete ESG requirement into a manageable piece of work?",
    "Evipace is being built at the intersection of structured data, technology and specialist ESG work.",
    "Where a project requires additional specialist knowledge, the working model is designed to involve appropriate external expertise when needed.",
    "The quality of an outcome should not depend on one person claiming to know everything.",
    "Tim Kogej",
    "Founder & Managing Director",
    "Slovenia"
  ];
  const german = [
    "Tim Kogej gründete evipace mit dem Ziel, ESG-Arbeit für kleinere und mittlere Unternehmen operativer, klarer und zugänglicher zu machen.",
    "Im Mittelpunkt steht dabei nicht die Frage, wie Unternehmen möglichst viel über ESG sprechen können.",
    "Wie wird aus einer konkreten ESG-Anforderung eine lösbare Aufgabe?",
    "Evipace wird an der Schnittstelle von strukturierten Daten, Technologie und fachlicher ESG-Arbeit aufgebaut.",
    "Für Aufgaben, die zusätzliche spezialisierte Fachkenntnisse erfordern, ist das Arbeitsmodell darauf ausgelegt, bei Bedarf passende externe Fachleute einzubeziehen.",
    "Die Qualität eines Ergebnisses soll nicht davon abhängen, dass ein einzelner Mensch alles behauptet zu wissen",
    "Tim Kogej",
    "Founder & Managing Director",
    "Slowenien"
  ];

  for (const copy of english) {
    assert.ok(normalize(englishAbout).includes(normalize(copy)), copy);
  }
  for (const copy of german) {
    assert.ok(normalize(germanAbout).includes(normalize(copy)), copy);
  }
});

test("the missing founder asset is still not referenced", () => {
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes("evipaceImages.founder"), label);
    assert.ok(!source.includes("about-founder"), label);
  }
  // The registry entry may exist, but the file it points at genuinely does
  // not — which is exactly why the About pages must not use it.
  assert.equal(
    existsSync(
      new URL("public/images/evipace/homepage/about-founder.webp", root)
    ),
    false
  );
});

/* ── Decorative system removal ───────────────────────────────────── */

test("the About decoration component is deleted and unreferenced", () => {
  assert.equal(
    existsSync(new URL("components/evipace/AboutSectionDecorations.tsx", root)),
    false
  );

  // The module and every symbol it used to export must be gone from
  // production source. Scanned from disk over app/ components/ lib/ only —
  // never tests/, so this guard cannot match its own blocklist.
  const forbidden = [
    "AboutSectionDecorations",
    "BackgroundGraphic",
    "OriginBackgroundGraphic",
    "SpeedBackgroundGraphic",
    "EuropeBackgroundGraphic",
    "DataFoundationBackgroundGraphic",
    "BoundariesBackgroundGraphic"
  ];
  const files = productionSourceFiles();
  assert.ok(files.length > 100, `only ${files.length} production files walked`);

  const offenders = [];
  for (const file of files) {
    const text = readFileSync(new URL(file, root), "utf8");
    for (const symbol of forbidden) {
      if (text.includes(symbol)) offenders.push(`${file}: ${symbol}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test("every About decoration class and keyframe is gone from the stylesheet", () => {
  const removed = [
    "about-origin-art",
    "about-speed-art",
    "about-europe-art",
    "about-data-art",
    "about-boundaries-art",
    "about-document-float",
    "about-folder-float",
    "about-speed-gauge-float",
    "about-speed-needle",
    "about-chevrons-travel",
    "about-europe-map-float",
    "about-route-flow",
    "about-data-stack-float",
    "about-data-orbit",
    "about-boundary-float",
    "about-boundary-trace"
  ];
  for (const token of removed) {
    assert.ok(!globals.includes(token), `${token} still in globals.css`);
    for (const [label, source] of aboutSources) {
      assert.ok(!source.includes(token), `${token} in ${label} About`);
    }
  }
  // Nothing was merely hidden.
  assert.ok(!/\.about-[a-z-]*art[^{]*\{[^}]*display:\s*none/.test(globals));
});

test("the hero ghost wordmark is decorative type, not a symbol layer", () => {
  // Restored by request: large, very faint typography behind the masthead.
  // It must stay out of the accessibility tree and must not reintroduce any
  // of the deleted illustration layers.
  for (const [label, source] of aboutSources) {
    assert.ok(
      source.includes('<span aria-hidden="true" className="about-ghost">'),
      label
    );
    assert.equal((source.match(/EVIPACE/g) ?? []).length, 1, label);
    // Type only: no inline size hack, no svg, no positioned illustration.
    assert.ok(!source.includes("text-[12rem]"), label);
  }
  assert.ok(globals.includes(".about-ghost {"));
  assert.ok(globals.includes("pointer-events: none"));
  // Hidden until there is room for it, and never merely faded out.
  const block = globals.slice(
    globals.indexOf(".about-ghost {"),
    globals.indexOf("/* ── Headings")
  );
  assert.ok(block.includes("display: none"));
  assert.ok(block.includes("@media (min-width: 1280px)"));
});

test("the About pages carry no decorative svg or icon layer", () => {
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes("<svg"), label);
    assert.ok(!source.includes("lucide-react"), label);
  }
  assert.ok(!composition.includes("<svg"));
  assert.ok(!composition.includes("lucide-react"));
});

/* ── Reveal → InView ─────────────────────────────────────────────── */

test("About no longer uses the opacity-0 Reveal implementation", () => {
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes("Reveal"), label);
    assert.ok(!source.includes("framer-motion"), label);
  }
  assert.ok(!composition.includes("framer-motion"));
  // Other pages still use it, so the component and the dependency stay.
  assert.ok(existsSync(new URL("components/evipace/Reveal.tsx", root)));
});

test("About renders on the server with no client boundary of its own", () => {
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes('"use client"'), label);
    assert.ok(source.includes('from "./about/AboutComposition"'), label);
  }
  assert.ok(!composition.includes('"use client"'));
  assert.ok(
    composition.includes('import { InView } from "../home-sections/InView"')
  );
});

test("About content is only ever hidden once InView marks it pending", () => {
  // No unconditional rule may hide the reveal wrapper: without JavaScript the
  // attribute is never set, so the finished page has to be what ships.
  const unconditional = /(^|\})\s*\.about-rise[^{]*\{[^}]*opacity:\s*0/;
  assert.ok(!unconditional.test(globals));
  assert.ok(
    globals.includes('[data-evi-reveal="pending"].about-rise {'),
    "pending rule missing"
  );
  assert.ok(globals.includes('[data-evi-reveal="in"].about-rise {'));

});

test("the shared InView honours reduced motion and needs no observer twin", () => {
  assert.ok(
    inView.includes('window.matchMedia("(prefers-reduced-motion: reduce)")')
  );
  assert.ok(inView.includes("IntersectionObserver"));
  // About must reuse it rather than ship a second observer.
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes("IntersectionObserver"), label);
  }
  assert.ok(!composition.includes("IntersectionObserver"));
  // And the stylesheet pins the final state under reduced motion.
  const block = globals.slice(globals.indexOf("@media (prefers-reduced-motion: reduce)"));
  assert.ok(block.includes(".about-rise"));
});

/* ── Document structure ──────────────────────────────────────────── */

test("each About page has exactly one H1", () => {
  for (const [label, source] of aboutSources) {
    assert.equal((source.match(/<h1[\s>]/g) ?? []).length, 1, label);
  }
  // The shared section renders h2 and nothing else, so no other h1 can appear.
  assert.equal((composition.match(/<h1[\s>]/g) ?? []).length, 0);
  assert.equal((composition.match(/<h2[\s>]/g) ?? []).length, 1);
  assert.equal((composition.match(/<h3[\s>]/g) ?? []).length, 0);
});

test("EN and DE heading order stays valid", () => {
  for (const [label, source] of aboutSources) {
    const levels = headingLevels(source);
    assert.ok(levels.length > 10, label);
    assert.equal(levels[0], 1, `${label} starts at h1`);
    assert.equal(levels.filter((l) => l === 1).length, 1, `${label} single h1`);
    let deepest = 1;
    for (const level of levels) {
      assert.ok(level <= deepest + 1, `${label} jumps to h${level}`);
      deepest = Math.max(deepest, level);
    }
    assert.ok(levels.includes(3), `${label} uses h3`);
  }
});

test("locale-scoped typography is wired up for both pages", () => {
  assert.ok(englishAbout.includes('className="about-page"'));
  assert.ok(germanAbout.includes('className="about-page about--de"'));
  for (const token of [".about-h1", ".about-h2", ".about--de .about-h1", ".about--de .about-h2"]) {
    assert.ok(globals.includes(token), token);
  }
  assert.ok(globals.includes("text-wrap: balance"));
});

/* ── Approved body copy ──────────────────────────────────────────── */

test("the approved About body copy survives the recomposition", () => {
  const english = [
    "ESG should not become more complicated than the task itself.",
    "Evipace was created to give manufacturing companies a practical alternative between large ESG consulting projects and self-service software.",
    "There should be a clearly defined task — and a structured way to get it done.",
    "ESG requirements from larger companies are reaching smaller suppliers",
    "The information may already exist. It simply does not exist in the form the questionnaire expects.",
    "Evipace was built for the space between the two.",
    "ESG, done faster.",
    "Faster does not mean more superficial. It means more structured.",
    "Founded in Slovenia. Built for European supply chains.",
    "Source before statement.",
    "Digital and AI-assisted tools can support the preparation process.",
    "We do not issue ESG certifications.",
    "We do not replace independent assurance.",
    "Careful work, clear sources, visible gaps and a traceable process.",
    "Already have an ESG requirement on your desk?"
  ];
  const german = [
    "ESG sollte für kleinere Unternehmen nicht komplizierter sein als die Aufgabe selbst.",
    "Evipace wurde gegründet, um produzierenden Unternehmen eine praktische Alternative zwischen umfangreichen ESG-Beratungsprojekten und reinen Self-Service-Lösungen zu geben.",
    "Es sollte eine klar definierte Aufgabe geben – und einen strukturierten Weg, sie zu erledigen.",
    "Die ESG-Anforderungen großer Unternehmen erreichen längst auch ihre kleineren Lieferanten",
    "Die Informationen sind häufig vorhanden. Aber sie liegen nicht dort, wo der Fragebogen sie erwartet.",
    "Evipace wurde für den Raum dazwischen aufgebaut.",
    "ESG, done faster.",
    "Schneller bedeutet nicht oberflächlicher. Es bedeutet strukturierter.",
    "In Slowenien gegründet. Für europäische Lieferketten gedacht.",
    "Quelle vor Aussage.",
    "Digitale und AI-gestützte Werkzeuge können die Vorbereitung unterstützen.",
    "Wir vergeben keine ESG-Zertifizierungen.",
    "Wir ersetzen keine unabhängige Assurance.",
    "Saubere Arbeit, klare Quellen, sichtbare Lücken und ein nachvollziehbarer Prozess.",
    "Eine ESG-Anforderung liegt bereits auf Ihrem Tisch?"
  ];

  for (const copy of english) {
    assert.ok(normalize(englishAbout).includes(normalize(copy)), copy);
  }
  for (const copy of german) {
    assert.ok(normalize(germanAbout).includes(normalize(copy)), copy);
  }
});

test("About keeps its links, CTAs and the one approved image", () => {
  assert.ok(englishAbout.includes('const SEND_REQUEST_HREF = "/en/send-request"'));
  assert.ok(englishAbout.includes('href="/en/methodology"'));
  assert.ok(englishAbout.includes('href="/en#services"'));
  assert.ok(germanAbout.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  assert.ok(germanAbout.includes('href="/de/methodology"'));
  assert.ok(germanAbout.includes('href="/de#leistungen"'));
  for (const [label, source] of aboutSources) {
    assert.ok(source.includes("<ButtonLink href={SEND_REQUEST_HREF}>"), label);
    assert.ok(source.includes("publicContactEmail"), label);
    assert.ok(source.includes("evipaceImages.industrialBreak.src"), label);
    // Exactly one image — no filler photography.
    assert.equal((source.match(/evipaceImages\./g) ?? []).length, 1, label);
  }
});


test("no rule sits under a heading and no section is numbered", () => {
  // The section-index device is gone from the markup and the stylesheet.
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes("SectionIndex"), label);
    assert.ok(!source.includes("about-index"), label);
    assert.ok(!/figure="\d/.test(source), `${label} still numbers sections`);
  }
  assert.ok(!composition.includes("SectionIndex"));
  assert.ok(!composition.includes("about-index"));
  assert.ok(!globals.includes("about-index"));

  // The section head is eyebrow + heading and nothing else.
  const head = composition.slice(
    composition.indexOf("<Rise>"),
    composition.indexOf("</Rise>")
  );
  assert.ok(head.includes('className="eyebrow"'));
  assert.ok(head.includes("<h2"));
  assert.ok(!/border-|<hr|about-rule/.test(head), "head still draws a rule");
});

test("sections are separated by distinct tonal bands", () => {
  // paper / surface / soft / dark are visibly different fills; the old
  // paper-vs-warm alternation was too close to read as separation.
  for (const tone of ["paper", "surface", "soft", "dark"]) {
    assert.ok(composition.includes(`${tone}:`), tone);
  }
  assert.ok(!composition.includes("--warm"));
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes('tone="warm"'), label);
    // The full-bleed image band is not an AboutSection but draws from the
    // same ladder, so it counts in the visual sequence.
    const tones = [...source.matchAll(/tone="(\w+)"|aboutToneClass\.(\w+)/g)].map(
      (m) => m[1] ?? m[2]
    );
    assert.ok(tones.length >= 10, label);
    assert.ok(tones.filter((t) => t === "dark").length === 2, `${label} dark bands`);
    assert.ok(tones.includes("soft"), `${label} soft band`);
    // No two neighbouring sections share a fill.
    for (let i = 1; i < tones.length; i++) {
      assert.notEqual(tones[i], tones[i - 1], `${label} repeats ${tones[i]}`);
    }
  }
});

test("the Positioning section keeps its approved arrangement", () => {
  const english = [
    "Companies facing a concrete ESG requirement often find two broad types of solution.",
    "Useful for strategy, transformation and long-term governance.",
    "But not every ESG task requires a multi-month consulting engagement.",
    "Help prepare the actual ESG work and move it toward a usable result.",
    "Helpful for organising data and supporting workflows.",
    "But finding data, interpreting questions, matching documents, calculating metrics and resolving gaps may still remain with the company.",
    "Evipace was built for the space between the two.",
    "Not simply to advise companies on what they should do.",
    "And not simply to provide software and leave the execution with them."
  ];
  const german = [
    "Unternehmen, die eine konkrete ESG-Anforderung erfüllen müssen, finden häufig zwei Arten von Lösungen.",
    "Sinnvoll für Strategie, Transformation und langfristige Governance.",
    "Aber nicht jede ESG-Aufgabe braucht ein monatelanges Beratungsprogramm.",
    "Die konkrete ESG-Arbeit strukturiert vorbereiten und mit Ihnen bis zu einem nutzbaren Ergebnis bringen.",
    "Hilfreich, um Daten und Prozesse zu organisieren.",
    "Evipace wurde für den Raum dazwischen aufgebaut.",
    "Nicht nur beraten, was getan werden sollte.",
    "Nicht nur ein Werkzeug bereitstellen, mit dem Sie es selbst tun können."
  ];
  for (const copy of english) {
    assert.ok(normalize(englishAbout).includes(normalize(copy)), copy);
  }
  for (const copy of german) {
    assert.ok(normalize(germanAbout).includes(normalize(copy)), copy);
  }
  // The intro sits above the comparison, not beside the heading.
  for (const [label, source] of aboutSources) {
    assert.ok(!source.includes("lead={"), `${label} still uses the lead column`);
  }
});

test("the closing contact section fills both columns", () => {
  for (const [label, source] of aboutSources) {
    assert.ok(source.includes("bg-[var(--soft-orange)] py-20 sm:py-28"), label);
    // Heading and supporting copy sit side by side rather than leaving the
    // right half of the band empty.
    assert.ok(
      source.includes(
        'lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-end'
      ),
      label
    );
    assert.ok(source.includes("about-cta-heading"), label);
    assert.ok(!source.includes('className="site-shell max-w-5xl"'), label);
    // CTA, address and the tag line share one row, the tag line pushed right.
    assert.ok(source.includes("lg:ml-auto lg:text-right"), label);
    assert.ok(source.includes("<ButtonLink href={SEND_REQUEST_HREF}>"), label);
  }
  assert.ok(
    englishAbout.includes("Already have an ESG requirement on your desk?")
  );
  assert.ok(
    germanAbout.includes("Eine ESG-Anforderung liegt bereits auf Ihrem Tisch?")
  );
});
