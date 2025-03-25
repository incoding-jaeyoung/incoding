"use client";

import React from "react"; // React 임포트 추가
import { useEffect, useRef, useState } from "react";
import CustomImage from "./CustomImage";
import imagesLoaded from "imagesloaded";
import Isotope from "isotope-layout";
import "isotope-packery"; // Packery 레이아웃 추가
import "lazysizes"; // lazysizes 로드
import "lazysizes/plugins/parent-fit/ls.parent-fit"; // 부모 크기에 맞춤
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IsotopeComponent = () => {
  const gridRef = useRef(null); // Grid DOM 참조
  const gridWrapRef = useRef(null); // grid-wrap 참조
  const gridHeaderRef = useRef(null); // grid-header 참조
  const [isotope, setIsotope] = useState(null); // Isotope 인스턴스 저장
  const [filterKey, setFilterKey] = useState("*"); // 현재 필터 키
  const [activeButtonIndex, setActiveButtonIndex] = useState(0); // 활성화된 버튼 인덱스 저장

  // Isotope 초기화
  useEffect(() => {
    setTimeout(() => {
    imagesLoaded(gridRef.current, () => {
      setIsotope(
        new Isotope(gridRef.current, {
          itemSelector: ".grid-item",
          layoutMode: "packery",
          packery: {
            gutter: 0,
            columnWidth: ".grid-sizer",
            },
            percentPosition: true,
          }),
        );
      });
    }, 500);

    return () => {
      if (isotope) {
        isotope.destroy(); // 컴포넌트 언마운트 시 정리
      }
    };
  }, []);

  // 필터 키 변경 시 Isotope에 필터 적용
  useEffect(() => {
    if (isotope) {
      isotope.arrange({ filter: filterKey });
      isotope.on("arrangeComplete", () => {
        ScrollTrigger.refresh();
        scrollToGrid(); // 스크롤탑 실행
      });
    }
  }, [filterKey, isotope]);

  // ScrollTrigger 설정
  useEffect(() => {
    setTimeout(() => {
      if (gridWrapRef.current && gridHeaderRef.current) {
        ScrollTrigger.create({
          trigger: gridWrapRef.current,
          start: "top top", // grid-wrap이 화면 상단에 닿을 때
          end: "bottom top", // grid-wrap이 화면 아래로 나갈 때
          onEnter: () => gridHeaderRef.current.classList.add("active"),
          onLeaveBack: () => gridHeaderRef.current.classList.remove("active"),
        });
      }
    }, 400);
    // ScrollTrigger 정리
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 스크롤탑 함수
  const scrollToGrid = () => {
    if (gridWrapRef.current) {
      gridWrapRef.current.scrollIntoView({
        behavior: "smooth", // 부드러운 스크롤
        block: "start", // 맨 위로 스크롤
      });
    }
  };

  // 필터 버튼 클릭 핸들러
  const handleFilterClick = (key, index) => {
    setFilterKey(key);
    setTimeout(() => {}, 300);
    setActiveButtonIndex(index); // 클릭한 버튼의 인덱스를 활성화
  };
  const filterButtons = [
    { label: "Show All", key: "*" },
    { label: "Responsive", key: ".a" },
    { label: "PC", key: ".b" },
    { label: "Mobile", key: ".c" },
    { label: "Etc", key: ".d" },
  ];

  return (
    <div ref={gridWrapRef} className="text-white project-wrap">
      {/* 필터 버튼 */}
      <div ref={gridHeaderRef} className="grid-header">
        <div className="grid-title">Previous Project</div>
        <div className="filters">
          {filterButtons.map((button, index) => (
            <React.Fragment key={index}>
              <button
                key={index}
                className={activeButtonIndex === index ? "active" : ""}
                onClick={() => handleFilterClick(button.key, index)}
              >
                {button.label}
              </button>
              {index < filterButtons.length - 1 && <span>/</span>}{" "}
              {/* 마지막 버튼 뒤에는 추가하지 않음 */}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* 그리드 */}
      <div ref={gridRef} className="grid">
        <div className="grid-sizer"></div>
        <div className="grid-item b wide">
          <img src="/images/portfolioN/a1.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a23.jpg" alt="" />
        </div>
        <div className="grid-item a wide2">
          <img src="/images/portfolioN/a71.jpg" alt="" />
        </div>
        <div className="grid-item a wide2">
          <img src="/images/portfolioN/a47.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a3.jpg" alt="" />
        </div>
        <div className="grid-item d">
          <img src="/images/portfolioN/a4.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a5.jpg" alt="" />
        </div>

        <div className="grid-item b">
          <img src="/images/portfolioN/a6.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a7.jpg" alt="" />
        </div>

        <div className="grid-item c">
          <img src="/images/portfolioN/a8.jpg" alt="" />
        </div>
        <div className="grid-item c wide1">
          <img src="/images/portfolioN/a57.jpg" alt="" />
        </div>
        <div className="grid-item b">
          <img src="/images/portfolioN/a9.jpg" alt="" />
        </div>
        <div className="grid-item b wide">
          <img src="/images/portfolioN/a10.jpg" alt="" />
        </div>
        <div className="grid-item b wide">
          <img src="/images/portfolioN/a11.jpg" alt="" />
        </div>
        <div className="grid-item b">
          <img src="/images/portfolioN/a12.jpg" alt="" />
        </div>
        <div className="grid-item b wide">
          <img src="/images/portfolioN/a13.jpg" alt="" />
        </div>
        <div className="grid-item b wide">
          <img src="/images/portfolioN/a14.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a15.jpg" alt="" />
        </div>
        <div className="grid-item b wide2">
          <img src="/images/portfolioN/a16.jpg" alt="" />
        </div>
        <div className="grid-item b wide">
          <img src="/images/portfolioN/a21.jpg" alt="" />
        </div>
        <div className="grid-item b">
          <img src="/images/portfolioN/a17.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a33.jpg" alt="" />
        </div>
        <div className="grid-item b">
          <img src="/images/portfolioN/a18.jpg" alt="" />
        </div>
        <div className="grid-item b">
          <img src="/images/portfolioN/a19.jpg" alt="" />
        </div>
        <div className="grid-item b">
          <img src="/images/portfolioN/a20.jpg" alt="" />
        </div>

        <div className="grid-item c">
          <img src="/images/portfolioN/a22.jpg" alt="" />
        </div>

        <div className="grid-item c wide">
          <img src="/images/portfolioN/a24.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a25.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a26.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a27.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a28.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a29.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a30.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a31.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a32.jpg" alt="" />
        </div>

        <div className="grid-item c">
          <img src="/images/portfolioN/a34.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a35.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a36.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a37.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a38.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a39.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a41.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a42.jpg" alt="" />
        </div>
        <div className="grid-item c wide2">
          <img src="/images/portfolioN/a43.jpg" alt="" />
        </div>
        <div className="grid-item c wide2">
          <img src="/images/portfolioN/a64.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a44.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a45.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a46.jpg" alt="" />
        </div>

        <div className="grid-item c wide">
          <img src="/images/portfolioN/a48.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a49.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a73.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a75.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a50.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a51.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a52.jpg" alt="" />
        </div>

        <div className="grid-item c wide">
          <img src="/images/portfolioN/a67.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a53.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a54.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a55.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a74.jpg" alt="" />
        </div>

        <div className="grid-item c">
          <img src="/images/portfolioN/a56.jpg" alt="" />
        </div>

        <div className="grid-item c">
          <img src="/images/portfolioN/a58.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a59.jpg" alt="" />
        </div>
        <div className="grid-item c wide">
          <img src="/images/portfolioN/a60.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a61.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a62.jpg" alt="" />
        </div>

        <div className="grid-item c">
          <img src="/images/portfolioN/a63.jpg" alt="" />
        </div>

        <div className="grid-item c wide">
          <img src="/images/portfolioN/a66.jpg" alt="" />
        </div>

        <div className="grid-item c wide">
          <img src="/images/portfolioN/a68.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a69.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a70.jpg" alt="" />
        </div>
        <div className="grid-item b">
          <img src="/images/portfolioN/a2.jpg" alt="" />
        </div>
        <div className="grid-item c">
          <img src="/images/portfolioN/a72.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default IsotopeComponent;
