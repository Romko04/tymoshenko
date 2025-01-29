class Animations {
  constructor() {
    this.isMobile = this.checkIfMobile(); // Визначаємо тип пристрою
    this.init();
  }
  checkIfMobile() {
    return (
      /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 1024px)").matches
    );
  }
  init() {
    this.initAnimations();
    this.scrollbarAnimations();
    this.optimizePerformance();
  }

  initAnimations() {
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
        scrub: this.isMobile ? false : true,
      },
    }),
      gsap.from(".accordeon", {
        opacity: 0,
        y: 50,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: {
          trigger: ".moduls__accordeon",
          start: "top 90%",
          end: "top 30%",
          scrub: this.isMobile ? false : true,
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
          scrub: this.isMobile ? false : true,
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
          scrub: this.isMobile ? false : true,
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
          scrub: this.isMobile ? false : true,
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
          scrub: this.isMobile ? false : true,
          once: !0,
        },
      });
  }
  scrollbarAnimations() {
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
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
