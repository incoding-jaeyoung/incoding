"use client";

import React, { useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

const LenisProvider = forwardRef(({ children }, ref) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Lenis 인스턴스를 한 번만 생성
    lenisRef.current = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,    // 데스크톱에서만 부드러운 스크롤
      smoothTouch: false,   // 모바일에서는 기본 스크롤
      touchMultiplier: 2,   // 터치 감도
    });

    // ScrollTrigger 업데이트 연결
    lenisRef.current.on("scroll", ScrollTrigger.update);

    return () => {
      lenisRef.current.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    stop: () => {
      console.log("Lenis scroll stopped");
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    },
    start: () => {
      console.log("Lenis scroll started");
      if (lenisRef.current) {
        lenisRef.current.start();
        
        const raf = (time) => {
          lenisRef.current.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    },
  }));

  return <div>{children}</div>;
});

export default LenisProvider;
