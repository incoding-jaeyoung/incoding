"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import styles from "../styles/Menu.module.css";

const AudioEQ = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const pathname = usePathname();

  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
    }
    return false;
  };

  const fadeOutVolume = (audioRef, duration, onComplete) => {
  const step = 0.05;
  const interval = duration / (1 / step);
  let currentVolume = audioRef.current?.volume || 0;
 
  const fadeOut = setInterval(() => {
    if (!audioRef.current) {
      clearInterval(fadeOut);
      return;
    }
    currentVolume = Math.max(0, currentVolume - step);
    audioRef.current.volume = currentVolume;
 
    if (currentVolume <= 0) {
      clearInterval(fadeOut);
      if (onComplete) onComplete();
    }
  }, interval);
  };

  const fadeInVolume = (audioRef, duration, onComplete) => {
  const step = 0.05;
  const interval = duration / (1 / step);
  let currentVolume = audioRef.current?.volume || 0;
 
  const fadeIn = setInterval(() => {
    if (!audioRef.current) {
      clearInterval(fadeIn);
      return;
    }
    currentVolume = Math.min(1, currentVolume + step);
    audioRef.current.volume = currentVolume;
 
    if (currentVolume >= 0.4) {
      clearInterval(fadeIn);
      if (onComplete) onComplete();
    }
  }, interval);
  };

  const handleToggleAnimation = () => {
    setIsAnimating((prev) => !prev);

    if (audioRef.current) {
      if (!audioRef.current.paused) {
        fadeOutVolume(audioRef, 3000, () => {
          audioRef.current.pause();
          setIsPlaying(false);
        });
      } else {
        audioRef.current.play();
        fadeInVolume(audioRef, 3000, () => {
          setIsPlaying(true);
        });
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;

      if (!isMobile()) {
        audioRef.current
          .play()
          .then(() => {
            fadeInVolume(audioRef, 10000);
            setIsAnimating(true);
          })
          .catch(() => {
            setIsAnimating(false);
          });
      } else {
        setIsAnimating(false);
        setIsPlaying(false);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && pathname.startsWith("/lab") || pathname.startsWith("/recommend")) {
      audioRef.current.pause();
      setIsAnimating(false);
      setIsPlaying(false);
    } else {
      // lab이 아닐 경우 자동 재생
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            fadeInVolume(audioRef, 1000);
            setIsAnimating(true);
            setIsPlaying(true);
          })
          .catch(() => {
            // 유저 인터랙션 없으면 재생 실패 가능성 있음
          });
      }
    }
  }, [pathname]);

  return (
    <div className={styles["eq"]}>
      <audio
        ref={audioRef}
        src="/media/music.mp3"
        preload="auto"
        playsInline
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = 0;
          }
        }}
      />
      <button
        type="button"
        className={styles["btn-eq"]}
        onClick={handleToggleAnimation}
      >
        <div className={styles["eq-wrap"]}>
          <div
            className={`${styles.bars} ${isAnimating ? styles.animating : styles.paused}`}
          >
            <span className={styles["bar"]}></span>
            <span className={styles["bar"]}></span>
            <span className={styles["bar"]}></span>
            <span className={styles["bar"]}></span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default AudioEQ;
