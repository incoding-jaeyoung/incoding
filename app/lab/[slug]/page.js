"use client"
import React, { useEffect, useState } from "react"
import "/styles/lab-page.css"
import LabWrapper from "/components/LabWrapper"
import Image from "next/image"
import Header from "/components/Header"
import { useParams } from "next/navigation"

export default function LabDetailPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://incodingco.mycafe24.com/wp-json/wp/v2/posts?slug=${slug}&_embed`)
        const data = await res.json()
        if (data.length > 0) {
          const post = data[0]
          setPost({
            title: post.title.rendered,
            content: post.content.rendered,
            thumbnail: post.acf?.thumbnail?.url || null,
            mainImage: post.acf?.main_image?.url || null,
            description: post.acf?.description || null,
            code: post.acf?.code || null
          })
        }
      } catch (err) {
        console.error("Error fetching post:", err)
      }
    }

    fetchPost()
  }, [slug])

  if (!post) return <div className="p-10 text-center">Loading...</div>

  return (
    <LabWrapper>
      <div id="contents" className="lab-container">
        <Header />
        <div className="lab-page-content">
          <h1 className="mb-4 font-bold" dangerouslySetInnerHTML={{ __html: post.title }} />
          {post.thumbnail && (
            <Image src={post.thumbnail} alt={post.title} width={800} height={200} className="mb-6 rounded" />
          )}
          {post.mainImage && (
            <Image
              src={post.mainImage}
              alt="본문 이미지"
              width={1000}
              height={300}
              className="mb-6 rounded"
            />
          )}

          {post.description && (
            <div
              className="mb-4 text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          )}

          {post.code && (
            <pre className="p-4 overflow-auto text-gray-100 bg-gray-800 rounded-md">
              <code>{post.code}</code>
            </pre>
          )}
          <div
            className="text-gray-700 "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </LabWrapper>
  )
}
