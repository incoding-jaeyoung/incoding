"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "../styles/cursor.css";

const CustomCursor = () => {
  const pathname = usePathname(); // 현재 경로를 가져옴

  // 터치 디바이스 체크 함수 추가
  const isTouchDevice = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  useEffect(() => {
    // 터치 디바이스면 커서 숨기고 실행하지 않음
    if (isTouchDevice()) {
      const cursor = document.getElementById("custom-cursor");
      if (cursor) {
        cursor.style.display = "none";
      }
      return;
    }

    const cursor = document.getElementById("custom-cursor");
    let isCursorActive = false;

    const addHoverEffect = () => cursor.classList.add("hover");
    const removeHoverEffect = () => cursor.classList.remove("hover");

    const moveCursor = (e) => {
      if (!isCursorActive) return;

      // 커서 크기를 매번 동적으로 계산
      const cursorWidth = cursor.offsetWidth / 2;
      const cursorHeight = cursor.offsetHeight / 2;

      // 마우스 위치에 커서 중심을 맞춤
      cursor.style.left = `${e.clientX - cursorWidth}px`;
      cursor.style.top = `${e.clientY - cursorHeight}px`;
    };

    const activateCursor = () => {
      // if (pathname !== '/') return; // 경로가 '/'인 경우 활성화하지 않음
      cursor.classList.remove("active");
      isCursorActive = true;
      document.body.style.cursor = "none"; // 기본 커서를 숨김
      document.addEventListener("mousemove", moveCursor);
    };
    const deactivateCursor = () => {
      cursor.classList.add("active"); // active 클래스 추가
      isCursorActive = false;
      document.removeEventListener("mousemove", moveCursor); // 커서 이동 비활성화
    };
    const registerEvents = () => {
      const links = document.querySelectorAll("a");
      const buttons = document.querySelectorAll("button");

      links.forEach((link) => {
        link.addEventListener("mouseover", addHoverEffect);
        link.addEventListener("mouseout", removeHoverEffect);
        link.addEventListener("click", removeHoverEffect);
      });

      buttons.forEach((button) => {
        button.addEventListener("mouseover", addHoverEffect);
        button.addEventListener("mouseout", removeHoverEffect);
        // button.addEventListener('click', removeHoverEffect);
      });
    };

    // 초기 활성화 상태 설정
    if (pathname === "/") {
      deactivateCursor();
      cursor.addEventListener("mouseover", activateCursor);
    } else {
      activateCursor(); // 경로가 '/'가 아니면 커서를 활성화
    }
    // cursor.classList.add('active');

    registerEvents();

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cursor.removeEventListener("mouseover", activateCursor);

      const links = document.querySelectorAll("a");
      const buttons = document.querySelectorAll("button");

      links.forEach((link) => {
        link.removeEventListener("mouseover", addHoverEffect);
        link.removeEventListener("mouseout", removeHoverEffect);
        link.removeEventListener("click", removeHoverEffect);
      });

      buttons.forEach((button) => {
        button.removeEventListener("mouseover", addHoverEffect);
        button.removeEventListener("mouseout", removeHoverEffect);
        // button.removeEventListener('click', removeHoverEffect);
      });
    };
  }, [pathname]); // 경로가 변경될 때마다 호출

  // 터치 디바이스면 커서 요소를 렌더링하지 않음
  if (typeof window !== 'undefined' && isTouchDevice()) {
    return null;
  }

  return <div id="custom-cursor" className="cursor"></div>;
};

export default CustomCursor;
