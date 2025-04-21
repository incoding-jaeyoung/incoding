"use client"
import React, { useEffect, useRef, useState } from "react";
import "/styles/lab-page.css";
import LabWrapper from "/components/LabWrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import Header from "/components/Header";

export default function RecommendPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://incodingco.mycafe24.com/wp-json/wp/v2/posts?categories=6&_embed")
      .then(res => res.json())
      .then(data => {
        const formattedPosts = data.map(post => ({
          slug: post.slug,
          title: post.title.rendered,
          date: new Date(post.date).toLocaleDateString(),
          author: "Incoding",
          tags: post._embedded?.["wp:term"]?.[1]?.map(tag => tag.name) || [],
          thumbnail:
            post.acf?.site_image?.url ||
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/images/portfolio/std1.jpeg",
          sub_title: post.acf?.site_title,
          url: post.acf?.site_url
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

  return (
    // <LabWrapper>
      <div id="contents" className="lab-container">
        <Header />
        <div className="lab-page-list">
          <h1 className="mb-4font-bold">Demos Hub</h1>
          <p className="mb-10 text-gray-500">
            Our curated collection of GSAP and Three.js-based prototypes, animations, and experiments.
          </p>

          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/recommend/${post.slug}`}
                  className="overflow-hidden transition border border-gray-200 cursor-pointer rounded-xl hover:shadow-lg"
                >
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    className="object-cover w-full"
                    width={500} // Specify width for Image component
                    height={200} // Specify height for Image component
                  />
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-gray-700 bg-gray-100 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-semibold leading-snug ">
                      {post.title}
                    </h2>
                    <p>{post.url}</p>
                    <p>{post.sub_title}</p>
                    <p className="mt-1 text-gray-400">
                      {post.date} by {post.author}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    // </LabWrapper>
  )
}

// Note: Ensure the line-clamp plugin is included in the Tailwind CSS configuration.
