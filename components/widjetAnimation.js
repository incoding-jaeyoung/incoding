"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const widjetAnimation = () => {
  useEffect(() => {
    setTimeout(() => {
      const iphone = document.querySelector(".iphone");
      const widgets = document.querySelectorAll(".widgets");

      if (!iphone || widgets.length === 0) {
        console.error("필요한 요소를 찾을 수 없습니다.");
        return;
      }

      gsap.set(iphone, { x: -450 });
      gsap.set(widgets, { opacity: 0, scale: 0 });

      function iPhoneAnimation() {
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.to(iphone, { x: 0 })
          .to(iphone, { rotation: 0, scale: 0.9 })
          .to(iphone, { duration: 3, scale: 1 });
        return tl;
      }

      function widgetAnimation() {
        const tl = gsap.timeline();
        tl.to(widgets, { duration: 0, opacity: 1 });
        return tl;
      }

      const animations = [
        {
          selector: "#app-store",
          duration: 3,
          scale: 0.9,
          x: "550rem",
          y: "100rem",
          ease: "Power4.easeOut",
        },
        {
          selector: "#screen-time",
          duration: 3,
          scale: 0.9,
          x: "-500rem",
          y: "-300rem",
          ease: "Power2.easeOut",
        },
        {
          selector: "#weather",
          duration: 3,
          scale: 1.1,
          x: "-400rem",
          y: " 350rem",
          ease: "Power4.easeOut",
        },
        {
          selector: "#stocks",
          duration: 3,
          scale: 0.9,
          x: " 530rem",
          y: "-170rem",
          ease: "Power4.easeOut",
        },
        {
          selector: "#fitness",
          duration: 3,
          scale: 1.1,
          x: "-350rem",
          y: "-100rem",
          ease: "Power2.easeOut",
        },
        {
          selector: "#find-my",
          duration: 3,
          scale: 1.1,
          x: " 400rem",
          y: "-360rem",
          ease: "Power4.easeOut",
        },
        {
          selector: "#calendar",
          duration: 3,
          scale: 0.9,
          x: "-630rem",
          y: 0,
          ease: "Power2.easeOut",
        },

        {
          selector: "#wallet",
          duration: 3,
          scale: 1,
          x: "-280rem",
          y: " 100rem",
          ease: "Power4.easeOut",
        },
        {
          selector: "#apple-tv",
          duration: 3,
          scale: 1,
          x: "400rem",
          y: "300rem",
          ease: "Power4.easeOut",
        },
        {
          selector: "#sleep",
          duration: 3,
          scale: 0.9,
          x: "270rem",
          y: "-50rem",
          ease: "Power2.easeOut",
        },
      ];
      const startTime = 2;
      const masterTimeline = gsap.timeline();
      masterTimeline.add(iPhoneAnimation()).add(widgetAnimation(), startTime);

      animations.forEach((animation, index) => {
        const { selector, duration, scale, x, y, ease } = animation;
        const element = document.querySelector(selector);
        masterTimeline.add(
          gsap.to(element, { duration, scale, x, y, ease }),
          startTime + (index % 3) / 2,
        );
      });

      ScrollTrigger.create({
        animation: masterTimeline,
        trigger: ".widjet",
        scrub: 1,
        start: "top top",
        end: "bottom+=300% top",
        // pin: true,
        // markers: true
      });
    }, 700); // 0.6초 지연
  }, []);

  return (
    <section className="widjet">
      <img
        className="iphone"
        src="/images/img-phone.png"
        // src="https://assets.codepen.io/8292695/iphone-14.svg"
        alt="iPhone"
      />
      <img
        id="app-store"
        className="widgets"
        src="/images/img-node.png"
        alt="App Store Widget"
      />
      <img
        id="screen-time"
        className="widgets"
        src="/images/img-jquery.png"
        alt="Screen Time Widget"
      />
      <img
        id="weather"
        className="widgets"
        src="/images/img-vs.png"
        alt="Weather Widget"
      />
      <img
        id="stocks"
        className="widgets"
        src="/images/img-php.png"
        alt="Stocks Widget"
      />
      <img
        id="calendar"
        className="widgets"
        src="/images/img-react.png"
        alt="Calendar Widget"
      />
      <img
        id="fitness"
        className="widgets"
        src="/images/img-boot.png"
        alt="Fitness Widget"
      />
      <img
        id="find-my"
        className="widgets"
        src="/images/img-java.png"
        alt="Find My Widget"
      />
      <img
        id="sleep"
        className="widgets"
        src="/images/img-figma.png"
        alt="Sleep Widget"
      />
      <img
        id="apple-tv"
        className="widgets"
        src="/images/img-gsap.png"
        alt="Apple TV Widget"
      />
      <img
        id="wallet"
        className="widgets"
        src="/images/img-vue.png"
        alt="Wallet Widget"
      />
    </section>
  );
};

export default widjetAnimation;
