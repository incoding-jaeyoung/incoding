"use client";

import React, { useEffect } from "react";
import anime from "animejs";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

const SvgDraw = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollTriggers = []; // scrollTriggers 배열 초기화
    const initAnimations = () => {
      const elements = [
        { selector: ".svg-ani", duration: 1000, delay: 0, direction: "normal" },
        {
          selector: ".svg-ani-15",
          duration: 1500,
          delay: 0,
          direction: "normal",
        },
        {
          selector: ".svg-ani-25",
          duration: 2500,
          delay: 0,
          direction: "normal",
        },
      ];

      // 초기 상태 설정
      elements.forEach(({ selector }) => {
        document.querySelectorAll(selector).forEach((el) => {
          if (
            el instanceof SVGGeometryElement &&
            el.getBBox().width > 0 &&
            el.getBBox().height > 0
          ) {
            // SVGGeometryElement인지 확인 및 렌더링 확인
            const length = el.getTotalLength();
            el.style.strokeDasharray = length;
            el.style.strokeDashoffset = length; // 초기에는 완전히 숨김
          } else {
            console.warn(
              `Element with selector ${selector} is not a valid or rendered SVGGeometryElement.`,
            );
          }
        });
      });

      elements.forEach(({ selector, duration, delay, direction }) => {
        const targets = document.querySelectorAll(selector);

        targets.forEach((target) => {
          const trigger = ScrollTrigger.create({
            trigger: target,
            start: "top 100%",
            onEnter: () => {
              anime({
                targets: target,
                strokeDashoffset: [anime.setDashoffset, 0],
                duration,
                delay,
                easing: "easeInOutSine",
                direction,
                toggleActions: "play none play reset",
              });
            },
          });
          scrollTriggers.push(trigger); // 인스턴스를 배열에 저장
        });
      });
    };

    // DOM 렌더링 후 애니메이션 초기화
    setTimeout(() => {
      initAnimations();
    }, 500);

    // ScrollTrigger Cleanup
    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill()); // 개별 인스턴스를 정리
    };
  }, [pathname]); // pathname이 변경될 때마다 useEffect 실행

  return (
    <div className="svg-background">
      <div className="svg-box svg-400 el-1 ">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div className="svg-box svg-200 el-2">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="svg-box svg-500 el-3">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="10"
            strokeWidth="1.5"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-300 el-4 about-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="1.5"
            stroke="url(#gradient-01)"
            className="svg-ani-25"
          />
        </svg>
      </div>
      <div className="svg-box svg-100 el-5 about-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-300"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="3"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box el-6 about-svg">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            x="0"
            y="0"
            width="198"
            height="198"
            rx="15"
            strokeWidth="2"
            className="svg-ani-15"
          />
        </svg>
      </div>
      <div className="svg-box el-7 about-svg-01">
        <svg
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-300"
        >
          <rect
            x="00"
            y="0"
            width="300"
            height="100"
            rx="50"
            strokeWidth="2"
            className="svg-ani-15"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box el-8 about-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M0.55 15.42L0.55 100C0.55 154.92 45.09 199.45 100 199.45C154.92 199.45 199.45 154.92 199.45 100C199.45 45.09 154.92 0.55 100 0.55L15.42 0.55C7.24 0.55 0.55 7.24 0.55 15.42Z"
            strokeWidth="1"
            className="svg-ani-25"
          ></path>
        </svg>
      </div>
      <div className="svg-box el-9 about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 101.01"
          className="svg-200"
        >
          <path
            d="M199.96 6.95C196.81 58.69 153.13 99.69 100 99.69C46.87 99.69 3.19 58.69 0.04 6.95C-0.14 4.03 2.69 1.6 6.12 1.6H193.88C197.31 1.6 200.14 4.03 199.96 6.95Z"
            strokeWidth="0.5"
            className="svg-ani-25"
          />
        </svg>
      </div>
      <div className="svg-box el-10 about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M0.55 15.42L0.55 100C0.55 154.92 45.09 199.45 100 199.45C154.92 199.45 199.45 154.92 199.45 100C199.45 45.09 154.92 0.55 100 0.55L15.42 0.55C7.24 0.55 0.55 7.24 0.55 15.42Z"
            strokeWidth="3"
            className="opacity-50 svg-ani-25"
            stroke="url(#gradient-01)"
          ></path>
        </svg>
      </div>
      <div className="svg-box el-11 about-svg">
        <svg viewBox="0 0 200 121.77" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.19 0.69L14.18 0.69C8.8 -0.87 3.48 3.81 3.33 10.25L0.52 129.34C0.39 135.48 4.27 140.78 10.37 140.94L193.41 147.5C199.51 147.67 204.01 142.65 204.15 136.51L206.04 64.93C206.18 60.3 203.12 56.03 198.84 54.85L198.84 54.85L106.56 27.8L14.19 0.69Z"
            strokeWidth="0.5"
            className="svg-ani-25"
          />
        </svg>
      </div>
      <div className="svg-box svg-100 el-12 about-svg-01">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="4"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-100 el-13 about-svg">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="2"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box el-14 about-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 101.01"
          className="svg-200"
        >
          <path
            d="M199.96 6.95C196.81 58.69 153.13 99.69 100 99.69C46.87 99.69 3.19 58.69 0.04 6.95C-0.14 4.03 2.69 1.6 6.12 1.6H193.88C197.31 1.6 200.14 4.03 199.96 6.95Z"
            strokeWidth="0.5"
            className="svg-ani-25"
          />
        </svg>
      </div>
      <div className="svg-box svg-100 el-15 about-svg-01">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="4"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box el-16 about-svg">
        <svg
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-300"
        >
          <rect
            x="00"
            y="0"
            width="300"
            height="100"
            rx="50"
            strokeWidth="2"
            className="svg-ani-15"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-300 el-17 about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="2"
            className="svg-ani-25"
          />
        </svg>
      </div>
      <div className="svg-box el-18 about-svg">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="2"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-400 el-19 about-svg">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="svg-box svg-400 el-20 about-svg">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="3"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-500 el-21 about-svg-01">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="30"
            strokeWidth="4.5"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box el-22 about-svg">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="30"
            strokeWidth="4"
          />
        </svg>
      </div>
      <div className="svg-box el-23 about-svg-01">
        <svg viewBox="0 0 200 121.77" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.19 0.69L14.18 0.69C8.8 -0.87 3.48 3.81 3.33 10.25L0.52 129.34C0.39 135.48 4.27 140.78 10.37 140.94L193.41 147.5C199.51 147.67 204.01 142.65 204.15 136.51L206.04 64.93C206.18 60.3 203.12 56.03 198.84 54.85L198.84 54.85L106.56 27.8L14.19 0.69Z"
            strokeWidth="3"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box el-24 about-svg">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="3"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-300 el-25 about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="2"
            className="svg-ani-25"
            stroke="url(#gradient-02)"
          />
        </svg>
      </div>
    </div>
  );
};

export default SvgDraw;
