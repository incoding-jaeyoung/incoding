"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const PageTransition = ({ children, onExitComplete, disableScroll }) => {
  const [triggerExit, setTriggerExit] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 10; // 페이지 끝에서 10px 이내일 때
      const scrollPosition =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - threshold;
      if (scrollPosition && !triggerExit) {
        setTriggerExit(true);
        setIsPageLoaded(false); // 페이지가 로드되지 않은 상태로 설정
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerExit]);

  useEffect(() => {
    // console.log("Pathname changed:", pathname);
    setIsPageLoaded(true);
  }, [pathname]);

  useEffect(() => {
    // console.log("Disable scroll:", disableScroll);
    if (disableScroll) {
      // 스크롤 비활성화
      document.body.style.overflow = "hidden";
    } else {
      // 스크롤 활성화
      document.body.style.overflow = "auto";
    }

    // 컴포넌트가 언마운트될 때 스크롤을 다시 활성화
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
        initial: { y: "99vh", opacity: 1 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "-100vh", opacity: 1 },
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      // onAnimationStart={(definition) => {
      //   if (definition === "exit") {

      //   }
      // }}
      onAnimationComplete={(definition) => {
        if (definition === "exit" && onExitComplete) {
          // 3초 지연 후 onExitComplete 호출
            onExitComplete();
        }
        if (definition === "animate") {
          window.scrollTo(0, 0);
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
