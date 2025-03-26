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
    const setupScrollTrigger = () => {
      gsap.registerPlugin(ScrollTrigger);
            
      const trigger = ScrollTrigger.create({
        trigger: videoWrap.parentNode,
        start: "top top",
        end: "bottom+=500% bottom",
        scrub: 1,
        pin: true,
        markers: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (coolVideo.readyState >= 2 && coolVideo.duration) {
            const targetTime = coolVideo.duration * self.progress;
            coolVideo.currentTime = targetTime;
          }
        },
      });

            
      gsap.to(coolVideo, {
        opacity: 1,
        duration: 0.1,
      });
      
      gsap.to(videoWrap, {
        backgroundColor: "#07011c",
        duration: 0,
      })

      ScrollTrigger.refresh();
    };

    // 무조건 setupScrollTrigger 실행 (로드 여부 상관 없이)
    const timeout = setTimeout(() => {
      setupScrollTrigger();
    }, 700); // 모바일 고려 충분한 딜레이

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
