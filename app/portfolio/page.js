"use client";

import dynamic from "next/dynamic";

const PortfolioPage = dynamic(() => import("../../components/PortfolioPage"), {
  ssr: false,
});

export default PortfolioPage;