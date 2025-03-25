"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
const SvgBlock = () => {
  const elConRef = useRef(null);
  const videoRef = useRef(null);
  const videoLayerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const setupVideoScrollTrigger = () => {
          if (videoLayerRef.current) {
            let playPromise;

            ScrollTrigger.create({
              trigger: videoRef.current.parentNode.parentNode,
              start: "top+=50% bottom",
              end: "bottom-=100 top",
              invalidateOnRefresh: true,

              onEnter: () => {
                if (videoLayerRef.current) {
                  playPromise = videoLayerRef.current.play();
                  // play() 프로미스 처리
                  if (playPromise !== undefined) {
                    playPromise.catch(error => {
                      console.log("Video play error:", error);
                    });
                  }
                }
              },
              onLeave: () => {
                if (videoLayerRef.current) {
                  // play 프로미스가 완료된 후에만 pause 실행
                  if (playPromise !== undefined) {
                    playPromise.then(() => {
                      videoLayerRef.current.pause();
                    }).catch(error => {
                      console.log("Video pause error:", error);
                    });
                  }
                }
              },
              onEnterBack: () => {
                if (videoLayerRef.current) {
                  playPromise = videoLayerRef.current.play();
                  if (playPromise !== undefined) {
                    playPromise.catch(error => {
                      console.log("Video play error:", error);
                    });
                  }
                }
              },
              onLeaveBack: () => {
                if (videoLayerRef.current) {
                  if (playPromise !== undefined) {
                    playPromise.then(() => {
                      videoLayerRef.current.pause();
                    }).catch(error => {
                      console.log("Video pause error:", error);
                    });
                  }
                }
              },
            });
          }
        };
        // 타임라인 생성
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: elConRef.current.parentNode.parentNode,
            start: "top top",
            end: "bottom+=300% bottom",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,

          },
          onStart: () => setupVideoScrollTrigger(),
        });

        // will-change 속성 추가
        document.querySelectorAll('.svg-bg, .svg-bg-back, .sub').forEach(el => {
          el.style.willChange = 'transform, opacity';
        });

        // 타임라인에 애니메이션 추가
        tl
          .to(
            ".el-con",
            {
              // rotateZ: "15",
            }, "back")
          .to(
            ".svg-bg",
            {
              margin:"0",
              opacity: 1,
              position: "static",
            },
            "back"
          )
          .to(
            ".svg-bg-back",
            {
              margin:"0",
              opacity: 1,
              position: "static",
            },
            "back"
          )
           
          .to(
            ".sub-01, .sub-02,.sub-03,.sub-04,.sub-05",
            {
              opacity: 1,
              ease: "power2.out",
            },
            "back"
          )
          .to(
            ".sub-00",
            {
              fill: "#fff",
            },
            "back"
          )
          .to(
            ".svg-bg",
            {
              rotateZ: "60",
              x: "-20%",
              scale: 1.5,
              ease: "power2.in",
            },
            "back"
          )
          .to(
            ".svg-bg-back",
            {
              opacity: 0,
              duration: 0.5,
              ease: "none",
            },
            "rotate"
          )
          .to(
            ".sub-00",
            { rotateZ: 0, x: "-10%", ease: "none"},
            "rotate"
          )
          .to(
            ".sub-01",
            { rotateZ: 10, x: "-5%", ease: "none", fill: "url(#myGradient)" },
            "rotate"
          )
          .to(".sub-02", { rotateZ: 20, ease: "none" }, "rotate")
          .to(".sub-03", { rotateZ: 30, ease: "none" }, "rotate")
          .to(".sub-04", { rotateZ: 40, ease: "none" }, "rotate")
          .to(".sub-05", { rotateZ: 50, ease: "none" }, "rotate")
          .to(
            ".svg-bg",
            {
              rotateZ: "90",
              x: "-20%",
              scale: 4.5,
            },
            "scale"
          )
          .to(
            ".sub-00",
            {
              rotateZ: -90,
              y: "100%",
              ease: "none",
            },
            "scale"
          )
          .to(
            "#myGradient stop:nth-child(1)",
            {
              stopColor: "#433D8B",
            },
            "scale"
          )
          .to(
            "#myGradient stop:nth-child(2)",
            {
              stopColor: "#07011c",
            },
            "scale"
          )
          .to(
            ".grid-bg",
            {
              opacity: 0.35,
              duration: 0.05,
            },
            "-=0.3"
          );
      });

      return () => ctx.revert(); // 컴포넌트 언마운트 시 ScrollTrigger 정리
    }, 800); // 1초 지연
    return () => clearTimeout(timer); // 타이머 정리
  }, [pathname]);

  return (
    <div className="svg-animation-bg fixed-block" ref={videoRef}>
      <div className="el-con" ref={elConRef}>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg-back"
          >
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className=""
              stroke="#F5EFFF"
            />
          </svg>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg-back"
          >
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className=""
              stroke="#E5D9F2"
            />
          </svg>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg-back"
          >
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className=""
              stroke="#CDC1FF"
            />
          </svg>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg-back"
          >
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className=""
              stroke="#A294F9"
            />
          </svg>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg"
          >
            <defs>
              <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#07011c" />
                <stop offset="50%" stopColor="#07011c" />
              </linearGradient>
            </defs>
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className="sub sub-05"
            />
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className="sub sub-04"
              stroke="#888"
            />
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className="sub sub-03"
              stroke="#888"
            />
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className="sub sub-02"
              stroke="#888"
            />
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className="sub sub-01"
              stroke="#888"
            />
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className="sub-00"
              fill="#fff"
              stroke="url(#gradient-01)"
            />
          </svg>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg-back"
          >
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className=""
              stroke="#15B392"
            />
          </svg>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg-back"
          >
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className=""
              stroke="#54C392"
            />
          </svg>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg-back"
          >
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className=""
              stroke="#73EC8B"
            />
          </svg>
          <svg
            viewBox="0 0 100 260"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-bg-back"
          >
            <rect
              x="00"
              y="0"
              width="100"
              height="260"
              rx="50"
              strokeWidth="0.5"
              className=""
              stroke="#D2FF72"
            />
          </svg>
      </div>
      <div className="grid-bg">
        <video 
          ref={videoLayerRef} 
          width="100%" 
          height="100%" 
          loop 
          muted
          playsInline // 모바일 지원을 위해 추가
          preload="auto" // 미리 로딩
        >
          <source src="/media/bg-grid-01.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default SvgBlock;
