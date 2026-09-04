import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [
  content,
  scattered,
  customerRequest,
  servicesSection,
  deliverablesSection,
  german,
  board,
  requestStream,
  serviceCard,
  serviceImages,
  dossier,
  inView
] = await Promise.all([
  read("components/evipace/english-home/content.ts"),
  read("components/evipace/english-home/ScatteredData.tsx"),
  read("components/evipace/english-home/CustomerRequest.tsx"),
  read("components/evipace/english-home/ServicesSection.tsx"),
  read("components/evipace/english-home/Deliverables.tsx"),
  read("components/evipace/GermanHomePage.tsx"),
  read("components/evipace/home-sections/EvidenceAssemblyBoard.tsx"),
  read("components/evipace/home-sections/RequestStream.tsx"),
  read("components/evipace/home-sections/ServiceImageCard.tsx"),
  read("components/evipace/home-sections/service-images.ts"),
  read("components/evipace/home-sections/DeliveryDossier.tsx"),
  read("components/evipace/home-sections/InView.tsx")
]);

const flat = (source) => source.replace(/\s+/g, " ");

test("section headings and preserved copy survive the redesign", () => {
  assert.ok(scattered.includes('eyebrow="The data is usually already there"'));
  // The heading keeps both sentences, with the second one deliberately
  // set on its own line at every width.
  assert.ok(flat(scattered).includes("Your ESG data is probably not missing."));
  assert.ok(
    flat(scattered).includes('<span className="block">It is scattered.</span>')
  );
  assert.ok(scattered.includes("That is the problem Evipace solves."));

  assert.ok(customerRequest.includes('eyebrow="When the request arrives"'));
  assert.ok(
    customerRequest.includes(
      'heading="A customer asks for ESG information. What happens next?"'
    )
  );
  assert.ok(customerRequest.includes("That is where we start."));

  assert.ok(servicesSection.includes('eyebrow="What we handle"'));
  assert.ok(
    servicesSection.includes(
      'heading="Practical ESG work, from request to deliverable."'
    )
  );

  assert.ok(deliverablesSection.includes('eyebrow="Deliverables"'));
  assert.ok(
    deliverablesSection.includes(
      'heading="Not just advice about what you should do."'
    )
  );
  assert.ok(
    deliverablesSection.includes("The exact deliverable follows the actual request.")
  );

  // Each section still renders exactly one h2, via SectionHeading.
  for (const section of [
    scattered,
    customerRequest,
    servicesSection,
    deliverablesSection
  ]) {
    assert.equal(section.match(/<h2/g), null);
    assert.ok(section.includes("<SectionHeading"));
  }
});

test("every scattered source and structured output is still rendered", () => {
  assert.ok(scattered.includes("scatteredSources.map"));

  for (const output of [
    "ESG answers",
    "Calculations",
    "Evidence",
    "Reporting outputs"
  ]) {
    assert.ok(scattered.includes(`"${output}"`), output);
  }
  assert.ok(scattered.includes('label: "Structured output"'));

  // German keeps its own sources, label and both closing statements.
  assert.ok(german.includes("sourceLocations.map"));
  assert.ok(german.includes('sourcesLabel="Datenquellen"'));
  assert.ok(german.includes("Evipace bringt diese Informationen zusammen."));
  assert.ok(
    flat(german).includes(
      "Das Problem ist oft nicht, dass die Informationen fehlen."
    )
  );
});

test("all request types still reach the stream in both locales", () => {
  const englishRequestTypes = [
    "Excel questionnaire",
    "EcoVadis assessment",
    "IntegrityNext invitation",
    "Supplier portal",
    "Scope 1 and Scope 2 request",
    "Sustainability report",
    "Email requesting ESG documents"
  ];
  for (const item of englishRequestTypes) {
    assert.ok(content.includes(`"${item}"`), item);
  }
  assert.ok(customerRequest.includes("<RequestStream"));
  assert.ok(customerRequest.includes("items={requestTypes}"));

  const germanRequestNeeds = [
    "Energieverbrauch",
    "Scope 1 und Scope 2",
    "Umweltinformationen",
    "Richtlinien",
    "Zertifikate",
    "Beschäftigtendaten",
    "Nachweise",
    "ESG-Fragebogen"
  ];
  for (const item of germanRequestNeeds) {
    assert.ok(german.includes(`"${item}"`), item);
  }
  assert.ok(german.includes("<RequestStream"));
  assert.ok(german.includes("items={requestNeeds}"));
});

test("the marquee loop duplicate is hidden from assistive technology", () => {
  // Two tracks so the -50% translation loops seamlessly, but only the
  // first is announced.
  assert.ok(requestStream.includes("<Track items={items} />"));
  assert.ok(requestStream.includes("<Track hidden items={items} />"));
  assert.ok(requestStream.includes('aria-hidden={hidden ? "true" : undefined}'));
  assert.ok(requestStream.includes('role={hidden ? "presentation" : undefined}'));
  // The visible list keeps an accessible name supplied by the locale.
  assert.ok(requestStream.includes("aria-label={label}"));
  assert.ok(customerRequest.includes("label="));
  assert.ok(german.includes('label="Eingehende ESG-Anfragen"'));
});

test("every service is still represented, in order, with its link", () => {
  const englishServices = [
    ["Customer ESG requests", "/en/esg-customer-requests"],
    ["ESG questionnaires", "/en/esg-questionnaire-support"],
    ["Scope 1 & 2", "/en/scope-1-2-calculation"],
    ["Sustainability reporting", "/en/vsme-sustainability-report"],
    ["Policies & documentation", null],
    ["Evidence preparation", null]
  ];
  for (const [title, href] of englishServices) {
    assert.ok(content.includes(`title: "${title}"`), title);
    if (href) assert.ok(content.includes(`href: "${href}"`), href);
  }
  assert.ok(servicesSection.includes("services.map"));
  assert.ok(servicesSection.includes('linkLabel="See this service"'));
  assert.ok(
    servicesSection.includes(
      "So the next request does not have to start from zero."
    )
  );

  const germanServices = [
    ["ESG-Anforderungen von Kunden", "/de/esg-kundenanfragen"],
    ["ESG-Fragebogen für Lieferanten", "/de/esg-fragebogen-lieferanten"],
    ["EcoVadis-Unterstützung", "/de/ecovadis-unterstuetzung"],
    ["IntegrityNext-Unterstützung", "/de/integritynext-unterstuetzung"],
    ["VSME-Nachhaltigkeitsbericht", "/de/vsme-nachhaltigkeitsbericht"],
    ["Scope 1 und Scope 2 berechnen", "/de/scope-1-2-berechnung"]
  ];
  for (const [title, href] of germanServices) {
    assert.ok(german.includes(`title: "${title}"`), title);
    assert.ok(german.includes(`href: "${href}"`), href);
  }
  assert.ok(german.includes('linkLabel="Mehr erfahren"'));

  // Six plates per locale, each service on its own.
  assert.equal(
    servicesSection.match(/"(customer-requests|questionnaires|scope-1-2|sustainability-reporting|policies-documentation|evidence-preparation)"/g)
      ?.length,
    6
  );
  assert.equal(german.match(/germanServiceImageKeys: ServiceImageKey\[\]/g)?.length, 1);
});

test("service plates are full-bleed and driven by one image mapping", () => {
  assert.ok(serviceCard.includes("fill"));
  assert.ok(serviceCard.includes('className="svc-card__image"'));
  assert.ok(serviceCard.includes("objectPosition: image.imagePosition"));
  assert.ok(serviceCard.includes("image.imageAlt[locale]"));
  // No priority on these: only the hero is eager.
  assert.ok(!serviceCard.includes("priority"));

  for (const key of [
    "customer-requests",
    "questionnaires",
    "scope-1-2",
    "sustainability-reporting",
    "policies-documentation",
    "evidence-preparation",
    "ecovadis",
    "integritynext",
    "vsme"
  ]) {
    assert.ok(serviceImages.includes(key), key);
  }
  for (const field of [
    "imageSrc",
    "imagePosition",
    "imageAlt",
    "overlay",
    "futureFileName"
  ]) {
    assert.ok(serviceImages.includes(field), field);
  }
  // Every plate has both locales' alt text.
  // Multi-line entries only; the single-line type declaration is skipped.
  const altBlocks = serviceImages.match(/imageAlt: \{\n/g) ?? [];
  assert.equal(altBlocks.length, 9);
  // Localised strings only, not the type declaration.
  assert.equal((serviceImages.match(/\ben: "/g) ?? []).length, 9);
  assert.equal((serviceImages.match(/\bde: "/g) ?? []).length, 9);
});

test("every deliverable is still represented, in order", () => {
  const englishDeliverables = [
    "Prepared questionnaire answers",
    "Evidence map",
    "Scope 1 & 2 calculation basis",
    "Structured ESG datasets",
    "Gaps and missing-information list",
    "Assumptions and methodology notes",
    "Draft policies for internal approval",
    "Sustainability reporting content",
    "Reusable documentation for future requests"
  ];
  const listed = englishDeliverables.map((item) => content.indexOf(`"${item}"`));
  for (const [index, position] of listed.entries()) {
    assert.ok(position > -1, englishDeliverables[index]);
    if (index > 0) assert.ok(position > listed[index - 1]);
  }
  assert.ok(deliverablesSection.includes("<DeliveryDossier items={deliverables} />"));

  // The last item is the dossier's foundation, not an orphaned row.
  assert.ok(dossier.includes("items.slice(0, -1)"));
  assert.ok(dossier.includes("dossier__foundation"));

  const germanDeliverables = [
    "eine vorbereitete Kundenantwort",
    "ein ausgefüllter Fragebogen",
    "eine dokumentierte Emissionsberechnung",
    "ein Nachhaltigkeitsbericht",
    "eine strukturierte Nachweisgrundlage",
    "oder eine Kombination daraus"
  ];
  for (const item of germanDeliverables) {
    assert.ok(german.includes(`"${item}"`), item);
  }
  assert.ok(german.includes('label="Daraus entsteht"'));
  assert.ok(
    flat(german).includes(
      "ESG wird damit von einem unklaren Projekt zu einer konkreten Aufgabe mit einem klaren Ergebnis."
    )
  );
});

test("section content stays server-rendered", () => {
  // Only the tiny viewport-entry helper is a client component.
  assert.ok(inView.startsWith('"use client"'));

  for (const source of [
    scattered,
    customerRequest,
    servicesSection,
    deliverablesSection,
    german,
    board,
    requestStream,
    serviceCard,
    serviceImages,
    dossier
  ]) {
    assert.ok(!source.includes('"use client"'));
  }

  // The reveal is additive: markup ships in its final state and InView
  // only ever adds an attribute, so the sections survive without JS.
  assert.ok(inView.includes("data-evi-reveal"));
  assert.ok(inView.includes("prefers-reduced-motion: reduce"));
  assert.ok(board.includes("<InView"));
  assert.ok(dossier.includes("<InView"));
});
