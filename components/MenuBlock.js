"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  Engine,
  Render,
  Runner,
  Bodies,
  World,
  Events,
  Vertices,
  Body,
  Mouse,
  MouseConstraint,
} from "matter-js";
import styles from "../styles/Menu.module.css";
import classNames from "classnames";
import Link from "next/link";

// 컴포넌트 최상단에 deviceSettings 정의
const deviceSettings = {
  mobile: {
    sizes: {
      min: 30,
      max: 50
    },
    count: 40
  },
  desktop: {
    sizes: {
      min: 30,
      max: 120
    },
    count: 80
  }
};

const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [menuText, setMenuText] = useState("");
  const menuBlockRef = useRef(null);
  const menuItemsRef = useRef([]);
  const engineRef = useRef(null);
  const bodiesRef = useRef([]);
  const rectRef = useRef(null); // rect SVG 도형 참조
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // window 체크를 useEffect 안으로 이동
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobileView(checkMobile());

    const handleResize = () => {
      setIsMobileView(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // isMobile 함수 대신 state 사용
  const getDeviceSettings = () => {
    return isMobileView ? deviceSettings.mobile : deviceSettings.desktop;
  };

  useEffect(() => {
    if (!rectRef.current) return;

    const rect = rectRef.current;
    const rectLength = rect.getTotalLength();

    gsap.set(rect, {
      strokeDasharray: rectLength,
      strokeDashoffset: rectLength,
    });
    const timeoutId = setTimeout(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(rect, {
            strokeDashoffset: rectLength * (1 - self.progress),
            duration: 0.1,
          });
        },
      });

      // Refresh ScrollTrigger after setting
      ScrollTrigger.refresh();
    }, 1200); // 1초 지연

    return () => {
      clearTimeout(timeoutId); // 타이머 정리
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  const [isMenuActive, setMenuActive] = useState(false);

  useEffect(() => {
    // 메인 페이지에서는 active 클래스를 제거
    if (pathname === "/") {
      setMenuActive(false);
    } else {
      // 다른 페이지에서는 active 클래스를 추가
      setMenuActive(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname) {
      switch (pathname) {
        case "/":
          setMenuText("Intro");
          break;
        case "/about":
          setMenuText("About Us");
          break;
        case "/portfolio":
          setMenuText("Our Projects");
          break;
        case "/contact":
          setMenuText("Contact Us");
          break;
        default:
          setMenuText("");
          break;
      }
    }
  }, [pathname]);

  // Matter.js 엔진 초기화
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    world.gravity.y = 1.5; // 중력 설정

    // Matter.js 렌더링 설정
    const render = Render.create({
      element: menuBlockRef.current,
      engine: engineRef.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });
    engineRef.current.render = render; // 렌더링 객체를 엔진에 저장
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // 바닥 추가
    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 25,
      window.innerWidth,
      50,
      {
        isStatic: true,
        restitution: 0.8,
        render: { fillStyle: "rgba(255, 255, 255, 1)" },
      },
    );
    World.add(world, ground);

    // 5. 좌우 벽 생성
    const leftWall = Bodies.rectangle(
      -25,
      window.innerHeight / 2,
      50,
      window.innerHeight * 2,
      {
        isStatic: true,
        restitution: 0.8, // 반발 계수 추가
        render: { fillStyle: "rgba(0, 0, 0, 1)" },
      },
    );

    const rightWall = Bodies.rectangle(
      window.innerWidth + 25,
      window.innerHeight / 2,
      50,
      window.innerHeight * 2,
      {
        isStatic: true,
        restitution: 0.8, // 반발 계수 추가
        render: { fillStyle: "rgba(0, 0, 0, 1)" },
      },
    );
    // 상단 벽 추가
    const topWall = Bodies.rectangle(
      window.innerWidth / 2 - 100,
      window.innerHeight / 2 - 115,
      285,
      50,
      {
        isStatic: true,
        restitution: 0.9, // 반발 계수 설정
        render: { fillStyle: "rgba(255, 255, 255, 0)" }, // 투명 벽
      },
    );
    const angle = Math.PI / -12; // 30도 회전 (라디안 값 사용)
    Body.rotate(topWall, angle);
    // 상단 벽 추가
    const topWall2 = Bodies.rectangle(
      window.innerWidth / 2 + 105,
      window.innerHeight / 2 - 90,
      290,
      50,
      {
        isStatic: true,
        restitution: 0.9, // 반발 계수 설정
        render: { fillStyle: "rgba(255, 255, 255,0)" }, // 투명 벽
      },
    );
    const angle2 = Math.PI / -12; // 30도 회전 (라디안 값 사용)
    Body.rotate(topWall2, angle2);
    if (isMobileView) {
      World.add(world, [leftWall, rightWall]); // 모바일에서는 좌우 벽만 추가
    } else {
      World.add(world, [leftWall, rightWall, topWall, topWall2]); // PC에서는 모든 벽 추가
    }

    // 충돌 감지
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      pairs.forEach(({ bodyA, bodyB }) => {
        const index = bodiesRef.current.indexOf(bodyA);
        if (index !== -1) {
          const domElement = menuItemsRef.current[index];

          if (domElement && bodyB === ground) {
            // 바닥 충돌 시 위치 고정
            domElement.style.transition = "transform 0.2s ease";
            domElement.style.transform = `translate(${bodyA.position.x}px, ${window.innerHeight - 50}px)`;
          } else if (bodyB === leftWall || bodyB === rightWall) {
            // 벽 충돌 시 반발 처리
            Body.setVelocity(bodyA, {
              x: -bodyA.velocity.x,
              y: bodyA.velocity.y,
            });
          }
          if (bodyA.label === "object" || bodyB.label === "object") {
            // 속도 제한
            Body.setVelocity(bodyA, {
              x: Math.min(bodyA.velocity.x, 1), // 최대 속도를 5로 제한
              y: Math.min(bodyA.velocity.y, 1),
            });
          }
        }
      });
    });

    // DOM과 물리 객체 동기화
    const syncDomWithPhysics = () => {
      bodiesRef.current.forEach((body, index) => {
        const domElement = menuItemsRef.current[index];
        if (domElement) {
          const { x, y } = body.position;
          const rect = domElement.getBoundingClientRect();
          const angle = body.angle; // 물리 객체의 회전 각도

          // DOM 요소의 위치와 회전 동기화
          domElement.style.position = "absolute";
          domElement.style.transform = `
            translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)
            rotate(${angle}rad)
          `;
        }
      });
      requestAnimationFrame(syncDomWithPhysics);
    };
    syncDomWithPhysics();

    // 마우스 움직임 이벤트 리스너 설정
    const renderCanvas = render.canvas;
    const handleMouseMove = (event) => {
      const mousePosition = { x: event.clientX, y: event.clientY };

      // 마우스와 가까운 오브젝트에 힘을 가함
      shapesRef.current.forEach((shape) => {
        const distanceX = mousePosition.x - shape.position.x;
        const distanceY = mousePosition.y - shape.position.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 100) { // 100px 이하로 가까운 오브젝트만 반응
          const forceMagnitude = 0.0008; // 힘의 크기 조절
          Body.applyForce(shape, shape.position, {
            x: -forceMagnitude * distanceX,
            y: -forceMagnitude * distanceY,
          });
        }
      });
    };

    if (renderCanvas) {
      renderCanvas.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      if (renderCanvas) {
        renderCanvas.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isMobileView]);

  const shapesRef = useRef([]);
  const shapeCountRef = useRef(0); // 도형 개수를 추적하는 useRef 변수
  const maxShapes = 100; // 최대 도형 개수
  let shapeTimer = null;

  // addShapesSequentially 함수 내부의 getWeightedRandomSize 함수 수정
  const addShapesSequentially = (count, interval = 500) => {
    if (shapeTimer) {
      clearTimeout(shapeTimer);
    }

    let currentCount = 0;

    const addNextShape = () => {
      if (currentCount >= count || shapeCountRef.current >= maxShapes) {
        return;
      }

      const padding = 0;
      const x = Math.random() * (window.innerWidth - padding * 2) + padding;
      const y = Math.random() * -100 - 50;

      // getWeightedRandomSize 함수 수정
      const getWeightedRandomSize = () => {
        const settings = getDeviceSettings();
        const { min, max } = settings.sizes;
        const randomFactor = Math.random() ** 2;
        return Math.round(randomFactor * (max - min) + min);
      };

      const size = getWeightedRandomSize();
      const shapes = [
        "circle",
        "rectangle",
        "polygon",
        "triangle",
        "hexagon",
        "star",
      ]; // ,"logo"
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      let shape;

      if (shapeType === "circle") {
        shape = Bodies.circle(x, y, size / 2, {
          restitution: 0.8,
          render: {
            fillStyle: "transparent",
            lineWidth: 2,
            strokeStyle: "#fff",
          },
        });
      } else if (shapeType === "rectangle") {
        shape = Bodies.rectangle(x, y, size, size, {
          restitution: 0.8,
          chamfer: { radius: 10 },
          render: {
            fillStyle: "transparent",
            lineWidth: 2,
            strokeStyle: "#fff",
          },
        });
      } else if (shapeType === "polygon") {
        const polygonSize = isMobileView ? size / 3 : size / 2; // 모바일에서는 더 작게
        shape = Bodies.polygon(x, y, 5, polygonSize, {
          restitution: 0.8,
          chamfer: { radius: isMobileView ? 5 : 10 }, // 모바일에서는 더 작은 radius
          render: {
            fillStyle: "transparent",
            lineWidth: 2,
            strokeStyle: "#fff",
          },
        });
      } else if (shapeType === "triangle") {
        shape = Bodies.polygon(x, y, 3, size / 2, {
          restitution: 0.8,
          chamfer: { radius: 5 },
          render: {
            fillStyle: "transparent",
            lineWidth: 2,
            strokeStyle: "#fff",
          },
        });
      } else if (shapeType === "hexagon") {
        shape = Bodies.polygon(x, y, 6, size / 2, {
          restitution: 0.8,
          chamfer: { radius: 10 },
          render: {
            fillStyle: "transparent",
            lineWidth: 2,
            strokeStyle: "#fff",
          },
        });
      } else if (shapeType === "star") {
        const starVertices = Vertices.fromPath(
          "50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35",
        );
        shape = Bodies.fromVertices(x, y, [starVertices], {
          restitution: 0.8,
          chamfer: { radius: 10 },
          render: {
            fillStyle: "transparent",
            lineWidth: 2,
            strokeStyle: "#fff",
          },
        });
      } else if (shapeType === "logo") {
        // SVG 로고 도형
        shape = Bodies.circle(x, y, size / 2, {
          restitution: 0.8, // 반발 계수
          chamfer: { radius: 10 },
          render: {
            sprite: {
              texture: "/images/img-logo-200w.svg", // SVG 이미지 경로
              xScale: size / 200, // 스케일링
              yScale: size / 200,
            },
          },
        });
      }
      // 초기 속도 설정
      Body.setVelocity(shape, {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2,
      });
      Body.setAngularVelocity(shape, Math.random() * 0.05);
      // 월드에 도형 추가
      World.add(engineRef.current.world, shape);
      shapesRef.current.push(shape);
      shapeCountRef.current++;
      currentCount++;

      // 다음 도형 추가
      shapeTimer = setTimeout(addNextShape, interval);
    };
    addNextShape();
  };

  // active-btn 상태 토글 핸들러
  const handleToggleMenuBlock = () => {
    setIsActive((prev) => !prev);
    if (!isActive) {
      // 메뉴 열기 애니메이션
      gsap.to(menuBlockRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "bounce.out",
        onComplete: () => {
          initializeMatterJs();
          const settings = getDeviceSettings();
          addShapesSequentially(settings.count, 50);
          menuItemsRef.current.forEach((menuItem, index) => {
            if (menuItem) {
              setTimeout(() => {
                const rect = menuItem.getBoundingClientRect();
                const padding = 0;
                const randomX = Math.random() * window.innerWidth;
                const randomY = -250;  // 시작 높이
                const body = Bodies.rectangle(
                  randomX,
                  randomY,
                  rect.width + padding,
                  rect.height + padding,
                  {
                    restitution: 0.5,
                    render: {
                      visible: false,
                    },
                  }
                );
                menuItem.style.opacity = "1";
                World.add(engineRef.current.world, body);
                bodiesRef.current.push(body);
              }, index * 200);  // 여기서 각 메뉴 아이템의 지연 시간을 조절 (현재 500ms)
            }
          });
        },
      });
    } else {
      // 메뉴 닫기 애니메이션
      gsap.to(menuBlockRef.current, {
        y: "-100%",
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          // Matter.js 엔진과 벽 제거
          resetMenuState();
        },
      });
    }
  };

  const initializeMatterJs = () => {
    if (engineRef.current && engineRef.current.render) {
      return;
    }
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    world.gravity.y = 1.5;

    const render = Render.create({
      element: menuBlockRef.current,
      engine: engineRef.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });
    engineRef.current.render = render; // 렌더링 객체를 엔진에 저장
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 25,
      window.innerWidth,
      50,
      {
        isStatic: true,
        restitution: 0.8,
        render: { fillStyle: "rgba(255, 255, 255, 1)" },
      },
    );

    const leftWall = Bodies.rectangle(
      -25,
      window.innerHeight / 2,
      50,
      window.innerHeight * 2,
      {
        isStatic: true,
        restitution: 0.8,
        render: { fillStyle: "rgba(0, 0, 0, 1)" },
      },
    );

    const rightWall = Bodies.rectangle(
      window.innerWidth + 25,
      window.innerHeight / 2,
      50,
      window.innerHeight * 2,
      {
        isStatic: true,
        restitution: 0.8,
        render: { fillStyle: "rgba(0, 0, 0, 1)" },
      },
    );

    // 모바일 체크
    if (isMobileView) {
      World.add(world, [ground, leftWall, rightWall]); // 모바일에서는 좌우 벽만
    } else {
      const topWall = Bodies.rectangle(
        window.innerWidth / 2 - 100,
        window.innerHeight / 2 - 115,
        285,
        50,
        {
          isStatic: true,
          restitution: 0.9,
          render: { fillStyle: "rgba(255, 255, 255, 0)" },
        }
      );
      const angle = Math.PI / -12;
      Body.rotate(topWall, angle);

      const topWall2 = Bodies.rectangle(
        window.innerWidth / 2 + 105,
        window.innerHeight / 2 - 90,
        290,
        50,
        {
          isStatic: true,
          restitution: 0.9,
          render: { fillStyle: "rgba(255, 255, 255,0)" },
        }
      );
      const angle2 = Math.PI / -12;
      Body.rotate(topWall2, angle2);

      World.add(world, [ground, leftWall, rightWall, topWall, topWall2]); // PC에서는 모든 벽 추가
    }

    // 충돌 감지
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      pairs.forEach(({ bodyA, bodyB }) => {
        const index = bodiesRef.current.indexOf(bodyA);
        if (index !== -1) {
          const domElement = menuItemsRef.current[index];

          if (domElement && bodyB === ground) {
            // 바닥 충돌 시 위치 고정
            domElement.style.transition = "transform 0.2s ease";
            domElement.style.transform = `translate(${bodyA.position.x}px, ${window.innerHeight - 50}px)`;
          } else if (bodyB === leftWall || bodyB === rightWall) {
            // 벽 충돌 시 반발 처리
            Body.setVelocity(bodyA, {
              x: -bodyA.velocity.x,
              y: bodyA.velocity.y,
            });
          }
          if (bodyA.label === "object" || bodyB.label === "object") {
            // 속도 제한
            Body.setVelocity(bodyA, {
              x: Math.min(bodyA.velocity.x, 1), // 최대 속도를 5로 제한
              y: Math.min(bodyA.velocity.y, 1),
            });
          }
        }
      });
    });

    // DOM과 물리 객체 동기화
    const syncDomWithPhysics = () => {
      bodiesRef.current.forEach((body, index) => {
        const domElement = menuItemsRef.current[index];
        if (domElement) {
          const { x, y } = body.position;
          const rect = domElement.getBoundingClientRect();
          const angle = body.angle; // 물리 객체의 회전 각도

          // DOM 요소의 위치와 회전 동기화
          domElement.style.position = "absolute";
          domElement.style.transform = `
            translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)
            rotate(${angle}rad)
          `;
        }
      });
      requestAnimationFrame(syncDomWithPhysics);
    };
    syncDomWithPhysics();

    // 마우스 움직임 이벤트 리스너 설정
    const renderCanvas = render.canvas;
    const handleMouseMove = (event) => {
      const mousePosition = { x: event.clientX, y: event.clientY };

      // 마우스와 가까운 오브젝트에 힘을 가함
      shapesRef.current.forEach((shape) => {
        const distanceX = mousePosition.x - shape.position.x;
        const distanceY = mousePosition.y - shape.position.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 100) { // 100px 이하로 가까운 오브젝트만 반응
          const forceMagnitude = 0.0008; // 힘의 크기 조절
          Body.applyForce(shape, shape.position, {
            x: -forceMagnitude * distanceX,
            y: -forceMagnitude * distanceY,
          });
        }
      });
    };

    if (renderCanvas) {
      renderCanvas.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (renderCanvas) {
        renderCanvas.removeEventListener("mousemove", handleMouseMove);
      }
    };
  };

  const resetMenuState = () => {
    const panelSub = document.querySelector(`.frontPanel .panel p`);
    setTimeout(() => {
      gsap.to(panelSub, {
        scale: "0.5", // 메뉴 닫기 애니메이션
        duration: 1,
        ease: "power4.in",
        onComplete: () => {
          gsap.set(panelSub, {
            scale: "1",
          });
          
        },
      });
    }, 0);
    if (engineRef.current) {
      const world = engineRef.current.world;
      const allBodies = [...world.bodies];
      allBodies.forEach((body) => {
        if (!body.isStatic) {
          World.remove(world, body);
        }
      });
      bodiesRef.current = [];
      shapeCountRef.current = 0;
      // 캔버스 삭제
      const render = engineRef.current.render;
      if (render && render.canvas) {
        render.canvas.remove();
      }
      // 렌더링 객체 초기화
      engineRef.current.render = null;
    }

    menuItemsRef.current.forEach((menuItem) => {
      if (menuItem) {
        menuItem.style.position = "relative";
        menuItem.style.transform = "translate(0, 0)";
        menuItem.style.transition = "none";
        menuItem.style.opacity = "0";
      }
    });

    setIsActive(false);
  };

  // Link 클릭 시 메뉴 닫기 핸들러
  const handleLinkClick = (event, href) => {
    const panel = document.querySelector(`.frontPanel`);
    
    gsap.set(panel, {
      y: "0dvh",
      opacity: 1,
    });
    event.preventDefault(); // 기본 동작 막기

    gsap.to(panel, {
      y: "-100%", // 메뉴 닫기 애니메이션
      duration: 0.6,
      ease: "power4.in",
      delay: 1,
      onComplete: () => {
        // 애니메이션 완료 후 라우팅 진행
        // resetMenuState(); // 메뉴와 도형 상태 초기화
        gsap.set(panel, {
          y: "0dvh",
          opacity: 0,
        });
      },
    });
    
    
    // 메뉴 닫기 애니메이션
    gsap.to(menuBlockRef.current, {
      y: "-100%", // 메뉴 닫기 애니메이션
      duration: 0.6,
      ease: "power4.in",
      onStart: () => {
        router.push(href);
        // if (lenisRef.current) {
        //   lenisRef.current.stop(); // Lenis 스크롤 비활성화
        // }
      },
      onComplete: () => {
        // 애니메이션 완료 후 라우팅 진행
        resetMenuState(); // 메뉴와 도형 상태 초기화
        // setTimeout(() => {
        //   lenisRef.current.start(); // Lenis 스크롤 활성화
        // }, 5000);
      },
    });
  };



  return (
    <aside className={styles["menu-wrap"]}>
      {/* <div className={styles.menu}> */}
      <div
        className={classNames(styles.menu, {
          [styles["active"]]: isMenuActive, // active 클래스는 상태에 따라 추가/제거
        })}
      >
        <button
          type="button"
          className={classNames(styles.menuButton, {
            [styles["active-btn"]]: isActive,
          })}
          onClick={handleToggleMenuBlock}
        >
          <div className={styles["menu-text"]}>
            <div className={styles["text-wrap"]}>
              <div className={styles["text-con"]}>
                <div className={styles["menu-default"]}>{menuText}</div>
                <div className={styles["menu-over"]}>Menu</div>
              </div>
            </div>
          </div>
          <svg
            viewBox="0 0 100 40"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["svg-menu"]}
          >
            <defs>
              <linearGradient
                id="progress-bar"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#db36a4" />
                <stop offset="100%" stopColor="#0000ff" />
              </linearGradient>
            </defs>
            <rect
              x="00"
              y="0"
              width="98"
              height="38"
              rx="19"
              strokeWidth="3"
              stroke="url(#progress-bar)"
              ref={rectRef}
            />
          </svg>
        </button>
      </div>
      <div
        ref={menuBlockRef}
        className={`${styles.menuBlock} fixed top-0 left-0 w-full menu-block h-dvh section-black bg-right`}
      >
        <div className="menuSlogan">
          <p className="memu-title-1">Incoding</p>
          <p className="memu-title-2">Stories that move your heart</p>
        </div>
        <div
          ref={(el) => {
            if (el && !menuItemsRef.current.includes(el)) {
              menuItemsRef.current.push(el);
            }
          }}
          className={classNames(
            styles.navCon, // 기본 클래스
            "flex", // 고정된 클래스
            styles["navCon-01"], // 추가 클래스
          )}
        >
          <Link
            href="/about"
            className="w-full h-full"
            onClick={(event) => handleLinkClick(event, "/about")}
          >
            <svg
              viewBox="0 0 201 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M106.652 2.8111L195.939 67.6819C199.518 70.2824 201.016 74.8919 199.649 79.0996L165.544 184.063C164.177 188.27 160.256 191.119 155.832 191.119H45.467C41.0428 191.119 37.1217 188.27 35.7546 184.063L1.64997 79.0996C0.282806 74.8919 1.78052 70.2824 5.35981 67.6819L94.6468 2.81109C98.2261 0.210591 103.073 0.210594 106.652 2.8111Z"
                strokeWidth="3"
                stroke="url(#gradient-01)"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="url(#gradient-01)"
                dy=".3em"
              >
                About Us
              </text>
            </svg>
          </Link>
        </div>
        <div
          ref={(el) => {
            if (el && !menuItemsRef.current.includes(el)) {
              menuItemsRef.current.push(el);
            }
          }}
          className={classNames(
            styles.navCon, // 기본 클래스
            "flex", // 고정된 클래스
            styles["navCon-02"], // 추가 클래스
          )}
        >
          <Link
            href="/portfolio"
            className="w-full h-full"
            onClick={(event) => handleLinkClick(event, "/portfolio")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <path
                d="M0.55 15.42L0.55 100C0.55 154.92 45.09 199.45 100 199.45C154.92 199.45 199.45 154.92 199.45 100C199.45 45.09 154.92 0.55 100 0.55L15.42 0.55C7.24 0.55 0.55 7.24 0.55 15.42Z"
                strokeWidth="3"
                stroke="url(#gradient-01)"
                className=""
              ></path>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="url(#gradient-01)"
                dy=".3em"
              >
                Projects
              </text>
            </svg>
          </Link>
        </div>
        <div
          ref={(el) => {
            if (el && !menuItemsRef.current.includes(el)) {
              menuItemsRef.current.push(el);
            }
          }}
          className={classNames(
            styles.navCon, // 기본 클래스
            "flex", // 고정된 클래스
            styles["navCon-03"], // 추가 클래스
          )}
        >
          <Link
            href="/contact"
            className="w-full h-full"
            onClick={(event) => handleLinkClick(event, "/contact")}
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                className=""
                x="1"
                y="1"
                width="198"
                height="198"
                rx="20"
                strokeWidth="3"
                stroke="url(#gradient-01)"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="url(#gradient-01)"
                dy=".3em"
              >
                Contact
              </text>
            </svg>
          </Link>
        </div>
        <div
          ref={(el) => {
            if (el && !menuItemsRef.current.includes(el)) {
              menuItemsRef.current.push(el);
            }
          }}
          className={classNames(
            styles.navCon, // 기본 클래스
            "flex", // 고정된 클래스
            styles["navCon-04"], // 추가 클래스
          )}
        >
          <Link
            href="/"
            className="w-full h-full"
            onClick={(event) => handleLinkClick(event, "/")}
          >
            <svg
              viewBox="0 0 201 177"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.36828 83.8196L47.3908 5.83822C49.0798 2.91287 52.2011 1.11078 55.579 1.11078L145.624 1.11077C149.002 1.11077 152.123 2.91287 153.812 5.83822L198.835 83.8196C200.524 86.7449 200.524 90.3491 198.835 93.2745L153.812 171.256C152.123 174.181 149.002 175.983 145.624 175.983L55.579 175.983C52.2011 175.983 49.0798 174.181 47.3908 171.256L2.36828 93.2745C0.67932 90.3491 0.67932 86.7449 2.36828 83.8196Z"
                stroke="url(#gradient-01)"
                strokeWidth="3"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="url(#gradient-01)"
                dy=".3em"
              >
                Introduction
              </text>
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Menu;
