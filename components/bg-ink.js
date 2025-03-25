"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BgInk = () => {
  useEffect(() => {
    const coolVideo = document.querySelector(".video-play");
    const videoWrap = document.querySelector(".video-wrap");

    if (!coolVideo) {
      return;
    }

    // 비디오 메타데이터가 로드된 후 1초 뒤에 애니메이션 설정
    coolVideo.onloadedmetadata = function () {
      const timeoutId = setTimeout(() => {
        let tl = gsap.timeline({
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: coolVideo.parentNode.parentNode, // 부모의 부모 요소를 트리거로 설정
            start: "top top",
            end: "bottom+=500% bottom",
            scrub: 1,
            // anticipatePin: 1,
            pin: true,
            // markers: true,
          }
        });
        tl.to(coolVideo, {
          opacity: 1,
          duration: 0.1, // 20% 동안 지속
        }); // 첫 번째 애니메이션 끝나기 20% 전에 시작
        tl.to(videoWrap, {
          backgroundColor: "#07011c",
          duration: 0, // 20% 동안 지속
        }); // 첫 번째 애니메이션 끝나기 20% 전에 시작
        tl.to(coolVideo, {
          currentTime: coolVideo.duration,
          duration: 0.9, // 전체 스크롤 구간을 1로 봤을 때
        });
      },700); 

      // 컴포넌트 언마운트 시 타임아웃 정리
      return () => clearTimeout(timeoutId);
    };

  }, []);

  return (
    <div className="video-wrap">
      <video className="video-play" playsInline webkit-playsinline="true" preload="auto" muted>
        <source src="/media/ink-bg-01.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BgInk;
