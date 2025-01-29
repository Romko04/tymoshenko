class Animations {
  constructor() {
    this.init();
  }
  init() {
    this.initAnimations();
    this.scrollbarAnimations();
    this.optimizePerformance();
  }
  splitText() {
    this.typeSplit = new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span",
    });
  }
  createScrollTrigger(r, t) {
    ScrollTrigger.create({
      trigger: r,
      start: "top bottom",
      onLeaveBack: () => {
        t.progress(0), t.pause();
      },
    }),
      ScrollTrigger.create({
        trigger: r,
        start: "top 60%",
        onEnter: () => t.play(),
      });
  }
  initAnimations() {
    document.querySelectorAll("[words-slide-from-left]").forEach((r) => {
      const t = gsap.timeline({ paused: !0 });
      t.from(r.querySelectorAll(".word"), {
        opacity: 0,
        x: "-1em",
        duration: 0.6,
        ease: "power2.out",
        stagger: { amount: 0.2 },
      }),
        this.createScrollTrigger(r, t);
    }),
      document.querySelectorAll("[letters-fade-in]").forEach((r) => {
        const t = gsap.timeline({ paused: !0 });
        t.from(r.querySelectorAll(".char"), {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
          stagger: { amount: 0.8 },
        }),
          this.createScrollTrigger(r, t);
      }),
      document.querySelectorAll("[scrub-each-word]").forEach((r) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: r,
              start: "top 90%",
              end: "top 30%",
              scrub: !0,
            },
          })
          .from(r.querySelectorAll(".word"), {
            opacity: 0.2,
            duration: 0.2,
            ease: "power1.out",
            stagger: { each: 0.4 },
          });
      }),
      gsap.from(".who__list-item", {
        y: -100,
        opacity: 0,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: {
          once: !0,
          trigger: ".who__list-item",
          start: "top 90%",
          end: "bottom 100%",
          scrub: !0,
        },
      }),
      gsap.from(".accordeon", {
        opacity: 0,
        y: 50,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: {
          trigger: ".accordeon",
          start: "top 90%",
          end: "top 30%",
          scrub: !0,
          once: !0,
        },
      }),
      gsap.from(".price__list", {
        opacity: 0,
        y: 50,
        stagger: 0.5,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".price__container",
          start: "top 90%",
          end: "top 30%",
          scrub: !0,
          once: !0,
        },
      }),
      gsap.from(".swiper__container", {
        opacity: 0,
        y: 50,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: {
          trigger: ".swiper__container",
          start: "top 90%",
          end: "top 30%",
          scrub: !0,
          once: !0,
        },
      }),
      gsap.from(".about__list-item", {
        opacity: 0,
        y: 50,
        stagger: 0.5,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about__list",
          start: "top 90%",
          end: "bottom 100%",
          scrub: !0,
          once: !0,
        },
      }),
      gsap.from(".courses__list a", {
        opacity: 0,
        y: 100,
        stagger: 0.5,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".courses__list",
          start: "top 90%",
          end: "bottom 100%",
          scrub: !0,
          once: !0,
        },
      });
  }
  scrollbarAnimations() {
    const r = new Lenis();
    r.on("scroll", ScrollTrigger.update),
      gsap.ticker.add((t) => {
        r.raf(1e3 * t);
      }),
      gsap.ticker.lagSmoothing(0);
  }
  optimizePerformance() {
    // Підвищуємо пріоритет рендерингу
    performance.mark("start-performance");

    // Battery API – адаптація анімацій до рівня заряду
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        if (battery.level > 0.2 && !battery.savingMode) {
          gsap.globalTimeline.timeScale(1.2);
        } else {
          gsap.globalTimeline.timeScale(0.8);
        }
      });
    }
  }
}
window.addEventListener("DOMContentLoaded", () => {
  new Animations();
});
