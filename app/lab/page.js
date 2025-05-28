"use client"
import React, { useEffect, useRef, useState } from "react";
import "/styles/lab-page.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import Header from "/components/Header";

export default function BlogListPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // SEO 메타 태그 설정
  useEffect(() => {
    const updateMetaTags = () => {
      // 페이지 제목 설정
      document.title = "Interactions - 웹 인터랙션 예제 모음 | 포트폴리오";
      
      // 기존 description 메타 태그 찾기 및 업데이트
      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', '웹사이트 제작시 랜딩페이지 및 메인 페이지에 사용할 수 있는 인터랙션 예제들을 모아둔 페이지입니다. GSAP, CSS 애니메이션, JavaScript를 활용한 다양한 웹 인터랙션을 확인해보세요.');
      } else {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.name = 'description';
        descriptionMeta.content = '웹사이트 제작시 랜딩페이지 및 메인 페이지에 사용할 수 있는 인터랙션 예제들을 모아둔 페이지입니다. GSAP, CSS 애니메이션, JavaScript를 활용한 다양한 웹 인터랙션을 확인해보세요.';
        document.head.appendChild(descriptionMeta);
      }
      
      // keywords 메타 태그
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', '웹 인터랙션, GSAP, CSS 애니메이션, JavaScript, 웹 애니메이션, 프론트엔드, 웹개발, 인터랙션 디자인, 모션 그래픽');
      } else {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.name = 'keywords';
        keywordsMeta.content = '웹 인터랙션, GSAP, CSS 애니메이션, JavaScript, 웹 애니메이션, 프론트엔드, 웹개발, 인터랙션 디자인, 모션 그래픽';
        document.head.appendChild(keywordsMeta);
      }
      
      // Open Graph 태그들
      const ogTags = [
        { property: 'og:title', content: 'Interactions - 웹 인터랙션 예제 모음' },
        { property: 'og:description', content: '웹사이트 제작시 랜딩페이지 및 메인 페이지에 사용할 수 있는 인터랙션 예제들을 모아둔 페이지입니다.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://incoding.co.kr/lab' },
        { property: 'og:image', content: '/images/og-lab.jpg' },
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
        { name: 'twitter:title', content: 'Interactions - 웹 인터랙션 예제 모음' },
        { name: 'twitter:description', content: '웹사이트 제작시 랜딩페이지 및 메인 페이지에 사용할 수 있는 인터랙션 예제들을 모아둔 페이지입니다.' },
        { name: 'twitter:image', content: '/images/twitter-lab.jpg' }
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
        canonicalLink.setAttribute('href', 'https://incoding.co.kr/lab');
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', 'https://incoding.co.kr/lab');
        document.head.appendChild(canonicalLink);
      }
    };
    
    updateMetaTags();
    
    return () => {
      // 컴포넌트 언마운트 시 정리 (선택사항)
    };
  }, []);
  useEffect(() => {
    fetch("https://incodingco.mycafe24.com/wp-json/wp/v2/posts?categories=2&_embed")
      .then(res => res.json())
      .then(data => {
        const formattedPosts = data.map(post => ({
          slug: post.slug,
          title: post.title.rendered,
          date: new Date(post.date).toLocaleDateString(),
          author:  "Incoding",
          tags: post._embedded?.["wp:term"]?.[1]?.map(tag => tag.name) || [],
          thumbnail: post.acf?.thumbnail?.url || post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/portfolio/std1.jpeg",
          url: post.acf?.path_name || []
        }));
        setPosts(formattedPosts);
      });
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 페이징 계산
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 페이지 변경 시 스크롤을 맨 위로
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageTransition = (url) => {
    if (!isMounted) return;

    const navigate = () => {
      router.push(`/lab/${url}`);
    };

    // If coming from a popstate (back/forward), we won't animate
    if (performance.getEntriesByType("navigation")[0]?.type === "back_forward") {
      navigate();
      return;
    }

    gsap.to(containerRef.current, {
      y: "-100vh",
      duration: 0.6,
      ease: "power2.in",
      onComplete: navigate,
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { y: "-100vh" },
          { y: "0", duration: 0.6, ease: "power2.out" }
        );
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    // <LabWrapper>
      
      <div id="contents" className="lab-container">
        <Header />
        <div className="lab-page-wrap list">
          <h1 className="lab-title">Interactions</h1>
          <p className="lab-sub-title">
            웹사이트 제작시 랜딩페이지 및 메인 페이지에 사용할 수 있는 인터랙션 예제들을 모아둔 페이지입니다.
          </p>
          <div className="lab-list-list">
            {currentItems.map((post) => (
              <Link
                key={post.slug}
                href={`/lab/${post.url}`}
                className="overflow-hidden transition border border-gray-200 cursor-pointer rounded-xl hover:shadow-lg"
              >
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  className="object-cover w-full"
                  width={500} // Specify width for Image component
                  height={200} // Specify height for Image component
                />
                <div className="list-info">
                  <div className="tag-line">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-semibold lab-title">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-gray-400 lab-date">
                    {post.date} by {post.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    // </LabWrapper>
  )
}

// Note: Ensure the line-clamp plugin is included in the Tailwind CSS configuration.
