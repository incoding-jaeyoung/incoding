gsap.registerPlugin(ScrollTrigger);
$(function () {
  const lenis = new Lenis({
    smooth: true,
    duration: 1.2,
  })
  
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
  
  // ScrollTrigger와 Lenis 동기화
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  ScrollTrigger.defaults({ scroller: window })
  ScrollTrigger.refresh()
});

