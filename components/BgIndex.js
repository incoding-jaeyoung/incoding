"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import "../styles/BgIndex.css";

const BgIndex = forwardRef((props, ref) => {
  const interBubbleRef = useRef(null);
  const curPosition = useRef({ x: 0, y: 0 }); // 초기값 설정
  const targetPosition = useRef({ x: 0, y: 0 }); // 초기값 설정

  useEffect(() => {
    // const root = document.documentElement;
    // root.style.setProperty("--color-bg1", "rgb(8, 10, 15)");
    // root.style.setProperty("--color-bg2", "rgb(0, 17, 32)");
    // root.style.setProperty("--color1", "18, 113, 255");
    // root.style.setProperty("--color2", "107, 74, 255");
    // root.style.setProperty("--color3", "100, 100, 255");
    // root.style.setProperty("--color4", "50, 160, 220");
    // root.style.setProperty("--color5", "80, 47, 122");
    // root.style.setProperty("--color-interactive", "140, 100, 255");
    // root.style.setProperty("--circle-size", "80%");
    // root.style.setProperty("--blending", "hard-light");

    const interBubble = interBubbleRef.current;

    if (!interBubble) {
      console.error("Interactive bubble element not found.");
      return;
    }

    const handleMouseMove = (event) => {
      targetPosition.current = { x: event.clientX, y: event.clientY };
    };

    const move = () => {
      const { x: curX, y: curY } = curPosition.current;
      const { x: tgX, y: tgY } = targetPosition.current;

      // 현재 위치를 목표 위치로 점진적으로 이동
      curPosition.current.x += (tgX - curX) / 20;
      curPosition.current.y += (tgY - curY) / 20;

      // 스타일 업데이트
      interBubble.style.transform = `translate(${Math.round(
        curPosition.current.x,
      )}px, ${Math.round(curPosition.current.y)}px)`;

      // 애니메이션 프레임 요청
      requestAnimationFrame(move);
    };

    window.addEventListener("mousemove", handleMouseMove);

    move(); // 애니메이션 시작

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="gradientBg">
      <svg xmlns="http://www.w3.org/2000/svg" className="svgBlur">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradientsContainer">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        {/* <div className="g5"></div> */}
        <div className="interactive" ref={interBubbleRef}></div>
      </div>
    </div>
  );
});

export default BgIndex;
