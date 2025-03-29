"use client";

import React, { useEffect } from "react";
import anime from "animejs";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import gsap from 'gsap';
import * as THREE from 'three';

const SvgDraw = () => {
  const pathname = usePathname();

  // 애니메이션 초기화 함수
  const initializeAnimations = () => {
    // SVG 그라데이션 정의
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('class', 'svg-gradient');
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    // 여러 그라데이션 생성
    const gradients = [
      { id: 'grad1', color1: '#090979', color2: '#00d4ff', opacity1: '0.4', opacity2: '0.1' },
      { id: 'grad2', color1: '#00d4ff', color2: '#B721FF', opacity1: '0.3', opacity2: '0.2' },
      { id: 'grad3', color1: '#80D0C7', color2: '#0093E9', opacity1: '0.4', opacity2: '0.2' }
    ];

    // gradients.forEach(({ id, color1, color2, opacity1, opacity2 }) => {
    //   const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    //   gradient.setAttribute("id", id);
    //   gradient.innerHTML = `
    //     <stop offset="0%" stop-color="${color1}" stop-opacity="${opacity1}"/>
    //     <stop offset="100%" stop-color="${color2}" stop-opacity="${opacity2}"/>
    //   `;
    //   defs.appendChild(gradient);
    // });

    svg.appendChild(defs);
    document.body.appendChild(svg);

    // 요소별 애니메이션 설정 함수
    const animateElement = (element) => {
      const isLarge = element.classList.contains('svg-lg');
      const isNormal = element.classList.contains('svg-md');
      const isSmall = element.classList.contains('svg-sm');
      const isXsmall = element.classList.contains('svg-xs');
      
      // SVG 내부 요소에 그라데이션 및 스타일 적용
      const svgElement = element.querySelector('svg *');
      if (svgElement) {
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        svgElement.setAttribute('fill', `url(#${randomGradient.id})`);
        svgElement.style.mixBlendMode = ['multiply', 'screen', 'overlay'][Math.floor(Math.random() * 3)];
      }

      let scaleRange;
      if (isLarge) {
        scaleRange = [0.8, 1.2];
      } else if (isNormal) {
        scaleRange = [0.5, 0.8];
      } else if (isSmall) {
        scaleRange = [0.3, 0.5];
      } else if (isXsmall) {
        scaleRange = [0.2, 0.3];
      }
      
      const randomScale = scaleRange[0] + Math.random() * (scaleRange[1] - scaleRange[0]);
      const randomRotation = Math.random() * 360;
      
      const moveRangeX = 40 + Math.random() * 30;
      const moveRangeY = 40 + Math.random() * 30;
      const moveX = (Math.random() - 0.5) * moveRangeX;
      const moveY = (Math.random() - 0.5) * moveRangeY;
      
      const initialX = (Math.random() - 0.5) * 60;
      const initialY = (Math.random() - 0.5) * 60;
      
      // 초기 설정
      gsap.set(element, {
        scale: randomScale,
        rotation: randomRotation,
        x: initialX * 10,
        y: initialY * 10,
      });
      
      // 애니메이션
      gsap.to(element, {
        rotation: randomRotation + (Math.random() > 0.5 ? 360 : -360),
        duration: 25 + Math.random() * 15,
        repeat: -1,
        ease: "none",
      });
      
      gsap.to(element, {
        x: initialX + moveX,
        y: initialY + moveY,
        duration: 5 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      
      gsap.to(element, {
        scale: randomScale * (0.85 + Math.random() * 0.3),
        duration: 10 + Math.random() * 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    };

    // 모든 요소에 애니메이션 적용
    const elements = document.querySelectorAll('.svg-box');
    elements.forEach(animateElement);

    return svg; // 클린업을 위해 svg 요소 반환
  };

  // 텍스처 로더 생성
  const textureLoader = new THREE.TextureLoader();

  // 커스텀 파티클 텍스처 생성
  const createCustomTexture = (shapeIndex) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    
    const rotation = Math.random() * Math.PI * 2;
    
    const shapes = [
        // 원형 파티클
        (ctx) => {
            ctx.beginPath();
            ctx.arc(32, 32, 24, 0, Math.PI * 2);
            ctx.fillStyle = '#26065d';
            ctx.fill();
        },
        // 삼각형 파티클
        (ctx) => {
            const size = 40;
            const height = size * Math.sqrt(3) / 2;
            const centerX = 32;
            const centerY = 32;
            
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotation);
            ctx.beginPath();
            ctx.moveTo(0, -height/2);
            ctx.lineTo(size/2, height/2);
            ctx.lineTo(-size/2, height/2);
            ctx.closePath();
            ctx.fillStyle = '#4c00ff';
            ctx.fill();
            ctx.restore();
        },
        // 사각형 파티클
        (ctx) => {
            ctx.save();
            ctx.translate(32, 32);
            ctx.rotate(rotation);
            ctx.fillStyle = '#26065d';
            ctx.fillRect(-24, -24, 48, 48);
            ctx.restore();
        }
    ];

    // 랜덤 대신 주어진 인덱스의 도형 사용
    const shape = shapes[shapeIndex % shapes.length];
    shape(ctx);

    return new THREE.CanvasTexture(canvas);
  };

  // Three.js 파티클 시스템 초기화 함수
  const initParticleSystem = () => {
    const container = document.querySelector('.svg-background');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const particleCount = 200; // 파티클 수 증가
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const rotationArray = new Float32Array(particleCount);
    
    for(let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 25;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 25;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      rotationArray[i] = Math.random() * Math.PI * 2;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('rotation', new THREE.BufferAttribute(rotationArray, 1));

    // 여러 가지 파티클 모양을 위한 머티리얼 생성
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.4,
        color: new THREE.Color('#4c00ff'),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        map: createCustomTexture(0),
        alphaTest: 0.1
    });

    // 여러 개의 파티클 그룹 생성
    const particleGroups = [];
    const groupCount = 3; // 파티클 그룹 수

    for(let i = 0; i < groupCount; i++) {
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);
        const rotationArray = new Float32Array(particleCount);
        
        for(let j = 0; j < particleCount; j++) {
            const j3 = j * 3;
            posArray[j3] = (Math.random() - 0.5) * 25;
            posArray[j3 + 1] = (Math.random() - 0.5) * 25;
            posArray[j3 + 2] = (Math.random() - 0.5) * 25;
            
            rotationArray[j] = Math.random() * Math.PI * 2;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('rotation', new THREE.BufferAttribute(rotationArray, 1));
        
        const material = particlesMaterial.clone();
        material.map = createCustomTexture(i); // 각 그룹별로 다른 도형 사용
  
        // 각 그룹별로 고정된 크기 설정
        const sizes = [0.3, 0.3, 0.3]; // 각 그룹별 크기 지정
        material.size = sizes[i];
      
      
        const colors = ['#ff5252', '#4c00ff', '#26065d']; // 각 도형별 색상
        material.color = new THREE.Color(colors[i]);
        
        const particlesMesh = new THREE.Points(particlesGeometry, material);
      
        particleGroups.push(particlesMesh);
        scene.add(particlesMesh);
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      targetX = mouseX * 0.001; // 마우스 반응 속도 감소 (0.002 → 0.001)
      targetY = mouseY * 0.001;

      particleGroups.forEach((mesh, index) => {
        mesh.rotation.x += 0.00005; // 자동 회전 속도 감소 (0.001 → 0.0005)
        mesh.rotation.y += 0.00005;

        const positions = mesh.geometry.attributes.position.array;
        const rotations = mesh.geometry.attributes.rotation.array;
        const time = Date.now() * 0.00002;

        for(let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] += Math.sin(time + i) * 0.002;
            positions[i3 + 1] += Math.cos(time + i * 0.5) * 0.002;
            positions[i3 + 2] += Math.sin(time * 0.5 + i) * 0.002;
            
            rotations[i] += 0.001 * (i % 2 ? 1 : -1);
            
            // 부드러운 경계 처리
            const boundary = 15; // 경계값 증가
            const resetDistance = 25; // 리셋 거리

            if(Math.abs(positions[i3]) > boundary) {
                // 방향을 반대로 전환
                positions[i3] = Math.sign(positions[i3]) * boundary;
                positions[i3] *= -0.8; // 반대 방향으로 튕기는 효과
            }
            if(Math.abs(positions[i3 + 1]) > boundary) {
                positions[i3 + 1] = Math.sign(positions[i3 + 1]) * boundary;
                positions[i3 + 1] *= -0.8;
            }
            if(Math.abs(positions[i3 + 2]) > boundary) {
                positions[i3 + 2] = Math.sign(positions[i3 + 2]) * boundary;
                positions[i3 + 2] *= -0.8;
            }
        }
        
        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.geometry.attributes.rotation.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  };

  useEffect(() => {
    if (pathname === "/portfolio") return;

    let particleCleanup;
    const timer = setTimeout(() => {
      // SVG 애니메이션 초기화
      const svg = initializeAnimations();
      // 파티클 시스템 초기화
      // particleCleanup = initParticleSystem();
    }, 600);

    return () => {
      clearTimeout(timer);
      if (particleCleanup) particleCleanup();
      gsap.killTweensOf('.svg-box');
      const svg = document.querySelector('.svg-gradient');
      if (svg) document.body.removeChild(svg);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/portfolio") return; // /contact 페이지에서는 애니메이션 초기화 건너뛰기

    const scrollTriggers = []; // scrollTriggers 배열 초기화
    const initAnimations = () => {
      const elements = [
        {
          selector: ".svg-ani-15",
          duration:2000,
          delay:0,
          direction: "easeInOut",
        },
        {
          selector: ".svg-ani-25",
          duration:2500,
          delay: 0,
          direction: "easeInOut",
        },
        {
          selector: ".svg-ani-1",
          duration:1000,
          delay: 0,
          direction: "easeInOut",
        },
      ];

      // 초기 상태 설정
      elements.forEach(({ selector }) => {
        document.querySelectorAll(selector).forEach((el) => {
          if (
            el instanceof SVGGeometryElement &&
            el.getBBox().width > 0 &&
            el.getBBox().height > 0
          ) {
            // SVGGeometryElement인지 확인 및 렌더링 확인
            const length = el.getTotalLength();
            el.style.strokeDasharray = length;
            el.style.strokeDashoffset = length; // 초기에는 완전히 숨김
          } else {
            console.warn(
              `Element with selector ${selector} is not a valid or rendered SVGGeometryElement.`,
            );
          }
        });
      });

      elements.forEach(({ selector, duration, delay, direction }) => {
        const targets = document.querySelectorAll(selector);

        targets.forEach((target) => {
          if (target instanceof SVGGeometryElement) { // 요소가 렌더링되었는지 확인
            const trigger = ScrollTrigger.create({
              trigger: target,
              start: "top 100%",
              onEnter: () => {
                requestAnimationFrame(() => { // requestAnimationFrame으로 애니메이션 시작
                  if (target.getBBox().width > 0 && target.getBBox().height > 0) {
                    anime({
                      targets: target,
                      strokeDashoffset: [anime.setDashoffset, 0],
                      duration,
                      delay,
                      easing: "easeInOutSine",
                      direction,
                      toggleActions: "play none none none",
                      invalidateOnRefresh: true

                    });
                  }
                });
              },
            });
            scrollTriggers.push(trigger); // 인스턴스를 배열에 저장
          }
        });
      });
    };

    // DOM 렌더링 후 애니메이션 초기화
    setTimeout(() => {
      initAnimations();
    },600);

    // ScrollTrigger Cleanup
    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill()); // 개별 인스턴스를 정리
    };
  }, [pathname]); // pathname이 변경될 때마다 useEffect 실행

  return (
    <div className="svg-background">
      <div className="svg-box svg-lg svg-round">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="svg-box svg-md svg-round-square">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="10"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="1"
            stroke="url(#gradient-01)"
            className="svg-ani-25"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-300"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            x="0"
            y="0"
            width="198"
            height="198"
            rx="15"
            strokeWidth="1"
            className="svg-ani-15"
          />
        </svg>
      </div>
      <div className="svg-box svg-md about-svg-01 svg-round-4">
        <svg
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-300"
        >
          <rect
            x="00"
            y="0"
            width="300"
            height="100"
            rx="50"
            strokeWidth="1"
            className="svg-ani-15"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-md svg-round-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M0.55 15.42L0.55 100C0.55 154.92 45.09 199.45 100 199.45C154.92 199.45 199.45 154.92 199.45 100C199.45 45.09 154.92 0.55 100 0.55L15.42 0.55C7.24 0.55 0.55 7.24 0.55 15.42Z"
            strokeWidth="1"
            className="svg-ani-25"
          ></path>
        </svg>
      </div>
      <div className="svg-box svg-md about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 101.01"
          className="svg-200"
        >
          <path
            d="M199.96 6.95C196.81 58.69 153.13 99.69 100 99.69C46.87 99.69 3.19 58.69 0.04 6.95C-0.14 4.03 2.69 1.6 6.12 1.6H193.88C197.31 1.6 200.14 4.03 199.96 6.95Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M0.55 15.42L0.55 100C0.55 154.92 45.09 199.45 100 199.45C154.92 199.45 199.45 154.92 199.45 100C199.45 45.09 154.92 0.55 100 0.55L15.42 0.55C7.24 0.55 0.55 7.24 0.55 15.42Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          ></path>
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg">
        <svg viewBox="0 0 200 121.77" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.19 0.69L14.18 0.69C8.8 -0.87 3.48 3.81 3.33 10.25L0.52 129.34C0.39 135.48 4.27 140.78 10.37 140.94L193.41 147.5C199.51 147.67 204.01 142.65 204.15 136.51L206.04 64.93C206.18 60.3 203.12 56.03 198.84 54.85L198.84 54.85L106.56 27.8L14.19 0.69Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg-01">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 101.01"
          className="svg-200"
        >
          <path
            d="M199.96 6.95C196.81 58.69 153.13 99.69 100 99.69C46.87 99.69 3.19 58.69 0.04 6.95C-0.14 4.03 2.69 1.6 6.12 1.6H193.88C197.31 1.6 200.14 4.03 199.96 6.95Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-02)"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg-01 ">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg svg-round-4">
        <svg
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-300"
        >
          <rect
            x="00"
            y="0"
            width="300"
            height="100"
            rx="50"
            strokeWidth="1"
            className="svg-ani-15"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-md about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="1"
            className="svg-ani-25"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg">
        <svg
          className=""
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="svg-ani-15"
            cx="100"
            cy="100"
            r="98.62"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-lg about-svg-01 svg-round-square">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="30"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="30"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg-01">
        <svg viewBox="0 0 200 121.77" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.19 0.69L14.18 0.69C8.8 -0.87 3.48 3.81 3.33 10.25L0.52 129.34C0.39 135.48 4.27 140.78 10.37 140.94L193.41 147.5C199.51 147.67 204.01 142.65 204.15 136.51L206.04 64.93C206.18 60.3 203.12 56.03 198.84 54.85L198.84 54.85L106.56 27.8L14.19 0.69Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-md about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-02)"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg-01">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="100"
            cy="100"
            r="90"
            strokeWidth="1"
            className="svg-ani-15"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="1"
            className="svg-ani-15"
            stroke="url(#gradient-02)"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg-01">
        <svg viewBox="0 0 200 121.77" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.19 0.69L14.18 0.69C8.8 -0.87 3.48 3.81 3.33 10.25L0.52 129.34C0.39 135.48 4.27 140.78 10.37 140.94L193.41 147.5C199.51 147.67 204.01 142.65 204.15 136.51L206.04 64.93C206.18 60.3 203.12 56.03 198.84 54.85L198.84 54.85L106.56 27.8L14.19 0.69Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box svg-xs about-svg-01">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="svg-200"
        >
          <path
            d="M191.13 199.58H8.47C4.02 199.58 1 196.56 1 192.19V8.59C1 1.42 9.08 -2.17 14.18 2.91L197.09 185.82C202.17 190.91 198.58 199.58 191.13 199.58Z"
            strokeWidth="1"
            className="svg-ani-15"
            stroke="url(#gradient-02)"
          />
        </svg>
      </div>
      <div className="svg-box svg-sm about-svg-01">
        <svg viewBox="0 0 200 121.77" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.19 0.69L14.18 0.69C8.8 -0.87 3.48 3.81 3.33 10.25L0.52 129.34C0.39 135.48 4.27 140.78 10.37 140.94L193.41 147.5C199.51 147.67 204.01 142.65 204.15 136.51L206.04 64.93C206.18 60.3 203.12 56.03 198.84 54.85L198.84 54.85L106.56 27.8L14.19 0.69Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      {/* <div className="svg-box el-33 about-svg">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-200"
        >
          <rect
            className="svg-ani-15"
            x="1"
            y="1"
            width="198"
            height="198"
            rx="20"
            strokeWidth="1"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box el-34 about-svg">
        <svg
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-300"
        >
          <rect
            x="00"
            y="0"
            width="300"
            height="100"
            rx="50"
            strokeWidth="1"
            className="svg-ani-15"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div>
      <div className="svg-box el-35 about-svg-01">
        <svg viewBox="0 0 200 121.77" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.19 0.69L14.18 0.69C8.8 -0.87 3.48 3.81 3.33 10.25L0.52 129.34C0.39 135.48 4.27 140.78 10.37 140.94L193.41 147.5C199.51 147.67 204.01 142.65 204.15 136.51L206.04 64.93C206.18 60.3 203.12 56.03 198.84 54.85L198.84 54.85L106.56 27.8L14.19 0.69Z"
            strokeWidth="1"
            className="svg-ani-25"
            stroke="url(#gradient-01)"
          />
        </svg>
      </div> */}
    </div>
  );
};

export default SvgDraw;
