"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ children, onExitComplete, disableScroll }) => {
  const [triggerExit, setTriggerExit] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const pathname = usePathname();
  const pageContainerRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (pathname === "/" || pathname === "/contact") {
      return;
    }

    const createScrollTrigger = () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(); // 이전 ScrollTrigger 인스턴스 정리
      }

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: pageContainerRef.current || document.body, // 안전하게 참조
        start: "bottom bottom",
        end: "bottom bottom",
        onEnter: () => {
          if (!triggerExit) {
            setTriggerExit(true);
            setIsPageLoaded(false);
          }
        },
      });
    };

    const timer = setTimeout(() => {
      createScrollTrigger();
    }, 1600);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(); // 컴포넌트 언마운트 시 정리
      }
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
      ref={pageContainerRef}
      className="page-container"
      initial="initial"
      animate={currentAnimationState}
      exit="exit"
      variants={{
        initial: { y: "100vh", opacity: 1 },
        animate: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] },
        },
        exit: {
          y: "-100vh",
          opacity: 1,
          transition: { duration: 0, ease: [0.42, 0, 1, 1] },
        },
      }}
      onAnimationStart={(definition) => {
        if (definition === "animate") {
          window.scrollTo(0, 0);
          console.log("animate");
        }
      }}
      onAnimationComplete={(definition) => {
        if (definition === "exit" && pathname !== "/contact") {
          onExitComplete();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
