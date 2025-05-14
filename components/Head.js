// components/Head.js
import React from 'react';

const Head = () => (
  <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" user-scalable="no" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="Author" content="인코딩" />

    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#000000" /> 
    <meta name="format-detection" content="telephone=no" /> 
    <meta name="naver-site-verification" content="a16479f192e48a919ef9e5585873219813618f65" />

    <meta
      name="description"
      content="웹 퍼블리싱, 인터랙션 개발, 코딩, 프론트엔드 개발, 모션 그래픽, 웹 애니메이션, 웹 프론트엔드 개발, 웹 인터랙션, 웹 코딩, 웹 모션 그래픽, 웹 랜딩페이지 제작, 반응형 사이트 제작, 회사소개 홈페이지 제작, 기업 홈페이지 제작"
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="인코딩" />
    <meta property="og:url" content="https://incoding.co.kr" />
    <meta property="og:image" content="/images/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:description"
      content="인코딩은 웹퍼블리싱, 인터랙티브 웹사이트 제작, 프론트엔드 개발, 모션 그래픽에 특화된 디지털 에이전시입니다. GSAP과 Three.js를 활용한 생동감 있는 인터랙션과 반응형 웹 구현으로 브랜드 가치를 극대화합니다."
    />
    <meta property="og:site_name" content="인코딩" />
    <meta property="og:locale" content="ko_KR" />
    
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png" />
    <link rel="canonical" href="https://incoding.co.kr" />
    {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/packery/2.1.2/packery.pkgd.min.js" defer /> */}
  </>
);

export default Head;