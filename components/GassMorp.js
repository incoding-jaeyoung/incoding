"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';

const GassMorp = () => {
  return (
    <div className="area">
      <ul className="circles">
        <li>
          <Image src="/images/img-logo.svg" alt="Logo" width={100} height={100} />
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li>
          <video
            className="background-video"
            src="/media/movie-01.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
            }}
          ></video>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li>
          <video
            className="background-video"
            src="/media/snow.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
            }}
          ></video>
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default GassMorp;
