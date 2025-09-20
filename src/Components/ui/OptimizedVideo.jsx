import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function OptimizedVideo({ videoRef, src }) {
  const [videoSrc, setVideoSrc] = useState(src); // Only dynamic on mobile
  const loadTimeoutRef = useRef(null); // store timeout so we can clear it

  const LOAD_DELAY = 200; // 500ms = 0.5s delay before loading

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ✅ Check device
    const isDesktop = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)"
    ).matches;

    // 💻 Desktop -> Keep normal behavior
    if (isDesktop) {
      video.src = src;
      return;
    }

    // 📱 Mobile / Tablet -> Optimize with IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay before starting to load video
          loadTimeoutRef.current = setTimeout(() => {
            setVideoSrc(src);

            // Wait until metadata is loaded before animating
            const handleLoadedData = () => {
              video
                .play()
                .catch((err) => console.warn("Autoplay blocked:", err));

              /** Animate video reveal AFTER load */
              gsap.fromTo(
                video,
                {
                  yPercent: 20,
                  scale: 0.85,
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

              video.removeEventListener("loadeddata", handleLoadedData);
            };

            video.addEventListener("loadeddata", handleLoadedData);
          }, LOAD_DELAY); // <-- delay here
        } else {
          // Cancel pending load if user scrolls away quickly
          if (loadTimeoutRef.current) {
            clearTimeout(loadTimeoutRef.current);
            loadTimeoutRef.current = null;
          }

          /** Animate hide BEFORE unloading */
          gsap.to(video, {
            yPercent: 20,
            scale: 0.85,
            opacity: 0,
            duration: 0.6,
            ease: "expo.in",
            onComplete: () => {
              // Once animation ends, pause & unload
              video.pause();
              video.removeAttribute("src");
              video.load();
              setVideoSrc(null);
            },
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
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
      preload="none" // 🚀 Mobile won't preload until visible
    />
  );
}
