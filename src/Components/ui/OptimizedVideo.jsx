import { useEffect, useState } from "react";

export default function OptimizedVideo({ videoRef, src }) {
  const [isVisible, setIsVisible] = useState(true);
  const [videoSrc, setVideoSrc] = useState(src); // dynamically attach/remove video source

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ✅ Only run IntersectionObserver for mobile/tablet
    const isDesktop = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)"
    ).matches;
    if (isDesktop) return; // Skip observer on desktop

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Show video and reload src
          setIsVisible(true);
          setVideoSrc(src); // Re-attach video source

          video.play().catch((err) => console.warn("Autoplay blocked:", err));
        } else {
          // Hide and completely unload video
          setIsVisible(false);
          video.pause();
          video.removeAttribute("src"); // unload video resource
          video.load(); // reset internal state
          setVideoSrc(null); // clear state
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef, src]);

  return (
    <video
      ref={videoRef}
      className={`aspect-video rounded-2xl transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      src={videoSrc || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none" // 🚀 prevent preloading resources until needed
    />
  );
}
