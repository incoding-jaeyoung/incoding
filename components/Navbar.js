"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";


const Navbar = ({ onNavigate }) => {
  const router = useRouter();
  const handlePageTransition = (href) => {
    gsap.to(".page-container", {
      y: "-100vh",
      opacity: 1,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        setTimeout(() => {
          router.push(href);
        }, 300);
      },
    });
  };
  return (
    <nav className="z-10 gnb">
      <ul className="page-nav">
        <li className="hover:text-gray-500">
          <button onClick={() => handlePageTransition("/about")}>LAB</button>
        </li>
        <li className="hover:text-gray-500">
          <button onClick={() => handlePageTransition("/portfolio")}>INTERACTIVE SITES</button>
        </li>
      </ul>
      <ul className="flex space-x-4">
        <li className="hover:text-gray-500">
          <button onClick={() => handlePageTransition("/about")}>About</button>
        </li>
        <li className="hover:text-gray-500">
          <button onClick={() => handlePageTransition("/portfolio")}>Portfolio</button>
        </li>
        <li className="hover:text-gray-500">
          <button onClick={() => handlePageTransition("/contact")}>Contact</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
