import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Background from "/images/project-img-1.jpg";
import VideoDefault from "/videos/hero-video-compressed.mp4";
import OptimizedVideo from "./OptimizedVideo";
gsap.registerPlugin(ScrollTrigger);

export default function Project({
  Image = Background,
  Name = "Project name",
  Year = "20xx",
  Video = VideoDefault,
  Url = "https://google.com",
}) {
  const projectRef = useRef(null);
  const backgroundRef = useRef(null);
  const infoBarRef = useRef(null);
  const videoRef = useRef(null);
  const linkRef = useRef(null);

  /** 🔹 Parallax Effect */
  useEffect(() => {
    if (
      !projectRef.current ||
      !backgroundRef.current ||
      !infoBarRef.current ||
      !videoRef.current
    )
      return;

    const isDesktop = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)"
    ).matches;

    // ✅ Desktop: hide video initially
    if (isDesktop) {
      gsap.set(videoRef.current, {
        yPercent: 100,
        scale: 0,
        transformOrigin: "center bottom",
      });
    } else {
      // ✅ Mobile: show video by default
      gsap.set(videoRef.current, {
        yPercent: 0,
        scale: 1,
      });
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: projectRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(backgroundRef.current, { y: "-10%", ease: "none" }, 0)
        .to(infoBarRef.current, { y: "-20%", ease: "none" }, 0);
    }, projectRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  /** 🔹 Hover Animations with GSAP MatchMedia */
  useEffect(() => {
    if (!projectRef.current || !backgroundRef.current || !videoRef.current)
      return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        // Define conditions
        isDesktop: "(pointer: fine) and (min-width: 1024px)",
        isMobile: "(pointer: coarse) or (max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const vidEl = videoRef.current;
        const bgEl = backgroundRef.current;
        const projectEl = projectRef.current;
        const linkEl = linkRef.current;

        if (isDesktop) {
          // Desktop: hide video by default
          gsap.set(vidEl, {
            yPercent: 100,
            scale: 0,
            transformOrigin: "center bottom",
          });

          const handleMouseEnter = () => {
            if (!vidEl) return;
            gsap.killTweensOf([vidEl, bgEl, linkEl]);

            // ✅ Safe play attempt
            vidEl.play().catch((err) => {
              console.warn("Video play was blocked:", err);
            });

            gsap.to(bgEl, {
              filter: "blur(8px)",
              scale: 1.05,
              duration: 0.4,
              ease: "power3.out",
            });
            gsap.to(vidEl, {
              yPercent: 0,
              scale: 1,
              duration: 1,
              ease: "expo.out",
            });
            gsap.to(linkEl, {
              yPercent: -50,
              duration: 1,
              ease: "expo.out",
            });
          };

          const handleMouseLeave = () => {
            if (!vidEl) return;
            gsap.killTweensOf([vidEl, bgEl, linkEl]);

            gsap.to(bgEl, {
              filter: "blur(0px)",
              scale: 1,
              duration: 0.4,
              ease: "power3.inOut",
            });
            gsap.to(vidEl, {
              yPercent: 100,
              scale: 0,
              duration: 0.6,
              ease: "power3.in",
              onComplete: () => {
                vidEl.pause();
                vidEl.currentTime = 0;
              },
            });
            gsap.to(linkEl, {
              yPercent: 0,
              duration: 1,
              ease: "expo.out",
            });
          };

          projectEl.addEventListener("mouseenter", handleMouseEnter);
          projectEl.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            projectEl.removeEventListener("mouseenter", handleMouseEnter);
            projectEl.removeEventListener("mouseleave", handleMouseLeave);
          };
        }

        {
          /*if (isMobile) {
          // Mobile & tablet: show video by default
          gsap.set(vidEl, { yPercent: 0, scale: 1 });
          vidEl.play();
        }*/
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={projectRef}
      className="relative h-full w-full overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Parallax Background */}{" "}
      <div className="project-background relative w-full h-full overflow-hidden">
        {" "}
        <a href={Url} target="_blank" rel="noopener noreferrer">
          <div className="absolute inset-0 overflow-hidden">
            <div
              ref={backgroundRef}
              className="w-full h-[120%] bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${Image})` }}
            />
            <div className="overlay absolute inset-0 bg-black z-10 pointer-events-none"></div>
          </div>
          {/* Video */}
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="project-detail w-2/3 overflow-hidden aspect-video">
              {Video && <OptimizedVideo src={Video} videoRef={videoRef} />}
            </div>
          </div>{" "}
        </a>
      </div>
      {/* Info Bar */}
      <div
        ref={infoBarRef}
        className="relative w-full flex justify-between items-center px-5 lg:px-0 py-4 z-20"
      >
        <span className="font-primary font-bold text-xl">
          {Name.toUpperCase()}
        </span>
        <div className="h-1/2 overflow-hidden">
          <div ref={linkRef} className="flex flex-col-reverse lg:flex-col">
            <span className="font-primary font-medium text-xl text-right">
              {Year}
            </span>
            <div className="flex gap-2 items-center">
              <span className="font-primary font-semibold text-xl text-right">
                View Project
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[clamp(14px,1vw,24px)] h-[clamp(14px,1vw,24px)] text-stone-700"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
