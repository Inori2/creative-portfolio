import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
            translateY: "-140svh",
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
              start: "top-=200 center+=200",
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

            // --- NEW LOGIC ---
            const videoBlock = videoScrollRef.current;
            const videoBlockRect = videoBlock.getBoundingClientRect();

            // Check if the video block has reached the end
            const isAtEnd = videoBlockRect.bottom <= window.innerHeight;

            // If at the end, minOffset becomes 0
            const minOffset = isAtEnd ? 0 : -35;

            // Normal clamping logic
            const maxOffset = 0;
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
        className="bg-stone-50 h-screen w-screen p-5 relative overflow-visible"
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
              src="/src/assets/videos/hero-video-compressed.mp4"
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

            {/* Small button at the corner for visual feedback */}
            <div className="absolute hidden md:bottom-8 md:right-8 z-20">
              <div className="bg-neutral-100/50 shadow-2xl backdrop-blur-2xl w-[4vw] h-[4vw] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                {isMuted ? (
                  // Volume OFF icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lucide lucide-volume-x w-[2vw] h-[2vw] text-neutral-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                    <line x1="22" y1="9" x2="16" y2="15"></line>
                    <line x1="16" y1="9" x2="22" y2="15"></line>
                  </svg>
                ) : (
                  // Volume ON icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lucide lucide-volume-2 w-[2vw] h-[2vw] text-neutral-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
                    <path d="M16 9a5 5 0 0 1 0 6"></path>
                    <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
