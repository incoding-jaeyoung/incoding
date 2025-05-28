"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

export default function RecommendClient() {
  const router = useRouter();
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('전체');

  // 이미지 URL에서 사이즈 파라미터 제거하여 원본 이미지 URL 생성
  const getOriginalImageUrl = (url) => {
    if (!url) return url;
    
    // 1. WordPress 이미지 URL에서 사이즈 파라미터 제거 (예: -640x480, -1024x768 등)
    let originalUrl = url.replace(/-\d+x\d+(?=\.[^.]*$)/, '');
    
    // 2. WordPress scaled 이미지 처리 (-scaled 제거)
    originalUrl = originalUrl.replace(/-scaled(?=\.[^.]*$)/, '');
    
    // 3. WordPress 썸네일 경로를 원본 경로로 변경
    if (originalUrl.includes('/wp-content/uploads/')) {
      // 년/월 폴더 구조에서 썸네일 제거
      originalUrl = originalUrl.replace(/\/\d{4}\/\d{2}\/([^\/]+)-\d+x\d+(\.[^.]+)$/, '/$1$2');
    }
    
    return originalUrl;
  };

  // 가장 큰 이미지 사이즈 찾기
  const getLargestImageUrl = (mediaObject) => {
    if (!mediaObject) return null;
    
    // 1. 원본 이미지 우선
    if (mediaObject.source_url) {
      return getOriginalImageUrl(mediaObject.source_url);
    }
    
    // 2. media_details.sizes에서 가장 큰 이미지 찾기
    if (mediaObject.media_details?.sizes) {
      const sizes = mediaObject.media_details.sizes;
      let largestSize = null;
      let maxPixels = 0;
      
      // 모든 사이즈 중 가장 큰 것 찾기
      Object.keys(sizes).forEach(sizeKey => {
        const size = sizes[sizeKey];
        const pixels = size.width * size.height;
        if (pixels > maxPixels) {
          maxPixels = pixels;
          largestSize = size;
        }
      });
      
      if (largestSize) {
        return getOriginalImageUrl(largestSize.source_url);
      }
    }
    
    return null;
  };

  // 지역 분류 함수
  const getRegion = (url, stack, siteTitle) => {
    // 1. site_title 우선 체크
    if (siteTitle === '국내') return '국내';
    if (siteTitle === '해외') return '해외';
    
    if (!url) return '기타';
    
    // 2. 한국 도메인 체크
    const koreanDomains = ['.co.kr', '.kr', '.or.kr', '.go.kr', '.ac.kr', '.re.kr', '.pe.kr', '.ne.kr'];
    const isKoreanDomain = koreanDomains.some(domain => url.toLowerCase().includes(domain));
    
    // 3. 기술 스택에서 한국 서비스 체크 (대소문자 구분 없이)
    const stackLower = stack ? stack.toLowerCase() : '';
    const hasKoreanService = stackLower.includes('naver') || stackLower.includes('kakao');
    
    // 한국 도메인이거나 한국 서비스를 사용하면 국내
    return (isKoreanDomain || hasKoreanService) ? '국내' : '해외';
  };

  // 스택 텍스트를 파싱하는 함수
  const parseStackText = (stackText) => {
    if (!stackText) return [];
    
    const categories = [];
    
    // 텍스트 전처리: Google Analytics 관련 통합
    let processedText = stackText
      .replace(/GA4/g, 'Google Analytics')
      .replace(/Google Analytics\s*\n\s*Google Analytics/g, 'Google Analytics');
    
    const lines = processedText.split('\n').map(line => line.trim()).filter(line => line);
    
    let currentCategory = null;
    let currentItems = [];
    
    lines.forEach((line, index) => {
      // 버전 번호가 단독으로 있는 경우 (예: "15.3.1", "1.0.42")
      if (line.match(/^\d+\.\d+(\.\d+)?$/)) {
        if (currentItems.length > 0) {
          // 이전 아이템에 버전 추가
          const lastItemIndex = currentItems.length - 1;
          currentItems[lastItemIndex] = `${currentItems[lastItemIndex]} ${line}`;
        }
        return;
      }
      
      // 카테고리 판단: 다음 줄이 있고, 특정 패턴을 만족하는 경우
      const nextLine = lines[index + 1];
      
      // 카테고리 키워드들
      const categoryKeywords = [
        '분석', '프레임워크', '라이브러리', '스크립트', '서버', '생성기', '기타',
        'Performance', 'CDN', '광고', '태그 관리자', '프로그래밍 언어', 'UI',
        '보안', '데이터베이스', '개발', 'JavaScript 그래픽', 'PaaS', '비디오 플레이어'
      ];
      
      const isCategory = nextLine && (
        categoryKeywords.some(keyword => line.includes(keyword)) ||
        line === 'JavaScript 프레임워크' ||
        line === 'JavaScript 라이브러리' ||
        line === 'UI 프레임워크' ||
        line === '폰트 스크립트' ||
        line === '비디오 플레이어'
      );
      
      if (isCategory) {
        // 이전 카테고리 저장
        if (currentCategory && currentItems.length > 0) {
          categories.push({
            name: currentCategory,
            items: [...currentItems]
          });
        }
        
        // 새 카테고리 시작
        currentCategory = line;
        currentItems = [];
      } else if (currentCategory) {
        // 기술 아이템 추가
        currentItems.push(line);
      } else {
        // 첫 번째 줄이 카테고리
        currentCategory = line;
        currentItems = [];
      }
    });
    
    // 마지막 카테고리 저장
    if (currentCategory && currentItems.length > 0) {
      categories.push({
        name: currentCategory,
        items: [...currentItems]
      });
    }
    
    // 카테고리 순서 정렬
    const sortCategories = (categories) => {
      const categoryOrder = {
        // 분석
        '분석': 1,
        
        // 보안
        '보안': 2,
        
        // 프론트엔드
        'JavaScript 프레임워크': 3,
        'JavaScript 라이브러리': 4,
        'JavaScript 그래픽': 5,
        'UI 프레임워크': 6,
        '폰트 스크립트': 7,
        'Performance': 8,
        '비디오 플레이어': 9,
        
        // 백엔드
        '웹 프레임워크': 10,
        '웹 서버': 11,
        '정적 사이트 생성기': 12,
        '프로그래밍 언어': 13,
        'CDN': 14,
        
        // 데이터베이스 및 개발
        '데이터베이스': 15,
        '개발': 16,
        'PaaS': 17,
        
        // 광고 및 애널리틱스
        '광고': 18,
        '태그 관리자': 19,
        
        // 기타 (맨 마지막)
        '기타': 999
      };
      
      return categories.sort((a, b) => {
        const orderA = categoryOrder[a.name] || 500; // 정의되지 않은 카테고리는 중간에
        const orderB = categoryOrder[b.name] || 500;
        return orderA - orderB;
      });
    };
    
    return sortCategories(categories);
  };

  useEffect(() => {
    fetch("https://incodingco.mycafe24.com/wp-json/wp/v2/posts?categories=6&_embed&_fields=id,slug,title,date,acf,_embedded")
      .then(res => res.json())
      .then(data => {
        const formattedPosts = data.map(post => ({
          slug: post.slug,
          title: post.title.rendered,
          date: new Date(post.date).toLocaleDateString(),
          author: "Incoding",
          tags: post._embedded?.["wp:term"]?.[1]?.map(tag => tag.name) || [],
          thumbnail: 
            getOriginalImageUrl(post.acf?.site_image?.url) ||
            getLargestImageUrl(post._embedded?.["wp:featuredmedia"]?.[0]) ||
            "/images/portfolio/std1.jpeg",
          sub_title: post.acf?.site_title,
          url: post.acf?.site_url,
          stack: post.acf?.site_stack,
          region: getRegion(post.acf?.site_url, post.acf?.site_stack, post.acf?.site_title)
        }));
        setPosts(formattedPosts);
      });
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePageTransition = (slug) => {
    if (!isMounted) return;

    gsap.to(containerRef.current, {
      y: "-100vh",
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        router.push(`/recommend/${slug}`);
      },
    });
  };

  // 탭에 따른 필터링된 포스트
  const filteredPosts = posts.filter(post => {
    if (activeTab === '전체') return true;
    return post.region === activeTab;
  });

  // 각 탭별 개수 계산
  const tabCounts = {
    '전체': posts.length,
    '국내': posts.filter(post => post.region === '국내').length,
    '해외': posts.filter(post => post.region === '해외').length
  };

  return (
    <div ref={containerRef}>
      {/* 탭 네비게이션 */}
      <div className="tab-navigation" style={{ marginBottom: '30px' }}>
        <div className="tab-buttons" style={{ 
          display: 'flex', 
          gap: '0', 
          borderRadius: '8px', 
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa'
        }}>
          {['전체', '국내', '해외'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#333' : 'transparent',
                color: activeTab === tab ? '#fff' : '#666',
                fontSize: '14px',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderRight: tab !== '해외' ? '1px solid #e0e0e0' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.target.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {tab} ({tabCounts[tab]})
            </button>
          ))}
        </div>
      </div>

      {/* 포스트 리스트 */}
      <div className="recommend-list">
        {filteredPosts.map((post) => (
        <div className="recommend-item" key={post.slug}>
          <Link
            href={`${post.url}`} target="_blank"
            className="overflow-hidden transition border border-gray-200 cursor-pointer rounded-xl hover:shadow-lg"
          >
            <Image
              src={post.thumbnail}
              alt={post.title}
              className="object-cover w-full h-full"
              width={1600}
              height={800}
              quality={100}
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={true}
            />
          </Link>
          <div className="recommend-info">
            <div className="list-info">
              <h2 className="font-semibold lab-title">
                {post.title}
              </h2>
              <div className="stat-info">
                <div className="tech-stack">
                  {parseStackText(post.stack).map((category, index) => (
                    <div className="tech-category" key={index}>
                      <h4>{category.name}</h4>
                      {category.items.map((item, itemIndex) => {
                        // 버전 정보 분리 (숫자.숫자.숫자 패턴)
                        const versionMatch = item.match(/^(.+?)\s+(\d+\.\d+\.\d+)$/);
                        if (versionMatch) {
                          return (
                            <div className="tech-item" key={itemIndex}>
                              {versionMatch[1]} <em>{versionMatch[2]}</em>
                            </div>
                          );
                        } else {
                          return (
                            <div className="tech-item" key={itemIndex}>
                              {item}
                            </div>
                          );
                        }
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-1 mt-auto text-gray-400 lab-date">
                {post.date} by {post.author}
              </p>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}