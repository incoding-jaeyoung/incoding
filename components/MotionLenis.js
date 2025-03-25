"use client";

import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageTransitionWithLenis = forwardRef(({ children, onExitComplete, disableScroll }, ref) => {
  const [triggerExit, setTriggerExit] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const pathname = usePathname();

  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  useImperativeHandle(ref, () => lenis);

  useEffect(() => {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, [lenis]);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100; // 페이지 끝에서 10px 이내일 때
      const scrollPosition =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - threshold;
      if (scrollPosition && !triggerExit) {
        setTimeout(() => {
          setTriggerExit(true);
          setIsPageLoaded(false); // 페이지가 로드되지 않은 상태로 설정
        }, 1200); // 0.6초 후에 실행
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerExit]);

  useEffect(() => {
    setIsPageLoaded(true);
  }, [pathname]);

  useEffect(() => {
    if (disableScroll) {
      // 스크롤 비활성화
      document.body.style.overflow = "hidden";
    } else {
      // 스크롤 활성화
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [disableScroll]);

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
        initial: { y: "95vh", opacity: 1 },
        animate: { y: 0, opacity: 1},
        exit: { y: "-100vh", opacity: 1 },
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      onAnimationStart={(definition) => {
        if (definition === "animate") {
          console.log("animate");
        }
      }}
      onAnimationComplete={(definition) => {
        if (definition === "exit") {
          onExitComplete();
          ScrollTrigger.refresh();
        }
      }}
    >
      {children}
    </motion.div>
  );
});

export default PageTransitionWithLenis;