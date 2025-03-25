"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WidjetAnimation from "./widjetAnimation";
import GassMorp from "./GassMorp";
gsap.registerPlugin(ScrollTrigger);

const TextZoom = () => {
  const textRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const element = textRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".text-zoom",
          start: "0 0",
          end: "+=600% 100%",
          pin: true,
          scrub: true,
          markers: true, // 개발 중에만 사용, 완료 후 제거
        },
      });
      tl.set(".text-sub", { scale: 0, opacity: 1 });
      tl.set(".text-sub-01", { scale: 0, opacity: 1 });

      tl.to(element, { scale: 1, duration: 0.2, ease: "power2.out" }) // 0.2초 동안 실행
        .to(element, { scale: 200, duration: 0.6, ease: "power3.in" }, "text") // 0.4초 동안 실행

        .to(
          ".text-sub",
          { opacity: 1, scale: 1, duration: 0.6, ease: "power3.in" },
          "text",
        )
        .to(
          element,
          { opacity: 0, duration: 0.2, ease: "power3.in" },
          "text+=0.4",
        ) // 0.2초 동안 실행
        .to(
          ".text-sub",
          { opacity: 1, scale: 200, duration: 0.6, ease: "power3.in" },
          "text01",
        )
        .to(
          ".text-sub",
          { opacity: 0, duration: 0.2, ease: "power3.in" },
          "text01+=0.4",
        ) // 0.2초
        .to(
          ".text-sub-01",
          { opacity: 1, scale: 1, duration: 0.5, ease: "power3.in" },
          "text01+=0.0",
        )
        .to(".text-sub-01", { opacity: 1, scale: 1, duration: 0.2, y: -50 });
    }, 400);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-black section section-black text-zoom z-100">
      {/* <div className="fixed top-0 left-0 w-full h-full">
        <GassMorp />
      </div> */}
      <div className="text-white section-con sticky-block">
        <main>
          <section className="text-wrap ">
            <p className="sticky-text" ref={textRef}>
              <span>무한한 가능성을 탐구하다</span>
            </p>
          </section>
        </main>
      </div>
      <div
        className="top-0 left-0 w-full h-full text-white opacity-0 section-con text-sub"
        style={{ position: "absolute", zIndex: 100 }}
      >
        <p className="text-zoom">
          최신 기술을 활용하여 <br /> 몰입감 있는 경험을 제공합니다.
        </p>
      </div>
      <div
        className="top-0 left-0 w-full h-full text-white opacity-0 section-con text-sub-01"
        style={{ position: "absolute", zIndex: 100 }}
      >
        <p className="text-zoom">
          더 나은 사용자 경험을 위해 <br /> 무한한 가능성을 실험합니다.
        </p>
      </div>
    </div>
  );
};

export default TextZoom;
