"use client";

import React, { useEffect, useRef } from "react";
import styles from "../styles/WaveBackground.module.css"; // CSS 모듈 import
const setCSSVariables = () => {
  const root = document.documentElement;
  root.style.setProperty("--color-bg1", "#dff9fb");
  root.style.setProperty("--color-bg2", "#ffffff");
  root.style.setProperty("--color1", "104, 109, 224");
  root.style.setProperty("--color2", "126, 214, 223");
  root.style.setProperty("--color3", "223, 249, 251");
  root.style.setProperty("--color4", "255, 121, 121");
  root.style.setProperty("--color5", "149, 175, 192");
  root.style.setProperty("--color-interactive", "140, 100, 255");
  root.style.setProperty("--circle-size", "200%");
  root.style.setProperty("--blending", "hard-light");
};

const WaveBackground = () => {
  const interBubbleRef = useRef(null); // interactive 요소 참조
  const curPosition = useRef({ x: 0, y: 0 }); // 현재 위치
  const targetPosition = useRef({ x: 0, y: 0 }); // 목표 위치

  useEffect(() => {
    setCSSVariables();

    const handleMouseMove = (event) => {
      targetPosition.current.x = event.clientX;
      targetPosition.current.y = event.clientY;
    };

    const move = () => {
      const interBubble = interBubbleRef.current;
      if (!interBubble) return;

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
    <div className={styles.gradientBg}>
      <svg xmlns="http://www.w3.org/2000/svg">
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
      <div className={styles.gradientsContainer}>
        <div className={styles.g1}></div>
        <div className={styles.g2}></div>
        <div className={styles.g3}></div>
        <div className={styles.g4}></div>
        <div className={styles.g5}></div>
        <div className={styles.interactive} ref={interBubbleRef}></div>
      </div>
    </div>
  );
};

export default WaveBackground;
