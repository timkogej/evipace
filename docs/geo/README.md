# GEO pregled in izvedba — 4. oktober 2026

Spremembe so implementirane v izoliranem delovnem izvodu. Izhodišče je bila dejanska nezaključena različica `/Users/timkogej/Projects/evipace`, ne starejši Git HEAD. Oba izvoda sta imela HEAD `37c51a781b2ee8464fbb0f1ba7ead847dc5e6900`; pred delom je bilo kopiranih 170 spremenjenih ali novih datotek. Izvorni projekt ni bil urejen. `redesign-baseline.json` hrani njihove začetne SHA-256 odtise; primerjava je potrdila, da se izvor med prenosom in pripravo predaje ni spremenil.

## Inventura in ugotovitve

- 52 indeksabilnih strani: 26 parov EN/DE. To vključuje homepage, About, Methodology, šest storitev, Resources hub, 15 vodičev/orodij in privacy v vsakem jeziku. Celoten seznam je v `route-inventory.md`.
- EN/DE obrazca `send-request` ostajata dostopna in `noindex`, zunaj sitemapa. Slovenske in napačno lokalizirane poti niso objavljene. `/` preusmeri na `/en`.
- Že obstoječi skupni register upravlja naslove, opise, canonical, hreflang in sitemap. Osnovnih poti, dizajna, obrazcev in navigacijskega toka ni bilo treba preoblikovati.
- Strukturirane entitete Organization, WebSite, WebPage, Service, Article in BreadcrumbList so že obstajale. Članki so pravilno pripisani organizaciji Evipace; osebni avtorji, recenzenti, certifikati ali rezultati niso bili dodani.
- `Reveal` je v začetnem HTML določal `opacity: 0`. To je dejanska težava za ljudi brez JavaScripta. Animacija je zdaj postopna izboljšava že vidne vsebine.
- Nemški VSME vodič in storitev ter angleški vodič so še opisovali avgustovsko čakanje na objavo uredbe. Preverjen objavljeni predpis zahteva posodobitev.
- Prejšnji redesign je odstranil nekaj koristnih kontekstualnih povezav. Obnovljene so v zgoščenih uvodih storitev, brez novega navigacijskega sistema.

## Izvedene izboljšave

1. **Homepage in entiteta:** jasna, skladna EN/DE opredelitev Evipace kot ponudnika ESG storitev iz Slovenije za proizvajalce in dobavitelje v evropskih dobavnih verigah. Ponovna uporaba podatkov zdaj izrecno zahteva pregled obdobja, obsega in aktualnosti.
2. **About in schema:** AboutPage je povezan z organizacijo kot glavno entiteto; država in povezava do obstoječega odseka ustanovitelja temeljita na vidnih dejstvih. Storitve so povezane s svojo stranjo. Dodana je lokalizacija Open Graph. JSON-LD varno kodira znak `<`.
3. **Vseh 12 storitvenih strani:** po dva dodatna, vsebinsko različna odgovora o vhodnih podatkih, predaji, stroškovnih dejavnikih, obsegu in omejitvah. Scope 1/2 je jasno ločen od produktnega odtisa; enkratna zahteva od celotnega poročila; neodvisna priprava od platformne ocene. Ni izmišljenih cen ali rokov. Skupni dvojezični vir preprečuje razhajanje.
4. **Methodology EN/DE:** konkretna sledljivost odgovora do vprašanja, organizacijske meje, obdobja, datoteke in strani/lista, faktorja in verzije, predpostavke, odgovorne osebe in potrditve.
5. **Resources EN/DE:** jasno ločevanje Evipace praktičnih napotkov od uradnih zahtev; avtorstvo vseh 30 člankov je povezano z About in metodologijo. Obstoječi posamezni avtorji niso bili izmišljeni.
6. **Ključni vodiči:** bližnje navedbe primarnih virov za dokumente EcoVadis, potrdila/vprašalnike IntegrityNext, Scope 1/2/3 in VSME. VSME status je v obeh jezikih usklajen z uredbo 2026/1560. Naslovi Article schema na štirih interaktivnih vodičih so usklajeni z vidnimi H1.
7. **Indeksabilnost:** napačno lokalizirane Resources poti ne objavijo metapodatkov legitimne druge različice, preden vrnejo 404. Obstoječi robots dovoljuje dostop; pravil za treniranje AI nismo spreminjali.
8. **Resnični datumi:** samo vsebinsko posodobljena VSME vodiča imata `dateModified: 2026-10-04`, vidni datum in enak datum v sitemapu. Ni umetnih datumov prve objave ali osveževanja vseh strani ob gradnji. Datumi metodološkega pregleda niso bili avtomatsko prestavljeni.

## Preverjeni primarni viri in obseg dokazov

- [Google: optimizacija za generativne funkcije](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) in [tehnična upravičenost](https://developers.google.com/search/docs/appearance/ai-features): pomembni so dostopnost, indeksabilnost, koristna izvirna vsebina, notranje povezave in skladna schema. Posebna GEO schema ali llms.txt ni pogoj. Google llms.txt ne uporablja za izboljšanje prikaza; zato ni dodan.
- [OpenAI: crawlerji](https://developers.openai.com/api/docs/bots): OAI-SearchBot je namenjen iskanju, GPTBot treniranju; to sta ločeni nastavitvi. Obstoječi wildcard robots dovoljuje oboje. To ne dokazuje, da produkcijski CDN dopušča vse zahteve ali da je stran vključena v rezultate.
- [Uredba (EU) 2026/1560](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601560): objava 21. 9. 2026; člen 4 določa veljavnost tretji dan po objavi, tj. 24. 9. 2026. Člen 3 se uporablja za poslovna leta od 1. 1. 2027. To ni nova splošna obveznost poročanja vseh dobaviteljev. [EFRAG 2026](https://knowledgehub.efrag.org/eng/interactive/voluntary-standard) in [izvirni VSME 2025](https://knowledgehub.efrag.org/eng/interactive/vsme) sta različni verziji.
- [EcoVadis: omejitev dokumentov](https://support.ecovadis.com/hc/en-us/articles/115002646148-Why-is-there-a-limit-to-the-number-of-documents-that-can-be-provided) potrjuje omejitev 55 in pravila glede sestavljenih dokumentov; [metodološke spremembe Q1 2026](https://support.ecovadis.com/hc/en-us/articles/34621845310994-Methodology-Updates-Q1-2026) podpirajo obstoječe navedbe o dokazilih in revizijskih poročilih. To ni potrditev vsake trditve v vseh arhivskih vodičih.
- [IntegrityNext: izpolnjevanje assessmenta](https://helpdesk.integritynext.com/hc/en-us/articles/360018443680-How-do-I-answer-complete-the-assessment) in [GHG Protocol Scope 2](https://ghgprotocol.org/scope-2-guidance) sta uradni osnovi za povezane razlage. Konkretni vprašalnik, verzija standarda in podatki podjetja še vedno določajo praktično uporabo.

**Potrjeno:** izvedene vsebinske/tehnične spremembe ter spodnji lokalni testi. **Hipoteza za merjenje:** boljši kontekst, razmejitev storitev in sledljive navedbe lahko izboljšajo relevantnost obiska, razumevanje ter verjetnost uporabe vsebine. Ni dokazov iz tega lokalnega pregleda za izboljšanje uvrstitev ali števila AI-citatov.

## Preverjanje

- Celotna zbirka: **358/358 testov uspešnih**. Začetno stanje je imelo 343/354 uspešnih. Popravljene so izgubljene povezave in zastarele trditve testov; statični odtisi starega SEO niso več nadomestilo za vsebinske teste. Trenutni globalni CSS ostaja nespremenjen in je posebej preverjen proti izhodišču.
- Lint: **0 napak**, 1 že obstoječe opozorilo o neuporabljeni spremenljivki v `public/animations/evipace-hero/scene.js`.
- Produkcijska gradnja: **uspešna** z `npm run build -- --webpack`. Privzeti Turbopack v tem okolju ni mogel odpreti začasnega lokalnega porta; prvi omejeni poskus ni mogel prenesti Google Fonts. Produkcijske nastavitve niso bile spremenjene, fonti niso bili zamenjani ali simulirani.
- `scripts/audit-geo.mjs` preverja 52 strani v produkcijskem strežniku: HTTP status, vidni H1 brez JS, main, canonical, hreflang, indeksabilnost, strukturirane naslove, podvojene ID-je, notranje poti in fragmente. Preveri tudi vzorčne 404 poti in oba noindex obrazca.
- Sedem vzorcev je izrisanih na 1440 px in 390 px, dodatno je preizkušen odprt FAQ. Tiskalni naslovi v skritih povzetkih so izločeni iz števila zaslonskih H1, ne odstranjeni iz orodij. Brskalniško poročilo je `render-summary.json`.

## Omejitve in naslednji merljivi koraki

1. **Pred združitvijo:** uporabiti samo GEO razliko glede na preneseni redesign, ne vračati projekta na Git HEAD. `geo-only.patch` izloča prvotnih 170 oblikovnih sprememb; pred uporabo preveriti kontekst morebitnih novejših sprememb.
2. **Po objavi:** preveriti dejanske 200/404 odzive, canonical, robots in dostop crawlerjev na produkcijskem CDN; poslati sitemap v Search Console/Bing Webmaster Tools. Lokalni test ni dokaz produkcijske indeksacije. Ta naloga ni objavila strani in ni spreminjala računov za analitiko.
3. **Izhodišče in spremljanje:** izvoziti 28-dnevno izhodišče po strani/jeziku in vsakih 28 dni primerjati indeksirane URL-je, nebrandirane prikaze/klike, kvalificirane oddaje obrazca ter merljiv promet z AI napotiteljev. Kjer sta na voljo, uporabiti generativno poročilo Search Console in AI Performance v Bing Webmaster Tools. AI-citati niso enakovredni obiskom ali povpraševanjem.
4. **Stalen nabor vprašanj:** spremljati 12 vprašanj (po eno EN/DE na storitev), zapisati datum, sistem, jezik, dejansko citiran URL in pravilnost povzetka. Ponavljanje v več terminih je nujno; en odgovor ni stabilna uvrstitev. Primeri: podatki za Scope 1/2, dokazila EcoVadis, priprava IntegrityNext, pomoč pri vprašalniku, odgovor na enkratno ESG zahtevo, obseg prostovoljnega poročila.
5. **Dokazila:** dodati resnične, dovoljene anonimizirane primere izhodnih dokumentov in imenovane recenzente samo ob dejanskem avtorstvu/pregledu. Objavljene reference, partnerstva, formalne kvalifikacije in rezultati morajo imeti dokazila in dovoljenje. Ta naloga jih ni ustvarila.
6. **Vzdrževanje:** posebej pregledovati časovno občutljive platformne in regulatorne navedbe; sprememba standarda naj sproži hkraten EN/DE popravek. Datum pregleda mora opisovati dejanski obseg pregleda, ne celotne knjižnice. Vsi dolgi vodiči niso bili pravno ali strokovno neodvisno revidirani.
