"use client"
import React, { useEffect, useRef, useState } from "react";
import "../../styles/lab-page.css";
import LabWrapper from "../../components/LabWrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const posts = [
  {
    slug: "how-to-create-distortion-shaders",
    title: "How to Create Distortion and Grain Effects on Scroll",
    author: "Jan Kohlbach",
    date: "9 months ago",
    tags: ["glsl", "scroll", "three.js", "webgl"],
    thumbnail: "/images/portfolio/std1.jpeg"
  },
  {
    slug: "liquid-raymarching-threejs",
    title: "How to Create a Liquid Raymarching Scene Using Three.js Shading Language",
    author: "Ben McCormick",
    date: "9 months ago",
    tags: ["react-three-fiber", "three.js", "tsl", "webgl"],
    thumbnail: "/images/portfolio/std2.jpeg"
  },
  {
    slug: "animated-displaced-sphere",
    title: "Creating an Animated Displaced Sphere with a Custom Three.js Material",
    author: "Pavel Mazhuga",
    date: "9 months ago",
    tags: ["react-three-fiber", "shader", "sphere"],
    thumbnail: "/images/portfolio/std3.jpeg"
  },
  {
    slug: "interactive-particle-system",
    title: "Building an Interactive Particle System with Three.js",
    author: "Alex Smith",
    date: "8 months ago",
    tags: ["three.js", "particles", "webgl"],
    thumbnail: "https://picsum.photos/500/300?random=1"
  },
]

export default function BlogListPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

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
          router.push(`/lab/${slug}`);
      },
    });
  };

  return (
    <LabWrapper>
      <div id="contents" ref={containerRef} className="lab-page">
        <div className="lab-page-content">
          <div className="">
            <h1 className="mb-4font-bold">Demos Hub</h1>
            <p className="mb-10 text-gray-500">
              Our curated collection of GSAP and Three.js-based prototypes, animations, and experiments.
            </p>

            <div className="">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    onClick={() => handlePageTransition(post.slug)}
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
                            className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-lg font-semibold leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-400">
                        {post.date} by {post.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LabWrapper>
  )
}

// Note: Ensure the line-clamp plugin is included in the Tailwind CSS configuration.
