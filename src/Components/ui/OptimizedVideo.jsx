import { useEffect, useState } from "react";
import gsap from "gsap";

export default function OptimizedVideo({ videoRef, src }) {
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
          // Re-attach video source
          setVideoSrc(src);

          video.play().catch((err) => console.warn("Autoplay blocked:", err));

          /** 🔹 Animate video on reveal */
          gsap.fromTo(
            video,
            {
              yPercent: 20, // start slightly below
              scale: 0.85, // slightly scaled down
              opacity: 0,
              transformOrigin: "bottom center",
            },
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
            }
          );
        } else {
          /** 🔹 Animate hide before unloading */
          gsap.to(video, {
            yPercent: 20,
            scale: 0.85,
            opacity: 0,
            duration: 0.6,
            ease: "expo.in",
            onComplete: () => {
              video.pause();
              video.removeAttribute("src"); // unload video resource
              video.load(); // reset internal state
              setVideoSrc(null);
            },
          });
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
      className="aspect-video rounded-2xl will-change-transform"
      src={videoSrc || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none" // 🚀 prevents preloading until visible
    />
  );
}
