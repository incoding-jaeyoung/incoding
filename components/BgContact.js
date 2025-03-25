"use client";

import React, { useEffect } from "react";
import "../styles/shape.scss"; // CSS 모듈 import

const ShapeAnimation = () => {
  useEffect(() => {
    const shapeCount = 50; // 생성할 도형 개수
    const container = document.querySelector(".shape"); // 도형을 삽입할 컨테이너 선택

    if (container) {
      // 컨테이너가 존재할 경우
      setTimeout(() => {
        let html = ""; // HTML 문자열 초기화
        for (let i = 1; i <= shapeCount; i++) {
          // shapeCount 만큼 반복
          // 각 도형에 고유한 클래스 이름을 부여하여 HTML 문자열 생성
          html += `<div class="shape-container--${i} shape-animation"><div class="random-shape"></div></div>`;
        }
        container.innerHTML = html; // 컨테이너의 innerHTML을 생성한 HTML로 설정
      }, 300); // 0.1초(100밀리초) 후에 실행
    }
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return <div className="shape"> {/* 도형이 삽입될 컨테이너 */}</div>;
};

export default ShapeAnimation; // 컴포넌트를 기본 내보내기로 설정
