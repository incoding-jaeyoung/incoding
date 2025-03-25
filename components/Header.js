import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

const Header = () => {
  return (
    <header className="fixed z-50 flex items-center justify-between w-full p-20 bg-white shadow-md">
      <h1 className="transition-transform duration-300 transform hover:scale-105">
        <Link href="/" className="flex items-end gap-10">
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
        </Link>
      </h1>

      <Navbar />
    </header>
  );
};

export default Header;
