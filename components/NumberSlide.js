"use client";

import React, { useEffect, useRef, forwardRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NumberSlide = forwardRef((props, parentRef) => {
  const slideTopRef = useRef(null);
  const slideBottomRef = useRef(null);
  const numberRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const slideTop = slideTopRef.current;
    const slideBottom = slideBottomRef.current;
    const numberWrapper = numberRef.current;

    if (!slideTop || !slideBottom || !numberWrapper) return;

    // will-change 속성 추가
    slideTop.style.willChange = "transform";
    slideBottom.style.willChange = "transform";

    gsap.registerPlugin(ScrollTrigger);

    const initAnimation = () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: numberWrapper.parentNode,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true

        },
      });

      timeline
        .fromTo(
          slideTop,
          { xPercent: 20 },
          { xPercent: -105, duration: 1, ease: "linear" },
          "start"
        )
        .fromTo(
          slideBottom,
          { xPercent: -20 },
          { xPercent: 105, duration: 1, ease: "linear" },
          "start"
        );

      return timeline;
    };

    const timer = setTimeout(() => {
      const timeline = initAnimation();
      
      return () => {
        if (timeline) timeline.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    },1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isMounted]); // isMounted를 의존성 배열에 추가

  return (
    <div className="number-slide sticky-block" ref={numberRef}>
      <div className="number-wrap">
        <div className="number-con slide-top" ref={slideTopRef}>
          <img src="/images/Stroke-A.svg" alt="" />
          <img src="/images/Stroke-aa.svg" alt="" className="sm" />
          <img src="/images/Stroke-b.svg" alt="" />
          <img src="/images/Stroke-bb.svg" alt="" className="sm" />
          <img src="/images/Stroke-c.svg" alt="" />
          <img src="/images/Stroke-cc.svg" alt="" className="sm" />
          <img src="/images/Stroke-d.svg" alt="" />
          <img src="/images/Stroke-dd.svg" alt="" className="sm" />
          <img src="/images/Stroke-e.svg" alt="" />
          <img src="/images/Stroke-ee.svg" alt="" className="sm" />
        </div>
        <div className="number-con slide-bottom" ref={slideBottomRef}>
          <img src="/images/Stroke-0.svg" alt="" />
          <img src="/images/Stroke-1.svg" alt="" />
          <img src="/images/Stroke-2.svg" alt="" />
          <img src="/images/Stroke-3.svg" alt="" />
          <img src="/images/Stroke-4.svg" alt="" />
          <img src="/images/Stroke-5.svg" alt="" />
          <img src="/images/Stroke-6.svg" alt="" />
          <img src="/images/Stroke-7.svg" alt="" />
          <img src="/images/Stroke-8.svg" alt="" />
          <img src="/images/Stroke-9.svg" alt="" />
        </div>
      </div>
    </div>
  );
});

// forwardRef 사용 시 displayName 설정
NumberSlide.displayName = 'NumberSlide';

export default NumberSlide;
