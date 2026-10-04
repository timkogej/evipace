import { WelcomeIntroController } from "./WelcomeIntroController";
import styles from "./WelcomeIntro.module.css";

const INTRO_SEEN_KEY = "evipace-welcome-intro-v4";

// This runs before the overlay is parsed, so a refresh in the same tab never
// paints the opening. The timer reveals the page even if hydration fails.
export const WELCOME_BOOT_SCRIPT = `(function(){
  var root=document.documentElement;
  function reveal(){
    root.setAttribute("data-site-intro","done");
    root.removeAttribute("data-site-intro-revealing");
    root.style.removeProperty("overflow");
    if(document.body)document.body.style.removeProperty("overflow");
    var overlay=document.querySelector("[data-site-intro-overlay]");
    if(overlay)overlay.remove();
  }
  try{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
       window.sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1"){
      reveal();return;
    }
    window.sessionStorage.setItem("${INTRO_SEEN_KEY}","1");
    root.setAttribute("data-site-intro","playing");
    root.style.overflow="hidden";
    window.__eviIntroFailsafe=window.setTimeout(reveal,4600);
  }catch(e){reveal();}
})();`;

export function WelcomeIntro({ locale }: { locale: "en" | "de" }) {
  const sentence = locale === "de"
    ? "Verstreute Daten. Klare Antworten."
    : "Scattered data. Clear answers.";

  return (
    <>
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: "[data-site-intro-overlay]{display:none!important}" }} />
      </noscript>
      <div aria-hidden="true" className={styles.intro} data-site-intro-overlay="">
        <div className={styles.center}>
          <p className={styles.sentence} data-intro-sentence="">{sentence}</p>
        </div>
      </div>
      <WelcomeIntroController />
    </>
  );
}
