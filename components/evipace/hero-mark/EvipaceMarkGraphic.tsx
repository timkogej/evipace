/**
 * The one and only copy of the approved Evipace document mark geometry.
 *
 * Every place the mark is drawn — the homepage hero and the full-screen site
 * intro — renders *this* component, so the two can never drift apart. The
 * geometry is a byte-for-byte copy of the approved source at
 * `public/images/brand/evipace-mark-vector.svg` (SHA-256
 * aa3fd5b9097ec414105b48a065ae96e8b54fdab0e3439eb9b0cda473d53c8d52), copied
 * mechanically rather than retyped: every `d`, every rect coordinate, the
 * 1254x1254 coordinate system and both fills are unchanged.
 *
 * `namespace` only decides which CSS namespace the four animatable parts join
 * (`mark-hero__frame` vs `site-intro__frame`, …). It never touches geometry.
 * The parts also carry stable `data-mark-part` attributes so they stay
 * addressable without minting duplicate DOM ids — both marks can be in the
 * document at the same time during the intro handoff.
 *
 * The mark is always decorative: the accessible logo announcement lives in
 * the navbar, and the hero's meaning lives in its server-rendered heading.
 */

type EvipaceMarkGraphicProps = {
  /** CSS namespace for the animatable parts, e.g. "mark-hero". */
  namespace: string;
  className?: string;
};

export function EvipaceMarkGraphic({ namespace, className }: EvipaceMarkGraphicProps) {
  const part = (name: string) => `${namespace}__${name}`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      data-evipace-mark="true"
      focusable="false"
      height="1254"
      viewBox="0 0 1254 1254"
      width="1254"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={part("frame")} data-mark-part="document-frame" fill="#0E151B">
        <path d="M409 147C319.5 147 247 219.5 247 309V925C247 1014.5 319.5 1087 409 1087H778C832.1 1087 876 1043.1 876 989V932L842.2 967.5C826 987 803.3 998 779 998H409C367 998 333 964 333 922V311C333 267.9 367.9 233 411 233H680L668 147H409Z" />
      </g>

      <g data-mark-part="document-lines" fill="#0E151B">
        <rect
          className={`${part("line")} ${part("line")}--1`}
          data-mark-part="document-line-1"
          height="61"
          rx="30.5"
          width="384"
          x="419"
          y="564"
        />
        <rect
          className={`${part("line")} ${part("line")}--2`}
          data-mark-part="document-line-2"
          height="62"
          rx="31"
          width="312"
          x="419"
          y="692"
        />
        <rect
          className={`${part("line")} ${part("line")}--3`}
          data-mark-part="document-line-3"
          height="61"
          rx="30.5"
          width="227"
          x="419"
          y="821"
        />
      </g>

      <path
        className={part("fold")}
        d="M877 443H961C997.5 443 1027 472.5 1027 509C1027 527.5 1017.7 538.9 1005 553L877 695V443Z"
        data-mark-part="fold-underlay"
        fill="#0E151B"
      />

      <path
        className={part("corner")}
        d="M668 147L991 426.7C1012.4 444.8 1027.3 469 1027.3 494V503.5C1019.4 469.3 994.2 443 961 443H736C730.5 443 725.8 439.1 724.6 433.7C711 375 698 315 685 260C678 230 671 183 668 147Z"
        data-mark-part="orange-corner"
        fill="#FE7001"
      />
    </svg>
  );
}
