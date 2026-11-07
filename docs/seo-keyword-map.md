# SEO keyword and intent map

Internal working document, not published. Search volumes are NOT known: no
keyword tool was used. Phrases come from the buyer's likely wording and the
intent of each page. Verify with Google Search Console after launch and
adjust. Titles are at most 60 characters and descriptions at most 160
(enforced by `tests/seo-integrity.test.mjs`).

| Page | Intent | Primary phrase EN | Primary phrase DE | Secondary phrases |
| --- | --- | --- | --- | --- |
| Home | "Who does ESG paperwork for suppliers?" | ESG documentation for suppliers | ESG-Dokumentation für Lieferanten | ESG service manufacturers, ESG Dienstleister Hersteller |
| ESG customer requests | A customer sent a questionnaire | ESG questionnaire support for suppliers | ESG-Fragebogen für Lieferanten beantworten | supplier ESG questionnaire, Kundenanfrage ESG, Lieferantenfragebogen |
| EcoVadis | Customer asks for an EcoVadis rating | EcoVadis support for suppliers | EcoVadis Unterstützung für Lieferanten | EcoVadis answers, EcoVadis Nachweise, EcoVadis vorbereiten |
| IntegrityNext | Customer sent an IntegrityNext invitation | IntegrityNext support for suppliers | IntegrityNext Unterstützung für Lieferanten | IntegrityNext invitation, IntegrityNext Einladung |
| Scope 1 and 2 | Customer or bank asks for CO2 data | carbon footprint Scope 1-2 calculation | CO2-Bilanz Scope 1 und 2 berechnen | corporate carbon footprint, Treibhausgasbilanz Unternehmen |
| VSME | Customer or bank asks for a sustainability report | VSME sustainability report for SMEs | VSME-Nachhaltigkeitsbericht erstellen | VSME report, VSME Bericht KMU |
| Records and deadlines | Certificates expire unnoticed | records and deadlines for manufacturers | Nachweise und Fristen für Hersteller | certificate expiry, Zertifikate Ablauf |
| Offers | "How do I start, what does it cost?" | ways to work with Evipace | Zusammenarbeit mit Evipace | no prices on the page; scope and price confirmed first |

## Rules for these pages
- One primary phrase per page, in the title, the H1 area and the first paragraph.
- EN and DE are written separately, not translated word for word.
- No claims outside the service: no Scope 3, LCA, certification, assurance,
  guaranteed scores, permits or safety documentation.
- Approval is described once, as a process step, never in titles or intros.

## Open
- Volume and competition per phrase: unknown. Check Search Console after launch.
- German variants "Lieferkettengesetz" and "CSRD Lieferanten" were deliberately
  not targeted: they pull in legal-advice intent Evipace does not serve.
