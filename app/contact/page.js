"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../../components/PageTransition";
import BgContact from "../../components/BgContact";

const ContactPage = () => {
  return (
    <PageTransition disableScroll={true}>
      <div id="contents">
        <div className="relative flex flex-col items-center justify-center section ">
          <div className="section-con">
            <div className="logo-bg">
              <BgContact />
            </div>
            <div className="contact">
              <div className="slogan">
                <div className="logo-block">
                  <p className="logo">
                    <svg
                      viewBox="0 0 150 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="35" height="150" fill="black" />
                      <path d="M35 0L150 0V115L35 0Z" fill="black" />
                      <path d="M130 150L70 150L70 90L130 150Z" fill="black" />
                    </svg>
                  </p>
                  <p>incoding</p>
                </div>
                <dl>
                  <dd>
                    생동감 넘치는 인터랙션과 감각적인 애니메이션으로 특별한
                    경험을 제공합니다. <br /> 최신 기술과 창의적 접근으로 브랜드
                    스토리를 효과적으로 전달하고, 차별화된 디지털 경험을
                    만들어갑니다.
                  </dd>
                </dl>
              </div>
              <dl className="contact-info">
                <dt>Contact us</dt>
                <dd>contact@incoding.co.kr</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
