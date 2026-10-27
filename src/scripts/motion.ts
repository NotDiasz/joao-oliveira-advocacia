import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: "power3.out", duration: 1 });

let dispose: (() => void) | undefined;
let generation = 0;

async function initialize() {
  dispose?.();
  const current = ++generation;
  const body = document.body;
  const controller = new AbortController();
  const { signal } = controller;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menu = document.querySelector<HTMLElement>("#mobile-menu");
  const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
  let lenis: Lenis | undefined;
  let tick: ((time: number) => void) | undefined;
  let context: gsap.Context | undefined;
  let media: gsap.MatchMedia | undefined;
  const splits: SplitText[] = [];
  let headerFrame = 0;
  const updateHeader = () => {
    headerFrame = 0;
    const header = document.querySelector(".site-header");
    header?.classList.toggle(
      "is-compact",
      !document.querySelector(".hero") || window.scrollY > 80,
    );
    let light = Array.from(
      document.querySelectorAll<HTMLElement>(".about,.area-situations"),
    ).some((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 60 && rect.bottom >= 60;
    });
    const brand = document.querySelector<HTMLElement>(".brand-section");
    if (brand) {
      const rect = brand.getBoundingClientRect();
      if (rect.top <= 60 && rect.bottom >= 60) {
        const trigger = ScrollTrigger.getById("brand-sequence");
        const progress = trigger?.progress ?? (60 - rect.top) / rect.height;
        light = trigger
          ? progress < 0.12 ||
            (window.innerWidth >= 900 && progress > 0.405 && progress < 0.55)
          : progress < 0.55;
      }
    }
    document.querySelector(".site-header")?.classList.toggle("on-paper", light);
  };
  const scheduleHeader = () => {
    if (!headerFrame) headerFrame = requestAnimationFrame(updateHeader);
  };
  window.addEventListener("scroll", scheduleHeader, { passive: true, signal });
  window.addEventListener("resize", scheduleHeader, { passive: true, signal });
  updateHeader();

  const closeMenu = () => {
    body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
    menu?.setAttribute("inert", "");
    lenis?.start();
  };
  menuButton?.addEventListener(
    "click",
    () => {
      const opening = menuButton.getAttribute("aria-expanded") !== "true";
      body.classList.toggle("menu-open", opening);
      menuButton.setAttribute("aria-expanded", String(opening));
      menuButton.setAttribute(
        "aria-label",
        opening ? "Fechar menu" : "Abrir menu",
      );
      menu?.toggleAttribute("inert", !opening);
      if (opening) {
        lenis?.stop();
        menu?.querySelector<HTMLAnchorElement>("a")?.focus();
      } else lenis?.start();
    },
    { signal },
  );
  menu
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu, { signal }));
  document.addEventListener(
    "keydown",
    (event) => {
      if (!body.classList.contains("menu-open")) return;
      if (event.key === "Escape") {
        closeMenu();
        menuButton?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(
          menu?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
        );
        if (!event.shiftKey && document.activeElement === links.at(-1)) {
          event.preventDefault();
          menuButton?.focus();
        } else if (event.shiftKey && document.activeElement === menuButton) {
          event.preventDefault();
          links.at(-1)?.focus();
        }
      }
    },
    { signal },
  );

  dispose = () => {
    generation++;
    controller.abort();
    cancelAnimationFrame(headerFrame);
    delete body.dataset.motionReady;
    closeMenu();
    media?.revert();
    context?.revert();
    splits.forEach((split) => split.revert());
    if (tick) gsap.ticker.remove(tick);
    lenis?.destroy();
  };

  if (!reduced) {
    lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -85 },
    });
    lenis.on("scroll", ScrollTrigger.update);
    tick = (time) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  }

  // Font metrics must settle before measuring lines or pinned distances.
  await document.fonts.ready;
  if (current !== generation || signal.aborted) return;

  context = gsap.context(() => {
    const preloader = document.querySelector<HTMLElement>(".preloader");
    let firstVisit = false;
    try {
      firstVisit = !sessionStorage.getItem("jo-visited");
      sessionStorage.setItem("jo-visited", "1");
    } catch {
      /* The page also works with browser storage disabled. */
    }
    if (preloader && firstVisit && !reduced) {
      gsap.set(preloader, { display: "grid" });
      const paths = preloader.querySelectorAll<SVGPathElement>("path");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          stroke: "#d6be8e",
          strokeWidth: 1.7,
          strokeDasharray: length,
          strokeDashoffset: length,
          fillOpacity: 0,
        });
      });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(paths, { strokeDashoffset: 0, duration: 0.8 }, 0)
        .to(paths, { fillOpacity: 1, duration: 0.35 }, 0.6)
        .to(
          preloader,
          {
            yPercent: -100,
            duration: 0.65,
            onComplete: () => {
              preloader.style.display = "none";
            },
          },
          0.95,
        );
    }
    if (reduced) return;

    const hero = document.querySelector(".hero");
    if (hero) {
      gsap.from(".title-mask>span", {
        yPercent: 115,
        stagger: 0.13,
        duration: 1.25,
        delay: firstVisit ? 1.05 : 0.1,
      });
      gsap.from(".hero-script,.hero-areas,.hero-copy>.button", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 1,
        delay: firstVisit ? 1.3 : 0.35,
      });
      gsap.to(".hero-backdrop > .media", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    }

    media = gsap.matchMedia();
    const animateBrandHandoff = (distance: string) => {
      const brand = document.querySelector<HTMLElement>(".brand-section");
      const areas = document.querySelector<HTMLElement>(".areas-section");
      if (!brand || !areas) return;

      // The next section enters during the zoom, rather than after a blank exit.
      gsap.set(areas, { marginTop: -brand.offsetHeight, autoAlpha: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "brand-sequence",
          trigger: brand,
          start: "top top",
          end: distance,
          pin: true,
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });
      tl.to(
        ".brand-outline",
        { xPercent: -25, duration: 6.2, ease: "none" },
        0,
      );
      tl.to(
        ".brand-progress>span",
        { scaleX: 1, duration: 6.2, ease: "none" },
        0,
      );
      gsap.utils
        .toArray<HTMLElement>(".brand-color-layer")
        .forEach((layer, i) => {
          tl.to(
            layer,
            {
              clipPath: "polygon(0% 0%, 165% 0%, 140% 100%, -25% 100%)",
              duration: 0.9,
              ease: "none",
            },
            0.5 + i * 0.9,
          );
        });
      tl.set(".brand-zoom", { autoAlpha: 1 }, 4.2);
      tl.to(
        ".brand-zoom svg",
        {
          attr: { viewBox: "315 247 13 12" },
          duration: 1.4,
          ease: "power2.inOut",
        },
        4.2,
      );
      tl.to(
        areas,
        { autoAlpha: 1, duration: 0.65, ease: "power1.inOut" },
        4.85,
      );
    };
    const animateManifestos = (distance: string, yStart: number, yEnd: number) => {
      gsap.utils.toArray<HTMLElement>(".manifesto").forEach((section) => {
        const lines = section.querySelectorAll("h2>span");
        const object = section.querySelector<HTMLElement>(".manifesto-object");
        const isPen = object?.classList.contains("pen-object") ?? false;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: distance,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          lines,
          { opacity: 0.18 },
          { opacity: 1, stagger: 0.65, duration: 0.75, ease: "none" },
          0,
        );
        if (object) {
          tl.fromTo(
            object,
            {
              y: yStart,
              rotation: isPen ? -20 : -6,
              scale: 0.92,
            },
            {
              y: yEnd,
              rotation: isPen ? -8 : 4,
              scale: 1.04,
              duration: 2,
              ease: "none",
            },
            0,
          );
        }
      });
    };

    media.add("(min-width: 900px)", () => {
      animateManifestos("+=90%", 45, -35);
      animateBrandHandoff("+=320%");
    });

    media.add("(max-width: 899px)", () => {
      animateManifestos("+=75%", 26, -24);
      animateBrandHandoff("+=90%");
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      const split = SplitText.create(element, { type: "lines", mask: "lines" });
      splits.push(split);
      gsap.from(split.lines, {
        yPercent: 105,
        stagger: 0.12,
        duration: 1.15,
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      });
    });
    const photo = document.querySelector("[data-photo-reveal]");
    if (photo)
      gsap.fromTo(
        photo,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.35,
          scrollTrigger: { trigger: photo, start: "top 85%", once: true },
        },
      );
    const signature = document.querySelector(".about-signature");
    if (signature)
      gsap.fromTo(
        signature,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          scrollTrigger: { trigger: signature, start: "top 92%", once: true },
        },
      );
    const processLine = document.querySelector(".process-line>span");
    if (processLine) {
      const small = window.innerWidth < 900;
      gsap.from(processLine, {
        scaleX: small ? 1 : 0,
        scaleY: small ? 0 : 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-steps",
          start: "top 78%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
    }
    const seal = document.querySelector(".contact-seal");
    if (seal)
      gsap.fromTo(
        seal,
        { scale: 1.3, rotation: 17, opacity: 0 },
        {
          scale: 1,
          rotation: 8,
          opacity: 1,
          duration: 1.15,
          scrollTrigger: { trigger: seal, start: "top 90%", once: true },
        },
      );
  }, body);

  body.dataset.motionReady = "true";
  document.dispatchEvent(new CustomEvent("jo:motion-ready"));
  ScrollTrigger.refresh();
  if (location.hash) {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    if (target)
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "instant", block: "start" }),
      );
  }
}

document.addEventListener("astro:page-load", initialize);
document.addEventListener("astro:before-swap", () => {
  dispose?.();
  dispose = undefined;
});

// Cover the old document before swapping, then lift the same paper curtain.
document.addEventListener("astro:before-preparation", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.fromTo(
    ".page-curtain",
    { yPercent: 100, visibility: "visible" },
    { yPercent: 0, duration: 0.45, ease: "power3.inOut" },
  );
});
document.addEventListener("astro:after-swap", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.fromTo(
    ".page-curtain",
    { yPercent: 0, visibility: "visible" },
    {
      yPercent: -100,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => gsap.set(".page-curtain", { visibility: "hidden" }),
    },
  );
});
