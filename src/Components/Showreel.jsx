import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import videoShowreel from "../../public/assets/videos/hero-video-compressed.mp4";
gsap.registerPlugin(ScrollTrigger);

export default function Showreel({ isPreloaderDone }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const showcaseRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoScrollRef = useRef(null);
  const videoContainerRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 767px)", // Mobile
        tablet: "(min-width: 768px) and (max-width: 1023px)", // Tablet
        desktop: "(min-width: 1024px)", // Desktop
      },
      (context) => {
        const { mobile, tablet, desktop } = context.conditions;

        if (mobile) {
          // Mobile settings - NO SCALE
          gsap.set(videoWrapperRef.current, {
            transformOrigin: "top right",
            translateY: "-100svh",
          });
        } else if (tablet) {
          // Tablet settings - NO SCALE
          gsap.set(videoWrapperRef.current, {
            transformOrigin: "top right",
            translateY: "-90vh",
          });
        } else if (desktop) {
          const baseY = -55;
          // Desktop settings - WITH SCALE
          gsap.set(videoWrapperRef.current, {
            scale: 0.35,
            transformOrigin: "top right",
            translateY: `${baseY}vh`,
          });
          gsap.to(videoWrapperRef.current, {
            y: "0vh",
            scale: 1,
            scrollTrigger: {
              trigger: videoScrollRef.current,
              start: "top-=100 center+=200",
              end: "center center+=200",
              scrub: true,
              snap: {
                snapTo: 1,
                duration: { min: 0.2, max: 0.8 },
                delay: 0.05,
                ease: "power1.inOut",
              },
            },
          });
          const handleMouseMove = (e) => {
            const windowCenter = window.innerHeight / 2;
            const rawOffset = (e.clientY - windowCenter) * 0.1; // sensitivity multiplier

            // Get current scale from GSAP
            const currentScale = gsap.getProperty(
              videoWrapperRef.current,
              "scale"
            );

            const minScale = 0.35; // your default scale
            const maxScale = 1; // final scale when zoomed in

            // Normalize progress between 0 and 1
            const progress = Math.min(
              Math.max((currentScale - minScale) / (maxScale - minScale), 0),
              1
            );

            // Interpolate between -35 (at scale 0.35) and 0 (at scale 1)
            const minOffset = gsap.utils.interpolate(-38, 0, progress);

            const maxOffset = 0; // Always fixed downward boundary
            const clampedOffset = Math.max(
              minOffset,
              Math.min(rawOffset, maxOffset)
            );

            gsap.to(videoWrapperRef.current, {
              yPercent: clampedOffset,
              duration: 0.4,
              ease: "power3.out",
            });
          };

          const handleWheel = (e) => {
            if (e.deltaY > 0) {
              // Scrolling down
              gsap.fromTo(
                videoWrapperRef.current,
                {
                  yPercent: gsap.getProperty(
                    videoWrapperRef.current,
                    "yPercent"
                  ),
                },
                {
                  yPercent: 0,
                  duration: 1,
                  ease: "expo.out",
                }
              );
            }
          };

          window.addEventListener("mousemove", handleMouseMove);
          window.addEventListener("wheel", handleWheel);

          // Cleanup
          return () => {
            window.removeEventListener("mousemove", handleMouseMove);
          };
        }
      }
    );

    return () => mm.revert(); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (!isPreloaderDone || !videoScrollRef.current) return;

    gsap.from(videoWrapperRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 0.8,
      delay: 0.1,
      ease: "expo.out",
    });
  }, [isPreloaderDone]);

  return (
    <section ref={showcaseRef}>
      <div
        className="bg-stone-50 h-0 lg:h-screen w-screen p-5 relative overflow-visible"
        ref={videoContainerRef}
      >
        <div
          className="video-preview relative overflow-visible w-full h-full"
          ref={videoScrollRef}
        >
          <div
            className="video-wrapper overflow-hidden absolute top-0 left-0 w-full h-fit rounded-2xl md:rounded-4xl"
            ref={videoWrapperRef}
          >
            {/* Video */}
            <video
              ref={videoRef}
              src={videoShowreel}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full pointer-events-none rounded-2xl md:rounded-4xl origin-bottom" // prevents blocking button clicks
            ></video>

            {/* Full-area invisible button */}
            <button
              onClick={toggleMute}
              className="absolute inset-0 z-10 cursor-pointer h-full"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            ></button>
          </div>
        </div>
      </div>
    </section>
  );
}
