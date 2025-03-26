"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BgInk = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const frameCount = 260;

  useEffect(() => {
    

    if (!imageRef) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const updateImage = (index) => {
      const frameNumber = index.toString().padStart(5, '0');
      if (imageRef.current) {
        imageRef.current.src = `/images/frames/${frameNumber}.jpg`;
      }
    };

    updateImage(1); // 최초 프레임

    let trigger;
    const timer = setTimeout(() => {
      trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
        invalidateOnRefresh: true,
        
        onUpdate: (self) => {
          const frameIndex = Math.floor(self.progress * (frameCount - 1)) + 1;
          updateImage(frameIndex);
        },
      });
      
      
      
      // gsap.to(containerRef.current, {
      //   backgroundColor: "#07011c",
      //   duration: 0,
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     start: "top bottom",
      //     end: "top+=500 top",
      //     scrub: 1,
      //     // markers: true,
      //     invalidateOnRefresh: true,
      //   }
      // })
      gsap.to(containerRef.current, {
        opacity:1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "top+=100 top",
          scrub: 1,
          // markers: true,
          invalidateOnRefresh: true,
        }
      });
      ScrollTrigger.refresh();
    }, 700);

    return () => {
      clearTimeout(timer);
      if (trigger) {
        trigger.kill();
      }
    };
  }, []);

  return (
    <div className="video-wrap" ref={containerRef}>
      <img className="video-play" ref={imageRef} alt="Frame" />
    </div>
  );
};

export default BgInk;