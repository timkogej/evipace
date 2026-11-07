"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./HeroScene.module.css";

/**
 * Hero scene: customer documents arrive, fill the questionnaire and are filed
 * into one folder. It is decorative (aria-hidden): the headline above says it.
 *
 * Everything moves with CSS animations that start on first paint, so nothing
 * waits for JavaScript. The only script work is drawing the connector lines
 * once the page is interactive; each line is measured from the real card and
 * row geometry and started at the point of the timeline the animation has
 * already reached, so a late hydration does not desynchronise them.
 */
const K = 0.72; // the whole timeline is scaled by this factor in the CSS
const CARDS = {
  inv: { f: 2.3, anchor: "right", lift: "translate3d(calc(var(--inv-x)*var(--u)),calc((var(--inv-y) - 10)*var(--u)),calc(80*var(--u))) rotateZ(-2.0deg) rotateY(4.0deg) rotateX(1.2000000000000002deg) scale(1.06)" },
  cert: { f: 2.9, anchor: "left", lift: "translate3d(calc(var(--cert-x)*var(--u)),calc((var(--cert-y) - 10)*var(--u)),calc(80*var(--u))) rotateZ(1.6deg) rotateY(-4.0deg) rotateX(0.8deg) scale(1.06)" },
  pol: { f: 3.5, anchor: "right", lift: "translate3d(calc(var(--pol-x)*var(--u)),calc((var(--pol-y) - 10)*var(--u)),calc(80*var(--u))) rotateZ(1.2000000000000002deg) rotateY(3.6deg) rotateX(-0.8deg) scale(1.06)" },
  eco: { f: 4.1, anchor: "left", lift: "translate3d(calc(var(--eco-x)*var(--u)),calc((var(--eco-y) - 10)*var(--u)),calc(80*var(--u))) rotateZ(-1.2000000000000002deg) rotateY(-3.6deg) rotateX(-0.8deg) scale(1.06)" },
} as const;

const SVG_NS = "http://www.w3.org/2000/svg";

function project(world: HTMLElement, m: DOMMatrix, card: HTMLElement, side: "left" | "right") {
  const w = card.offsetWidth;
  const px = side === "right" ? w / 2 : -w / 2;
  const x = m.m11 * px + m.m41;
  const y = m.m12 * px + m.m42;
  const z = m.m13 * px + m.m43;
  const cx = card.offsetLeft + w / 2 - world.offsetWidth / 2;
  const cy = card.offsetTop + card.offsetHeight / 2 - world.offsetHeight / 2;
  const persp = parseFloat(getComputedStyle(world).perspective) || 1500;
  const k = persp / (persp - z);
  return [world.offsetWidth / 2 + (cx + x) * k, world.offsetHeight / 2 + (cy + y) * k] as const;
}

export function HeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const dollyRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const world = worldRef.current;
    const lines = linesRef.current;
    const dolly = dollyRef.current;
    if (!world || !lines || !dolly) return;

    const build = () => {
      lines.replaceChildren();
      if (getComputedStyle(lines).display === "none") return;
      lines.setAttribute("viewBox", `0 0 ${world.offsetWidth} ${world.offsetHeight}`);
      const sheet = world.querySelector<HTMLElement>('[data-card="sheet"]');
      if (!sheet) return;
      const elapsed = ((dolly.getAnimations()[0]?.currentTime as number | undefined) ?? 0) / 1000;
      (Object.keys(CARDS) as Array<keyof typeof CARDS>).forEach((name) => {
        const card = world.querySelector<HTMLElement>(`[data-card="${name}"]`);
        const row = world.querySelector<HTMLElement>(`[data-row="${name}"]`);
        if (!card || !row) return;
        const spec = CARDS[name];
        const helper = document.createElement("div");
        helper.style.cssText = "position:absolute;width:0;height:0;visibility:hidden";
        helper.style.transform = spec.lift;
        world.appendChild(helper);
        const matrix = new DOMMatrix(getComputedStyle(helper).transform);
        helper.remove();
        const a = project(world, matrix, card, spec.anchor);
        const rowY = sheet.offsetTop + row.offsetTop + row.offsetHeight / 2;
        const b: readonly [number, number] =
          spec.anchor === "right" ? [sheet.offsetLeft, rowY] : [sheet.offsetLeft + sheet.offsetWidth, rowY];
        const k = (b[0] - a[0]) / 2;
        const d = `M${a[0].toFixed(1)} ${a[1].toFixed(1)} C${(a[0] + k).toFixed(1)} ${a[1].toFixed(1)} ${(b[0] - k).toFixed(1)} ${b[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
        const draw = ((spec.f + 0.45) * K) - elapsed;
        const token = ((spec.f + 0.6) * K) - elapsed;
        const fade = ((spec.f + 1.9) * K) - elapsed;
        const make = (cls: string, vars: Record<string, string>) => {
          const path = document.createElementNS(SVG_NS, "path");
          path.setAttribute("d", d);
          path.setAttribute("pathLength", "100");
          path.setAttribute("class", cls);
          Object.entries(vars).forEach(([key, value]) => path.style.setProperty(key, value));
          lines.appendChild(path);
        };
        make(styles.ln, { "--d": `${draw}s`, "--e": `${fade}s` });
        make(styles.tk, { "--d2": `${token}s` });
      });
    };

    build();
    let timer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(build, 150);
    });
    observer.observe(world);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className={styles.stage} ref={stageRef}>
      <div className={styles.dolly} ref={dollyRef}>
        <div className={styles.world} ref={worldRef}>
          <div className={styles.folder}><div className={styles.fFloor} /><div className={styles.fBack} /><div className={styles.fTab} /><div className={styles.pulse} /><div className={styles.fFront} /><div className={styles.badge}><svg viewBox="0 0 24 24"><path d="M5.5 12.8l4.2 4.2L18.5 7.8" fill="none" stroke="#fe7001" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div></div>
          <div className={`${styles.card} ${styles.cert}`} data-card="cert"><div className={styles.frame} /><div className={styles.pad}><b className={styles.bar} style={{width:"calc(150*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(110*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(130*var(--u))"}} /></div><div className={styles.seal} /></div>
          <div className={`${styles.card} ${styles.inv}`} data-card="inv"><div className={styles.pad} style={{height:"100%"}}><b className={styles.bar} style={{width:"calc(90*var(--u))"}} /><b className={`${styles.bar} ${styles.orange}`} style={{width:"calc(120*var(--u))",height:"calc(14*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(150*var(--u))"}} /><div className={styles.chart}><i style={{height:"35%"}} /><i style={{height:"60%"}} /><i style={{height:"45%"}} /><i style={{height:"80%"}} /><i style={{height:"100%"}} /></div></div></div>
          <div className={`${styles.card} ${styles.pol}`} data-card="pol"><div className={styles.pad}><b className={styles.bar} style={{width:"calc(120*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(170*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(150*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(176*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(120*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(160*var(--u))"}} /><div className={styles.dots} style={{marginTop:"calc(8*var(--u))"}}><i /><i /><i /></div></div></div>
          <div className={`${styles.card} ${styles.eco}`} data-card="eco"><div className={styles.pad} style={{flexDirection:"row",alignItems:"center",gap:"calc(18*var(--u))",height:"100%"}}><div className={styles.ring} /><div style={{display:"flex",flexDirection:"column",gap:"calc(11*var(--u))"}}><b className={styles.bar} style={{width:"calc(86*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(70*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(58*var(--u))"}} /></div></div></div>
          <div className={`${styles.card} ${styles.sheet}`} data-card="sheet"><div className={styles.review} /><div className={styles.head}><span className={styles.sq} /><b className={styles.bar} style={{width:"calc(120*var(--u))"}} /></div><div className={styles.avatar} />
<div className={styles.row} data-row="inv" style={{top:"calc(50% + calc(-90*var(--u)) - calc(27*var(--u)))"}}><i className={styles.cb} /><b className={styles.bar} style={{width:"calc(150*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(96*var(--u))"}} /><span className={styles.fill} style={{"--rd":"2.376s","--rm":"1.980s"} as CSSProperties} /><svg className={styles.tick} style={{"--rd":"2.376s","--rm":"1.980s"} as CSSProperties} viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fe7001" /><path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
<div className={styles.row} data-row="cert" style={{top:"calc(50% + calc(-20*var(--u)) - calc(27*var(--u)))"}}><i className={styles.cb} /><b className={styles.bar} style={{width:"calc(136*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(88*var(--u))"}} /><span className={styles.fill} style={{"--rd":"2.808s","--rm":"2.412s"} as CSSProperties} /><svg className={styles.tick} style={{"--rd":"2.808s","--rm":"2.412s"} as CSSProperties} viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fe7001" /><path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
<div className={styles.row} data-row="pol" style={{top:"calc(50% + calc(50*var(--u)) - calc(27*var(--u)))"}}><i className={styles.cb} /><b className={styles.bar} style={{width:"calc(122*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(80*var(--u))"}} /><span className={styles.fill} style={{"--rd":"3.240s","--rm":"2.844s"} as CSSProperties} /><svg className={styles.tick} style={{"--rd":"3.240s","--rm":"2.844s"} as CSSProperties} viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fe7001" /><path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
<div className={styles.row} data-row="eco" style={{top:"calc(50% + calc(120*var(--u)) - calc(27*var(--u)))"}}><i className={styles.cb} /><b className={styles.bar} style={{width:"calc(108*var(--u))"}} /><b className={`${styles.bar} ${styles.small}`} style={{width:"calc(72*var(--u))"}} /><span className={styles.fill} style={{"--rd":"3.672s","--rm":"3.276s"} as CSSProperties} /><svg className={styles.tick} style={{"--rd":"3.672s","--rm":"3.276s"} as CSSProperties} viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fe7001" /><path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
</div>
          <svg className={styles.lines} ref={linesRef} />
        </div>
      </div>
    </div>
  );
}
