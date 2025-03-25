"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { motion } from "framer-motion";
import BgIndex from "../components/BgIndex";
import PageTransition from "../components/PageTransition";
import ExploreBtn from "../components/ExploreBtn";

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const svgRef = useRef(null);
  const logoTextRef = useRef(null);
  const circleTopRef = useRef(null);
  const circleBottomRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // GSAP 애니메이션 설정
    const circleTop = circleTopRef.current;
    const circleBottom = circleBottomRef.current;
    
    if (!circleTop || !circleBottom) return;
    
    const lengthTop = Math.round(circleTop.getTotalLength());
    const lengthBottom = Math.round(circleBottom.getTotalLength());
    
    // 스타일 설정
    circleTop.style.strokeDasharray = lengthTop + 1;
    circleTop.style.strokeDashoffset = lengthTop + 1;
    circleBottom.style.strokeDasharray = lengthBottom + 1;
    circleBottom.style.strokeDashoffset = 0;

    // GSAP 애니메이션
    const timeline = gsap.timeline();
    timeline
      .to(".circle-wrap, .logo-white", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(
        ".circle-top",
          {
            strokeDashoffset: "0",
            duration: 4,
            ease: "power3.inOut",
          }
        )
      .to(
        ".circle-top", {
          strokeDashoffset:lengthTop,
          duration: 1.5,
          ease: "power4.inOut",
          delay: 1, // 1초 동안 대기
        },"circle")
      .to(
        ".circle-bottom", {
          strokeDashoffset:lengthBottom,
          duration: 1,
          ease: "power4.inOut",
          delay: 1, // 1초 동안 대기
      }, "circle+=0.5")
      
      .to(
        ".logo-text h1 div:first-child",
        {
          opacity: 1,
          duration: 1,
          delay: 1
        },
        "circle+=0.5",
      )
      .to(
        ".logo-text h1 div:last-child",
        {
          opacity: 1,
          duration: .75,
          delay: 1
        },
        "circle+=0.75",
      )
      .to(
        ".circle-wrap",
          {
            opacity: 0,
            duration: 0,
          },
          // "time-=0.1"
      )
      .to(".logo-mask", {
        opacity: 1,
        duration: 1,
      }, "time1")
      .to(
        ".gradientBg",
        {
          opacity: 1,
          duration: 1,
        },
        "time1",
      )
      .to(
        ".particles-button",
        {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "cursor-=0.5",
      );

    return () => {
      timeline.kill();
    };
  }, [isMounted]);

  const handlePageTransition = () => {
    if (!isMounted) return;
    
    gsap.to(".page-container", {
      y: "-100vh",
      opacity: 1,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        setTimeout(() => {
          router.push("/about");
        }, 300);
      },
    });
  };

  if (!isMounted) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <PageTransition
      onExitComplete={() => {
        router.push("/about");
      }}
      disableScroll={false}
    >
      <div id="contents" className="main">
        <BgIndex />
        <div className="circle-wrap">
          <div className="index-circle">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                ref={circleBottomRef}
                className="circle-bottom"
                cx="100"
                cy="100"
                r="100"
                strokeWidth="0.5"
                stroke="#ddd"
                transform="rotate(-90 100 100)" 
              />
              <circle
                ref={circleTopRef}
                className="circle-top"
                cx="100"
                cy="100"
                r="100"
                strokeWidth="0.5"
                stroke="#fff"
                transform="rotate(-90 100 100)" 
              />
            </svg>
          </div>
        </div>
        <div className="svg-logo logo-white">
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="35"
              height="150"
              fill="white"
              className="svg-logo-01"
            />
            <path
              d="M35 0L150 0V115L35 0Z"
              fill="white"
              className="svg-logo-02"
            />
            <path
              d="M130 150L70 150L70 90L130 150Z"
              fill="white"
              className="svg-logo-03"
            />
          </svg>
        </div>
        <div className="svg-logo logo-mask" ref={svgRef}>
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="svgMask" maskUnits="userSpaceOnUse" x="0" y="0">
              <rect width="35" height="150" fill="white" className="logo-01" />
              <path
                d="M35 0L150 0V115L35 0Z"
                fill="white"
                className="logo-02"
              />
              <path
                d="M130 150L70 150L70 90L130 150Z"
                fill="white"
                className="logo-03"
              />
            </mask>
          </svg>
          <video
            className="background-video"
            src="/images/bg-01.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              mask: "url(#svgMask)",
              WebkitMask: "url(#svgMask)",
              width: "150px",
              height: "150px",
            }}
          ></video>
        </div>
        <div className="logo-text" ref={logoTextRef}>
          <h1>
            <div className="title">INCODING</div>
            <div className="sub-title">
              <span>interactive</span>
              {/* <span>developement</span>
              <span>design</span> */}
              <span> studio</span>
            </div>
          </h1>
        </div>
        <ExploreBtn  onTransitionComplete={handlePageTransition} />
      </div>
    </PageTransition>
  );
};

export default HomePage;
