"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/SVGAnimation.css"; // CSS 파일

const SVGAnimation = () => {
  const containerWrapRef = useRef(null);
  const containerRef = useRef(null);

  // useEffect(() => {
  //   const containerWrap = containerWrapRef.current;
  //   const container = containerRef.current;

  //   setTimeout(() => {
  //     if (container) {
  //       const tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: containerWrap,
  //           start: "top center", // 트리거 시작점
  //           end: "bottom top-=150%", // 트리거 종료점
  //           scrub: true, // 스크롤과 동기화
  //           // markers: true, // 디버깅용 마커
  //         },
  //       });
  //       tl.to(container, {
  //         width: "100vw", // width를 100%로 변경
  //         height: "100vw", // height를 100%로 변경
  //         duration: 1, // 애니메이션 지속 시간
  //       });
  //       tl.to(container, {
  //         width: "100%", // width를 100%로 변경
  //         height: "100dvh", // height를 100%로 변경
  //         borderRadius:"0",
  //         duration: 0.5, // 애니메이션 지속 시간
  //       });

  //     }
  //   }, 1000); // 1초 딜레이
  // }, []);

  return (
    <div ref={containerWrapRef} className="aniContainer">
      <div ref={containerRef} className="animationWrap">
        <div className="container">
          <div className="subcontainer">
            <div className="half">
              <div className="droplet"></div>
              <div className="splash">
                <div className="splash-container">
                  <div className="circle">222</div>
                </div>
              </div>
            </div>
            <div className="half">
              <div className="droplet"></div>
              <div className="splash">
                <div className="splash-container">
                  <div className="circle">111</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SVGAnimation;
