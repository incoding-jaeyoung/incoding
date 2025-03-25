"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "../styles/Menu.module.css";

const AudioEQ = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
    }
    return false;
  };

  const fadeOutVolume = (audioRef, duration, onComplete) => {
    const step = 0.05;
    const interval = duration / (1 / step);
    let currentVolume = audioRef.current.volume;

    const fadeOut = setInterval(() => {
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
    let currentVolume = audioRef.current.volume;

    const fadeIn = setInterval(() => {
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
        fadeOutVolume(audioRef, 1000, () => {
          audioRef.current.pause();
          setIsPlaying(false);
        });
      } else {
        audioRef.current.play();
        fadeInVolume(audioRef, 1000, () => {
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
