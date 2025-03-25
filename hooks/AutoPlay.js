"use client";
import { useEffect } from "react";

const useVideoAutoPlay = () => {
  useEffect(() => {
    const handleVideos = (videos) => {
      const handleIntersect = (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (video.paused) {
              video.setAttribute("preload", "auto");
              video.play().catch((error) => {
                if (error.name !== "AbortError") {
                  console.error("Video play error: ", error);
                }
              });
            }
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
        threshold: 0,
      });

      videos.forEach((video) => observer.observe(video));

      return () => observer.disconnect();
    };

    let videos = document.querySelectorAll("video");
    handleVideos(videos);

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
