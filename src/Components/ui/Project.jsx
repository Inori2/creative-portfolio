import { useRef, useEffect, useCallback } from "react";
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

  /** 🔹 Hover Animations with useCallback (prevents re-creation on each render) */
  const handleMouseEnter = useCallback(() => {
    if (!backgroundRef.current || !videoRef.current) return;

    // Play video on hover
    videoRef.current.play();

    // Background blur + slight scale
    gsap.to(backgroundRef.current, {
      filter: "blur(4px)",
      scale: 1.05,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Animate video up and scale in
    gsap.fromTo(
      videoRef.current,
      {
        yPercent: 100,
        scale: 0,
        transformOrigin: "center bottom",
      },
      {
        yPercent: 0,
        scale: 1,
        duration: 1,
        ease: "expo.out",
        overwrite: "auto",
      }
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!backgroundRef.current || !videoRef.current) return;

    // Reset background
    gsap.to(backgroundRef.current, {
      filter: "blur(0px)",
      scale: 1,
      duration: 0.4,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    // Slide video back down
    gsap.to(videoRef.current, {
      yPercent: 100,
      scale: 0,
      duration: 0.6,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0; // reset playback
        }
      },
    });
  }, []);

  return (
    <a href={Url} target="_blank" rel="noopener noreferrer">
      <div
        ref={projectRef}
        className="relative h-full w-full overflow-hidden flex flex-col cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
          <span className="font-primary font-semibold">{Year}</span>
        </div>
      </div>
    </a>
  );
}
