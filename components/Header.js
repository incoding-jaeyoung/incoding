import React from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";
const Header = () => {
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
    <header className="header">
      <h1>
        <button onClick={() => handlePageTransition("/")}>
          <Image
            src="/images/img-logo.svg"
            alt="Logo"
            width={30}
            height={0}
            className=""
          />
          {/* INCODING */}
        </button>
        {/* <Link href="/" className="flex items-end gap-10">
          INCODING
          <Image
            src="/images/img-logo.svg"
            alt="Logo"
            width={30}
            height={0}
            className=""
          />
          <p className="flex items-end gap-10 font-extrabold text-gray-800 text-20">
            incoding
            <span className="font-normal text-14">interactive web studio</span>
          </p>
        </Link> */}
      </h1>

      <nav className="z-10 gnb">
        <ul className="page-nav">
          <li className="hover:text-gray-500">
            <button onClick={() => handlePageTransition("/lab")}>LAB</button>
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
    </header>
  );
};

export default Header;
