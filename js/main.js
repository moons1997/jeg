window.addEventListener("DOMContentLoaded", () => {
  // var Scrollbar = window.Scrollbar;
  // console.log(Scrollbar);

  // Scrollbar.init(document.querySelector("#my-scrollbar"), {
  //   speed: 0.7,
  //   damping: 0.05,
  //   thumbMinSize: 20,
  //   renderByPixels: true,
  //   alwaysShowTracks: false,
  //   continuousScrolling: true,
  //   delegateTo: null,
  // });

  // Scrollbar.getAll()[0].addListener(function (status) {});

  let menu = [
    "Чернослив",
    "Сушеное Яблоко",
    "Изюм",
    "Курага",
    "Сушеная Дыня",
    "Сушёная Xурма",
  ];

  let colors = [
    "#E74CBC ",
    "#E7524C",
    "#4C8AE7",
    "#E7A04C",
    "#E7B24C",
    "#E7CE4C",
  ];
  let colorsOps = [
    "#E78ACD",
    "#E78D8A",
    "#8AAFE7",
    "#E7BC8A",
    "#E7C78A",
    "#E7D88A",
  ];

  let pages = ["prune", "apple", "grapes", "apricot", "melon", "pear"];

  // rellax
  const rellaxSelect = document.querySelector(".product-info_img");
  const rellax_fun = () => {
    if (rellaxSelect) {
      var rellax = new Rellax(".product-info_img", {
        // center: true,
        wrapper: ".product-info",
      });
    }
  };

  // rellax_fun();

  // __________________________________________________menu
  let menu_btn = document.querySelector(".menu-btn");
  let menuNavbar = document.querySelector(".menu");
  let slider_header = document.querySelector(".slider-header");

  const anime_menu = (selector) => {
    gsap.from(`${selector}`, {
      duration: 0.5,
      y: 60,
      opacity: 0,
      stagger: 0.1,
      delay: 0.5,
    });
  };

  menu_btn.addEventListener("click", () => {
    menuNavbar.classList.toggle("active");
    slider_header.classList.toggle("active");

    anime_menu(".menu.active .menu-left li");
    anime_menu(".menu.active .menu-right li");
    anime_menu(".slider-header.active .slider-header-item a");
    anime_menu(".menu.active .menu_email");
    anime_menu(".menu.active .menu_footer-item p");
  });

  const removMenu = () => {
    menuNavbar.classList.remove("active");
  };
  const removHeader = () => {
    slider_header.classList.remove("active");
  };

  let menu_link = document.querySelectorAll(".menu_navbar li a");
  const slide_header = document.querySelectorAll(".slider-header-item a");

  menu_link.forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        removMenu();
        removHeader();
      }, 500);
    });
  });

  slide_header.forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        removMenu();
        removHeader();
      }, 500);
    });
  });

  // __________________________________________________menu

  function onSwiper(currentSlide) {
    let speed = 1500;
    let swiper = new Swiper(".swiper-container", {
      speed,
      simulateTouch: false,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      // },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + menu[index] + "</span>";
        },
      },
    });

    // swiper.slideTo(currentSlide, 0);

    let curretSlide = 0;

    swiper.on("slideChange", function ({ activeIndex }) {
      const sliderTransitions = document.querySelectorAll(".slider-transition");
      sliderTransitions.forEach((item) => {
        item.classList.remove("animate");
      });

      localStorage.setItem("key", activeIndex);

      // if (!activeIndex) {
      //   activeIndex = 0;
      // }

      console.log(
        document.querySelector(".swiper-slide-active").dataset.changcolor
      );

      // change page background color
      document.querySelector(
        ".wrapper"
      ).style.backgroundColor = `${colors[activeIndex]}`;

      document.querySelector(
        ".loading-screen"
      ).style.backgroundColor = `${colorsOps[activeIndex]}`;

      // change page url
      const linkBtn = document.querySelector(".change_url");

      if (linkBtn) {
        linkBtn.setAttribute("href", `./${pages[activeIndex]}.html`);
      }

      document.querySelectorAll("[data-move]").forEach((item, idx) => {
        let y = item.dataset.y;
        item.style.transform = `translate(0, ${y}%)`;
      });

      let fruits = document.querySelectorAll(
        ".swiper-slide-active [data-move]"
      );

      // gsap.from(".swiper-slide-active .title__element", {
      //   duration: 0.9,
      //   y: 100,
      //   opacity: 0,
      //   stagger: 0.1,
      //   delay: 0.5,
      // });

      const anime_fruits = (selector, duration, prev) => {
        gsap.from(selector, {
          duration,
          x: prev || 200,
          opacity: 0,
          stagger: 0.5,
          delay: 0.3,
        });
      };

      let duration = 0.5;

      fruits.forEach((item) => {
        duration += 0.4;
        // anime_fruits(`.swiper-slide-next .${item.className}`, duration);
        // anime_fruits(`.swiper-slide-prev .${item.className}`, duration, -200);

        // console.log(duration);
      });
    });

    // swiper.on("touchMove", function ({ touches: { diff } }) {
    //   let reverse;

    //   document
    //     .querySelectorAll(".swiper-slide-active [data-move]")
    //     .forEach((item, idx) => {
    //       item.dataset.reverse ? (reverse = -1) : (reverse = 1);
    //       let y = item.dataset.y;
    //       item.style.transition = "none";
    //       item.style.transform = `translate(${(diff / 6) * reverse}px, ${y}%)`;
    //     });
    // });

    // swiper.on("touchEnd", function () {
    //   document
    //     .querySelectorAll(".swiper-slide-active [data-move]")
    //     .forEach((item, idx) => {
    //       let y = item.dataset.y;
    //       item.style.transition = "transform .75s";
    //       item.style.transform = `translate(0, ${y}%)`;
    //     });
    // });

    swiper.on("slideNextTransitionEnd", function ({ activeIndex }) {
      const sliderTransitions = document.querySelectorAll(".slider-transition");

      sliderTransitions.forEach((item) => {
        item.classList.remove("animate");
      });

      sliderTransitions[activeIndex].classList.add("animate");

      anime.timeline({ loop: false }).add(
        {
          targets: ".swiper-slide-active .title span",
          duration: 4000,
          translateY: ["170px", "0"],
          delay: (item, idx) => idx * 70,
        },
        "-=2500"
      );
    });

    swiper.on("slidePrevTransitionEnd", function ({ activeIndex }) {
      const sliderTransitions = document.querySelectorAll(".slider-transition");

      sliderTransitions.forEach((item) => {
        item.classList.remove("animate");
      });

      sliderTransitions[activeIndex].classList.add("animate");

      anime.timeline({ loop: false }).add(
        {
          targets: ".swiper-slide-active .title span",
          duration: 4000,
          translateY: ["170px", "0"],
          delay: (item, idx) => idx * 70,
        },
        "-=2500"
      );
    });
  }

  onSwiper();

  let activeSlide = document.querySelector(".swiper-slide-active");

  if (activeSlide) {
    document.querySelector(
      ".loading-screen"
    ).style.backgroundColor = `${colorsOps[0]}`;
  }

  // _______________________________________________________________barba js

  const loadingScreen = document.querySelector(".loading-screen");

  function pageTransitionIn() {
    return gsap.to(loadingScreen, {
      duration: 0.4,
      scaleY: 1,
      transformOrigin: "bottom left",
    });
  }
  function pageTransitionOut(container) {
    return gsap
      .timeline({ delay: 0.2 }) // More readable to put it here
      .add("start") // Use a label to sync screen and content animation
      .to(
        loadingScreen,
        {
          duration: 0.4,
          scaleY: 0,
          skewX: 0,
          transformOrigin: "top left",
          ease: "power1.out",
        },
        "start"
      )
      .call(contentAnimation, [container], "start");
  }

  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

  function contentAnimation() {
    var tl = gsap.timeline();
    tl.from(".animate-this", {
      duration: 1,
      y: 30,
      opacity: 0,
      stagger: 0.4,
      delay: 0.5,
    });
  }

  function anime_fruit() {
    var tl = gsap.timeline();
    tl.from(".animate-fruit", {
      duration: 1,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      delay: 1,
    });
  }

  function onParallax(target) {
    document.querySelectorAll(target).forEach((scene) => new Parallax(scene));
  }

  // FILTERIZER
  const filterizer = () => {
    const simpleFilters = document.querySelectorAll(
      ".simplefilter li.fltr-controls"
    );
    Array.from(simpleFilters).forEach((node) =>
      node.addEventListener("click", function () {
        simpleFilters.forEach((filter) => filter.classList.remove("active"));
        node.classList.add("active");
      })
    );

    const sortControls = document.querySelectorAll(".sort-btn");
    Array.from(sortControls).forEach((node) =>
      node.addEventListener("click", function () {
        sortControls.forEach((control) => control.classList.remove("active"));
        node.classList.add("active");
      })
    );

    // Expose this filterizr as a global for debugging
    if (document.querySelector(".filtr-container")) {
      window.filterizr = new window.Filterizr(".filtr-container", {
        controlsSelector: ".fltr-controls",
        gutterPixels: 30,
        // layout: "sameHeight",
        layout: "packed",
        delay: 30,
        delayMode: "alternate",
        // filterOutCss: {
        //   opacity: 0,
        //   transform: "scale(1)",
        // },
        spinner: {
          enabled: true,
          // Further (optional) customization options.
          fillColor: "#2184D0",
          styles: {
            height: "75px",
            margin: "0 auto",
            width: "75px",
            "z-index": 2,
          },
        },
      });
    }
  };

  // filterizer();

  barba.init({
    // sync: true,
    // preventRunning: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();
          pageTransitionIn();
          await delay(1500);
          done();
          rellax_fun();
        },

        async enter(data) {
          contentAnimation();
          onParallax("[data-id]");
          pageTransitionOut(data.next.container);
          anime_fruit();
          onSwiper();
          rellax_fun();
          // filterizer();
        },

        async once(data) {
          contentAnimation();
          anime_fruit();
          onParallax("[data-id]");
          onSwiper();
          rellax_fun();
        },
      },
    ],
  });

  barba.hooks.afterLeave((data) => {
    let preloaderScreen = data.next.container.dataset.background;
    if (preloaderScreen) {
      document.querySelector(
        ".loading-screen"
      ).style.backgroundColor = `${colorsOps[0]}`;
    }

    if (data.next.container.dataset.headerTheme === "light") {
      document.querySelector("header").classList.remove("white-them");
      document.querySelector("header").classList.add("header-light");
    } else {
      document.querySelector("header").classList.remove("header-light");
      document.querySelector("header").classList.add("white-them");
    }
  });

  // Scrollbar.init(document.querySelector(".scroll-content"), {
  // speed: 0.7,
  // damping: 0.1,
  // thumbMinSize: 20,
  // renderByPixels: true,
  // alwaysShowTracks: false,
  // continuousScrolling: true,
  // delegateTo: null,
  // });
});
