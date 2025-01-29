class Animations {
  constructor() {
    this.init();
  }

  // Инициализация
  init() {
    // Разбить текст на слова и буквы
    // Добавить анимации
    this.initAnimations();

    this.scrollbarAnimations();
  }

  // Разделение текста на спаны
  splitText() {
    this.typeSplit = new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span",
    });
  }

  // Создание ScrollTrigger для таймлайнов
  createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });

    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play(),
    });
  }

  // Анимации для каждого элемента
  initAnimations() {
    document.querySelectorAll("[words-slide-from-left]").forEach((element) => {
      const tl = gsap.timeline({ paused: true });
      tl.from(element.querySelectorAll(".word"), {
        opacity: 0,
        x: "-1em",
        duration: 0.6,
        ease: "power2.out",
        stagger: { amount: 0.2 },
      });
      this.createScrollTrigger(element, tl);
    });

    document.querySelectorAll("[letters-fade-in]").forEach((element) => {
      const tl = gsap.timeline({ paused: true });
      tl.from(element.querySelectorAll(".char"), {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
        stagger: { amount: 0.8 },
      });
      this.createScrollTrigger(element, tl);
    });

    document.querySelectorAll("[scrub-each-word]").forEach((element) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 50%",
            end: "top 30%",
            scrub: true,
          },
        })
        .from(element.querySelectorAll(".word"), {
          opacity: 0.2,
          duration: 0.2,
          ease: "power1.out",
          stagger: { each: 0.4 },
        });
    });

    gsap.from(".who__list-item", {
      x: -100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        once: true,

        trigger: ".who__list-item",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      },
    });

    gsap.from(".accordeon", {
      opacity: 0, // Початковий стан (повністю прозорий)
      y: 50, // Початкове зрушення вниз
      stagger: 0.2, // Анімація кожного елемента із затримкою
      duration: 1, // Тривалість анімації
      scrollTrigger: {
        trigger: ".accordeon", // Тригер для початку анімації
        start: "top 80%", // Коли верх акордеона досягне 80% видимої області
        end: "top 10%", // Коли верх акордеона досягне 10% видимої області
        scrub: true, // Анімація буде синхронізована зі скролом
        once: true, // Анімація спрацює тільки один раз
      },
    });
    // Анімація для елементів тарифів
    gsap.from(".price__list", {
      opacity: 0, // Початкова прозорість
      y: 50, // Початкове зрушення знизу
      stagger: 0.3, // Затримка для кожного елемента
      duration: 0.5, // Тривалість анімації
      scrollTrigger: {
        trigger: ".price__container", // Тригер для початку анімації (коли з'явиться цей блок)
        start: "top 80%", // Анімація починається, коли верх елемента досягне 80% видимої області
        end: "top 10%", // Кінець анімації, коли верх елемента досягне 10%
        scrub: true, // Анімація синхронізується з прокручуванням
        once: true, // Анімація спрацьовує лише один раз
      },
    });

    // Анімація для елементів тарифів
    gsap.from(".swiper__container", {
      opacity: 0, // Початкова прозорість
      y: 50, // Початкове зрушення знизу
      duration: 0.5, // Тривалість анімації
      scrollTrigger: {
        trigger: ".swiper__container", // Тригер для початку анімації (коли з'явиться цей блок)
        start: "top 80%", // Анімація починається, коли верх елемента досягне 80% видимої області
        end: "top 30%", // Кінець анімації, коли верх елемента досягне 10%
        scrub: true, // Анімація синхронізується з прокручуванням
        once: true, // Анімація спрацьовує лише один раз
      },
    });

    gsap.from(".about__list-item", {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about__list", // Тригер для початку анімації (коли з'явиться цей блок)
        start: "top 80%", // Анімація починається, коли верх елемента досягне 80% видимої області
        end: "top 30%", // Кінець анімації, коли верх елемента досягне 10%
        scrub: true, // Анімація синхронізується з прокручуванням
        once: true, // Анімація спрацьовує лише один раз
      },
    });

    gsap.from(".courses__list a", {
      opacity: 0,
      x: 100,
      duration: 1,
      stagger: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".courses__list", // Тригер для початку анімації (коли з'явиться цей блок)
        start: "top 70%", // Анімація починається, коли верх елемента досягне 80% видимої області
        end: "top 10%", // Кінець анімації, коли верх елемента досягне 10%
        scrub: true, // Анімація синхронізується з прокручуванням
        once: true, // Анімація спрацьовує лише один раз
      },
    });
  }

  scrollbarAnimations() {
    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
  }
}

// Запуск анимации, когда контент загружен
window.addEventListener("DOMContentLoaded", () => {
  new Animations();
});
