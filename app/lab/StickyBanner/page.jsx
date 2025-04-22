'use client'

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from "/components/Header";
import imagesLoaded from 'imagesloaded';
import "/styles/lab-page.css";

// Simple animated WebGL background using react-three-fiber
function BackgroundShader() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.1;
      mesh.current.rotation.y = t * 0.1;
    }
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[20, 32, 32]} />
      <meshBasicMaterial color={'#70e000'} wireframe />
    </mesh>
  );
}

export default function StickyBannerPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Variable to store the Lenis smooth scrolling object
    let lenis;

    // Selecting DOM elements
    const contentElements = [...document.querySelectorAll('.content--sticky')];

    // Initializes Lenis for smooth scrolling with specific properties
    const initSmoothScrolling = () => {
      // Instantiate the Lenis object with specified properties
      lenis = new Lenis({
        lerp: 0.2, // Lower values create a smoother scroll effect
        smoothWheel: true // Enables smooth scrolling for mouse wheel events
      });

      // Update ScrollTrigger each time the user scrolls
      lenis.on('scroll', () => ScrollTrigger.update());

      // Define a function to run at each animation frame
      const scrollFn = (time) => {
        lenis.raf(time); // Run Lenis' requestAnimationFrame method
        requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
      };
      // Start the animation frame loop
      requestAnimationFrame(scrollFn);
    };

    // Function to handle scroll-triggered animations
    const scroll = () => {
      contentElements.forEach(el => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'center center',
            end: 'max',
            scrub: true
          }
        })
        .to(el, {
          ease: 'none',
          startAt: {filter: 'blur(0px)'},
          filter: 'blur(3px)',
          scrollTrigger: {
            trigger: el,
            start: 'center center',
            end: '+=100%',
            scrub: true
          }
        }, 0)
        .to(el, {
          ease: 'none',
          scale: 0.4,
          yPercent: -50
        }, 0)
      });
    };

    // Initialization function
    const init = () => {
      initSmoothScrolling(); // Initialize Lenis for smooth scrolling
      scroll(); // Apply scroll-triggered animations
    };

      // Once images are preloaded, remove the 'loading' indicator/class from the body
      document.body.classList.remove('loading');
      init();

    return () => {
      // Cleanup logic if necessary
    };
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <Canvas>
          <BackgroundShader />
        </Canvas>
      </div>
      <link rel="stylesheet" href="/lab/StickyBanner/css/base.css" />
      <Header />
      <main className='lab-page-wrap'>
        <header className="frame frame--header" style={{ backgroundImage: 'url(/lab/StickyBanner/img/10.png)', backgroundSize: '50%', backgroundPosition: 'right' }}>
				<div className="frame__heading">
					<h2 className="content__title"><i>STICKY</i> BANNER</h2>
					<p className="text-meta">An exploration of the Synthetic Era.</p>
				</div>
			</header>
			<div className="wrap">
				<div className="content content--sticky content--card bg-1">
					<img className="content__img content__img--small" src="/lab/StickyBanner/img/11.png" alt="The Algorithm" />
					<h2 className="content__title"><i>The</i> FLOWER</h2>
					<p className="content__text text-meta">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
				</div>
				<div className="content content--sticky content--card bg-2">
					<img className="content__img content__img--small" src="/lab/StickyBanner/img/9.png" alt="The Dogma" />
					<h2 className="content__title"><i>The</i> REPAIR MANUAL</h2>
					<p className="content__text text-meta">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel odio facilis id dicta excepturi sint optio</p>
				</div>
				<div className="content content--sticky content--card bg-3">
					<img className="content__img content__img--small" src="/lab/StickyBanner/img/12.png" alt="The Architects" />
					<h2 className="content__title"><i>VITRUVIAN</i> FRUIT</h2>
					<p className="content__text text-meta">Where nature slices symmetry into chaos.</p>
				</div>
				<div className="content content--sticky content--card bg-4">
					<img className="content__img content__img--small" src="/lab/StickyBanner/img/8.png" alt="The Wasteland" />
					<h2 className="content__title"><i>The</i> FERTILE VOID</h2>
					<p className="content__text text-meta">It’s not the road that defines you. It’s what grows off-track.</p>
				</div>
				<div className="content content--sticky content--card bg-5">
					<img className="content__img content__img--small" src="/lab/StickyBanner/img/7.png" alt="The Narrative" />
					<h2 className="content__title"><i>The</i> Narrative</h2>
					<p className="content__text text-meta">Narratives don’t fly straight. They drift like butterflies.</p>
				</div>
				<div className="content content--sticky content--card bg-6">
					<img className="content__img content__img--small" src="/lab/StickyBanner/img/10.png" alt="The Opulence" />
					<h2 className="content__title"><i>SOUR</i> LUXURY</h2>
					<p className="content__text text-meta">Opulence isn’t always sweet. It just shines harder.</p>
				</div>
			</div>
			<div className="content content--highlight content--outro">
				<p className="text-large">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores magnam culpa vitae voluptates ratione corrupti, delectus consequuntur sit molestias, nostrum natus voluptatem impedit non fuga laboriosam expedita quidem sunt ea?</p> 
				<img className="content__img spacer" src="/lab/StickyBanner/img/12.png" alt="Outro" />
			</div>
      </main>
      <script type="module" src="/lab/StickyBanner/js/demo8/index.js"></script>
    </>
  );
}