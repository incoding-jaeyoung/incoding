"use client"
import React, { use } from "react"
import "../../../styles/lab-page.css";
import LabWrapper from "../../../components/LabWrapper"
import Image from "next/image"
import Header from "../../../components/Header"
const posts = [
  {
    slug: "how-to-create-distortion-shaders",
    title: "How to Create Distortion and Grain Effects on Scroll",
    content: "<p>This post demonstrates scroll-linked grain and distortion effects using GLSL and GSAP.</p>",
    thumbnail: "/images/portfolio/std1.jpeg"
  },
  {
    slug: "liquid-raymarching-threejs",
    title: "How to Create a Liquid Raymarching Scene Using Three.js Shading Language",
    content: "<p>This post explores raymarching techniques using Three.js with TSGL shaders.</p>",
    thumbnail: "/images/portfolio/std2.jpeg"
  },
  {
    slug: "animated-displaced-sphere",
    title: "Creating an Animated Displaced Sphere with a Custom Three.js Material",
    content: "<p>This article covers animated material setups for 3D objects using GLSL and noise functions.</p>",
    thumbnail: "/images/portfolio/std3.jpeg"
  },
  {
    slug: "interactive-particle-system",
    title: "Building an Interactive Particle System with Three.js",
    content: "<p>Learn how to create an interactive particle system using Three.js and WebGL.</p>",
    thumbnail: "https://picsum.photos/500/300?random=1"
  },
  {
    slug: "shader-materials-intro",
    title: "Introduction to Shader Materials in Three.js",
    content: "<p>An introductory guide to creating and using shader materials in Three.js.</p>",
    thumbnail: "https://picsum.photos/500/300?random=2"
  },
  {
    slug: "advanced-gsap-timelines",
    title: "Mastering Advanced GSAP Timelines for Complex Animations",
    content: "<p>Advanced techniques for creating complex animations using GSAP timelines.</p>",
    thumbnail: "https://picsum.photos/500/300?random=3"
  }
]

export default function LabDetailPage(props) {
  const { slug } = use(props.params)
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <div className="p-10 text-center">Post not found</div>

  return (
    <LabWrapper>
      <div id="contents" className="lab-container">
        <Header />
        <div className="lab-page-content">
          <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
          <Image src={post.thumbnail} alt={post.title} width={800} height={400} className="mb-6 rounded" />
          <div
            className="prose prose-lg text-gray-700 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </LabWrapper>
  )
}
