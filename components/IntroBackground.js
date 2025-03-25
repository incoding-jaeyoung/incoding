/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Image from "next/image";

const IntroBackground = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const inner = document.querySelector(".section_bg-inner");
      if (inner) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        inner.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div css={introBgWrap}>
      <div css={sectionBgInner}>
        <Image
          src="/images/blur_gradient.svg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className="intro-bg__blob"
        style={{
          willChange: "transform",
          transform:
            "translate3d(-4vw, 4vw, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
          transformStyle: "preserve-3d",
          opacity: 0.1,
          position: "absolute",
          top: "-10vh",
          left: "-50vw",
          width: "110vw",
          height: "100%",
          backgroundImage: "url(/images/loader-bg.svg)",
          backgroundRepeat: "no-repeat",
          // backgroundSize: 'cover'
        }}
      />
    </div>
  );
};

const introBgWrap = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
`;

const sectionBgInner = css`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
  transform-style: preserve-3d;
`;

export default IntroBackground;
