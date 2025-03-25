"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/TextAnimation.css"; // CSS 파일

const TextAnimation = () => {
  useEffect(() => {
    setTimeout(() => {
      const n1 = 40; // 첫 번째 트레이의 큐브 개수
      const n2 = 35; // 두 번째 트레이의 큐브 개수

      const rots = [
        { ry: 270, a: 0.5 },
        { ry: 0, a: 0.85 },
        { ry: 90, a: 0.4 },
        { ry: 180, a: 0.0 },
      ];

      const animateTray = (
        traySelector,
        n,
        sizeModifier,
        hueOffset = 0,
        aniSpeed,
      ) => {
        gsap.set(`${traySelector} .textface`, {
          z: 200,
          rotateY: (i) => rots[i % rots.length].ry,
          transformOrigin: "50% 50% -201px",
        });

        for (let i = 0; i < n; i++) {
          let die = document.querySelector(`${traySelector} .die`);
          let textcube = die.querySelector(".textcube");

          if (i > 0) {
            let clone = die.cloneNode(true);
            document.querySelector(`${traySelector}`).append(clone);
            textcube = clone.querySelector(".textcube");
          }

          gsap
            .timeline({
              repeat: -1,
              yoyo: true,
              defaults: { ease: "power3.inOut", duration: 1 },
            })
            .fromTo(
              textcube,
              {
                rotateY: -90,
              },
              {
                rotateY: 90,
                ease: "power1.inOut",
                duration: aniSpeed,
              },
            )
            .fromTo(
              textcube.querySelectorAll(".textface"),
              {
                color: (j) =>
                  `hsl(${(i / n) * 75 + hueOffset}, 67%, ${
                    100 * [rots[3].a, rots[0].a, rots[1].a][j]
                  }%)`,
              },
              {
                color: (j) =>
                  `hsl(${(i / n) * 75 + hueOffset}, 67%, ${
                    100 * [rots[0].a, rots[1].a, rots[2].a][j]
                  }%)`,
              },
              0,
            )
            .to(
              textcube.querySelectorAll(".textface"),
              {
                color: (j) =>
                  `hsl(${(i / n) * 75 + hueOffset}, 67%, ${
                    100 * [rots[1].a, rots[2].a, rots[3].a][j]
                  }%)`,
              },
              1,
            )
            .progress(i / n);
        }

        gsap
          .timeline()
          .from(
            `${traySelector}`,
            {
              yPercent: -3,
              duration: 2,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
            },
            0,
          )
          .fromTo(
            `${traySelector}`,
            { rotate: -15 },
            {
              rotate: 15,
              duration: 4,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
            },
            0,
          )
          .from(
            `${traySelector} .die`,
            {
              duration: 0.01,
              opacity: 0,
              stagger: { each: -0.05, ease: "power1.in" },
            },
            0,
          )
          .to(
            `${traySelector}`,
            {
              scale: sizeModifier,
              duration: 2,
              ease: "power3.inOut",
              yoyo: true,
              repeat: -1,
            },
            0,
          );
      };

      // 첫 번째 트레이 애니메이션 (기본 hue 값)
      animateTray(".tray1", n1, 1, 130, 2);

      // 두 번째 트레이 애니메이션 (다른 hue 값)
      animateTray(".tray2", n2, 1, 240, 3);
    }, 1000); // 1초 딜레이
  }, []);

  return (
    <div className="pov">
      <div className="tray tray1">
        <div className="die">
          <div className="textcube">
            <div className="textface face-01">INTERACTIVE</div>
            <div className="textface face-02">STUDIO</div>
            <div className="textface face-03">INCODING</div>
          </div>
        </div>
      </div>

      {/* 두 번째 트레이 */}
      <div className="tray tray2">
        <div className="die">
          <div className="textcube">
            <div className="textface face-01">CREATIVE</div>
            <div className="textface face-02">DESIGN</div>
            <div className="textface face-03">PROJECTS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAnimation;
