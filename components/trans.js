"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ children, onExitComplete, disableScroll }) => {
  const [triggerExit, setTriggerExit] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 메인 페이지와 contact 페이지에서는 createScrollTrigger를 호출하지 않음
    if (pathname === '/' || pathname === '/contact') return;

    // 페이지가 마운트된 후에 ScrollTrigger 생성
    const createScrollTrigger = () => {
      ScrollTrigger.create({
        trigger:".page-container", // document.body 대신 documentElement 사용
        start: "bottom bottom", // 문서 하단에서 10px 위
        end: "bottom bottom",
        onEnter: () => {
          if (!triggerExit) {
              setTriggerExit(true);
              setIsPageLoaded(false);
          }

        },
      });
    };

    // 약간의 지연 후 ScrollTrigger 생성
    const timer = setTimeout(() => {
      createScrollTrigger();
    }, 1600);

    // 클린업
    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

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
        if (definition === "exit" && pathname !== '/contact') {
            onExitComplete();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
