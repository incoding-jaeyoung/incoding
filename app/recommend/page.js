"use client"
import React, { useEffect } from "react";
import "/styles/lab-page.css";
import Header from "/components/Header";
import RecommendClient from "./RecommendClient.js";

export default function RecommendPage() {
  useEffect(() => {
    // 기존 메타 태그 제거 및 새로운 메타 태그 설정
    const updateMetaTags = () => {
      // 페이지 제목 설정
      document.title = "Interactive Sites - 인터랙티브 웹사이트 추천 | 포트폴리오";
      
      // 기존 description 메타 태그 찾기 및 업데이트
      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', '인터랙티브한 요소가 포함된 웹사이트들을 소개하고 사용된 기술 스택을 분석합니다. React, Next.js, GSAP 등 최신 웹 기술로 구현된 창의적인 웹사이트들을 만나보세요.');
      } else {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.name = 'description';
        descriptionMeta.content = '인터랙티브 웹사이트 및 랜딩페이지 소개 분석 페이지입니다. React, Next.js, GSAP 등 최신 웹 기술로 구현된 창의적인 웹사이트들을 만나보세요.';
        document.head.appendChild(descriptionMeta);
      }
      
      // keywords 메타 태그
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', '인터랙티브 웹사이트, 웹디자인, React, Next.js, GSAP, 프론트엔드, 기술분석, 포트폴리오, 웹개발');
      } else {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.name = 'keywords';
        keywordsMeta.content = '인터랙티브 웹사이트, 웹디자인, React, Next.js, GSAP, 프론트엔드, 기술분석, 포트폴리오, 웹개발';
        document.head.appendChild(keywordsMeta);
      }
      
      // Open Graph 태그들
      const ogTags = [
        { property: 'og:title', content: 'Interactive Sites - 인터랙티브 웹사이트 추천' },
        { property: 'og:description', content: '인터랙티브한 요소가 포함된 웹사이트들을 소개하고 사용된 기술 스택을 분석합니다.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://incoding.co.kr/recommend' },
        { property: 'og:image', content: '/images/og-recommend.jpg' },
        { property: 'og:site_name', content: '인코딩' },
        { property: 'og:locale', content: 'ko_KR' }
      ];
      
      ogTags.forEach(tag => {
        let ogMeta = document.querySelector(`meta[property="${tag.property}"]`);
        if (ogMeta) {
          ogMeta.setAttribute('content', tag.content);
        } else {
          ogMeta = document.createElement('meta');
          ogMeta.setAttribute('property', tag.property);
          ogMeta.setAttribute('content', tag.content);
          document.head.appendChild(ogMeta);
        }
      });
      
      // Twitter Card 태그들
      const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Interactive Sites - 인터랙티브 웹사이트 추천' },
        { name: 'twitter:description', content: '인터랙티브한 요소가 포함된 웹사이트들을 소개하고 사용된 기술 스택을 분석합니다.' },
        { name: 'twitter:image', content: '/images/twitter-recommend.jpg' }
      ];
      
      twitterTags.forEach(tag => {
        let twitterMeta = document.querySelector(`meta[name="${tag.name}"]`);
        if (twitterMeta) {
          twitterMeta.setAttribute('content', tag.content);
        } else {
          twitterMeta = document.createElement('meta');
          twitterMeta.setAttribute('name', tag.name);
          twitterMeta.setAttribute('content', tag.content);
          document.head.appendChild(twitterMeta);
        }
      });
      
      // canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', 'https://incoding.co.kr/recommend');
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', 'https://incoding.co.kr/recommend');
        document.head.appendChild(canonicalLink);
      }
    };
    
    updateMetaTags();
    
    // 컴포넌트 언마운트 시 정리 (선택사항)
    return () => {
      // 필요시 원래 메타 태그로 복원하는 로직 추가 가능
    };
  }, []);

  return (
    <div id="contents" className="lab-container">
      <Header />
      <div className="lab-page-wrap list">
        <h1 className="lab-title">Interactive Sites</h1>
        <p className="lab-sub-title">
          인터랙티브 & 크리에이티브한 웹사이트의 소개 및 사용된 기술 소개 페이지입니다.
        </p>
        <RecommendClient />
      </div>
    </div>
  );
}

// Note: Ensure the line-clamp plugin is included in the Tailwind CSS configuration.
