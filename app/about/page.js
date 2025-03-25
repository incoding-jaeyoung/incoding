"use client";

import dynamic from "next/dynamic";

const AboutContent = dynamic(() => import("../../components/AboutPage"), {
  ssr: false, // ← 여기서 SSR 막음
});

export default function Page() {
  return <AboutContent />;
}