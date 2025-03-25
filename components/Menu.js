"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; // next/navigation에서 useRouter 가져오기
import { useRouter } from "next/navigation";
import styles from "../styles/Menu.module.css";
import classNames from "classnames";
import Link from "next/link";
import { gsap } from "gsap";
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

const Footer = () => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuText, setMenuText] = useState("");
  const [isActive, setIsActive] = useState(false); // 버튼 활성 상태 관리
  const menuBlockRef = useRef(null); // .menuBlock 요소 참조
  const menuItemsRef = useRef([]);
  const engineRef = useRef(null); // Matter.js 엔진 참조
  const bodiesRef = useRef([]); // 배열로 초기화
  const audioRef = useRef(null);
  const router = useRouter();

  // 경로에 따라 menuText 설정
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
        render: { fillStyle: "rgba(0, 0, 0, 0)" },
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
    World.add(world, [leftWall, rightWall]); // 월드에 좌우 벽 추가

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

    // MouseConstraint 추가
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.01, // 마우스 상호작용 강도
        render: {
          visible: false, // 마우스 상호작용을 위한 시각적 피드백 숨김
        },
      },
    });
    World.add(world, mouseConstraint);

    // 속도 제한을 위한 이벤트 리스너 추가
    Events.on(mouseConstraint, "mouseup", () => {
      if (mouseConstraint.body) {
        const body = mouseConstraint.body;

        // 속도를 제한하여 던지는 힘을 줄임
        const maxVelocity = 1; // 최대 속도 제한 값
        const newVelocityX =
          Math.sign(body.velocity.x) *
          Math.min(Math.abs(body.velocity.x), maxVelocity);
        const newVelocityY =
          Math.sign(body.velocity.y) *
          Math.min(Math.abs(body.velocity.y), maxVelocity);

        Body.setVelocity(body, {
          x: newVelocityX,
          y: newVelocityY,
        });
      }
    });

    World.add(world, mouseConstraint);
    // 렌더와 마우스를 연결
    render.mouse = mouse;

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

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("자동 재생이 제한되었습니다. 버튼을 눌러 재생하세요.");
      });
    }
  }, []);

  ///////// 오디오 플레이어 //////////
  const fadeOutVolume = (audioRef, duration, onComplete) => {
    const step = 0.05; // 볼륨 변화 단위
    const interval = duration / (1 / step); // 단계별 시간 계산
    let currentVolume = audioRef.current.volume;

    const fadeOut = setInterval(() => {
      currentVolume = Math.max(0, currentVolume - step); // 볼륨 감소
      audioRef.current.volume = currentVolume;

      if (currentVolume <= 0) {
        clearInterval(fadeOut); // 볼륨이 0이 되면 종료
        if (onComplete) onComplete(); // 완료 콜백 호출
      }
    }, interval);
  };
  const fadeInVolume = (audioRef, duration, onComplete) => {
    const step = 0.05; // 볼륨 변화 단위
    const interval = duration / (1 / step); // 단계별 시간 계산
    let currentVolume = audioRef.current.volume;

    const fadeIn = setInterval(() => {
      currentVolume = Math.min(1, currentVolume + step); // 볼륨 증가
      audioRef.current.volume = currentVolume;

      if (currentVolume >= 0.4) {
        clearInterval(fadeIn); // 볼륨이 1이 되면 종료
        if (onComplete) onComplete(); // 완료 콜백 호출
      }
    }, interval);
  };
  const handleToggleAnimation = () => {
    setIsAnimating((prev) => !prev);

    if (audioRef.current) {
      if (!audioRef.current.paused) {
        // 오디오가 재생 중이면 볼륨을 서서히 줄인 후 일시 정지
        fadeOutVolume(audioRef, 1000, () => {
          audioRef.current.pause();
          setIsPlaying(false);
        });
      } else {
        // 오디오가 일시 정지 상태이면 볼륨을 서서히 증가시키며 재생
        audioRef.current.play();
        fadeInVolume(audioRef, 1000, () => {
          setIsPlaying(true);
        });
      }
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      // 초기 볼륨 설정
      audioRef.current.volume = 0;

      // 자동 재생 시 페이드인 효과 추가
      audioRef.current
        .play()
        .then(() => {
          fadeInVolume(audioRef, 10000, () => {
            console.log("Volume fully increased");
          });
          setIsAnimating(true);
        })
        .catch((error) => {
          console.log("자동 재생이 제한되었습니다. 버튼을 눌러 재생하세요.");
          setIsAnimating(false);
        });
    }
  }, []);

  const shapeCountRef = useRef(0); // 도형 개수를 추적하는 useRef 변수
  const maxShapes = 100; // 최대 도형 개수
  let shapeTimer = null;
  const addShapesSequentially = (count, interval = 500) => {
    if (shapeTimer) {
      clearTimeout(shapeTimer); // 기존 타이머 초기화
    }

    let currentCount = 0;

    const addNextShape = () => {
      if (currentCount >= count || shapeCountRef.current >= maxShapes) {
        return; // 도형 추가 종료
      }

      const padding = 50; // 여백 설정
      const x = Math.random() * (window.innerWidth - padding * 2) + padding;
      const y = Math.random() * -100 - 50; // (-100 ~ -200) 범위에서 생성

      const size = Math.max(Math.random() * 180 + 20); // 랜덤 크기
      const shapes = [
        "circle",
        "rectangle",
        "polygon",
        "triangle",
        "hexagon",
        "star",
        "logo",
      ];
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      let shape;

      if (shapeType === "circle") {
        shape = Bodies.circle(x, y, size / 2, {
          restitution: 0.8,
          render: { fillStyle: "#ff5252" },
        });
      } else if (shapeType === "rectangle") {
        shape = Bodies.rectangle(x, y, size, size, {
          restitution: 0.8,
          render: { fillStyle: "#cbc2ff" },
        });
      } else if (shapeType === "polygon") {
        shape = Bodies.polygon(x, y, 5, size / 2, {
          restitution: 0.8,
          render: { fillStyle: "#000000" },
        });
      } else if (shapeType === "triangle") {
        shape = Bodies.polygon(x, y, 3, size / 2, {
          restitution: 0.8,
          render: { fillStyle: "#f5a623" },
        });
      } else if (shapeType === "hexagon") {
        shape = Bodies.polygon(x, y, 6, size / 2, {
          restitution: 0.8,
          render: { fillStyle: "#00ff00" },
        });
      } else if (shapeType === "star") {
        const starVertices = Vertices.fromPath(
          "50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35",
        );
        shape = Bodies.fromVertices(x, y, [starVertices], {
          restitution: 0.8,
          render: { fillStyle: "#ff0000" },
        });
      } else if (shapeType === "logo") {
        // SVG 로고 도형
        shape = Bodies.circle(x, y, size / 2, {
          restitution: 0.8, // 반발 계수
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
      shapeCountRef.current++;
      currentCount++;

      // 다음 도형 추가
      shapeTimer = setTimeout(addNextShape, interval);
    };

    addNextShape();
  };
  // useEffect(() => {
  //   addShapesSequentially(30, 100);
  // }, []);

  // active-btn 상태 토글 핸들러
  const handleToggleMenuBlock = () => {
    setIsActive((prev) => !prev);
    if (!isActive) {
      // 메뉴 열기 애니메이션
      gsap.to(menuBlockRef.current, {
        y: "0%",
        duration: 1, // 애니메이션 지속 시간
        ease: "bounce.out", // 튀는 효과
        onComplete: () => {
          // 애니메이션 완료 후 도형 추가
          addShapesSequentially(30, 100); // 도형 30개, 100ms 간격으로 추가
          menuItemsRef.current.forEach((menuItem, index) => {
            if (menuItem) {
              setTimeout(() => {
                const rect = menuItem.getBoundingClientRect();
                const padding = 0;

                // X 좌표를 화면 내로 제한
                const randomX = Math.random() * window.innerWidth;

                // Y 좌표를 화면 위에서 랜덤하게 설정 (-200 ~ -50)
                const randomY = -550;

                const body = Bodies.rectangle(
                  randomX,
                  randomY,
                  rect.width + padding, // 너비
                  rect.height + padding, // 높이
                  {
                    restitution: 0.1, // 반발 계수
                    render: {
                      visible: false, // 사각형 숨기기
                    },
                  },
                );
                // 링크의 opacity를 1로 설정
                menuItem.style.opacity = "1";
                World.add(engineRef.current.world, body);
                bodiesRef.current.push(body);
              }, index * 500); // 각 링크에 0.5초 간격 추가
            }
          });
        },
      });
      // 메뉴 열기: 각 메뉴 아이템에 대해 Bodies.rectangle 생성
    } else {
      // 메뉴 닫기 애니메이션
      gsap.to(menuBlockRef.current, {
        y: "-100%", // 메뉴 닫기
        duration: 0.5,
        ease: "power4.in",

        onComplete: () => {
          // 도형 초기화
          bodiesRef.current.forEach((body) => {
            World.remove(engineRef.current.world, body); // 모든 물리 객체 제거
          });
          bodiesRef.current = []; // 물리 객체 배열 초기화
          shapeCountRef.current = 0; // 도형 개수 초기화

          // Matter.js 월드에서 남아 있는 모든 비정적 객체 제거
          const allBodies = [...engineRef.current.world.bodies]; // 월드의 모든 객체 복사
          allBodies.forEach((body) => {
            if (!body.isStatic) {
              // 고정된 객체(벽, 바닥)는 유지
              World.remove(engineRef.current.world, body);
            }
          });

          menuItemsRef.current.forEach((menuItem) => {
            if (menuItem) {
              menuItem.style.position = "relative"; // 초기 상태로 되돌림
              menuItem.style.transform = "translate(0, 0)"; // 위치 초기화
              menuItem.style.transition = "none"; // 애니메이션 없이 즉시 적용
              menuItem.style.opacity = "0";
            }
          });
          resetMenuState();
        },
      });
    }
  };

  const resetMenuState = () => {
    // Matter.js 물리 객체 초기화
    if (engineRef.current) {
      const world = engineRef.current.world;

      // 월드의 모든 비정적 객체 제거
      const allBodies = [...world.bodies];
      allBodies.forEach((body) => {
        if (!body.isStatic) {
          World.remove(world, body);
        }
      });

      // 물리 객체 배열 초기화
      bodiesRef.current = [];
      shapeCountRef.current = 0;
    }

    // 메뉴 링크 초기화
    menuItemsRef.current.forEach((menuItem) => {
      if (menuItem) {
        menuItem.style.position = "relative";
        menuItem.style.transform = "translate(0, 0)";
        menuItem.style.transition = "none";
        menuItem.style.opacity = "0";
      }
    });

    // 메뉴 상태 초기화
    setIsActive(false);
  };
  // Link 클릭 시 메뉴 닫기 핸들러
  const handleLinkClick = (event, href) => {
    event.preventDefault(); // 기본 동작 막기

    // 메뉴 닫기 애니메이션
    gsap.to(menuBlockRef.current, {
      y: "-100%", // 메뉴 닫기 애니메이션
      duration: 1,
      ease: "power4.in",
      onStart: () => {
        // 애니메이션 완료 후 라우팅 진행
        gsap.delayedCall(0, () => {
          router.push(href);
        });
      },
      onComplete: () => {
        // 애니메이션 완료 후 라우팅 진행
        resetMenuState(); // 메뉴와 도형 상태 초기화
      },
    });
  };

  return (
    <aside className={styles["menu-wrap"]}>
      {pathname !== "/" && (
        <>
          <audio
            ref={audioRef}
            src="/media/music.mp3"
            preload="auto"
            playsInline
            onLoadedData={() => {
              // 오디오 로드 완료 시 초기 볼륨 설정
              if (audioRef.current) {
                audioRef.current.volume = 0; // 초기 볼륨 0
              }
            }}
          />
          <div className={styles["eq"]}>
            <button
              type="button"
              className={styles["btn-eq"]}
              onClick={handleToggleAnimation}
            >
              <div className={styles["eq-wrap"]}>
                <div
                  className={`${styles.bars} ${isAnimating ? styles.animating : styles.paused}`}
                >
                  <span className={styles["bar"]}></span>
                  <span className={styles["bar"]}></span>
                  <span className={styles["bar"]}></span>
                  <span className={styles["bar"]}></span>
                </div>
              </div>
            </button>
          </div>
          <div className={styles.menu}>
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
            </button>
          </div>
        </>
      )}
      <div
        ref={menuBlockRef}
        className={`${styles.menuBlock} fixed top-0 left-0 w-full menu-block h-dvh`}
      >
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
              viewBox="0 0 176 176"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id=""
                d="M174.973 12.9643C168.609 99.5642 99.5644 168.609 12.9645 174.973C6.51569 175.409 1 170.497 0.999999 164.121L0.999993 11.8499C0.999993 5.88475 5.88472 1.00002 11.8499 1.00001L164.121 1.00001C170.497 1.00001 175.409 6.51556 174.973 12.9643Z"
                stroke="#fff"
              ></path>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="white"
                fontSize="16rem"
                dy=".3em"
              >
                About
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
            <svg
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                id="draw-vector-18"
                x="1"
                y="1"
                width="138"
                height="138"
                rx="37.5521"
                stroke="#fff"
              ></rect>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="white"
                fontSize="16rem"
                dy=".3em"
              >
                Portfolio
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
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 367 367"
              fill="none"
            >
              <path
                d="M0.999999 28.3204L0.999992 183.5C0.999988 284.312 82.6879 366 183.5 366C284.312 366 366 284.312 366 183.5C366 82.6879 284.312 1.00001 183.5 1.00001L28.3204 1C13.2942 1 0.999999 13.2942 0.999999 28.3204Z"
                stroke="currentColor"
                strokeLinejoin="round"
                fill="white"
              ></path>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="#000000"
                fontSize="16rem"
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
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 472 472"
              fill="none"
            >
              <path
                d="M451.716 471H20C9.5066 471 1 462.493 1 452V20.2843C1 3.35706 21.4656 -5.12014 33.435 6.84919L465.151 438.565C477.12 450.534 468.643 471 451.716 471Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="white"
                data-path="M451.716 471H20C9.5066 471 1 462.493 1 452V20.2843C1 3.35706 21.4656 -5.12014 33.435 6.84919L465.151 438.565C477.12 450.534 468.643 471 451.716 471Z"
              ></path>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="#000000"
                fontSize="36rem"
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

export default Footer;
