# Prenova začetne strani Evipace: analiza in končno stanje

Razdelka A in B sta analiza iz 1. faze (stanje pred prenovo). Razdelek C opisuje, kaj je dejansko izvedeno, in rezultate preverjanja.
Datum meritev: 13. 10. 2026. Izhodišče repozitorija: `main`, commit `b035ce9`, 358/358 testov uspešnih (`node --test tests/*.test.mjs`).

## 0. Obseg in omejitve analize (preberite najprej)

| Točka | Kaj sem naredil | Omejitev |
|---|---|---|
| Dostop do vanta.com | Stran se je odprla brez blokade, brez obhoda. | – |
| Orodje | Vgrajeni brskalnik v aplikaciji Claude (pravi Chromium), ne Playwright. Meritve prek `getComputedStyle` in `getBoundingClientRect`. | Playwright ni nameščen v repozitoriju. |
| Širine | 1440, 768 in 390 px, z emulacijo viewporta. | Emulacija viewporta, ne prave naprave. |
| Screenshoti | Posnel sem nekaj delnih posnetkov (hero, razdelek izdelka, mobilni pogled). | **Nisem posnel popolnega seta screenshotov po razdelkih pri vseh treh širinah.** Pogled v aplikaciji je majhen (okno približno 800 × 600), prek strani pa je bil piškotni pasica in klepetalni pojavni okvir. Če želite popoln vizualni set, prosim za ročne posnetke ali dovoljenje, da jih posnamem v 2. fazi z lokalnim Playwrightom. |
| Stanja hover/focus | Izmerjeni so trajanja in easing prehodov ter barve v mirovanju. | Barv hover/focus nisem izvabil s simulacijo kazalca, zato so v tabelah označene kot „ni izmerjeno“. |
| Animacije ob pomikanju | Potrjena sta GSAP 3.15 in ScrollTrigger. | Posameznih učinkov ScrollTrigger nisem popisal ena za ena. |
| Pisave | Vanta uporablja lastniški pisavi (SC Ripley, Söhne). | Ne smemo ju uporabiti; predlagam obstoječi pisavi Evipace. |

Vantine besedne vsebine, ilustracij, ikon in logotipov ne povzemam. Razdelke opisujem po namenu, številke so izmerjene vrednosti postavitve.

---

## A. Vanta: razdelek za razdelkom

### A1. Zaporedje razdelkov (1440 px, skupna višina strani ≈ 9967 px)

| # | Razdelek (razred) | Namen | Višina | Ozadje |
|---|---|---|---|---|
| 0 | Navigacija (`navbar5_component`) | Orientacija in dve akciji (prijava, demo) | 72 px, sticky | bela, spodaj 1 px `rgba(0,0,0,.1)` |
| 1 | Hero (`section_home--hero`) | Obljuba, ena akcija (e-poštno polje + gumb), takoj za tem velik vizual izdelka | 1435 px | `#c2beff` (polna barvna ploskev) |
| 2 | Izdelek (`section_home--products`) | Uvodni naslov, nato mreža 3 × kartica z vizuali izdelka, nato večji „agent“ blok | 2047 px | `#fcfcfa` |
| 3 | Logotipi in citat (`section_home--testimonial`) | Družbeni dokaz: vrstica logotipov in velik citat | 845 px | prosojno na `#fcfcfa` |
| 4 | Standardi (`section_home--frameworks`) | Pregled podprtih okvirov, ploščice po 395 px | 799 px | `#fcfcfa` |
| 5 | Velikost podjetja (`section_home-size`) | Trije segmenti kupcev, vsak s kratkim opisom | 625 px | temna `#21222f` |
| 6 | Študije primerov (`section_home-case-study`) | Karte s številkami in referencami | 1539 px | temna `#21222f` |
| 7 | Viri (`section_home-resource`) | 4 kartice vsebin | 595 px | `#fcfcfa` |
| 8 | Končni poziv (`section_home-cta`) | Ponovitev akcije | 536 px | `#d4baff` |
| 9 | Noga (`footer_component`) | Navigacija, 5 stolpcev povezav | 1181 px | `#260048` |

Ritem ozadij: barva, svetlo, svetlo, svetlo, temno, temno, svetlo, barva, temno. Temni pas je en sam neprekinjen blok sredi strani, kar da strani en jasen „vrh“ in en „dno“.

### A2. Mreža

| Lastnost | Desktop 1440 | Tablica 768 | Mobilno 390 |
|---|---|---|---|
| Vsebinski okvir (`container-large`) | max **1280 px** | po širini | po širini |
| Stranski rob (`padding-global`) | **40 px** | 40 px | **20 px** |
| Mreža izdelkov | 3 stolpci (413 px), razmik 20 px | 1 stolpec (673 px) | 1 stolpec (350 px), razmik 24 px |
| Mreža kupcev | 3 stolpci, razmik 48 px | 1 stolpec (512 px) | 1 stolpec |
| Mreža virov | 4 stolpci po 308 px, razmik 16 px | 2 stolpca | 2 stolpca po 167 px |
| Noga | 5 stolpcev, razmik 16 px | 2 stolpca | 1 stolpec |
| Ozek tekstovni okvir (`container-medium`) | 1056 px | – | – |
| Navigacija | 72 px, okvir 1280 px, gumb „demo“ viden | 72 px, hamburger 40 × 48, demo skrit | 64 px, hamburger |

### A3. Vertikalni ritem in razmikovna lestvica

Vanta uporablja ime-razrede z fiksnimi vrednostmi (Webflow „Client-first“ sistem).

| Razred | Desktop | Tablica | Mobilno |
|---|---|---|---|
| `padding-section-medium` | 80 | 64 | 48 |
| `padding-section-large` (hero) | 128 | 96 | 64 |
| `padding-section-xxxlarge` (citat) | 240 | 96 | 64 |
| `margin-xxsmall` / `xsmall` / `small` | 4 / 8 / 16 | – | – |
| `margin-medium` / `large` / `xlarge` / `xxlarge` / `huge` | 32 / 48 / 64 / 80 / 96 | – | – |

Izmerjeni razmiki znotraj razdelka izdelka: naslov sekcije do mreže 64 px, vrstica kartic do naslednjega bloka 96 px, naslov do podnaslova 32 px, vrstice kartic 20 px, mreža virov 16 px, kartica kupca: notranji razmik med bloki 24 px.

**Povzeta lestvica:** 4 · 8 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 128 (240 samo za en izjemen „zrak“ pri citatu). Poudarek: razmiki rastejo hitro (podvojitev od 32 navzgor), zato stran „diha“, a je še vedno gosta znotraj kartic (16 do 24).

### A4. Tipografija

| Vloga | Družina | Velikost / vrstica | Teža | Razmik črk | Barva |
|---|---|---|---|---|---|
| H1 (hero) | serif display (SC Ripley) | **88 / 83,6 px** (razmerje 0,95) | 300 | −3 % | `#181822` |
| H2 (razdelek) | serif display | **56 / 61,6 px** (1,1) | 400 | −2 % | `#181822` |
| H2 (citat) | serif display | 56 / 67,2 px | 300 | −1 % | `#181822` |
| H2 (manjši, temni bloki) | serif display | 42 / 50,4 px | 500 | −2 % | `#181822` ali bela |
| H3 (kartica izdelka) | sans (Söhne) | **24 / 31,2 px** | 500 | 0 | `#181822` |
| H3 (karta segmenta, serif) | serif display | 28 / 36,4 px, 30 / 40,5 px v temnih | 500 | −1,5 % | `#1c1c2a` / bela |
| Podnaslov hero | serif display | **30 / 39 px** | 400 | – | `#373744` |
| Uvodni odstavek (lead) | sans | 18 / 25,6 px, širina 496 do 640 px | 400 | – | `#181822` |
| Telo | sans | 16 / 25,6 px | 400 | – | `#181822` |
| Majhno (opis kartice) | sans | 14 / 22,4 px, širina 347 px | 400 | – | `#181822` |
| Gumb | sans | 16 px (nav), 18 px (veliki) | 500 | – | – |

Mobilno: H1 **48 / 48 px**, ls −2,5 %; H2 42 / 46,2; podnaslov 18 / 23,4; H3 kartice 20 px; citat 40 px. Tablica: H1 in H2 ostaneta na 88 in 56 px (izmerjeno), spremeni se samo ritem (rob 40, razdelki 96/64).

Značilnost: dva glasova. Serif samo za velike naslove, sans za vse, kar je „delovno“ (kartice, telo, gumbi). Naslovi so svetli (300 do 400) z negativnim razmikom črk, kar daje mirnost in premium občutek.

### A5. Barve po vlogah

| Vloga | Hex | Uporaba |
|---|---|---|
| Besedilo primarno | `#181822` | vsi naslovi in telo |
| Besedilo sekundarno | `#373744` | podnaslov hero |
| Besedilo na temnem | `#ffffff` | temni bloki |
| Ozadje strani | `#fcfcfa` | glavna toplo bela ploskev |
| Ozadje hero | `#c2beff` | polna barvna ploskev, ena na stran |
| Ozadje temno | `#21222f` | bloki velikosti in študij |
| Ozadje CTA | `#d4baff` | končni poziv |
| Ozadje noge | `#260048` | najtemnejši ton (isti družini kot poudarek) |
| Kartica izdelka | `#e6e6f0` + 1 px `#9e9fb7`, polmer 16 | mreža izdelkov |
| Ploščica okvirov / viri | `#efeff5`, brez obrobe, polmer 8 | sekundarne kartice |
| Obroba | `#9e9fb7` (močna), `rgba(0,0,0,.1)` (nav) | gumbi, kartice |
| Poudarek (primarni gumb) | `#5e05c4` | izključno gumbi „demo“ in „learn more“ |
| Gradienti | ni izmerjenih na kartice; hero je ploska ploskev | – |
| Senc | **nobene** (`box-shadow: none` povsod) | globina nastane z barvnimi ploskvami in obrobami |

Kje je poudarek: samo v gumbih in v barvnem ozadju ene ploskve (hero). Besedilo je skoraj črno. To je ključ „mirnega“ videza.

### A6. Komponente

| Komponenta | Specifikacija |
|---|---|
| Primarni gumb (nav) | pill (999 px), polnilo `#5e05c4`, bela pisava 16/500, padding `2,4 2,4 2,4 12`, višina 43 px, v njem krožen „chip“ s puščico na desni |
| Primarni gumb (velik) | 18/500, padding `4 4 4 16`, višina 58 px, širina 178 px, enaka struktura z notranjim krogom |
| Sekundarni gumb | pill, prosojno ali bel, 1 px `#9e9fb7`, besedilo `#181822`, 16/500, višina 44 px |
| Prehod gumbov | `0.2 s` (kratek `all`/`color`), hover/focus barve: ni izmerjeno |
| Kartica izdelka | polmer 16, obroba 1 px, brez sence, `overflow: hidden`, naslov + 1 vrstica opisa zgoraj, vizual v spodnji polovici, ki štrli ven in je odrezan ob robu kartice |
| Sekundarna kartica | polmer 8, brez obrobe, notranji rob 24/16 px, vsebina razmaknjena 48 px |
| Kartica vira | polmer 8, padding `64 24 24` (veliko zraka nad besedilom), vsebina razmaknjena 64 px |
| Navigacija | sticky, bela, `border-bottom`, brez blur-a, mega-meniji za Platform/Solutions/Partners/Resources, ena neposredna povezava |
| Mobilni meni | hamburger 40 × 48 px, nav 64 px |
| Noga | temna, 5 stolpcev z razmikom 16, razmik povezav 12 px |
| Značke | pilli v vizualih izdelka (npr. stanje „On“, „Low“), mehke barvne polnitve |
| Ikone | enobarvne, linijske, v vizualih izdelka |

### A7. Prikaz izdelka (to je najmočnejši element strani)

- Vizual izdelka je **prikaz uporabniškega vmesnika, ne fotografija**: bele „okenske“ plošče z mehkim robom na barvni podlagi kartice.
- Okvir plošče je odrezan ob robu kartice (`overflow: hidden`), zato se zdi, da je vmesnik večji od kartice. Sproži občutek globine brez sence.
- Prekrivanje: manjši element (klepetalni okvir, pill z gumbi predlogov) je delno prek večje plošče.
- Hero: en velik vizual (≈ 1280 × 758 px) neposredno pod naslovom, vstopi pred pomikanjem.
- Vsaka kartica pokaže **eno** zmožnost z eno kratko trditvijo.

### A8. Vrstica logotipov in citat

- Vrstica: ≈ 6 logotipov, višina 23 do 28 px, razmik približno 100 do 200 px, brez filtra (`filter: none`, opacity 1), poravnano v 1280 px kontejner.
- Citat: serif 56 px, teža 300, centrirano, ozek kontejner (944 px), avtor kot majhna črta (18 px) pod njim, zraka 240 px zgoraj in spodaj. En citat, ne vrtiljak.

### A9. Animacije in interakcije

| Element | Meritev |
|---|---|
| Knjižnica | GSAP 3.15.0 + ScrollTrigger (potrjeno v skriptah) |
| Prehodi na komponentah | prevladuje `0.2 s ease` (163 elementov `all`, 85 `color`) |
| Premik / transform | `0.2 s cubic-bezier(0.455, 0.03, 0.515, 0.955)` (8 elementov) |
| Ozadja | `0.3 s ease background-color` |
| Odpiranje menijev | `0.3 s cubic-bezier(0.645, 0.045, 0.355, 1)` |
| CSS keyframes | samo ena (`delay-overflow`, 0,4 s) |

Zaključek: hover so kratki (200 ms), učinki ob pomikanju pa gredo prek ScrollTrigger-ja. Točnih parametrov (zamik, razdalja) nisem izmeril.

### A10. Odzivnost (izmerjeno)

| Element | 1440 | 768 | 390 |
|---|---|---|---|
| Stranski rob | 40 | 40 | 20 |
| Hero padding | 128 | 96 | 64 |
| Standardni razdelek | 80 | 64 | 48 |
| Razdelek citata | 240 | 96 | 64 |
| H1 | 88 | 88 | 48 |
| H2 | 56 | 56 | 42 |
| Podnaslov | 30 | 30 | 18 |
| Navigacija | 72, polna | 72, hamburger | 64, hamburger |
| Dokument | 9967 px | 15516 px | 14532 px |
| Horizontalno drsenje | ne | ne | ne |

### A11. Zakaj deluje

1. **Hierarhija.** Na zaslonu je en jasen naslov, ena vrstica pod njim in ena akcija. Primarna barva je samo na akciji, vse ostalo je skoraj črno na toplo beli.
2. **Ritem.** Velikost razmikov se menja po razdelkih (80 / 128 / 240), a vedno iz iste lestvice. Strani se ne zdi dolgočasna, ker se menjajo svetla, barvna in temna ploskev.
3. **Kontrast.** Besedilo `#181822` na `#fcfcfa` je okoli 17:1. Poudarek ni nosilec berljivosti.
4. **Gostota.** Veliko zraka okoli naslovov, a znotraj kartic je gostota visoka (14/22 telo, 16 do 24 px razmiki). Kartice so „polne“, ozadje je prazno.
5. **Dokaz s prikazom.** Izdelek je viden takoj, kot vmesnik, ne kot opis.
6. **Brez senc.** Globina nastane z barvnimi ploskvami, obrobami in odrezanjem. To je dosledno in poceni za vzdrževanje.
7. **Mirnost naslovov.** Serif, lahka teža, negativni razmik črk.

---

## B. Stran Evipace pred prenovo: avdit in vrzeli

### B1. Struktura

Pot: `app/[locale]/page.tsx` → `HomeLandingPage locale="en" | "de"` ([HomeLandingPage.tsx](../components/evipace/HomeLandingPage.tsx)). Besedilo je v istem faju kot slovar `content = { en, de }`; strani teče skozi CSS modul ([HomeLandingPage.module.css](../components/evipace/HomeLandingPage.module.css), 800 vrstic).

| # | Razdelek | Komponenta / vir | Opomba |
|---|---|---|---|
| 1 | Hero | `AnimatedMarkHero` + `HomeHeroScene` (animacija v `public/animations/evipace-hero/scene.js`) | dve koloni, desno animirana scena na `#f8f8f6` |
| 2 | Izziv („Problem“) | besedilo + fotografija `methodology/evidence.webp` | dve koloni |
| 3 | Storitve | 3 vrstice z imenom, opisom in povezavami na podstrani | seznam, ne kartice |
| 4 | Postopek + ilustrativni primer | 3 koraki + fotografija `process.webp` + tabela primera | primer je že označen „Illustrative example · not a client case“ |
| 5 | Rezultat | celozaslonska fotografija `emissions.webp`, temen scrim, naslov 6 rem | edini temni blok |
| 6 | Zakaj Evipace | 3 točke | |
| 7 | Končni poziv | CSS-risani „listi papirja“ | |

Globalno: `WelcomeIntro` (uvodna animacija, pokrije stran do 4,6 s ali do prve seje, preskoči se pri `prefers-reduced-motion`), `Navbar` (80 px, `h-20`, odprte skupine menijev), `Footer` (znak „ESG, done faster.“), `ConsentManager`.

Mrtva ali nepovezana koda (podatki iz iskanja `grep`): `components/evipace/english-home/*`, `home-sections/*`, `hero-meeting/*`, `hero-evidence-desk/*`, `EnglishHomePage.tsx`, `GermanHomePage.tsx`, `Hero.tsx` niso uporabljeni v poti domače strani; nekateri testi jih še berejo kot tekst (npr. `tests/en-homepage.test.mjs`, `tests/home-sections.test.mjs`). Ne brisati brez presoje.

### B2. Design tokeni, kot obstajajo

| Skupina | Vrednost | Vir |
|---|---|---|
| Oranžna | `--orange: #fe7001` | `app/globals.css:6` |
| Mehka oranžna | `--soft-orange: #fff0e5` | `globals.css:14` |
| Oranžna hover (gumb) | `#cb5800` (domača), `#e96500` (Navbar, Footer, obrazec) | module CSS, Navbar.tsx |
| Oranžna za besedilo | `#b44d00` (eyebrow), `#ad4900` (oznake), `#bd5000` (hover povezav) | module CSS (tri različne vrednosti za isto vlogo) |
| Ink / muted / paper / surface / border / dark | `#151515` / `#66635f` / `#f8f8f6` / `#fff` / `#e2e2df` / `#171717` | globals.css |
| Pisave | GFS Didot (400) za naslove, Inter 400 do 800 za vse ostalo | `app/fonts.ts` |
| Tipografske spremenljivke | `--type-title/heading/subheading/statement` (clamp) | `app/typography.css` |
| Širina | `.site-shell`: max 1360 px, stranski rob `clamp(1.25rem, 3vw, 3rem)` | globals.css:161 |
| Tailwind | v3.4, barve so CSS spremenljivke (`orange`, `ink`, `muted`, `paper`, `surface`, `border`, `dark`); senci `premium`, `lift` | `tailwind.config.ts` |

Opozorilo: [globals.css](../app/globals.css) ima 5592 vrstic, `typography.css` pa vsebuje blok `@media screen { .editorial-layout :where(.section-padding) … }`, ki z nizko specifičnostjo prepisuje razmike na celotni strani. Vsaka sprememba skupnih razredov zadene vse podstrani.

### B3. i18n

- Ni knjižnice za i18n. Segment poti `[locale]` (`en`, `de`, `sl`); `sl` je prepoznan, a nima strani.
- Besedilo domače strani je v slovarju v isti komponenti. Obstajajo tudi starejši vzorci (`english-home/content.ts`, ločene komponente EN/DE).
- Nemške strani imajo **drugačne slugove** (`esg-kundenanfragen` namesto `esg-customer-requests`).
- Dostopnost strani odloča `isPageReachable()` v [lib/seo/page-registry.ts](../lib/seo/page-registry.ts).
- Tipografija ima ločeno lestvico za `html[lang="de"]` (daljše besede).

### B4. Obrazec /send-request

- [app/[locale]/send-request/page.tsx](../app/[locale]/send-request/page.tsx) → odjemalska komponenta [RequestForm.tsx](../components/evipace/send-request/RequestForm.tsx).
- Tok: `POST /api/requests` → nalaganje datotek prek TUS → `POST /api/requests/[id]/finalize` s `submissionToken`. Polja: ime, e-pošta, podjetje, rok (neobvezno), sporočilo (neobvezno), skrito polje „website“ (honeypot), vsaj ena datoteka.
- Statusi 503 (izklopljeno), napake, uspeh (`SuccessState`). GA dogodki `request_form_start` in `generate_lead` (le po soglasju).
- Besedila v `send-request/copy.ts` (EN in DE), strani `noindex` (v registru ni vnosa → `buildPageMetadata` vrne `robots: noindex`), kar je dokumentirano kot namerno do izpolnitve zagonskih pogojev.
- **Ugotovitev:** obrazec je pot za nalaganje datotek, ne za prosto sporočilo. E-poštna pot „forward“ ni nikjer v kodi, najdena je le `publicContactEmail = hello@evipace.com` ([lib/company-info.ts](../lib/company-info.ts)). Forward-naslova ni mogoče izpeljati iz repozitorija.

### B5. SEO

- `generateMetadata` → `buildPageMetadata(locale, "home")` iz [lib/seo/build-metadata.ts](../lib/seo/build-metadata.ts); naslov, opis, kanonični URL in alternate jeziki izhajajo iz registra.
- hreflang: `buildLanguageAlternates` iz `getActivePageGroup(pageKey)` (enak vir kot `app/sitemap.ts`) + `x-default` na EN.
- JSON-LD: Organization, WebSite, WebPage (`lib/seo/schema/*`).
- Trenutni naslov EN: „ESG Consulting for Manufacturing Companies | Evipace“, DE: „ESG-Beratung für produzierende Unternehmen | Evipace“. Novo pozicioniranje („zunanja miza za zahteve kupcev“) naslova ne podpira več; sprememba je odločitev vsebine (glej F).
- `/` preusmeri `proxy.ts` na `/en` (308).

### B6. Primerjava z Vanto in vrzeli

| Merilo | Vanta | Evipace danes | Vrzel in zakaj |
|---|---|---|---|
| Razdelki | 10, jasna vloga vsakega | 7, od tega 3 s fotografijo | Ni vizuala izdelka: pove, ne pokaže. Fotografije ne dokazujejo storitve. |
| Hero | ena akcija + takojšnji vizual | dve koloni, animirana „scena“ | Scena je abstraktna; ni jasno, kaj stranka dobi. Prag pozornosti padel zaradi uvodne animacije. |
| Mreža | 1280 + 40 px rob | 1360 px, rob 20 do 48 px | Neznatna razlika; širša mreža je še sprejemljiva. |
| Razmiki | lestvica 4–128 | `clamp()` vrednosti brez skupne lestvice, nekaj sto lokalnih vrednosti | Ni dokumentirane lestvice, zato ritem ni dosleden med razdelki. |
| Naslovi | serif 56/61,6 w400 | Didot, `clamp(2.1rem, 3.5vw, 3.75rem)` ≈ 34 do 60 px | Primerljivo; nemška različica manjša (po zasnovi). |
| Telo | 16/25,6, lead 18 | 16 do 18,6, lead širina 37rem | Primerljivo. |
| Poudarek | 1 barva, samo na akciji | oranžna na gumbih in na naslovu v temnem bloku, oranžno besedilo `#b44d00` kot eyebrow | Oranžna na besedilu je tri različne vrednosti (`#b44d00`, `#ad4900`, `#bd5000`). |
| **Kontrast gumba** | bela na `#5e05c4` ≈ 8:1 | **bela na `#fe7001` = 2,79:1** | **Pade na AA** (meja 4,5:1 za besedilo, 3:1 za večje). Velja za primarni gumb v glavi, nogi, hero, CTA in obrazcu. |
| Gumbi | pill 999 px, vgrajen krog s puščico | radij 0,45 rem (≈ 7 px), puščica `↗`, hover dvig 2 px | Drugačen jezik, zadovoljiv. |
| Kartice | polmer 16/8, brez sence | večinoma seznam brez kartic; Tailwind senca `lift` v obrazcu | Ni sistema kartic. |
| Prikaz izdelka | UI okna, odrezana | fotografije in animirana scena | Največja vrzel. |
| Družbeni dokaz | logotipi, citat, študije | ni (ustrezno: nimamo referenc) | Ostane **izklopljeno**, dokler ni pravih referenc. |
| Temni pas | en blok | en blok (Rezultat) | Enakovredno. |
| Animacije | GSAP, 200 ms hover | Framer Motion v paketu, CSS prehodi 180 ms, `request-paper-hover` (papirji ob hoverju), uvodna animacija | Uvodna animacija zakasni vsebino do 4,6 s ob prvem obisku. |
| `prefers-reduced-motion` | ni preverjeno | obstaja v modulu in v globalnem CSS | OK, ohraniti. |
| Odzivnost | ima en prelom pri 768 | prelomi pri 640, 900, 1024 | OK, poenotiti. |
| Dostopnost | – | `min-h` 44 px na navigaciji, focus-stili niso izmerjeni | Preveriti v 2. fazi. |
| Poudarek na človeku | – | v besedilu („Ihre Freigabe“ oz. „vaša odobritev“), ne v vizualu | Storitev ni programska oprema; vizual mora pokazati človeški pregled. |

---

## C. Končno stanje in preverjanje (13. 10. 2026)

Načrt iz 1. faze je bil po odločitvah lastnika spremenjen; spodaj je samo to, kar je v kodi na veji `redesign/homepage-request-desk`.

### C1. Domača stran (`/en`, `/de`): 9 razdelkov in vmesna izjava

| # | Razdelek | Opomba |
|---|---|---|
| 1 | Hero | Sredinsko. Podnaslov se konča z „Forward it by email or upload it.“. Gumb `mailto:desk@evipace.com` (naslov ni izpisan), povezava na obrazec, vrstica o odobritvi. Pod besedilom vizual mape in plošče „Request desk“. |
| 2 | Zaupni trak | Štiri trditve. |
| 3 | How it works | Trije koraki: pošljite zahtevo (e-pošta, obrazec ali vaš Evipace portal), pripravimo odgovor, pregledate in odobrite v svojem Evipace portalu. |
| 4 | What you can forward | Šest kartic z lastnimi linijskimi ikonami (SVG). Povezava na stran Offers. Sidro `#services` / `#leistungen` je ohranjeno. |
| 5 | Faster the second time | Besedilo o ponovni uporabi potrjenih dokazil in vizual mape z dokumenti („Confirmed“ / „Needs update“, „Illustrative example“). Dokumenti se med pomikanjem eden za drugim zložijo v mapo (animacija vezana na pomik). |
| 6 | Primer odgovora | Stezi Preparation / Review in ilustrativna kartica. |
| 7 | Trust | Tri stolpci in lastna SVG ilustracija (mapa, dokument, znak odobritve). |
| 8 | FAQ | Šest vprašanj. |
| 9 | Zaključni poziv | Slogan, gumb, povezava na obrazec in sekundarna povezava na Offers. |

Med razdelkoma 3 in 4 je velika izjava čez skoraj celo širino (Didot, do 64 px), ki se med pomikanjem razkriva beseda za besedo.

**Animacije** (samo domača stran, razen zadnje):

| Animacija | Vrsta | Kako deluje |
|---|---|---|
| Izjava beseda za besedo | vezana na pomik | `ScrollProgress` zapiše napredek 0 do 1 v `--p`; CSS iz tega izračuna prosojnost vsake besede. Pri pomiku nazaj se odvije nazaj. |
| Plošča „Request desk“ v heroju | vezana na pomik | Opravljeni koraki dobijo zeleno kljukico (`#2F7D4F`) in se prečrtajo eden za drugim; korak „Missing information“ se ne prečrta, ampak se osvetli in pokaže oznako „Your input“; na koncu se obarva gumb. Oznak „Done“ / „Ready“ ni več (ostanejo samo za bralnike zaslona). |
| Mapa z dokazili | vezana na pomik | Isti mehanizem; dokumenti in njihove oznake se pojavijo zaporedno. |
| Kartice in koraki | ob vstopu | Ko razdelek pride v pogled, se kartice oziroma koraki pojavijo eden za drugim (zamik 80 ms). Velja tudi za korake na Offers. |

Brez JavaScripta in pri `prefers-reduced-motion` je vsa vsebina takoj vidna in se nič ne premika. Brez knjižnic; en poslušalec pomika na animiran element.

Razdelek s tremi ponudbami in vrstica o obsegu in ceni sta z domače strani odstranjena (preseljena na Offers).

### C2. Stran Offers (`/en/offers`, `/de/angebot`)

| # | Razdelek |
|---|---|
| 1 | Hero z naslovom, podnaslovom in tremi skoki na sidra |
| 2 | Request (`#request`), Desk (`#desk`), Report (`#report`): za koga, kaj je vključeno, kaj naredite vi, kako poteka, kaj potrebujemo od vas |
| 3 | „Which one is for me?“: tabela s tremi stolpci in štirimi vrsticami (na telefonu zložena v bloke) |
| 4 | „How a request works“: štirje koraki |
| 5 | FAQ: pet vprašanj |
| 6 | Zaključni poziv (ista komponenta kot na domači strani) |

- Stran je v registru (`pageKey: "offers"`): naslov, opis, kanonični URL, hreflang (`en`, `de`, `x-default`), zemljevid strani. JSON-LD: Organization, WebSite, WebPage, BreadcrumbList.
- `/en/angebot`, `/de/offers` in `/sl/offers` vrnejo 404.
- Brez cen, rokov, referenc in številk. Pri Desku je v seznamu vključenega izpisan naslov `desk@evipace.com` (tako je bilo naročeno); na domači strani naslov ni izpisan.

### C3. Skupni elementi

| Element | Sprememba |
|---|---|
| Glava | Nova povezava „Offers“ / „Angebot“ in zunanja povezava „Client login“ / „Kundenportal“ na `https://portal.evipace.com`. Namizna navigacija se zdaj prikaže od 1280 px naprej (prej od 1024 px), ker se osem elementov pri 1024 px prekriva; pod tem je meni. |
| Noga | „Offers“ / „Angebot“ v stolpcu Company / Unternehmen; slogan „ESG work. Done right. Done faster.“. |
| Uvodna animacija | `WelcomeIntro` ni nameščen (vse strani). |
| Tokeni | `--ev-*` v `HomeLandingPage.module.css`; isti modul uporablja tudi stran Offers. `app/globals.css` ni spremenjen. |

### C4. Portal

Kode portala v tem repozitoriju ni. Besedilo ga zato omenja samo splošno in vedno kot „your Evipace portal“ / „Ihr Evipace-Portal“:

| Omenjeno v besedilu | Kje |
|---|---|
| Zahtevo lahko dodate v portalu | Domača, korak 1 |
| Pregled in odobritev v portalu | Domača, korak 3; Offers (Request, Desk, Report, tabela) |
| Knjižnica dokazil v portalu | Domača, „Faster the second time“; Offers, Desk in tabela |
| Povezava za prijavo | Glava (`portal.evipace.com`) |

Status zahteve v besedilu ni omenjen. Nobena od teh trditev ni preverjena ob kodi portala.

### C5. Lighthouse (produkcijski build, `next start`, lokalno, Lighthouse 12)

| Profil | Stran | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Mobile | /en | 95 | 96 | 96 | 100 | 3,0 s | 0 | 60 ms |
| Mobile | /de | 95 | 96 | 96 | 100 | 2,9 s | 0 | 20 ms |
| Mobile | /en/offers | 96 | 96 | 96 | 100 | 2,8 s | 0 | 50 ms |
| Mobile | /de/angebot | 96 | 96 | 96 | 100 | 2,8 s | 0 | 30 ms |
| Desktop | /en | 100 | 96 | 96 | 100 | 0,7 s | 0 | 10 ms |
| Desktop | /de | 100 | 96 | 96 | 100 | 0,6 s | 0 | 40 ms |
| Desktop | /en/offers | 100 | 96 | 96 | 100 | 0,6 s | 0 | 0 ms |
| Desktop | /de/angebot | 100 | 96 | 96 | 100 | 0,6 s | 0 | 0 ms |

- Mobilni LCP (2,8 do 3,0 s) je nad ciljem 2,5 s. Element LCP je besedilo v heroju; Lighthouse kot zavoro navaja skupne datoteke CSS, ki blokirajo izris.
- Accessibility 96, napaka kontrasta: (a) bela pisava na `#FE7001` na oranžnih gumbih (odločitev lastnika), (b) obstoječa noga: oranžni naslovi stolpcev `#FE7001` in sivo besedilo `#878786` na `#F8F8F6`. Točka (b) je obstajala že prej in v tem koraku ni bila spremenjena.
- Best practices 96: 404 za `/_vercel/insights/script.js`, ki obstaja samo na Vercelu.

### C6. Drugo preverjanje

| Preverjanje | Rezultat |
|---|---|
| Testi, tipi, lint, build | 363/363 (dodan `tests/home-offers-content.test.mjs` in test za Offers v navigaciji), `tsc` in `eslint` brez napak, build uspešen. |
| hreflang in zemljevid strani | `/en/offers` ↔ `/de/angebot`, `x-default` na EN; obe poti sta v `sitemap.xml` z alternativama. |
| Horizontalno drsenje | Ni pri 390, 768, 1280 in 1440 px. |
| Glava | Pri 1280 px (DE, najdaljše oznake) se elementi ne prekrivajo in ne lomijo; pri 1100 px je prikazan meni. |
| Tipkovnica in fokus | Offers: skoki, gumb, FAQ, zaključni poziv, noga; obroč 3 px (`#171717` na svetlem, bel na temnem). Skok na `#desk` s tipko Enter pristane tik pod fiksno glavo. Domača stran je bila s tipkovnico preverjena pred tem korakom; nove povezave uporabljajo iste sloge. |
| `prefers-reduced-motion` | Chrome z `--force-prefers-reduced-motion`: 0 skritih razdelkov na `/en`, `/en/offers`, `/de/angebot` (brez zastavice 5 do 6). |
| Obrazec | Koda ni spremenjena. Lokalno `POST /api/requests` vrne 503 (nalaganje ni vklopljeno), zato celotna oddaja ostaja nepreverjena. |

### C7. Posnetki zaslona

`docs/redesign-screenshots/`: celostranski posnetki produkcijskega builda, narejeni s Chromom brez glave (`--screenshot`), po en na stran in širino.

| Datoteke | Širine |
|---|---|
| `home-en-*`, `home-de-*` | 1440, 768, 390 |
| `offers-en-*`, `offers-de-*` | 1440, 768, 390 |

### C8. Odprto

- Nemška besedila (domača in Offers) so osnutki za revizijo lastnika, razen heroja domače strani.
- Trditve o portalu niso preverjene ob kodi.
- Kontrast bele pisave na oranžnih gumbih in obstoječe noge ne dosega WCAG AA.
- Obiskovalec brez poštnega programa na domači strani naslova ne more prebrati.
- Podstrani storitev še govorijo po starem.
- Besedilo izjave (EN in DE) je osnutek.
