import { useEffect } from "react";

export default function OptimizedVideo({ videoRef, src }) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ✅ Only run IntersectionObserver for mobile/tablet
    const isDesktop = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)"
    ).matches;
    if (isDesktop) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => console.warn("Autoplay blocked:", err));
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      className="aspect-video rounded-2xl"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
