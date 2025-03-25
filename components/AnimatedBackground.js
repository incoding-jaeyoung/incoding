"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import styles from "../styles/AnimatedBackground.module.css"; // CSS 모듈 import

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;

    // Create 20 div elements with the class "block"
    for (let i = 0; i < 15; i++) {
      const block = document.createElement("div");
      block.classList.add(styles.block);
      background.appendChild(block);
    }

    // Define the animation function using Anime.js
    const animateBlocks = () => {
      anime({
        targets: `.${styles.block}`,
        translateX: () => anime.random(-700, 700),
        translateY: () => anime.random(-500, 500),
        scale: () => anime.random(1, 4),
        borderColor: () => `hsl(${anime.random(0, 360)}, 70%, 50%)`, // 랜덤 hue 설정
        easing: "spring(1, 30, 5, 0)",
        duration: 2500,
        delay: anime.stagger(10),
        complete: animateBlocks,
      });
    };

    // Intersection Observer to detect when the element enters or exits the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start the animation when the element is in view
          animateBlocks();
        } else {
          // Stop the animation when the element is out of view
          anime.remove(`.${styles.block}`); // Remove all ongoing anime.js animations
        }
      },
      {
        threshold: 0.4, // 50%가 뷰포트에 보일 때 애니메이션 시작
      },
    );

    if (background) observer.observe(background);

    return () => {
      if (background) observer.unobserve(background);
      // Cleanup: Remove blocks when the component unmounts
      while (background.firstChild) {
        background.removeChild(background.firstChild);
      }
    };
  }, []);

  return <div ref={backgroundRef} className={styles.background}></div>;
};

export default AnimatedBackground;
