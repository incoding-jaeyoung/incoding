"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CubeAnimation = forwardRef((props, parentRef) => {
  const cubeRef = useRef(null); // cubeRef 초기화
  const topCircleRefs = useRef([]); // face top의 써클 Ref 배열
  const bottomCircleRefs = useRef([]); // face bottom의 써클 Ref 배열
  const timeoutRef = useRef(null); // timeout을 저장할 ref
  
  const generateCircles = (circleRefs) => {
    return Array.from({ length: 16 }).map((_, index) => (
      <div
        key={index}
        className="circle"
        ref={(el) => {
          if (el) {
            circleRefs.current[index] = el; // Ref 배열에 요소 추가
          }
        }}
      >
        <span></span>
      </div>
    ));
  };
  

  const cubeAnimation = () => {
    const timeline = gsap.timeline({
      repeat: -1,
      paused: true, // ScrollTrigger로 제어하기 위해 초기 애니메이션 일시정지
      scrollTrigger: {
        trigger: parentRef.current, // 부모 요소를 트리거로 설정
        start: "top top",
        end: "bottom+=300% bottom",
        pin: true,
        markers: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(cubeRef.current, {
        rotateY: "+=90",
        duration: 1.8,
        ease: "power2.inOut",
      })
      .to(
        topCircleRefs.current, // face top의 써클 애니메이션
        {
          rotateZ: "+=90",
          duration: 1.8,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        bottomCircleRefs.current, // face bottom의 써클 애니메이션
        {
          rotateZ: "-=90",
          // rotateY: "-=90",
          duration: 1.8,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(cubeRef.current, {
        duration: 0.5,
        ease: "none",
      });
  };

  useEffect(() => {
    // generateCircles 완료 후 cubeAnimation 실행
    if (cubeRef.current && topCircleRefs.current.length > 0) {
      timeoutRef.current = setTimeout(() => {
        cubeAnimation();
      },900);
    }

    return () => {
      // ScrollTrigger 정리
      clearTimeout(timeoutRef.current); // timeout 정리
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cubeRef, topCircleRefs, bottomCircleRefs]);

  return (
    <div className="scene" ref={parentRef}>
      <div className="cube" ref={cubeRef}>
        <div className="face top">{generateCircles(topCircleRefs)}</div>
        <div className="face bottom">{generateCircles(bottomCircleRefs)}</div>
      </div>
    </div>
  );
});

export default CubeAnimation;
