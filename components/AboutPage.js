"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import useGsapAnimation from "../hooks/gsapTween";
import SvgDraw from "./SvgDraw";
import CubeAnimation from "./CubeAnimation";
import PageTransition from "./PageTransition";
import SvgAnimation from "./SvgAnimation";
import NumberSlide from "./NumberSlide";
import ScrollGrid from "./scrollGrid";
import TextScrollAnimations from "./textScroll";
import BgInk from "./bg-ink";


const AboutPage = () => {
  const router = useRouter();
  const lastSectionRef = useRef(null); // 마지막 섹션
  const pathname = usePathname();
  const textRef = useRef(null);
  const parentDivRef = useRef(null);
  const numberSlideRef = useRef(null);

  const imagesSet1 = [
    "/images/grid/1.jpg",
    "/images/grid/2.jpg",
    "/images/grid/3.jpg",
    "/images/grid/4.jpg",
    "/images/grid/5.jpg",
    "/images/grid/6.jpg",
    "/images/grid/7.jpg",
    "/images/grid/8.jpg",
    "/images/grid/9.jpg",
    "/images/grid/10.jpg",
    "/images/grid/11.jpg",
    "/images/grid/12.jpg",
    "/images/grid/13.jpg",
    "/images/grid/14.jpg",
    "/images/grid/15.jpg",
    "/images/grid/16.jpg",
    "/images/grid/17.jpg",
    "/images/grid/18.jpg",
    "/images/grid/19.jpg",
    "/images/grid/20.jpg",
    "/images/grid/21.jpg",
    "/images/grid/22.jpg",
    "/images/grid/23.jpg",
    "/images/grid/24.jpg",
    "/images/grid/25.jpg",
    "/images/grid/26.jpg",
    "/images/grid/27.jpg",
    "/images/grid/28.jpg",
    "/images/grid/29.jpg",
    "/images/grid/30.jpg",
    "/images/grid/31.jpg",
    "/images/grid/32.jpg",
    "/images/grid/33.jpg",
    "/images/grid/34.jpg",
    "/images/grid/35.jpg",
    "/images/grid/36.jpg",
    "/images/grid/37.jpg",
    "/images/grid/38.jpg",
    "/images/grid/39.jpg",
    "/images/grid/40.jpg",
    "/images/grid/41.jpg",
    "/images/grid/42.jpg",
    "/images/grid/43.jpg",
    "/images/grid/44.jpg",
    "/images/grid/45.jpg",
    "/images/grid/46.jpg",
    "/images/grid/47.jpg",
    "/images/grid/48.jpg",
    "/images/grid/49.jpg",
  ];
  // gsapTween 훅 사용
  useGsapAnimation({
    animations: undefined, // 기본 애니메이션 사용
    triggerClass: ".about-svg", // 필요에 따라 변경
    isTransitionComplete: true, // 필요에 따라 변경
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh(); // 🔥 모든 컴포넌트 로딩 후 한 번만 실행
      }
    }, 2000); // 살짝 여유 시간 줘야 레이아웃이 다 잡힘
  
    return () => clearTimeout(timeout);
  }, []);
  return (
    <PageTransition
      onExitComplete={() => {
        router.push("/portfolio");
      }}
    >
      <TextScrollAnimations />
      <div id="contents" suppressHydrationWarning={true}>
        <div className="section bg-left-pupple section-type-01">
          <div className="section-con sticky-block">
            <h2
                className="content-title section-title gradient-text" 
                data-splitting
                data-effect222
            >
                Stories that <br /> move your heart
            </h2>
            <p
              className="content-title sub-title gradient-text"
              data-splitting
              data-effect22
            >
                작은 감동으로 당신의 마음을 움직이는 이야기
            </p>
            <p
              className="text-center content-title text-content"
              data-splitting
              data-effect22
            >
              차가운 디지털 세상에서도 따뜻한 감성과 진심이 전해질 수 있다고 믿습니다. <br />
              소소한 순간의 작은 감동들이 모여 당신의 마음을 움직이는 특별한 이야기를 만들어 갑니다. <br />
              아름다운 디자인과 사람을 향한 기술이 만나, 사용자의 마음 깊숙이 자리 잡으며 디지털을 넘어 진정한 여운을 남기는 경험을 선물합니다.
            </p>
          </div>
          <SvgDraw />
        </div>
        <div className="bg-white section section-type-02">
          <BgInk/>
          <div className="section-con mix-blend-difference">
             <h2
                className="text-white content-title section-title-sm"
                data-splitting
                data-effect18
              >
              Every Movement <br /> Tells a Story<span className="font-thin">...</span>
            </h2>
            <p
              className="text-white content-title sub-title "
              data-splitting
              data-effect188
            >
                움직임에는 이야기가 담겨 있습니다
            </p>
              <p
                className="text-white content-title text-content"
                data-splitting
                data-effect1888
              >
                  디자인과 인터랙션은 한 편의 이야기처럼 자연스럽게 흐릅니다.<br />
                  사용자의 사소한 시선과 머무는 순간에도 의미를 담아, <br />
                  보이지 않는 흐름 속에서도 특별한 순간을 만들어 갑니다. <br /><br />
                  우리는 단순한 기능을 넘어, 감각적인 교감을 디자인합니다. <br />
                  화면 속에서 자연스럽게 이어지는 작은 변화들이 모여, <br />
                  당신의 마음에 남을 경험을 완성해 갑니다.
                </p>
          </div>
        </div>
        <div className="section section-type-03">
          <SvgAnimation />
          <div className="section-con mix-blend-difference">
            <h2
                className="text-white content-title section-title-sm"
                data-splitting
                data-effect18
            >
                Designing <span className="sub">the</span> Future <span className="sub">with</span> <br /> Technology <span className="sub">and</span> Creativity
                
            </h2>
            <p
              className="text-white content-title sub-title"
              data-splitting
              data-effect188
            >
              기술과 창의성이 조화를 이루어 미래를 설계합니다.
            </p>
            <p
              className="text-center text-white content-title text-content"
              data-splitting
              data-effect188
            >
              창의적인 사고와 혁신적인 기술이 완벽한 조화를 이루어 사용자와 함께 더 나은 미래를 설계합니다. <br />
              끊임없는 창의적 탐구와 기술적 혁신을 통해 사용자가 경험해 보지 못한 가치를 선사합니다.<br />
              작은 아이디어 하나에도 귀 기울이며, 사용자 중심의 섬세한 접근을 통해 의미 있고 지속 가능한 변화를 만들어갑니다.
            </p>
          </div>
        </div>
        
        <div className="section section-black section-type-04" ref={parentDivRef}>
          <CubeAnimation ref={parentDivRef} />
          <div className="section-con">
            <h2
                className="content-title section-title-sm gradient-text"
                data-splitting
                data-effect19
            >
              Exploring Infinite Possibilities
              
            </h2>
            <p
              className="content-title sub-title gradient-text"
              data-splitting
              data-effect17
            >
              무한한 가능성을 탐구하다
            </p>
            <p
              className="text-center text-white content-title text-content"
              data-splitting
              data-effect25
            >
              최신의 프론트엔드 기술로 무한한 가능성을 탐구하며 사용자가 몰입할 수 있는 독특한 경험을 만들어냅니다.  <br />
              감각적이고 직관적인 인터랙션을 통해 디지털 환경에서 보내는 매 순간이 특별하도록 노력합니다.  <br />
              끊임없는 실험과 탐구 정신으로 더 나은 사용자 경험을 위한 끝없는 여정을 이어갑니다.
            </p>
          </div>
        </div>
        
        <div className="relative section section-black number-section section-type-05" >
          <NumberSlide />
          <div className="section-con sticky-block mt-100">
            <h2
                className="text-white content-title section-title-sm "
                data-splitting
                data-effect23
            >
              Design <span className="sub">that</span> Defines Value
            </h2>
            <p
              className="content-title sub-title"
              data-splitting
              data-effect233
            >
                디자인으로 차별화된 가치를 만듭니다 
            </p>
            <p
              className="text-center content-title text-content"
              data-splitting
              data-effect233
            >
              아름답고 세련된 디자인은 사용자와의 첫 만남부터 깊은 인상을 남기며 차별화된 가치를 전달합니다.  <br />
              섬세하게 설계된 디자인을 통해 보는 즐거움과 탁월한 사용성을 동시에 제공합니다.  <br />
              사용자의 작은 행동 하나까지 세심하게 관찰하며 독창적이고 혁신적인 환경을 만들어 나갑니다.
            </p>
          </div>
        </div>
        <div className="section section-black section-type-06">
          <ScrollGrid
            animationType="type3"
            images={imagesSet1}
          />
          <div className="section-con ">
            <h2
                className="text-white content-title section-title-sm "
                data-splitting
                data-effect16
            >
              Turning Ideas <span className="sub">into</span> Reality
            </h2>
            <p
              className="content-title sub-title gradient-text"
              data-splitting
              data-effect16
            >
              한계를 넘어 새로운 가능성을 열어보세요.
            </p>
            <p
              className="text-center content-title text-content"
              data-splitting
              data-effect25
            >
              당신이 꿈꾸는 아이디어와 비전을 현실로 구현하기 위해 창의성과 기술력을 아낌없이 발휘합니다.  <br />
              긴밀한 소통과 깊이 있는 이해를 바탕으로, 당신의 상상을 뛰어넘는 놀라운 결과물을 선사합니다.  <br />
              함께 만들어가는 모든 과정에서 사용자의 열정과 기대감을 현실로 이루어 드립니다.
            </p>
          </div>
        </div>
        <div
          className="section section-bottom"
          ref={lastSectionRef}
        ></div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
