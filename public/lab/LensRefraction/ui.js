

// 예제 애니메이션
gsap.from(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    end: "bottom top",
    scrub: true,
    markers: true,
  },
  y: 200,
  opacity: 0,
})