"use client";

export const initializeBgAnimation = (interBubbleRef) => {
  const curPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const targetPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  const setRootStyles = () => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    root.style.setProperty("--color-bg1", "rgb(8, 10, 15)");
    root.style.setProperty("--color-bg2", "rgb(0, 17, 32)");
    root.style.setProperty("--color1", "18, 113, 255");
    root.style.setProperty("--color2", "107, 74, 255");
    root.style.setProperty("--color3", "100, 100, 255");
    root.style.setProperty("--color4", "50, 160, 220");
    root.style.setProperty("--color5", "80, 47, 122");
    root.style.setProperty("--color-interactive", "140, 100, 255");
    root.style.setProperty("--circle-size", "80%");
    root.style.setProperty("--blending", "hard-light");
  };

  const handleMouseMove = (event) => {
    if (!interBubbleRef || !interBubbleRef.current) {
      console.error("interBubbleRef is not initialized.");
      return;
    }
    targetPosition.x = event.clientX;
    targetPosition.y = event.clientY;
  };

  const move = () => {
    const interBubble = interBubbleRef?.current;
    if (!interBubble) {
      console.error("Interactive bubble element not found.");
      return;
    }

    curPosition.x += (targetPosition.x - curPosition.x) / 20;
    curPosition.y += (targetPosition.y - curPosition.y) / 20;

    interBubble.style.transform = `translate(${Math.round(
      curPosition.x,
    )}px, ${Math.round(curPosition.y)}px)`;

    requestAnimationFrame(move);
  };

  // 초기화
  setRootStyles();

  // interBubbleRef 체크
  if (!interBubbleRef || !interBubbleRef.current) {
    console.error(
      "interBubbleRef is not initialized or the element is not rendered.",
    );
    return;
  }

  window.addEventListener("mousemove", handleMouseMove);
  move();

  // 클린업 함수 반환
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
};
