"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
const CustomCursor = dynamic(() => import('../components/CustomCursor'), {
  ssr: false,
});
import Head from "../components/Head";
import Audio from "../components/Audio";
import Menu from "../components/MenuBlock";
import Chat from "../components/Chat";
import "../styles/globals.css";
import LenisProvider from "../components/LenisProvider"; 
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null); // LenisProvider의 ref
  const [panelContent, setPanelContent] = useState(""); // 패널 콘텐츠 상태
  const handlePageChange = () => {
    // 패널 콘텐츠 설정
    if (pathname.startsWith("/lab")) {
      setPanelContent(
        `<div class="panel-con">
          <div class="text">Lab</div>
        </div>`
      );
    } else {
      switch (pathname) {
        case "/":
          setPanelContent(
            `<div class="panel-con center">
            <div class="panel-svg">
              <svg viewBox="0 0 201 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M106.652 2.8111L195.939 67.6819C199.518 70.2824 201.016 74.8919 199.649 79.0996L165.544 184.063C164.177 188.27 160.256 191.119 155.832 191.119H45.467C41.0428 191.119 37.1217 188.27 35.7546 184.063L1.64997 79.0996C0.282806 74.8919 1.78052 70.2824 5.35981 67.6819L94.6468 2.81109C98.2261 0.210591 103.073 0.210594 106.652 2.8111Z" 
                  strokeWidth="1"
                  stroke="#cccccc"
                />
                <path d="M106.652 2.8111L195.939 67.6819C199.518 70.2824 201.016 74.8919 199.649 79.0996L165.544 184.063C164.177 188.27 160.256 191.119 155.832 191.119H45.467C41.0428 191.119 37.1217 188.27 35.7546 184.063L1.64997 79.0996C0.282806 74.8919 1.78052 70.2824 5.35981 67.6819L94.6468 2.81109C98.2261 0.210591 103.073 0.210594 106.652 2.8111Z" 
                  strokeWidth="3"
                  class="svg-back-panel"
                  stroke="#ffffff"
                />
              </svg>
            </div>
            <div class="text">About us</div>
          </div>`,
          );
          break;
        case "/about":
          setPanelContent(
            `<div class="panel-con">
            <div class="panel-svg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M0.55 15.42L0.55 100C0.55 154.92 45.09 199.45 100 199.45C154.92 199.45 199.45 154.92 199.45 100C199.45 45.09 154.92 0.55 100 0.55L15.42 0.55C7.24 0.55 0.55 7.24 0.55 15.42Z" strokeWidth="1" class="" stroke="#cccccc"></path>
                <path d="M0.55 15.42L0.55 100C0.55 154.92 45.09 199.45 100 199.45C154.92 199.45 199.45 154.92 199.45 100C199.45 45.09 154.92 0.55 100 0.55L15.42 0.55C7.24 0.55 0.55 7.24 0.55 15.42Z" strokeWidth="10" class="svg-back-panel" stroke="#fff"></path>
              </svg>
            </div>
            <div class="text">Portfolio</div>
          </div>`,
          );
          break;
        case "/portfolio":
          setPanelContent(
            `<div class="panel-con">
            <div class="panel-svg">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="svg-200">
                <rect
                  x="0"
                  y="0"
                  width="198"
                  height="198"
                  rx="15"
                  strokeWidth="1"
                  stroke="#cccccc"
                />
                <rect
                  x="0"
                  y="0"
                  width="198"
                  height="198"
                  rx="15"
                  strokeWidth="2"
                  class="svg-back-panel" stroke="#fff"
                />
              </svg>
            </div>
            <div class="text">contact</div>
          </div>`,
          );
          break;
        case "/lab":
          setPanelContent(
            `<div class="panel-con">
              <div class="text">Lab</div>
            </div>`,
          );
          break;
        case "/contact":
          setPanelContent(`<div class="panel-con"></div>`);
          break;
        default:
          setPanelContent("");
      }
    }
    
    // GSAP 애니메이션 초기화
    setTimeout(() => {
      initializeGsapAnimation();
    }, 1000);
  };

  const initializeGsapAnimation = () => {
    document.querySelectorAll(".panel-con .svg-back-panel").forEach((el) => {
      const length = el.getTotalLength();
      el.style.strokeDasharray = length;
      el.style.strokeDashoffset = length;
    });
    gsap.set(".panel-con", {
      opacity: 0.3,
      marginTop: "80dvh",
      scale:2,
    });
    
    gsap.set(".panel-con svg", {
      rotateZ: "0",
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-bottom",
        start: "top 100%",
        end: "top 0%",
        scrub: 1,
        // markers: true,
      },
    });
    // 애니메이션만 timeline에 추가
    tl.to(".panel-con", {
      opacity: 1,
      marginTop: "0dvh",
      duration: 0.4,
      ease: "linear",
      scale: 1,
    })
    .to(".panel-con svg", {
      rotateZ: "-180",
      duration: 0.4,
      ease: "linear",
    }, "<")
    .to(".panel-con .svg-back-panel", {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: "linear",
    }, "<");
  };

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();

      // 메인 페이지와 contact 페이지가 아닐 때만 start 호출
      if (pathname !== '/' && pathname !== '/contact') {
        setTimeout(() => {
          lenisRef.current.start();
          window.scrollTo(0, 0);
        }, 1000); // 시간을 줄임
      }
    }
  }, [pathname]);
  useEffect(() => {
    if (pathname.startsWith("/lab")) {
      window.scrollTo(0, 0);
      handlePageChange();
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0);
        handlePageChange();
      }, 1600);
    }
  }, [pathname]);

  const panelRef = useRef(null); // 현재 표시되는 panel만 참조
  useEffect(() => {
    gsap.to(".back-panel .panel-con", {
      scale: 0.7,
      y: "-80dvh",
      duration: 1,
      ease: "power2.in",
    });
    gsap.to(".panel-con svg", {
      rotateZ: "-45",
      duration: 1,
      ease: "power2.in",
    });
  }, [pathname]);
  
  // Check if the current page is the contact page
  const isContactPage = pathname === "/contact";

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);
  const [showNotice, setShowNotice] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    // 모바일 화면 감지
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      setShowNotice(true);

      // 5초 후에 서서히 사라지도록 설정
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 4000);

      // 6초 후에 완전히 숨김
      const hideTimer = setTimeout(() => {
        setShowNotice(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, []);
  return (
    <html lang="ko">
      <head>
        <Head />
      </head>
      <body suppressHydrationWarning={true}>
        <AnimatePresence mode="wait" initial={false}>
            <LenisProvider ref={lenisRef}>{children}</LenisProvider>
        </AnimatePresence>
        <CustomCursor />
        {pathname !== "/" && <Audio />}
        <Menu />
        <div className="frontPanel">
          {pathname === "/" && (
            <div className="panel" ref={panelRef}>
              <p>Intro</p>
            </div>
          )}
          {pathname === "/about" && (
            <div className="panel" ref={panelRef}>
              <p>About us</p>
            </div>
          )}
          {pathname === "/portfolio" && (
            <div className="panel" ref={panelRef}>
              <p>Projects</p>
            </div>
          )}
          {pathname === "/contact" && (
            <div className="panel" ref={panelRef}>
              <p>Contact</p>
            </div>
          )}
        </div>
        <div className="back-panel">
          <div
            className="bg-black panel"
            dangerouslySetInnerHTML={{ __html: panelContent }}
          />
        </div>

        {/* {isIndexPage && <Footer />} */}
        <svg xmlns="http://www.w3.org/2000/svg" className="hide">
          <defs>
            <linearGradient
              id="gradient-01"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FC466B" />
              <stop offset="100%" stopColor="#3F5EFB" />
            </linearGradient>
            <linearGradient
              id="gradient-02"
              x1="-2109.54"
              y1="553"
              x2="637.618"
              y2="-85.004"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#550CFF" />
              <stop offset="1" stopColor="#936DFF" />
            </linearGradient>
          </defs>
        </svg>
        {pathname !== "/" && <Chat />}
        <Analytics />
        {showNotice && (
          <div
            className="notice"
            style={{
              transition: 'opacity 1s ease-in-out',
              opacity: fadeOut ? 0 : 1,
            }}
          >
            본 웹사이트는 PC에 최적화 되어있습니다. <br />
            모바일 화면에서는 퍼포먼스가 저하될 수 있습니다.
          </div>
        )}
      </body>
    </html>
  );
}

// export default RootLayout;
