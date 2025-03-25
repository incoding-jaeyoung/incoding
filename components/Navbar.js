"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="z-10 bg-white gnb">
      <ul className="flex space-x-4 text-white">
        <li className="">
          <button onClick={() => onNavigate("/about")}>About</button>
        </li>
        <li className="">
          <button onClick={() => onNavigate("/portfolio")}>Portfolio</button>
        </li>
        <li className="">
          <button onClick={() => onNavigate("/contact")}>Contact</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
