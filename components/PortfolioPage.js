"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import PageTransition from "./PageTransition";
import CustomImage from "./CustomImage";
import GridPortfolio from "./gridPortfolio";
import useVideoAutoPlay from "../hooks/AutoPlay";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  useVideoAutoPlay();
  const router = useRouter();
  const lastSectionRef = useRef(null); // 마지막 섹션
  const carouselRef = useRef(null);

  useEffect(() => {
    // 브라우저 환경인지 확인
    if (typeof window === "undefined") return;

    const initCarousel = () => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const items = carousel.querySelectorAll(".carousel-item");
      const itemCount = items.length; // 아이템 갯수
      const rotateValue = (itemCount - 1) * 90; // 회전 값 계산 (갯수 * 90)
      const carouselHeightY = carousel.offsetHeight - window.innerHeight / 2;
      carousel.style.willChange = "transform"; // GPU 가속 유도

      // GSAP 애니메이션 설정
      gsap.to(carousel, {
        y: -carouselHeightY - window.innerHeight * 0.25,
        rotateY: -rotateValue, // 한 바퀴 회전
        ease: "none",
        scrollTrigger: {
          trigger: ".section-black",
          start: "0 0",
          end: `${carousel.scrollHeight * 2}px 100%`,
          pin: true,
          scrub: 2, // 스크롤에 따른 애니메이션
          // markers: true, // 디버그용
        },
      });

      items.forEach((item) => {
        let isExpanded = false; // 클릭 상태를 추적하는 변수
        let clone; // 복사된 요소를 추적
        let originalRect; // 원본 요소의 rect 정보 저장
        const image = item.querySelector(".image");
        image.addEventListener("click", () => {
          if (!isExpanded) {
            // 원본 요소의 위치와 크기 가져오기
            originalRect = item.getBoundingClientRect();

            // 요소를 확대
            clone = item.cloneNode(true);
            clone.classList.add("clone");
            document.body.appendChild(clone);

            clone.style.position = "fixed";
            clone.style.top = `${originalRect.top}px`;
            clone.style.left = `${originalRect.left}px`;
            clone.style.width = `${originalRect.width}px`;
            // clone.style.height = `${originalRect.height}px`;
            // clone.style.transform = 'rotateY(0)';
            clone.style.margin = 0;
            clone.style.zIndex = 9999;

            // 확대 애니메이션
            gsap.to(clone, {
              top: 0,
              left: 0,
              width: "100%",
              height: "100dvh",
              rotateY: 0,
              duration: 0.4,
              transform:"none",
              ease: "power3.out",
              onStart: () => {
                document.body.style.overflow = "hidden";
                clone.style.pointerEvents = "none"; // 클릭 비활성화
              },
              onComplete: () => {
                clone.style.pointerEvents = "auto"; // 클릭 활성화
                const lenis = initLenis(clone);

                // 스크롤 이벤트 추가
                function raf(time) {
                  lenis.raf(time);
                  requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);
              },
            });

            isExpanded = true; // 상태 업데이트

            // 클론 요소에 클릭 이벤트 추가
            clone.addEventListener("click", () => {
              if (isExpanded) {
                // 클론 요소를 원래 상태로 복원
                gsap.to(clone, {
                  y: "-100%",
                  // top: `${originalRect.top}px  `,
                  // left: `${originalRect.left}px`,
                  // width: `${originalRect.width}px`,
                  // height: `${originalRect.height}px`,
                  duration: 0.6,
                  ease: "power3.inOut",
                  onComplete: () => {
                    clone.remove(); // 복사본 제거
                    clone = null; // 복사본 참조 제거
                    document.body.style.overflow = ""; // 스크롤 복원
                  },
                });

                isExpanded = false; // 상태 업데이트
              }
            });
          }
        });
      });
    };

    // 지연 실행
    const timer = setTimeout(initCarousel, 600);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Lenis 초기화를 별도의 useEffect로 분리
  const initLenis = (wrapper) => {
    if (typeof window === "undefined") return null;
    
    return new Lenis({
      wrapper,
      smooth: true,
    });
  };

  return (
    <PageTransition
      onExitComplete={() => {
        router.push("/contact");
      }}
    >
      <div id="contents">
        <div className="flex flex-col items-center justify-center section section-black">
          <div className="relative z-10 flex flex-col items-center justify-center section-con ">
            <div className="scenePortfolio">
              <div className="carousel" ref={carouselRef}>
                <div className="carousel-item">
                  <button className="image">
                    {/* <video loop muted width="100%" height="100%" preload="none" playsInline="">
                        <source src="/images/portfolio/real.mp4" type="video/mp4" />
                    </video>   */}
                    <img src="/images/portfolio/real.jpg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/real-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      RealSecu
                      <a
                        href="http://www.realsecu.co.kr/kr/index/index"
                        target="_blank"
                      >
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>리얼시큐 (RealSecu)</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web (KR,EN)</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          리얼시큐는 보안 솔루션 및 기술 컨설팅을 제공하는 전문
                          기업으로, 회사의 신뢰성과 전문성을 돋보이게 할 수 있는
                          웹사이트를 제작했습니다. 고객사의 핵심 가치를
                          반영하며, 직관적이고 세련된 UI/UX를 통해 브랜드의
                          기술적 우수성을 강조하는 데 중점을 두었습니다.
                        </p>
                        <ul>
                          <li>
                            • 반응형 디자인: 다양한 디바이스 환경에서 최적화된
                            사용자 경험 제공
                          </li>
                          <li>
                            • GSAP 애니메이션: 부드러운 인터랙션과 스크롤 기반의
                            역동적인 전환 효과 적용
                          </li>
                          <li>
                            • 정보 구조 최적화: 서비스 및 솔루션 정보를
                            효과적으로 전달하는 메뉴와 레이아웃 구성
                          </li>
                          <li>
                            • SEO 최적화: 검색엔진 친화적인 코드 구조 및 주요
                            키워드 기반 메타데이터 적용
                          </li>
                          <li>
                            • 기술 기반 콘텐츠 표현: 보안 기술과 제품의 강점을
                            시각적으로 강조하는 인터랙티브한 구성
                          </li>
                          <li>
                            • 콘텐츠 관리 시스템(CMS): 고객이 손쉽게 콘텐츠를
                            업데이트할 수 있도록 구현
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage src="/images/portfolio/real1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/real2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/real3.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/real4.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <video
                      loop
                      muted
                      autoPlay
                      width="100%"
                      height="100%"
                      preload="auto"
                      playsInline=""
                      webkit-playsinline="true"
                    >
                      <source
                        src="/images/portfolio/standard.mp4"
                        type="video/mp4"
                      />
                    </video>
                    {/* <img src="/images/portfolio/standard1.jpg" alt="" /> */}
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/standard-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      Standard energy
                      <a href="https://stndenergy.com/" target="_blank">
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>Standard energy</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web (KR,EN)</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>3 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          Standard energy는 에너지 솔루션을 제공하는 글로벌
                          기업으로, 혁신적인 비전과 브랜드 이미지를 효과적으로
                          전달할 수 있는 웹사이트를 제작했습니다. 고객사의 핵심
                          가치를 반영하며, 사용자 친화적인 UI/UX를 통해 브랜드의
                          전문성을 강조하는 데 중점을 두었습니다.
                        </p>
                        <ul>
                          <li>
                            • 반응형 디자인: 다양한 디바이스에서 최적화된 사용자
                            경험 제공
                          </li>
                          <li>
                            • GSAP 애니메이션: 역동적인 전환 효과와 스크롤
                            애니메이션 적용
                          </li>
                          <li>
                            • SEO 최적화: 검색엔진 친화적인 코드 구조 및
                            메타데이터 적용
                          </li>
                          <li>
                            • PHP 및 MySQL: 효율적인 데이터 관리와
                            서버-클라이언트 간의 원활한 통신 구현
                          </li>
                          <li>
                            • 콘텐츠 관리 시스템(CMS): 고객이 손쉽게 콘텐츠를
                            업데이트할 수 있도록 구현
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      {/* <video loop autoplay="" muted width="100%" height="100%" preload="none" playsInline="">
                        <source src="/images/portfolio/standard.mp4" type="video/mp4" />
                    </video> */}
                      {/* <CustomImage src="/images/portfolio/standard1.jpg" alt="" /> */}
                      <CustomImage src="/images/portfolio/std1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/std2.jpeg" alt="" />
                      {/* <CustomImage src="/images/portfolio/std3.jpeg" alt="" /> */}
                      <CustomImage src="/images/portfolio/std4.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/std5.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    {/* <video loop muted width="100%" height="100%" preload="none" playsInline="">
                        <source src="/images/portfolio/graphite.mp4" type="video/mp4" />
                    </video>   */}
                    <img src="/images/portfolio/img-graphite.jpeg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/img-graphite-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      Graph - ite
                      <a href="https://graph-ite.com/" target="_blank">
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>Graph - ite</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          그라파이트는 자동차 모션 그래픽 스튜디오로, 그들의
                          창의성과 전문성을 강조하는 웹사이트를 제작했습니다.
                          고객사의 독특한 비주얼 콘텐츠를 효과적으로 전달하며,
                          사용자 친화적인 UI/UX를 통해 브랜드의 아이덴티티를
                          부각하는 데 중점을 두었습니다.
                        </p>
                        <ul>
                          <li>
                            • 반응형 디자인: 다양한 디바이스에서 최적화된 사용자
                            경험 제공
                          </li>
                          <li>
                            • GSAP 애니메이션: 역동적인 전환 효과와 스크롤
                            애니메이션 적용
                          </li>
                          <li>
                            • SEO 최적화: 검색엔진 친화적인 코드 구조 및
                            메타데이터 적용
                          </li>
                          <li>
                            • PHP 및 MySQL: 효율적인 데이터 관리와
                            서버-클라이언트 간의 원활한 통신 구현
                          </li>
                          <li>
                            • 콘텐츠 관리 시스템(CMS): 고객이 손쉽게 콘텐츠를
                            업데이트할 수 있도록 구현
                          </li>
                          <li>• AWS: 아마존 웹 서비스 배포</li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      {/* <video loop muted width="100%" height="100%" preload="none" playsInline="">
                        <source src="/images/portfolio/graphite.mp4" type="video/mp4" />
                    </video> */}
                      <CustomImage
                        src="/images/portfolio/graphite3.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/graphite2.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/graphite4.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/graphite1.jpeg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <img src="/images/portfolio/kgm1.jpeg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/kgm-m.jpeg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      KGM Motors Online Store
                      <a href="https://buy.kg-mobility.com/" target="_blank">
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>KGM MOTORS</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          KGM MOTORS의 온라인 스토어는 자동차 구매와 관련된
                          다양한 서비스를 제공하는 플랫폼으로, 직관적인
                          인터페이스와 현대적인 디자인을 통해 고객 경험을
                          극대화했습니다. 사용자 친화적인 웹사이트를 제작하여
                          브랜드의 신뢰성과 전문성을 강화하는 데 중점을
                          두었습니다.
                          <br />
                          KGM MOTORS의 온라인 판매 플랫폼으로서의 역할을
                          성공적으로 수행하며, 고객에게 편리하고 효율적인 구매
                          환경을 제공하고 있습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • HTML5, CSS3, JavaScript: 최신 웹 표준을 준수하며
                            크로스 브라우저 호환성을 확보했습니다.
                          </li>
                          <li>
                            
                            • jQuery: 동적 UI 요소와 애니메이션 구현에 활용하여
                            사용자 경험을 강화했습니다.
                          </li>
                          <li>
                            
                            • GSAP (GreenSock Animation Platform): 부드럽고
                            직관적인 스크롤 애니메이션과 비주얼 전환 효과를
                            제공했습니다.
                          </li>
                          <li>
                            
                            • Swiper.js: 슬라이드 쇼 및 카루셀 UI를 통해 다양한
                            콘텐츠를 효과적으로 표현했습니다.
                          </li>
                          <li>
                            
                            • 반응형 디자인: 데스크톱과 모바일 디바이스에서
                            최적화된 사용자 경험을 제공합니다.
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터 설정을 통해 가시성을 높였습니다.
                          </li>
                          <li>
                            
                            • 비디오 통합: 고해상도 배경 비디오와 아티스트
                            작품의 동영상 클립을 활용하여 브랜드 이미지를
                            강화했습니다.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <video
                        loop
                        muted
                        autoPlay
                        width="100%"
                        height="100%"
                        preload="auto"
                        playsInline=""
                        webkit-playsinline="true"
                      >
                        <source
                          src="/images/portfolio/kgm.mp4"
                          type="video/mp4"
                        />
                      </video>
                      <CustomImage src="/images/portfolio/kgm2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/kgm3.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/kgm4.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <img src="/images/portfolio/m4.jpeg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/m4-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      Design M4
                      <a href="http://www.designm4.com/" target="_blank">
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>Design M4</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          디자인M4는 인테리어 디자인 포트폴리오와 서비스를
                          디지털 플랫폼에서 효과적으로 제공할 수 있도록 설계된
                          웹사이트입니다. 사용자 중심의 인터페이스와 직관적인
                          정보 구조를 통해 브랜드의 전문성을 강조했습니다.
                          웹사이트는 주요 기능과 비주얼 요소를 통해 고객의
                          브랜드 이미지를 효과적으로 전달하고, 사용자가 필요한
                          정보를 빠르게 탐색할 수 있도록 설계되었습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • 반응형 웹 디자인: HTML, CSS, JavaScript를 활용하여
                            다양한 디바이스에서 최적화된 사용자 경험을
                            제공하였습니다.
                          </li>
                          <li>
                            
                            • 동적 콘텐츠 관리: jQuery를 사용하여 사용자와의
                            상호작용을 강화하고, 동적인 콘텐츠를 부드럽게
                            로드하도록 구현하였습니다.
                          </li>
                          <li>
                            
                            • 스타일링 및 레이아웃: Bootstrap 프레임워크를
                            적용하여 일관된 디자인과 레이아웃을 신속하게
                            구축하였습니다.
                          </li>
                          <li>
                            
                            • 서버 사이드 개발: PHP를 기반으로 한 백엔드 개발을
                            통해 데이터 처리와 서버 통신을 효율적으로
                            처리하였습니다.
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색 엔진 친화적인 코드 구조와
                            메타데이터를 적용하여 검색 결과 상위 노출을
                            도모하였습니다.
                          </li>
                          <li>
                            • 콘텐츠 관리 시스템(CMS): 고객이 손쉽게 콘텐츠를
                            업데이트할 수 있도록 구현
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage src="/images/portfolio/m4-1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/m4-6.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/m4-2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/m4-3.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/m4-4.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/m4-5.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <img src="/images/portfolio/mmpx.jpg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/mmpx-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      m m p x
                      <a href="https://mmpx.kr/index" target="_blank">
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>mmpx</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>7 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          MMPX는 다차원적 크리에이티브 스튜디오로, 그들의
                          포트폴리오를 효과적으로 소개하고 브랜드 정체성을
                          강조할 수 있는 웹사이트를 제작했습니다. 디자인부터
                          개발까지 세부적인 작업을 통해, 사용자 경험과 시각적인
                          매력을 동시에 강화하는 데 중점을 두었습니다. <br />
                          웹사이트는 mmpx의 창의적인 프로젝트와 서비스를
                          효과적으로 전달하며, 방문자들이 쉽게 탐색하고 정보를
                          얻을 수 있도록 설계되었습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • 반응형 웹 디자인: 다양한 디바이스에서 일관된
                            사용자 경험 제공
                          </li>
                          <li>
                            
                            • HTML, CSS, JavaScript 활용: 사용자 친화적인
                            인터페이스 구현
                          </li>
                          <li>
                            
                            • GSAP 애니메이션: 역동적인 전환 효과와 스크롤 기반
                            인터랙션 구현
                          </li>
                          <li>
                            
                            • PHP 및 MySQL: 효율적인 데이터 관리와
                            서버-클라이언트 간의 원활한 통신 구현
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터 설정
                          </li>
                          <li>
                            • 콘텐츠 관리 시스템(CMS): 고객이 손쉽게 콘텐츠를
                            업데이트할 수 있도록 구현
                          </li>
                          <li>• AWS: 아마존 웹 서비스 배포</li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage src="/images/portfolio/mmpx1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/mmpx2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/mmpx3.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/mmpx4.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <img src="/images/portfolio/deep.jpeg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/deep-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      Deep Bio
                      <a href="https://deepbio.co.kr/" target="_blank">
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>Deep Bio</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>3 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          딥바이오는 인공지능 기반 암 진단 소프트웨어를 개발하는
                          의료 기술 기업으로, 그들의 혁신적인 솔루션과 연구
                          성과를 효과적으로 전달할 수 있는 웹사이트를
                          구축했습니다. 사용자 친화적인 UI/UX 디자인을 통해
                          방문자들이 딥바이오의 제품과 서비스를 쉽게 이해하고
                          접근할 수 있도록 하였습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • 반응형 웹 디자인: 다양한 디바이스에서 일관된
                            사용자 경험 제공
                          </li>
                          <li>
                            
                            • HTML, CSS, JavaScript 활용: 사용자 친화적인
                            인터페이스 구현
                          </li>
                          <li>
                            
                            • GSAP 애니메이션: 역동적인 전환 효과와 스크롤 기반
                            인터랙션 구현
                          </li>
                          <li>
                            
                            • PHP 및 MySQL: 효율적인 데이터 관리와
                            서버-클라이언트 간의 원활한 통신 구현
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터 설정
                          </li>
                          <li>
                            • 콘텐츠 관리 시스템(CMS): 고객이 손쉽게 콘텐츠를
                            업데이트할 수 있도록 구현
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage src="/images/portfolio/deep1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/deep2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/deep3.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/deep4.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <img src="/images/portfolio/quadro.jpeg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/quadro-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      Quadro Center
                      <a href="https://quadro.center/" target="_blank">
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>쿼드로센터</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          엔비디아 코리아 정품 Quadro 제품을 소개하고 판매하는
                          플랫폼인 쿼드로센터의 웹사이트를 제작했습니다. 사용자
                          친화적인 인터페이스와 현대적인 디자인을 통해 다양한
                          Quadro 제품과 관련 서비스를 효과적으로 전달하는 데
                          중점을 두었습니다. <br />
                          쿼드로센터의 신뢰성과 전문성을 강조하는 웹사이트를
                          완성했습니다.
                        </p>
                        <ul>
                          <li>
                            • 반응형 웹 디자인: 다양한 디바이스에서 일관된
                            사용자 경험 제공
                          </li>
                          <li>
                            • HTML, CSS, JavaScript 활용: 사용자 친화적인
                            인터페이스 구현
                          </li>
                          <li>
                            • GSAP 애니메이션: 역동적인 전환 효과와 스크롤 기반
                            인터랙션 구현
                          </li>
                          <li>
                            • PHP 및 MySQL: 효율적인 데이터 관리와
                            서버-클라이언트 간의 원활한 통신 구현
                          </li>
                          <li>
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터 설정
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage
                        src="/images/portfolio/quadro1.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/quadro2.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/quadro3.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/quadro4.jpeg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <img src="/images/portfolio/me2on.jpg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/me2on-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>
                      ME2ON
                      <a href="https://www.me2on.com/" target="_blank">
                        Visit Site
                      </a>
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>ME2ON</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 week</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          미투온 웹사이트는 모바일 게임 및 엔터테인먼트 콘텐츠를
                          제공하는 기업의 특성을 반영하여 제작되었습니다. 사용자
                          친화적인 인터페이스와 직관적인 내비게이션을 통해
                          방문자들이 회사의 다양한 서비스와 정보를 쉽게 탐색할
                          수 있도록 구성되었습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • 반응형 웹 디자인: 다양한 디바이스에서 일관된
                            사용자 경험 제공
                          </li>
                          <li>
                            
                            • HTML, CSS, JavaScript 활용: 사용자 친화적인
                            인터페이스 구현
                          </li>
                          <li>
                            
                            • GSAP 애니메이션: 역동적인 전환 효과와 스크롤 기반
                            인터랙션 구현
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터 설정
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage src="/images/portfolio/me1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/me2.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <video
                      loop
                      muted
                      autoPlay
                      width="100%"
                      height="100%"
                      preload="auto"
                      playsInline=""
                      webkit-playsinline="true"
                    >
                      <source
                        src="/images/portfolio/nepa.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </button>
                  {/* <div className="image-m">
                    <img src="/images/portfolio/kgm-m.jpeg" alt="" />
                  </div>   */}
                  <div className="infoBlock">
                    <h2>
                      NEPA Online Brochure
                      {/* <a href='https://www.kosmes.or.kr/nsh/map/main.do' target='_blank'>
                        Visit Site
                      </a>   */}
                    </h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>HYUNDAI DEPARTMENT</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          더현대 대구는 대구 지역의 현대백화점 지점을 대표하는
                          웹사이트로, 혁신적이고 세련된 비주얼 디자인을 통해
                          고객 경험을 극대화하고 현대적인 감각을 전달하는 데
                          중점을 두었습니다. 다양한 아티스트와의 협업 콘텐츠를
                          강조하며, 시각적 매력을 중심으로 구성된 사이트입니다.
                          <br />
                          현대적인 디자인과 기술의 조화를 통해 더현대 대구
                          브랜드의 가치를 디지털 공간에서 효과적으로 전달하며,
                          사용자 경험을 한층 더 풍부하게 만드는 데 중점을
                          두었습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • HTML5, CSS3, JavaScript: 최신 웹 표준을 준수하며
                            크로스 브라우저 호환성을 확보했습니다.
                          </li>
                          <li>
                            
                            • jQuery: 동적 UI 요소와 애니메이션 구현에 활용하여
                            사용자 경험을 강화했습니다.
                          </li>
                          <li>
                            
                            • GSAP (GreenSock Animation Platform): 부드럽고
                            직관적인 스크롤 애니메이션과 비주얼 전환 효과를
                            제공했습니다.
                          </li>
                          <li>
                            
                            • Swiper.js: 슬라이드 쇼 및 카루셀 UI를 통해 다양한
                            콘텐츠를 효과적으로 표현했습니다.
                          </li>
                          <li>
                            
                            • 반응형 디자인: 데스크톱과 모바일 디바이스에서
                            최적화된 사용자 경험을 제공합니다.
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터 설정을 통해 가시성을 높였습니다.
                          </li>
                          <li>
                            
                            • 비디오 통합: 고해상도 배경 비디오와 아티스트
                            작품의 동영상 클립을 활용하여 브랜드 이미지를
                            강화했습니다.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <video
                        loop
                        muted
                        autoPlay
                        width="100%"
                        height="100%"
                        preload="auto"
                        playsInline=""
                        webkit-playsinline="true"
                      >
                        <source
                          src="/images/portfolio/kgm.mp4"
                          type="video/mp4"
                        />
                      </video>
                      <CustomImage src="/images/portfolio/kgm1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/kgm2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/kgm3.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <video
                      loop
                      muted
                      autoPlay
                      width="100%"
                      height="100%"
                      preload="auto"
                      playsInline=""
                      webkit-playsinline="true"
                    >
                      <source
                        src="/images/portfolio/hyundai.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/hyundai-m.jpg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>THE HYUNDAI DAEGU</h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>HYUNDAI DEPARTMENT</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          더현대 대구는 대구 지역의 현대백화점 지점을 대표하는
                          웹사이트로, 혁신적이고 세련된 비주얼 디자인을 통해
                          고객 경험을 극대화하고 현대적인 감각을 전달하는 데
                          중점을 두었습니다. 다양한 아티스트와의 협업 콘텐츠를
                          강조하며, 시각적 매력을 중심으로 구성된 사이트입니다.
                          <br />
                          현대적인 디자인과 기술의 조화를 통해 더현대 대구
                          브랜드의 가치를 디지털 공간에서 효과적으로 전달하며,
                          사용자 경험을 한층 더 풍부하게 만드는 데 중점을
                          두었습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • HTML5, CSS3, JavaScript: 최신 웹 표준을 준수하며
                            크로스 브라우저 호환성을 확보했습니다.
                          </li>
                          <li>
                            
                            • jQuery: 동적 UI 요소와 애니메이션 구현에 활용하여
                            사용자 경험을 강화했습니다.
                          </li>
                          <li>
                            
                            • GSAP (GreenSock Animation Platform): 부드럽고
                            직관적인 스크롤 애니메이션과 비주얼 전환 효과를
                            제공했습니다.
                          </li>
                          <li>
                            
                            • Swiper.js: 슬라이드 쇼 및 카루셀 UI를 통해 다양한
                            콘텐츠를 효과적으로 표현했습니다.
                          </li>
                          <li>
                            
                            • 반응형 디자인: 데스크톱과 모바일 디바이스에서
                            최적화된 사용자 경험을 제공합니다.
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터 설정을 통해 가시성을 높였습니다.
                          </li>
                          <li>
                            
                            • 비디오 통합: 고해상도 배경 비디오와 아티스트
                            작품의 동영상 클립을 활용하여 브랜드 이미지를
                            강화했습니다.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage src="/images/portfolio/hyun1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/hyun2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/hyun3.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/hyun4.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <img src="/images/portfolio/raise.jpeg" alt="" />
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/raise-m.jpeg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>Raiseme</h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>Raiseme</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          Raiseme는 Vision AI 기술을 기반으로 다양한 분석
                          솔루션을 제공하는 플랫폼입니다. 비대면 시대에 적합한
                          AI 기술을 통해 사람들의 소통과 학습 경험을 향상시키고,
                          더 나은 서비스를 제공하기 위해 웹사이트를
                          개발했습니다.
                          <br />
                          Raiseme 웹사이트는 사용자의 관심을 유도하고, AI 기술의
                          가치를 시각적으로 전달할 수 있도록 설계되었습니다.
                          다양한 분석 기능과 사례를 직관적으로 확인할 수 있는
                          인터페이스를 통해 사용자 경험을 극대화했습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • 반응형 웹 디자인: 다양한 디바이스 환경에서
                            최적화된 사용자 경험 제공.
                          </li>
                          <li>
                            
                            • GSAP 및 ScrollTrigger 활용: 스크롤 애니메이션과
                            콘텐츠 동적 배치를 통해 시각적 몰입감을 강화.
                          </li>
                          <li>
                            
                            • Parallax 효과: 주요 요소에 Parallax.js를 적용하여
                            심미성을 높임.
                          </li>
                          <li>
                            
                            • Chart.js 통합: 데이터 시각화를 통해 기술적 요소와
                            서비스 활용도를 명확히 전달.
                          </li>
                          <li>
                            
                            • 영상 기반 콘텐츠 제공: 비대면 분석 솔루션의 시연
                            영상과 인터랙티브한 AI 설명 영상 배치.
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터를 통해 검색 가시성 향상.
                          </li>
                          <li>
                            
                            • 멀티미디어 콘텐츠 지원: HTML5 Video와 Swiper.js를
                            결합하여 사용자 참여를 유도.
                          </li>
                          <li>
                            
                            • 접근성 향상: "본문 바로가기" 링크 제공과 ARIA
                            속성을 통해 웹 접근성을 강화.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage
                        src="/images/portfolio/reaise1.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/reaise2.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/reaise3.jpeg"
                        alt=""
                      />
                      <CustomImage
                        src="/images/portfolio/reaise4.jpeg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <video
                      loop
                      muted
                      autoPlay
                      width="100%"
                      height="100%"
                      preload="auto"
                      playsInline=""
                      webkit-playsinline="true"
                    >
                      <source src="/images/portfolio/re.mp4" type="video/mp4" />
                    </video>
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/re-m.jpeg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>Raiseme</h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>Raiseme</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          Raiseme는 Vision AI 기술을 기반으로 다양한 분석
                          솔루션을 제공하는 플랫폼입니다. 비대면 시대에 적합한
                          AI 기술을 통해 사람들의 소통과 학습 경험을 향상시키고,
                          더 나은 서비스를 제공하기 위해 웹사이트를
                          개발했습니다.
                          <br />
                          Raiseme 웹사이트는 사용자의 관심을 유도하고, AI 기술의
                          가치를 시각적으로 전달할 수 있도록 설계되었습니다.
                          다양한 분석 기능과 사례를 직관적으로 확인할 수 있는
                          인터페이스를 통해 사용자 경험을 극대화했습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • 반응형 웹 디자인: 다양한 디바이스 환경에서
                            최적화된 사용자 경험 제공.
                          </li>
                          <li>
                            
                            • GSAP 및 ScrollTrigger 활용: 스크롤 애니메이션과
                            콘텐츠 동적 배치를 통해 시각적 몰입감을 강화.
                          </li>
                          <li>
                            
                            • Parallax 효과: 주요 요소에 Parallax.js를 적용하여
                            심미성을 높임.
                          </li>
                          <li>
                            
                            • Chart.js 통합: 데이터 시각화를 통해 기술적 요소와
                            서비스 활용도를 명확히 전달.
                          </li>
                          <li>
                            
                            • 영상 기반 콘텐츠 제공: 비대면 분석 솔루션의 시연
                            영상과 인터랙티브한 AI 설명 영상 배치.
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터를 통해 검색 가시성 향상.
                          </li>
                          <li>
                            
                            • 멀티미디어 콘텐츠 지원: HTML5 Video와 Swiper.js를
                            결합하여 사용자 참여를 유도.
                          </li>
                          <li>
                            
                            • 접근성 향상: "본문 바로가기" 링크 제공과 ARIA
                            속성을 통해 웹 접근성을 강화.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage src="/images/portfolio/re1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/re2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/re3.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/re4.jpeg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <button className="image">
                    <video
                      loop
                      muted
                      autoPlay
                      width="100%"
                      height="100%"
                      preload="auto"
                      playsInline=""
                      webkit-playsinline="true"
                    >
                      <source
                        src="/images/portfolio/tree.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </button>
                  <div className="image-m">
                    <img src="/images/portfolio/tree-m.jpeg" alt="" />
                  </div>
                  <div className="infoBlock">
                    <h2>Raiseme</h2>
                  </div>
                  <div className="detail">
                    <div className="text">
                      <div className="summery">
                        <dl>
                          <dt>CLIENT</dt>
                          <dd>Raiseme</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT TYPE</dt>
                          <dd>Responsive Web</dd>
                        </dl>
                        <dl>
                          <dt>PROJECT PERIOD</dt>
                          <dd>2 month</dd>
                        </dl>
                      </div>
                      <div className="info">
                        <p className="">
                          Raiseme는 Vision AI 기술을 기반으로 다양한 분석
                          솔루션을 제공하는 플랫폼입니다. 비대면 시대에 적합한
                          AI 기술을 통해 사람들의 소통과 학습 경험을 향상시키고,
                          더 나은 서비스를 제공하기 위해 웹사이트를
                          개발했습니다.
                          <br />
                          Raiseme 웹사이트는 사용자의 관심을 유도하고, AI 기술의
                          가치를 시각적으로 전달할 수 있도록 설계되었습니다.
                          다양한 분석 기능과 사례를 직관적으로 확인할 수 있는
                          인터페이스를 통해 사용자 경험을 극대화했습니다.
                        </p>
                        <ul>
                          <li>
                            
                            • 반응형 웹 디자인: 다양한 디바이스 환경에서
                            최적화된 사용자 경험 제공.
                          </li>
                          <li>
                            
                            • GSAP 및 ScrollTrigger 활용: 스크롤 애니메이션과
                            콘텐츠 동적 배치를 통해 시각적 몰입감을 강화.
                          </li>
                          <li>
                            
                            • Parallax 효과: 주요 요소에 Parallax.js를 적용하여
                            심미성을 높임.
                          </li>
                          <li>
                            
                            • Chart.js 통합: 데이터 시각화를 통해 기술적 요소와
                            서비스 활용도를 명확히 전달.
                          </li>
                          <li>
                            
                            • 영상 기반 콘텐츠 제공: 비대면 분석 솔루션의 시연
                            영상과 인터랙티브한 AI 설명 영상 배치.
                          </li>
                          <li>
                            
                            • SEO 최적화: 검색엔진 친화적인 코드 구조와
                            메타데이터를 통해 검색 가시성 향상.
                          </li>
                          <li>
                            
                            • 멀티미디어 콘텐츠 지원: HTML5 Video와 Swiper.js를
                            결합하여 사용자 참여를 유도.
                          </li>
                          <li>
                            
                            • 접근성 향상: "본문 바로가기" 링크 제공과 ARIA
                            속성을 통해 웹 접근성을 강화.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3>Some stills</h3>
                    <div className="detail-image">
                      <CustomImage src="/images/portfolio/tree1.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/tree2.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/tree3.jpeg" alt="" />
                      <CustomImage src="/images/portfolio/tree4.jpeg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex section-black section-con">
          {/* <GridPortfolio /> */}
        </div>
        <div
          className="flex flex-col items-center justify-center h-dvh section-bottom"
          ref={lastSectionRef}
        ></div>
      </div>
    </PageTransition>
  );
};
export default PortfolioPage;
