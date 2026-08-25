type AboutDecorationProps = {
  locale?: "en" | "de";
};

export function OriginBackgroundGraphic({
  locale = "en"
}: AboutDecorationProps = {}) {
  const labels =
    locale === "de"
      ? {
          action: "DATEN · NACHWEIS · UMSETZUNG",
          energy: "ENERGIE",
          found: "GEPRÜFT",
          policy: "RICHTL.",
          report: "BERICHT"
        }
      : {
          action: "DATA · EVIDENCE · ACTION",
          energy: "ENERGY",
          found: "FOUND",
          policy: "POLICY",
          report: "REPORT"
        };

  return (
    <div aria-hidden="true" className="about-origin-art">
      <svg
        className="about-origin-art__document"
        fill="none"
        viewBox="0 0 520 610"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="about-origin-art__dots">
          {Array.from({ length: 24 }, (_, index) => {
            const column = index % 6;
            const row = Math.floor(index / 6);

            return (
              <circle
                cx={33 + column * 22}
                cy={443 + row * 22}
                fill="currentColor"
                key={index}
                r="2"
              />
            );
          })}
        </g>

        <path
          className="about-origin-art__back-sheet"
          d="M160 41H389L480 132V499H160V41Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M389 42V132H479"
          stroke="currentColor"
          strokeWidth="2"
        />

        <path
          className="about-origin-art__front-sheet"
          d="M55 100H337L443 206V559H55V100Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path
          d="M337 101V206H442"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path
          d="M338 102L442 206H338V102Z"
          fill="currentColor"
          opacity="0.055"
        />

        <rect
          height="28"
          rx="14"
          stroke="currentColor"
          strokeWidth="2"
          width="91"
          x="91"
          y="149"
        />
        <text
          fill="currentColor"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="12"
          fontWeight="700"
          letterSpacing="2.4"
          textAnchor="middle"
          x="136.5"
          y="168"
        >
          {labels.report}
        </text>
        <text
          fill="currentColor"
          fontFamily="Georgia, serif"
          fontSize="70"
          x="88"
          y="260"
        >
          ESG
        </text>
        <text
          fill="currentColor"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="12"
          fontWeight="700"
          letterSpacing="2"
          textAnchor="middle"
          x="266"
          y="291"
        >
          {labels.action}
        </text>

        <path d="M91 326H281" stroke="currentColor" strokeWidth="2" />
        <path d="M91 347H241" stroke="currentColor" strokeWidth="2" />
        <path d="M91 368H267" stroke="currentColor" strokeWidth="2" />

        <circle cx="103" cy="414" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M98 414L102 418L109 409" stroke="currentColor" strokeWidth="2" />
        <path d="M126 409H226" stroke="currentColor" strokeWidth="2" />
        <path d="M126 421H190" stroke="currentColor" strokeWidth="2" />

        <circle cx="103" cy="465" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M98 465L102 469L109 460" stroke="currentColor" strokeWidth="2" />
        <path d="M126 460H208" stroke="currentColor" strokeWidth="2" />
        <path d="M126 472H178" stroke="currentColor" strokeWidth="2" />

        <path d="M299 457V397" stroke="currentColor" strokeWidth="2" />
        <path d="M326 457V365" stroke="currentColor" strokeWidth="2" />
        <path d="M353 457V417" stroke="currentColor" strokeWidth="2" />
        <path d="M380 457V332" stroke="currentColor" strokeWidth="2" />
        <path d="M284 457H397" stroke="currentColor" strokeWidth="2" />

        <path
          className="about-origin-art__clip"
          d="M424 73L458 107C474 123 474 149 458 165L390 233C378 245 359 245 347 233C335 221 335 202 347 190L410 127C418 119 431 119 439 127C447 135 447 148 439 156L384 211"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>

      <svg
        className="about-origin-art__folder"
        fill="none"
        viewBox="0 95 620 315"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="about-origin-art__folder-body"
          d="M23 153H181L218 120H562C578 120 591 133 591 149V373H23V153Z"
          fill="currentColor"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
        <path d="M23 153H180L218 120H350" stroke="currentColor" strokeWidth="2.4" />

        <g className="about-origin-art__folder-tabs">
          <rect height="31" rx="15.5" width="92" x="68" y="194" />
          <text textAnchor="middle" x="114" y="214">{labels.energy}</text>
          <rect height="31" rx="15.5" width="66" x="170" y="194" />
          <text textAnchor="middle" x="203" y="214">HR</text>
          <rect height="31" rx="15.5" width="94" x="246" y="194" />
          <text textAnchor="middle" x="293" y="214">{labels.policy}</text>
        </g>

        <path d="M68 269H318" stroke="currentColor" strokeWidth="2" />
        <path d="M68 294H276" stroke="currentColor" strokeWidth="2" />
        <path d="M68 319H225" stroke="currentColor" strokeWidth="2" />

        <circle cx="478" cy="277" r="56" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="478" cy="277" r="43" stroke="currentColor" strokeWidth="2" />
        <path
          d="M454 277L471 294L505 257"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <text
          fill="currentColor"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="10"
          fontWeight="700"
          letterSpacing="2"
          textAnchor="middle"
          x="478"
          y="348"
        >
          {labels.found}
        </text>
      </svg>

      <div className="about-origin-art__reference">
        <span>01</span>
        <span>ESG / 2026</span>
      </div>
    </div>
  );
}

export function SpeedBackgroundGraphic({
  locale = "en"
}: AboutDecorationProps = {}) {
  return (
    <div aria-hidden="true" className="about-speed-art">
      <svg
        className="about-speed-art__gauge"
        fill="none"
        viewBox="0 0 600 470"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="about-speed-art__arc about-speed-art__arc--outer"
          d="M94 353C101 244 191 157 300 157C409 157 499 244 506 353"
          pathLength="100"
        />
        <path
          className="about-speed-art__arc about-speed-art__arc--progress"
          d="M126 353C133 260 209 188 300 188C391 188 467 260 474 353"
          pathLength="100"
        />

        <g className="about-speed-art__ticks">
          {Array.from({ length: 15 }, (_, index) => {
            const angle = -105 + index * 15;
            const isMajor = index % 3 === 1;

            return (
              <line
                key={angle}
                transform={`rotate(${angle} 300 353)`}
                x1="300"
                x2="300"
                y1={isMajor ? "142" : "149"}
                y2="164"
              />
            );
          })}
        </g>

        <g className="about-speed-art__needle">
          <path d="M300 353L407 224" />
          <circle cx="300" cy="353" r="19" />
          <circle cx="300" cy="353" r="6" fill="currentColor" stroke="none" />
        </g>

        <text className="about-speed-art__pace" x="239" y="309">
          02.4×
        </text>
        <text
          className="about-speed-art__label"
          textAnchor="middle"
          x="300"
          y="334"
        >
          {locale === "de" ? "STRUKTURIERTES TEMPO" : "STRUCTURED PACE"}
        </text>
        <path className="about-speed-art__baseline" d="M91 386H509" />
        <path className="about-speed-art__baseline" d="M168 410H432" />
      </svg>

      <svg
        className="about-speed-art__chevrons"
        fill="none"
        viewBox="0 0 230 88"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 14L55 44L18 74" />
        <path d="M77 14L114 44L77 74" />
        <path d="M136 14L173 44L136 74" />
        <path d="M186 44H224" />
      </svg>
    </div>
  );
}

export function EuropeBackgroundGraphic({
  locale = "en"
}: AboutDecorationProps = {}) {
  return (
    <div aria-hidden="true" className="about-europe-art">
      <svg
        className="about-europe-art__map"
        fill="none"
        viewBox="0 0 640 520"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="about-europe-art__land"
          d="M104 294L94 265L116 231L151 220L172 193L211 185L229 157L268 149L288 121L317 111L337 72L365 40L385 75L379 118L404 105L431 128L458 116L489 132L520 117L545 142L528 170L556 188L540 216L566 239L546 264L516 260L492 284L466 275L443 299L463 321L446 344L415 334L400 360L371 344L350 369L330 348L316 317L287 307L269 326L245 310L234 279L201 273L179 291L149 286L128 303Z"
        />
        <path
          className="about-europe-art__land"
          d="M173 157L159 135L167 103L188 87L202 105L196 132L207 151L193 169Z"
        />
        <path
          className="about-europe-art__land"
          d="M136 166L126 146L133 124L148 119L154 139L147 162Z"
        />
        <path
          className="about-europe-art__land"
          d="M329 347L344 378L365 395L357 419L338 406L322 378L313 353Z"
        />
        <path
          className="about-europe-art__land"
          d="M397 358L416 382L409 404L427 421L415 439L396 414L385 386Z"
        />
        <circle className="about-europe-art__island" cx="460" cy="430" r="4" />
        <circle className="about-europe-art__island" cx="479" cy="442" r="3" />

        <g className="about-europe-art__routes">
          <path d="M366 318C350 279 328 249 305 226" />
          <path d="M366 318C357 296 348 278 338 263" />
          <path d="M366 318C346 334 337 350 332 368" />
          <path d="M366 318C392 308 417 295 442 276" />
        </g>

        <g className="about-europe-art__nodes">
          <circle cx="366" cy="318" r="12" />
          <circle cx="366" cy="318" r="4" fill="currentColor" stroke="none" />
          <circle cx="305" cy="226" r="7" />
          <circle cx="338" cy="263" r="7" />
          <circle cx="332" cy="368" r="7" />
          <circle cx="442" cy="276" r="7" />
        </g>

        <g className="about-europe-art__labels">
          <text x="375" y="315">SI</text>
          <text x="285" y="216">DE</text>
          <text x="342" y="253">AT</text>
          <text x="310" y="390">IT</text>
          <text x="450" y="271">{locale === "de" ? "SOE" : "SEE"}</text>
        </g>
      </svg>

      <div className="about-europe-art__coordinate">
        <span>46.1512° N</span>
        <span>14.9955° E</span>
        <span>{locale === "de" ? "EU / LIEFERWEGE" : "EU / SUPPLY ROUTES"}</span>
      </div>
    </div>
  );
}

export function DataFoundationBackgroundGraphic({
  locale = "en"
}: AboutDecorationProps = {}) {
  const labels =
    locale === "de"
      ? ["QUELLE", "METHODE", "NACHWEIS", "WIEDER"]
      : ["SOURCE", "METHOD", "EVIDENCE", "REUSE"];

  return (
    <div aria-hidden="true" className="about-data-art">
      <svg
        className="about-data-art__stack"
        fill="none"
        viewBox="0 0 580 520"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="about-data-art__orbit">
          <path d="M108 297C103 183 188 87 299 79C405 72 500 143 520 247" />
          <path d="M519 247L492 220" />
          <path d="M519 247L530 211" />
          <path d="M472 374C418 466 300 497 208 446C166 423 135 387 118 346" />
          <path d="M118 346L146 370" />
          <path d="M118 346L107 381" />
        </g>

        <g className="about-data-art__plates">
          <path d="M116 188L292 119L468 188L292 257L116 188Z" />
          <path d="M116 245L292 176L468 245L292 314L116 245Z" />
          <path d="M116 302L292 233L468 302L292 371L116 302Z" />
          <path d="M116 359L292 290L468 359L292 428L116 359Z" />
        </g>

        <g className="about-data-art__connectors">
          <path d="M173 166V337" />
          <path d="M411 166V337" />
          <circle cx="173" cy="166" r="6" />
          <circle cx="173" cy="337" r="6" />
          <circle cx="411" cy="166" r="6" />
          <circle cx="411" cy="337" r="6" />
        </g>

        <g className="about-data-art__labels">
          <text textAnchor="middle" x="292" y="191">{labels[0]}</text>
          <text textAnchor="middle" x="292" y="248">{labels[1]}</text>
          <text textAnchor="middle" x="292" y="305">{labels[2]}</text>
          <text textAnchor="middle" x="292" y="362">{labels[3]}</text>
        </g>
      </svg>

      <div className="about-data-art__tag">
        <span>01</span>
        <span>→</span>
        <span>N</span>
      </div>
    </div>
  );
}

export function BoundariesBackgroundGraphic({
  locale = "en"
}: AboutDecorationProps = {}) {
  return (
    <div aria-hidden="true" className="about-boundaries-art">
      <svg
        className="about-boundaries-art__frame"
        fill="none"
        viewBox="0 0 520 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="about-boundaries-art__boundary"
          height="320"
          rx="18"
          width="350"
          x="85"
          y="80"
        />

        <g className="about-boundaries-art__corners">
          <path d="M85 150V80H155" />
          <path d="M365 80H435V150" />
          <path d="M435 330V400H365" />
          <path d="M155 400H85V330" />
        </g>

        <circle className="about-boundaries-art__scope" cx="260" cy="240" r="72" />
        <circle className="about-boundaries-art__scope" cx="260" cy="240" r="51" />
        <path className="about-boundaries-art__axis" d="M260 134V188" />
        <path className="about-boundaries-art__axis" d="M260 292V346" />
        <path className="about-boundaries-art__axis" d="M154 240H208" />
        <path className="about-boundaries-art__axis" d="M312 240H366" />

        <text
          className="about-boundaries-art__scope-label"
          textAnchor="middle"
          x="260"
          y="247"
        >
          {locale === "de" ? "UMFANG" : "SCOPE"}
        </text>
        <text className="about-boundaries-art__index" x="98" y="111">
          {locale === "de" ? "04 / DEFINIERT" : "04 / DEFINED"}
        </text>

        <g className="about-boundaries-art__outside">
          <path d="M40 166H68" />
          <path d="M54 152V180" />
          <path d="M452 320H480" />
          <path d="M466 306V334" />
          <circle cx="54" cy="166" r="23" />
          <circle cx="466" cy="320" r="23" />
        </g>
      </svg>
    </div>
  );
}
