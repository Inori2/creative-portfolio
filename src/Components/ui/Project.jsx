import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Background from "../../assets/images/project-img-1.jpg";
import VideoDefault from "../../assets/videos/hero-video-compressed.mp4";
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
    if (!projectRef.current || !backgroundRef.current || !infoBarRef.current)
      return;
    gsap.set(videoRef.current, {
      yPercent: 100,
      scale: 0,
      transformOrigin: "center bottom",
    });
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

    return () => ctx.revert();
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
        const { isDesktop, isMobile } = context.conditions;
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
            gsap.killTweensOf(vidEl);
            vidEl.play();
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
            gsap.killTweensOf(vidEl);
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

        if (isMobile) {
          // Mobile & tablet: show video by default
          gsap.set(vidEl, { yPercent: 0, scale: 1 });
          vidEl.play();
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <a href={Url} target="_blank" rel="noopener noreferrer">
      <div
        ref={projectRef}
        className="relative h-full w-full overflow-hidden flex flex-col cursor-pointer"
      >
        {/* Parallax Background */}
        <div className="project-background relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              ref={backgroundRef}
              className="w-full h-[120%] bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${Image})` }}
            />
          </div>

          {/* Video */}
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="project-detail w-2/3 overflow-hidden aspect-video">
              {Video && (
                <video
                  ref={videoRef}
                  className="aspect-video"
                  src={Video}
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              )}
            </div>
          </div>
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
            <div ref={linkRef} className="flex flex-col">
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
    </a>
  );
}
