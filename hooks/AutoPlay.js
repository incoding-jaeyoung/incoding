"use client";
import { useEffect } from "react";

const useVideoAutoPlay = () => {
  useEffect(() => {
    const handleVideos = (videos) => {
      const handleIntersect = (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.setAttribute("autoplay", "true");
            video.setAttribute("playsinline", "true");
            video.setAttribute("webkit-playsinline", "true");
            video.setAttribute("muted", "true");
          
            setTimeout(() => {
              video.play().catch((error) => {
                if (error.name !== "AbortError") {
                  console.error("Video play error: ", error);
                }
              });
            }, 100); // 확실한 렌더 이후 실행
          } else {
            if (!video.paused) {
              video.pause();
              video.removeAttribute("preload");
            }
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        threshold: 0.3,
      });

      videos.forEach((video) => observer.observe(video));

      return () => observer.disconnect();
    };

    let videos = document.querySelectorAll("video");

    setTimeout(() => {
      videos = document.querySelectorAll("video"); // 다시 한 번 잡기
      handleVideos(videos);
    }, 500);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList.contains("clone")) {
              const newVideos = node.querySelectorAll("video");
              handleVideos(newVideos);
            }
          });
        }
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => mutationObserver.disconnect();
  }, []);
};

export default useVideoAutoPlay;
