"use client";
import React, { useEffect, useRef, useState } from "react"
import "/styles/lab-page.css"
import LabWrapper from "/components/LabWrapper"
import Header from "/components/Header"
import styles from "./style.module.css";
import { initScrollAnimation } from "/components/LenisScroll"
import { lensRefraction } from "./ui"

export default function LensRefractionPage() {
  const boxRef = useRef(null);
  useEffect(() => {
    initScrollAnimation();
    lensRefraction(boxRef);
  }, []);

  return (
    <LabWrapper>
      <div id="contents" className="lab-container">
        <Header />
        <main className={styles.page}>
          <section className={styles.section}>Intro</section>
          <section className={styles.section}>
            <div className={styles.box} ref={boxRef}>Box</div>
          </section>
          <section className={styles.section}>Outro</section>
        </main>
      </div>
    </LabWrapper>
  );
}

// SEO
// export const metadata = {
//   title: "Lens Refraction | Incoding Lab",
//   description: "빛의 굴절을 기반으로 한 인터랙션 데모",
// };