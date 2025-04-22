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
            {posts.map((post) => (
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
        </div>
      </div>
    // </LabWrapper>
  )
}

// Note: Ensure the line-clamp plugin is included in the Tailwind CSS configuration.
