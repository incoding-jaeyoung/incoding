"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import styles from "../styles/AnimatedBackground.module.css"; // CSS 모듈 import

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);
  // Random image URLs
  const imageUrls = [
    "/images/img-logo.svg",
    "/images/react.svg",
    "/images/php.svg",
    "/images/vuedotjs.svg",
    "/images/greensock.svg",
    "/images/tailwindcss.svg",
    "/images/nextdotjs.svg",
    "/images/css3.svg",
    "/images/Figma-Icon.svg",
  ];

  // Function to check if two rectangles overlap
  const isOverlapping = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  // Function to generate non-overlapping position
  const generateNonOverlappingPosition = (
    existingRects,
    elementWidth,
    elementHeight,
  ) => {
    const maxAttempts = 100;
    let attempt = 0;
    while (attempt < maxAttempts) {
      const x = Math.random() * (window.innerWidth - elementWidth);
      const y = Math.random() * (window.innerHeight - elementHeight);

      const newRect = { x, y, width: elementWidth, height: elementHeight };

      // Check for overlap with existing rectangles
      if (!existingRects.some((rect) => isOverlapping(rect, newRect))) {
        return newRect; // Valid position found
      }
      attempt++;
    }
    // Fallback in case no position is found
    return { x: 0, y: 0 };
  };

  useEffect(() => {
    const background = backgroundRef.current;
    const existingRects = []; // Track positions of existing elements

    // Create 20 img elements with the class "block"
    for (let i = 0; i < 30; i++) {
      const img = document.createElement("img");
      img.classList.add(styles.block);

      // Set random background image
      const randomImage =
        imageUrls[Math.floor(Math.random() * imageUrls.length)];
      img.src = randomImage;

      // Set size and styles
      const elementWidth = 100;
      const elementHeight = 100;
      img.style.width = `${elementWidth}px`;
      img.style.height = `${elementHeight}px`;
      img.style.borderRadius = "10px";
      img.style.position = "absolute";

      // Generate a non-overlapping position
      const position = generateNonOverlappingPosition(
        existingRects,
        elementWidth,
        elementHeight,
      );
      existingRects.push({
        ...position,
        width: elementWidth,
        height: elementHeight,
      });

      // Apply position
      img.style.left = `${position.x}px`;
      img.style.top = `${position.y}px`;

      background.appendChild(img);
    }

    // Define the animation function using Anime.js
    const animateBlocks = () => {
      anime({
        targets: `.${styles.block}`,
        translateX: () => anime.random(-800, 800),
        translateY: () => anime.random(-500, 500),
        scale: () => anime.random(0.7, 2),
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
