"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const PageTransition = ({ children, onExitComplete, disableScroll }) => {
  const [triggerExit, setTriggerExit] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 페이지가 마운트된 후에 ScrollTrigger 생성
    const createScrollTrigger = () => {
      let hasScrolled = false;

      window.addEventListener('scroll', () => {
        hasScrolled = true;
      }, { once: true });

      ScrollTrigger.create({
        trigger: ".page-container",
        start: "bottom bottom",
        end: "bottom bottom",
        onEnter: () => {
          if (!triggerExit && hasScrolled) {
            setTriggerExit(true);
            setIsPageLoaded(false);
          }
        },
      });
    };

    // 약간의 지연 후 ScrollTrigger 생성
    setTimeout(() => {
      createScrollTrigger();
    }, 1600);

    // 클린업
    return () => {
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [triggerExit]); // triggerExit를 의존성 배열에 추가

  useEffect(() => {
    setIsPageLoaded(true);
  }, [pathname]);


  const currentAnimationState = isPageLoaded
    ? "animate"
    : triggerExit
      ? "exit"
      : "initial";

  return (
    <motion.div
      className="page-container"
      initial="initial"
      animate={currentAnimationState}
      exit="exit"
      variants={{
        initial: { y: "100vh", opacity: 1 },
        animate: { y: 0, opacity: 1, transition: {duration: 0.6, ease: [0.32, 0, 0.67, 0] }},
        exit: { y: "-100vh", opacity: 1,transition: {duration: 0, ease: [0.42, 0, 1, 1]}},
      }}
      onAnimationStart={(definition) => {
        if (definition === "animate") {
          window.scrollTo(0, 0);
          console.log("animate");
          
        }
      }}
      onAnimationComplete={(definition) => {
        if (definition === "exit") {
            onExitComplete();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
