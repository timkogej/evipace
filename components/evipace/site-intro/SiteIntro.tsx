import { SiteIntroMark } from "./SiteIntroMark";
import { SiteIntroController } from "./SiteIntroController";

/**
 * The full-screen branded opening.
 *
 * Server-rendered on purpose. The overlay and its mark are in the initial
 * HTML, so the compressed assembly starts painting at parse time instead of
 * waiting for hydration, and the page underneath is complete and crawlable
 * behind it the whole time.
 *
 * Three independent things guarantee a visitor is never trapped on white:
 *
 *  1. `<noscript>` hides the overlay outright when scripting is off;
 *  2. a `prefers-reduced-motion` rule in globals.css hides it outright, so
 *     reduced motion never sees a white frame at all — the intro is skipped,
 *     not shortened;
 *  3. the inline boot script below arms a ~3s failsafe *before* hydration, so
 *     even if the React controller never runs the page still reveals itself.
 *
 * The overlay is decorative (`aria-hidden`) and carries no text of any kind:
 * no "loading", no percentage, no spinner.
 */

/**
 * Runs at parse time, before hydration. Deliberately tiny: it only decides
 * whether the intro is eligible at all, and arms the failsafe. All
 * choreography lives in the client controller.
 */
const BOOT_SCRIPT = `(function(){
var r=document.documentElement;
function reveal(){
  try{
    r.setAttribute("data-site-intro","done");
    var o=document.querySelector("[data-site-intro-overlay]");
    if(o&&o.parentNode){o.parentNode.removeChild(o);}
    r.style.removeProperty("overflow");
    if(document.body){document.body.style.removeProperty("overflow");}
    var c=document.querySelector("[data-site-intro-content]");
    if(c){c.style.removeProperty("opacity");c.style.removeProperty("transform");}
  }catch(e){}
}
try{
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){reveal();return;}
  r.setAttribute("data-site-intro","playing");
  window.__eviIntroReveal=reveal;
  window.__eviIntroFailsafe=window.setTimeout(reveal,3000);
}catch(e){reveal();}
})();`;

export function SiteIntro() {
  return (
    <>
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: "[data-site-intro-overlay]{display:none !important}"
          }}
        />
      </noscript>

      <div
        aria-hidden="true"
        className="site-intro"
        data-site-intro-overlay=""
        role="presentation"
      >
        <div className="site-intro__surface" />
        <SiteIntroMark className="site-intro__mark" />
      </div>

      {/* Static, author-written, no interpolation: nothing here is user data. */}
      <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />

      <SiteIntroController />
    </>
  );
}
