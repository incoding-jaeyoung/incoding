// ui.js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function lensRefraction(boxRef) {
  if (!boxRef?.current) return;

  gsap.from(boxRef.current, {
    scrollTrigger: {
      trigger: boxRef.current,
      start: 'top 80%',
      end: 'bottom top',
      scrub: true,
      markers: true,
    },
    y: 200,
    opacity: 0,
  });
}