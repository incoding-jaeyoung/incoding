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
import Audio from "../components/Audio";
import Menu from "../components/MenuBlock";
import Chat from "../components/Chat";
import "../styles/globals.css";
import LenisProvider from "../components/LenisProvider"; 

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null); // LenisProvider의 ref
  const [panelContent, setPanelContent] = useState(""); // 패널 콘텐츠 상태
  const handlePageChange = () => {
    // 패널 콘텐츠 설정
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
      case "/contact":
        setPanelContent(`<div class="panel-con"></div>`);
        break;
      default:
        setPanelContent("");
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
    setTimeout(() => {
      window.scrollTo(0, 0);
      handlePageChange();
    }, 1600);
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
      console.log("[ScrollTrigger] refreshing due to resize or mobile toolbar shift");
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <html lang="ko">
      <head>
        {/* <meta charSet="UTF-8" /> */}
        <meta
          name="google-site-verification"
          content="9F-qVlEe-BBt5G4487MmbgQ4vKer_JIyD-yZ1RGY_08"
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=yes" /> */}
        {/* <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> */}
        <meta name="Author" content="인코딩" />
        <meta
          name="description"
          content="인코딩은 전문적인 애니메이션 및 모션 그래픽 서비스를 제공하는 리더입니다. 우리는 창의적인 시각효과와 혁신적인 디자인으로 고객의 웹사이트를 돋보이게 합니다. 최신 기술을 활용하여 브랜드의 메시지를 시각적으로 전달하고 사용자의 관심을 끌어낼 수 있습니다."
        />
        <meta
          name="keywords"
          content="GSAP,Three.js, 모션스크립트, 마이크로사이트, 웹사이트 제작, 웹디자인, 웹개발, 커스텀 웹사이트, 디지털 마케팅 에이전시, 온라인 프레젠테이션, 창의적인 웹디자인, 전문적인 웹개발 서비스"
        />
        <meta
          name="naver-site-verification"
          content="9acc92bdb6ce864da9bfc1320dc639592e26ed32"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="인코딩" />
        <meta property="og:url" content="http://incoding.co.kr" />
        <meta property="og:image" content="" />
        <meta
          property="og:description"
          content="인코딩은 전문적인 애니메이션 및 모션 그래픽 서비스를 제공하는 리더입니다. 우리는 창의적인 시각효과와 혁신적인 디자인으로 고객의 웹사이트를 돋보이게 합니다. 최신 기술을 활용하여 브랜드의 메시지를 시각적으로 전달하고 사용자의 관심을 끌어낼 수 있습니다."
        />
        <link rel="canonical" href="http://incoding.co.kr" />
        {/* <link rel="shortcut icon" href="" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet"></link>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/packery/2.1.2/packery.pkgd.min.js"
          defer
        ></script>
      </head>
      <body suppressHydrationWarning={true}>
        <AnimatePresence mode="wait" initial={false}>
          {/* {isContactPage ? (
            <>{children}</>
          ) : ( */}
            <LenisProvider ref={lenisRef}>{children}</LenisProvider>
          {/* )} */}
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
      </body>
    </html>
  );
}

// export default RootLayout;
