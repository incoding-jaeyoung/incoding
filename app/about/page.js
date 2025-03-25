"use client";

import dynamic from "next/dynamic";

const AboutPage = dynamic(() => import("../../components/AboutPage"), {
  ssr: false,
});

export default AboutPage;