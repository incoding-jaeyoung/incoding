"use client"
import React, { Suspense, useRef} from "react";
import { GlobalCanvas, SmoothScrollbar} from "@14islands/r3f-scroll-rig";
import { Environment } from "@react-three/drei";
import Header from "/components/Header";
import { BodyCopy, Headline, Subtitle } from "./Text";
import { Image } from "./Image";
import { Lens } from "./Lens";
 

import "@14islands/r3f-scroll-rig/css";
export default function App() {
  const eventSource = useRef();
  

  return (
    <div ref={eventSource}>
      <Header />
      <GlobalCanvas
        debug={false}
        scaleMultiplier={0.01}
        eventSource={eventSource}
        eventPrefix="client"
        flat // disable toneMapping since we have editorial images
        camera={{ fov: 14 }}
        style={{ pointerEvents: "none", zIndex: -1}}
      >
        {(globalChildren) => (
          <Lens>
            <Suspense fallback="">
              <Environment files="/lab/LensRefraction/env/empty_warehouse_01_1k.hdr" />
              {globalChildren}
            </Suspense>
          </Lens>
        )}
      </GlobalCanvas>
      <SmoothScrollbar
        enabled={true}
        config={{ syncTouch: true }} // Lenis setting to force smooth scroll on touch devices
      />
      
      <article className="lens-wrapper">
        <header className="container">
          <div className="headerLayout">
            <h2>
              <Headline>
              Lens Refraction Preview
              </Headline>
            </h2>
            <div className="flex flex-col mt-30">
              <BodyCopy as="p">
              실제 렌즈의 굴절 효과를 WebGL로 구현한 인터랙티브 페이지. 
              </BodyCopy>
              <BodyCopy as="p">
              React Three Fiber와 r3f-scroll-rig를 활용하여 스크롤에 반응하며 자연스럽게 움직이는 렌즈 효과.
              </BodyCopy>
            </div>
          </div>
        </header>
        <section className="container">
          <div className="lens-con">
            <Image 
            src="/lab/LensRefraction/images/maxim-berg-1_U2RcHnSjc-unsplash.jpg"
            className="ImageLandscape"
            />
          </div>
        </section>
        <section className="container">
          <div className="flex justify-between gap-50 lens-con">
            <div>
            <Headline as="h3" style={{marginBottom: "20rem"}}>
              사용자의 스크롤 위치에 따라 렌즈는 자연스럽게 등장하고 사라지며,콘텐츠 위를 따라다니며 시선을 유도합니다.
            </Headline>
            <BodyCopy as="p">- React Three Fiber (Three.js를 React로 선언적으로 사용)</BodyCopy>
            <BodyCopy as="p">- @14islands/r3f-scroll-rig (WebGL과 스크롤을 동기화)</BodyCopy>
              <BodyCopy as="p">- gsap/ScrollTrigger (렌즈의 애니메이션 제어)</BodyCopy>
            </div>
            <div className="flex overflow-hidden rounded-20">
              <Image 
              src="/lab/LensRefraction/images/img-01.png"
                className="image-landing"
                style={{ borderRadius: "20rem" }}
                />
            </div>
          </div>
        </section>
        <section className="container">
          <div className="flex justify-between gap-50 lens-con">
            <div className="flex overflow-hidden rounded-20">
              <Image 
              src="/lab/LensRefraction/images/img-02.png"
                className="image-landing"
                style={{ borderRadius: "20rem" }}
                />
            </div>
            <div>
            <Headline as="h3" className="mb-20">
            이 효과는 포트폴리오 사이트, 브랜드 소개 페이지, 캠페인 랜딩 등에서 방문자의 주목을 끌기에 적합합니다.단순한 이미지나 텍스트보다 강력한 인상을 전달할 수 있습니다.
            </Headline>
            <BodyCopy as="p">- React Three Fiber (Three.js를 React로 선언적으로 사용)</BodyCopy>
            <BodyCopy as="p">- @14islands/r3f-scroll-rig (WebGL과 스크롤을 동기화)</BodyCopy>
              <BodyCopy as="p">- gsap/ScrollTrigger (렌즈의 애니메이션 제어)</BodyCopy>
            </div>
            
          </div>
        </section>
      </article>
      
    </div>
  );
}
