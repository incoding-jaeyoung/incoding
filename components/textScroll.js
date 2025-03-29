import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import "../styles/textWrite.css";


const TextScrollAnimations = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  const initGradientText = () => {
    // 'gradient-text' 클래스를 가진 모든 요소 선택
    const gradientTexts = document.querySelectorAll(".gradient-text");
    const gradientTexts2 = document.querySelectorAll(".gradient-text-01");

    gradientTexts.forEach((text) => {
      // Splitting.js가 적용되어 있다고 가정
      const chars = text.querySelectorAll(".char");

      if (!chars.length) return; // .char 요소가 없으면 중단

      chars.forEach((char, index) => {
        // 전체 글자 수에 따라 그라데이션 진행도 계산
        const progress = index / (chars.length - 1);
        // 시작 색상과 끝 색상 설정
        const startColor = "oklch(36% 0.50 340)";
        const endColor = "oklch(90% 0.5 200)";

        // 각 글자에 색상 적용
        gsap.set(char, {
          color: gsap.utils.interpolate(startColor, endColor, progress),
        });
      });
    });
    gradientTexts2.forEach((text) => {
      // Splitting.js가 적용되어 있다고 가정
      const chars = text.querySelectorAll(".char");

      if (!chars.length) return; // .char 요소가 없으면 중단

      chars.forEach((char, index) => {
        // 전체 글자 수에 따라 그라데이션 진행도 계산
        const progress = index / (chars.length - 1);
        // 시작 색상과 끝 색상 설정
        const startColor = "#FC307B";
        const endColor = "#A22DC9";

        // 각 글자에 색상 적용
        gsap.set(char, {
          color: gsap.utils.interpolate(startColor, endColor, progress),
        });
      });
    });
  };
  useEffect(() => {
    Splitting();
    initGradientText();
    setTimeout(() => {
      const titleMain = [...document.querySelectorAll('.content-title[data-splitting][data-title-main]')];
      const titleMainSub = [...document.querySelectorAll('.content-title[data-splitting][data-title-main-sub]')];
      const titleMainContent = [...document.querySelectorAll('.content-title[data-splitting][data-title-main-content]')];
      const section02 = [...document.querySelectorAll('.content-title[data-splitting][data-section02]')];
      const section02Sub = [...document.querySelectorAll('.content-title[data-splitting][data-section02-sub]')];
      const section02Con = [...document.querySelectorAll('.content-title[data-splitting][data-section02-con]')];
      const section05 = [...document.querySelectorAll('.content-title[data-splitting][data-section05]')];
      const section05Sub = [...document.querySelectorAll('.content-title[data-splitting][data-section05-sub]')];
      const section05Con = [...document.querySelectorAll('.content-title[data-splitting][data-section05-con]')];
      const fx23Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect23]",
        ),
      ];
      const fx233Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect233]",
        ),
      ];
      const fx16Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect16]",
        ),
      ];
      const fx17Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect17]",
        ),
      ];
      const fx18Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect18]",
        ),
      ];
      const fx188Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect188]",
        ),
      ];
      
      const fx19Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect19]",
        ),
      ];
      const fx20Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect20]",
        ),
      ];
      const fx21Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect21]",
        ),
      ];
      const fx22Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect22]",
        ),
      ];
      const fx222Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect222]",
        ),
      ];
      
      const fx24Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect24]",
        ),
      ];
      const fx25Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect25]",
        ),
      ];
      const fx26Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect26]",
        ),
      ];
      const fx27Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect27]",
        ),
      ];
      const fx28Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect28]",
        ),
      ];
      const fx29Titles = [
        ...document.querySelectorAll(
          ".content-title[data-splitting][data-effect29]",
        ),
      ];


      const scroll = () => {
        titleMain.forEach(title => {
        
          const chars = title.querySelectorAll('.char');
  
          gsap.fromTo(chars, { 
              'will-change': 'opacity, transform', 
              opacity: 0, 
              xPercent: () => gsap.utils.random(-300,300), 
              yPercent: () => gsap.utils.random(-250,250) 
          },
          {
              ease: 'power4.inOut',
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              delay:0.5,
              duration: 2,
              stagger: { each: 0.05, grid: 'auto', from: 'random'},
              scrollTrigger: {
                  trigger: title,
                  start: 'center bottom+=10%',
                  end: 'bottom center',
                  // scrub: 0.9,
                  // markers: true,
              }
          });
  
        });
        titleMainSub.forEach(title => {
        
          const chars = title.querySelectorAll('.char');
  
          gsap.fromTo(chars, { 
              'will-change': 'opacity, transform', 
              opacity: 0, 
              xPercent: () => gsap.utils.random(-200,200), 
              yPercent: () => gsap.utils.random(-150,150) 
          },
          {
              ease: 'power1.inOut',
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              stagger: { each: 0.05, grid: 'auto', from: 'random'},
              scrollTrigger: {
                  trigger: title.parentNode,
                  start: 'top top',
                  end: 'top+=50% top',
                  scrub: 0.9,
                  // markers: true,
              }
          });
  
        });
        titleMainContent.forEach((title) => {
          const chars = title.querySelectorAll(".char");
          chars.forEach((char, index) => {
            gsap.set(char.parentNode, { perspective: 1000 });
          });
          // 기존 애니메이션 효과
          gsap.fromTo(
            chars,
            {
              "will-change": "opacity, transform",
              opacity: 0,
              z: -800,
            },
            {
              ease: "back.out(1.2)",
              opacity: 1,
              z: 0,
              stagger: 0.06,
              scrollTrigger: {
                trigger: title.parentNode,
                start: "top+=50% top",
                end: "top+=200% top",
                scrub: true,
                // markers: true,
              },
            },
          );
        });
        section02.forEach((title) => {
          const chars = title.querySelectorAll(".char");
          chars.forEach((char, index) => {
            gsap.set(char.parentNode, { perspective: 1000 });
          });
          // 기존 애니메이션 효과
          gsap.fromTo(
            chars,
            {
              "will-change": "opacity, transform",
              opacity: 0,
              z: -800,
            },
            {
              ease: "back.out(1.2)",
              opacity: 1,
              z: 0,
              stagger: 0.06,
              scrollTrigger: {
                trigger: title.parentNode,
                start: "top top+=50%",
                end: "top+=135% top",
                scrub: true,
                // markers: true,
                
              },
            },
          );
        });

        section02Sub.forEach((title) => {
          const chars = title.querySelectorAll(".char");
          chars.forEach((char, index) => {
            gsap.set(char.parentNode, { perspective: 1000 });
          });
          // 기존 애니메이션 효과
          gsap.fromTo(
            chars,
            {
              "will-change": "opacity, transform",
              opacity: 0,
              z: -800,
            },
            {
              ease: "back.out(1.2)",
              opacity: 1,
              z: 0,
              stagger: 0.06,
              scrollTrigger: {
                trigger: title.parentNode,
                start: "top+=160% top",
                end: "top+=300% top",
                scrub: true,
                // markers: true,
                
              },
            },
          );
        });

        section02Con.forEach((title) => {
          const chars = title.querySelectorAll(".char");
          chars.forEach((char, index) => {
            gsap.set(char.parentNode, { perspective: 1000 });
          });
          // 기존 애니메이션 효과
          gsap.fromTo(
            chars,
            {
              "will-change": "opacity, transform",
              opacity: 0,
              z: -800,
            },
            {
              ease: "back.out(1.2)",
              opacity: 1,
              z: 0,
              stagger: 0.06,
              scrollTrigger: {
                trigger: title.parentNode,
                start: "top+=350% top",
                end: "top+=480% top",
                scrub: true,
                // markers: true,
                
              },
            },
          );
        });

        

        section05.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          for (const [wordPosition, word] of words.entries()) {
            gsap.fromTo(
              word.querySelectorAll(".char"),
              {
                "will-change": "transform",
                scale: 1.05,
                opacity: 0,
                x: (pos, _, arr) => {
                  // return wordPosition % 2
                  return wordPosition % 2
                  // ? pos * 100
                  // : (arr.length - pos - 1) * 10
                  ? pos * 100
                  : pos * 50
                  
                },
              },
              {
                ease: "linear",
                scale: 1,
                opacity: 1,
                x: 0,
                scrollTrigger: {
                  trigger: title.parentNode,
                  start: "top top",
                  end: "top+=70% top",
                  scrub: true,
                  markers: true,
                },
              },
            );
          }
        });

        section05Sub.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          for (const [wordPosition, word] of words.entries()) {
            gsap.fromTo(
              word.querySelectorAll(".char"),
              {
                "will-change": "transform",
                scale: 1.05,
                opacity: 0,
                x: (pos, _, arr) => {
                  // return wordPosition % 2
                  return wordPosition % 2
                  // ? pos * 100
                  // : (arr.length - pos - 1) * 10
                  ? pos * 100
                  : pos * 50
                  
                },
              },
              {
                ease: "linear",
                scale: 1,
                opacity: 1,
                x: 0,
                scrollTrigger: {
                  trigger: title.parentNode,
                  start: "top+=50% top",
                  end: "top+=120% top",
                  scrub: true,
                  markers: true,
                },
              },
            );
          }
        });

        section05Con.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          for (const [wordPosition, word] of words.entries()) {
            gsap.fromTo(
              word.querySelectorAll(".char"),
              {
                "will-change": "transform",
                scale: 1.05,
                opacity: 0,
                x: (pos, _, arr) => {
                  // return wordPosition % 2
                  return wordPosition % 2
                  // ? pos * 100
                  // : (arr.length - pos - 1) * 10
                  ? pos * 100
                  : pos * 50
                  
                },
              },
              {
                ease: "linear",
                scale: 1,
                opacity: 1,
                x: 0,
                scrollTrigger: {
                  trigger: title.parentNode,
                  start: "top+=100% top",
                  end: "top+=180% top",
                  scrub: true,
                  markers: true,
                },
              },
            );
          }
        });


        fx16Titles.forEach((title) => {
          gsap.fromTo(
            title,
            {
              transformOrigin: "0% 50%",
              rotate: 3,
            },
            {
              ease: "none",
              rotate: 0,
              scrollTrigger: {
                trigger: title,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            },
          );

          gsap.fromTo(
            title.querySelectorAll(".word"),
            {
              "will-change": "opacity",
              opacity: 0.1,
            },
            {
              ease: "none",
              opacity: 1,
              stagger: 0.05,
              scrollTrigger: {
                trigger: title,
                start: "top bottom-=20%",
                end: "center top+=20%",
                scrub: true,
              },
            },
          );
        });

        fx17Titles.forEach((title) => {
          const chars = title.querySelectorAll(".char");
          chars.forEach((char) =>
            gsap.set(char.parentNode, { perspective: 1000 }),
          );
          gsap.fromTo(
            chars,
            {
              "will-change": "opacity, transform",
              opacity: 0,
              rotateX: () => gsap.utils.random(-120, 120),
              z: () => gsap.utils.random(-200, 200),
            },
            {
              ease: "none",
              opacity: 1,
              rotateX: 0,
              z: 0,
              stagger: 0.02,
              scrollTrigger: {
                trigger: title.parentNode.parentNode.parentNode,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                // markers: true,
              },
            },
          );
        });

        

        fx19Titles.forEach((title) => {
          const chars = title.querySelectorAll(".char");

          chars.forEach((char) =>
            gsap.set(char.parentNode, { perspective: 1000 }),
          );

          gsap.fromTo(
            chars,
            {
              "will-change": "opacity, transform",
              transformOrigin: "50% 0%",
              opacity: 0,
              rotationX: -90,
              z: -200,
            },
            {
              ease: "power1",
              opacity: 1,
              stagger: 0.05,
              rotationX: 0,
              z: 0,
              scrollTrigger: {
                trigger: title,
                start: "center bottom",
                end: "bottom top+=20%",
                  scrub: true,
                // markers: true,
              },
            },
          );
        });

        fx20Titles.forEach((title) => {
          const chars = title.querySelectorAll(".char");

          chars.forEach((char) =>
            gsap.set(char.parentNode, { perspective: 1000 }),
          );

          gsap.fromTo(
            chars,
            {
              "will-change": "opacity, transform",
              transformOrigin: "50% 100%",
              opacity: 0,
              rotationX: 90,
            },
            {
              ease: "power4",
              opacity: 1,
              stagger: {
                each: 0.03,
                from: "random",
              },
              rotationX: 0,
              scrollTrigger: {
                trigger: title,
                start: "center bottom",
                end: "bottom top+=20%",
                scrub: true,
              },
            },
          );
        });

        fx21Titles.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          for (const word of words) {
            const chars = word.querySelectorAll(".char");

            chars.forEach((char) =>
              gsap.set(char.parentNode, { perspective: 2000 }),
            );

            gsap.fromTo(
              chars,
              {
                "will-change": "opacity, transform",
                opacity: 0,
                y: (position, _, arr) =>
                  -40 * Math.abs(position - arr.length / 2),
                z: () => gsap.utils.random(-1500, -600),
                rotationX: () => gsap.utils.random(-500, -200),
              },
              {
                ease: "power1.inOut",
                opacity: 1,
                y: 0,
                z: 0,
                rotationX: 0,
                stagger: {
                  each: 0.06,
                  from: "center",
                },
                scrollTrigger: {
                  trigger: word,
                  start: "top bottom",
                  end: "top top+=15%",
                  scrub: true,
                },
              },
            );
          }
        });
        fx222Titles.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          for (const word of words) {
            const chars = word.querySelectorAll(".char");
            const charsTotal = chars.length;

            chars.forEach((char) =>
              gsap.set(char.parentNode, { perspective: 1000 }),
            );

            gsap.fromTo(
              chars,
              {
                "will-change": "transform",
                x: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return (
                    (charsTotal % 2
                      ? Math.abs(Math.ceil(charsTotal / 2) - 1 - factor)
                      : Math.abs(Math.ceil(charsTotal / 2) - factor)) *
                    200 *
                    (position < charsTotal / 2 ? -1 : 1)
                  );
                },
                y: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return factor * 60;
                },
                rotationY: -270,
                rotationZ: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return position < charsTotal / 2
                    ? Math.abs(factor - charsTotal / 2) * 8
                    : -1 * Math.abs(factor - charsTotal / 2) * 8;
                },
              },
              {
                ease: "power2.inOut",
                x: 0,
                y: 0,
                opacity: 1,
                rotationZ: 0,
                rotationY: 0,
                scale: 1,
                duration: 2,
                scrollTrigger: {
                  trigger: title,
                  start: "top bottom",
                  end: "bottom top",
                  // markers: true,
                },
              },
            );
          }
        });

        fx22Titles.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          for (const word of words) {
            const chars = word.querySelectorAll(".char");
            const charsTotal = chars.length;

            chars.forEach((char) =>
              gsap.set(char.parentNode, { perspective: 1000 }),
            );

            gsap.fromTo(
              chars,
              {
                "will-change": "transform",
                x: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return (
                    (charsTotal % 2
                      ? Math.abs(Math.ceil(charsTotal / 2) - 1 - factor)
                      : Math.abs(Math.ceil(charsTotal / 2) - factor)) *
                    200 *
                    (position < charsTotal / 2 ? -1 : 1)
                  );
                },
                y: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return factor * 60;
                },
                  rotationY: -270,
                opacity: 0,
                rotationZ: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return position < charsTotal / 2
                    ? Math.abs(factor - charsTotal / 2) * 8
                    : -1 * Math.abs(factor - charsTotal / 2) * 8;
                },
              },
              {
                ease: "power4.inOut",
                x: 0,
                y: 0,
                opacity: 1,
                rotationZ: 0,
                rotationY: 0,
                scale: 1,
                duration: 2,
                scrollTrigger: {
                  trigger: title.parentNode.parentNode,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: true,
                  // markers: true,
                },
              },
            );
          }
        });

        

        fx24Titles.forEach((title) => {
          const chars = title.querySelectorAll(".char");
          const charsTotal = chars.length;

          gsap.fromTo(
            chars,
            {
              "will-change": "transform",
              y: (position) => {
                const factor =
                  position < Math.ceil(charsTotal / 2)
                    ? position
                    : Math.ceil(charsTotal / 2) -
                      Math.abs(Math.floor(charsTotal / 2) - position) -
                      1;
                return (charsTotal / 2 - factor + 6) * 130;
              },
            },
            {
              ease: "elastic.out(.4)",
              y: 0,
              stagger: {
                amount: 0.1,
                from: "center",
              },
              scrollTrigger: {
                trigger: title.parentNode.parentNode,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1,
                  // markers: true,
                  pin:true,
              },
            },
          );
        });

        fx25Titles.forEach((title) => {
          gsap.fromTo(
            title.querySelectorAll(".char"),
            {
              "will-change": "transform",
              transformOrigin: "50% 100%",
              scaleY: 0,
            },
            {
              ease: "power3.in",
              opacity: 1,
              scaleY: 1,
              stagger: 0.05,
              scrollTrigger: {
                trigger: title,
                start: "top bottom",
                end: "bottom top",
                  scrub: true,
                  // pin: title.parentNode.parentNode,
              },
            },
          );
        });

        fx26Titles.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: title,
              start: "center center",
              end: "+=50%",
              scrub: true,
                  pin: title.parentNode.parentNode,
            },
          });
          for (const [wordPosition, word] of words.entries()) {
            tl.fromTo(
              word.querySelectorAll(".char"),
              {
                "will-change": "transform",
                transformOrigin: () =>
                  !wordPosition % 2 ? "50% 0%" : "50% 100%",
                scaleY: 0,
              },
              {
                ease: "power1.inOut",
                scaleY: 1,
                stagger: {
                  amount: 0.3,
                  from: "center",
                },
              },
              0,
            );
          }
        });

        fx27Titles.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          words.forEach((word) =>
            gsap.set(word.parentNode, { perspective: 1000 }),
          );

          gsap.fromTo(
            words,
            {
              "will-change": "opacity, transform",
              z: () => gsap.utils.random(500, 950),
              opacity: 0,
              xPercent: (pos) => gsap.utils.random(-100, 100),
              yPercent: (pos) => gsap.utils.random(-10, 10),
              rotationX: () => gsap.utils.random(-90, 90),
            },
            {
              ease: "expo",
              opacity: 1,
              rotationX: 0,
              rotationY: 0,
              xPercent: 0,
              yPercent: 0,
              z: 0,
              delay: 0.5,
              scrollTrigger: {
                trigger: title.parentNode,
                start: "top top",
                end: "+=100%",
                scrub: true,
                pin: true,
                // markers: true,
              },
              stagger: {
                each: 0.006,
                from: "random",
              },
            },
          );
        });

        fx28Titles.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          for (const word of words) {
            const chars = word.querySelectorAll(".char");
            const charsTotal = chars.length;

            gsap.fromTo(
              chars,
              {
                "will-change": "transform, filter",
                transformOrigin: "50% 100%",
                scale: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return gsap.utils.mapRange(
                    0,
                    Math.ceil(charsTotal / 2),
                    0.5,
                    2.1,
                    factor,
                  );
                },
                y: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return gsap.utils.mapRange(
                    0,
                    Math.ceil(charsTotal / 2),
                    0,
                    60,
                    factor,
                  );
                },
                rotation: (position) => {
                  const factor =
                    position < Math.ceil(charsTotal / 2)
                      ? position
                      : Math.ceil(charsTotal / 2) -
                        Math.abs(Math.floor(charsTotal / 2) - position) -
                        1;
                  return position < charsTotal / 2
                    ? gsap.utils.mapRange(
                        0,
                        Math.ceil(charsTotal / 2),
                        -4,
                        0,
                        factor,
                      )
                    : gsap.utils.mapRange(
                        0,
                        Math.ceil(charsTotal / 2),
                        0,
                        4,
                        factor,
                      );
                },
                filter: "blur(12px) opacity(0)",
              },
              {
                ease: "power2.inOut",
                y: 0,
                rotation: 0,
                scale: 1,
                filter: "blur(0px) opacity(1)",
                scrollTrigger: {
                  trigger: word,
                  start: "top bottom+=40%",
                  end: "top top+=15%",
                  scrub: true,
                },
                stagger: {
                  amount: 0.15,
                  from: "center",
                },
              },
            );
          }
        });

        fx29Titles.forEach((title) => {
          const words = [...title.querySelectorAll(".word")];

          for (const [pos, word] of words.entries()) {
            const chars = word.querySelectorAll(".char");

            gsap.fromTo(
              chars,
              {
                "will-change": "transform",
                transformOrigin: `${pos % 2 ? 0 : 100}% ${pos % 2 ? 100 : 0}%`,
                scale: 0,
              },
              {
                ease: "none",
                scale: 1,
                stagger: {
                  each: 0.03,
                  from: pos % 2 ? "end" : "start",
                },
                  scrollTrigger: {
                    trigger: word.parentNode.parentNode,
                  start: "top top",
                  end: "bottom ",
                //   trigger: word,
                //   start: "top 0%",
                //     end: "bottom top-=100%",
                    scrub: true,
                    invalidateOnRefresh: true

                  
                },
              },
            );
          }
        });
        // Continue with other fxXXTitles...
      };
      scroll();
      
    }, 1000); // 1초 후에 실행
    
  }, []);

  return null; // This component does not render any JSX
};

export default TextScrollAnimations;
