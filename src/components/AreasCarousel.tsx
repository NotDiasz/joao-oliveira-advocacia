import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { areas } from "../data/areas";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AreasCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    (context) => {
      let media: gsap.MatchMedia | undefined;
      const initialize = () => {
        if (media || !root.current) return;
        media = gsap.matchMedia();
        media.add(
          "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          () => {
            const cards = gsap.utils.toArray<HTMLElement>(
              ".area-card",
              root.current!,
            );
            const section = root.current!.closest("section")!;
            const tl = gsap.timeline({
              scrollTrigger: {
                id: "areas-carousel",
                trigger: section,
                start: "top top",
                end: "+=240%",
                pin: true,
                scrub: 0.65,
                onUpdate: (self) =>
                  setActive(Math.min(3, Math.floor(self.progress * 3.2 + 0.6))),
              },
            });
            timeline.current = tl;
            cards.forEach((card, i) =>
              gsap.set(card, {
                zIndex: 4 - i,
                x: i * 34,
                y: i * 18,
                z: i * -100,
                rotationY: -7,
                opacity: 1,
                visibility: "visible",
                scale: 1,
                filter: "brightness(1)",
              }),
            );
            for (let i = 0; i < cards.length - 1; i++) {
              tl.to(
                cards[i],
                {
                  x: -110,
                  y: 26,
                  z: -360,
                  scale: 0.78,
                  rotationY: -24,
                  filter: "brightness(0.35)",
                  duration: 1,
                  ease: "power2.inOut",
                },
                i,
              );
              for (let j = i + 1; j < cards.length; j++) {
                tl.to(
                  cards[j],
                  {
                    x: (j - i - 1) * 34,
                    y: (j - i - 1) * 18,
                    z: (j - i - 1) * -100,
                    scale: 1,
                    duration: 1,
                    ease: "power2.inOut",
                  },
                  i,
                );
              }
              tl.set(cards[i], { visibility: "hidden" }, i + 1);
            }
            tl.to({}, { duration: 0.2 });
            ScrollTrigger.refresh();
            return () => {
              timeline.current = null;
            };
          },
        );
      };
      const onReady = () => context.add(initialize);
      document.addEventListener("jo:motion-ready", onReady);
      if (document.body.dataset.motionReady === "true") initialize();
      const cleanup = () => {
        media?.revert();
        media = undefined;
        timeline.current = null;
      };
      document.addEventListener("astro:before-swap", cleanup);
      return () => {
        cleanup();
        document.removeEventListener("jo:motion-ready", onReady);
        document.removeEventListener("astro:before-swap", cleanup);
      };
    },
    { scope: root },
  );

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(3, index));
    const trigger = timeline.current?.scrollTrigger;
    if (trigger)
      window.scrollTo({
        top:
          trigger.start +
          Math.min(1, next / 3.2 + 0.015) * (trigger.end - trigger.start),
        behavior: "smooth",
      });
    else
      root.current?.querySelectorAll(".area-card")[next]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    setActive(next);
  };

  return (
    <div className="areas-carousel" ref={root}>
      <div
        className="areas-stage"
        aria-label="Quatro áreas de atuação"
        onScroll={(event) => {
          if (window.innerWidth < 900) {
            const stage = event.currentTarget;
            const step =
              stage.querySelector<HTMLElement>(".area-card")?.offsetWidth ?? 1;
            setActive(
              Math.max(
                0,
                Math.min(3, Math.round(stage.scrollLeft / (step + 20))),
              ),
            );
          }
        }}
      >
        {areas.map((area, i) => (
          <article
            className={`area-card area-card-${i}`}
            key={area.slug}
            aria-label={`${i + 1} de 4: ${area.name}`}
          >
            <div className="card-topline">
              <span>ÁREA DE ATUAÇÃO</span>
              <span>0{i + 1}</span>
            </div>
            <span className="area-numeral" aria-hidden="true">
              {area.numeral}
            </span>
            <h3>{area.name}</h3>
            <ul>
              {area.situations.slice(0, 3).map((situation) => (
                <li key={situation}>{situation.replace(/\.$/, "")}</li>
              ))}
            </ul>
            <a
              className="card-link"
              href={`/atuacao/${area.slug}`}
              onFocus={() => {
                if (active !== i) goTo(i);
              }}
            >
              Conhecer a área{" "}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12h15m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </a>
          </article>
        ))}
      </div>
      <div className="carousel-controls">
        <div className="carousel-counter">
          <span aria-live="polite">0{active + 1}</span>
          <span className="counter-rule">
            <span style={{ transform: `scaleX(${(active + 1) / 4})` }} />
          </span>
          <span>04</span>
        </div>
        <div className="carousel-buttons">
          <button
            type="button"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
            aria-label="Área anterior"
          >
            ←
          </button>
          <button
            type="button"
            disabled={active === 3}
            onClick={() => goTo(active + 1)}
            aria-label="Próxima área"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
