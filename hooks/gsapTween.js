"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

const defaultAnimations = [
  // {
  //   trigger: ".about-svg",
  //   animationConfig: {
  //     from: { y: "0" },
  //     to: { y: "-150rem", duration: 2, ease: "none", scale: 0.8 },
  //   },
  //   scrollTriggerConfig: {
  //     start: "0 50%", // 화면 상단에서 트리거 시작
  //     end: "100% 0%", // 화면 상단에서 트리거 끝
  //     scrub: 1,
  //     // markers: true,
  //   },
  // },
  // {
  //   trigger: ".about-svg-01",
  //   animationConfig: {
  //     from: { y: "0" },
  //     to: { y: "-250rem", duration: 2, ease: "none", scale: 0.6 },
  //   },
  //   scrollTriggerConfig: {
  //     start: "0 50%", // 화면 상단에서 트리거 시작
  //     end: "100% 0%", // 화면 상단에서 트리거 끝
  //     scrub:1,
  //     // markers: true,
  //   },
  // },
  {
    trigger: ".fade-in",
    animationConfig: {
      from: { opacity: 0 },
      to: { opacity: 1, duration: 1 },
    },
    scrollTriggerConfig: {
      start: "top 90%",
      end: "top 50%",
    },
  },
  {
    trigger: ".slide-up",
    animationConfig: {
      from: { y: "100%" },
      to: { y: "0%", duration: 1.2 },
    },
    scrollTriggerConfig: {
      start: "top 80%",
      end: "top 40%",
      scrub: true,
    },
  },
];

const useGsapAnimation = ({
  animations = defaultAnimations,
  triggerClass = ".about-svg",
  isTransitionComplete = true,
}) => {
  const pathname = usePathname(); // 현재 경로 가져오기

  const initAnimation = () => {
    // 각 애니메이션 실행
    animations.forEach(({ trigger, animationConfig, scrollTriggerConfig }) => {
      const elements = document.querySelectorAll(trigger || triggerClass);
      if (elements.length === 0) return;

      elements.forEach((element) => {
        gsap.fromTo(element, animationConfig.from, {
          ...animationConfig.to,
          scrollTrigger: {
            trigger: element,
            start: "0 50%", // 화면 상단에서 트리거 시작
            end: "100% 0%", // 화면 상단에서 트리거 끝
            scrub: 2, // 기본값
            toggleActions: "play none none reverse", // 기본값
            ...scrollTriggerConfig,
          },
        });
      });
    });

    // ScrollTrigger 새로 고침
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    if (!isTransitionComplete) return; // 애니메이션이 완료되지 않았으면 실행 중지

    const timeoutId = setTimeout(() => {
      // 기존 트리거 제거 및 초기화
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      initAnimation();
    }, 300); // 페이지 전환 애니메이션 시간 이후 (300ms는 예시값)

    return () => {
      // 기존 트리거 정리
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname, triggerClass, isTransitionComplete]); // isTransitionComplete가 true가 되면 실행

  useEffect(() => {
    setTimeout(() => {
      gsap.utils.toArray(".sticky-text").forEach((element) => {
        gsap.to(element,{ // fromto로 변경
          marginTop: "0", // 위로 이동
          scale:1,
          scrollTrigger: {
            ease: "linear",
            trigger: element.closest(".section-con"), // 각 요소의 부모를 트리거로 설정
            start: "0 top",
            end: "bottom top",
            scrub: 1,
            toggleActions: "play none play reverse",
            markers: true,
          },
        });
      });

      gsap.utils.toArray(".sticky-sub").forEach((element) => {
        gsap.to(element, {
          y: "0%", // 위로 이동
          scrollTrigger: {
            ease: "power4.out",
            trigger: element.closest(".section-con"), // 각 요소의 부모를 트리거로 설정
            start: "0 0%",
            end: "bottom 0%",
            scrub: 1,
            toggleActions: "play none play reverse",
          },
        });
      });
    }, 700); // 0.6초 지연
  }, [isTransitionComplete, pathname]);
};

export default useGsapAnimation;
