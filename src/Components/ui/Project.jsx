import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Background from "../../assets/images/project-img-1.jpg";
gsap.registerPlugin(ScrollTrigger);

export default function Project({
  Image = Background,
  Name = "Project name",
  Year = "20xx",
  Video,
  Url = "https://google.com",
}) {
  const projectRef = useRef(null);
  const backgroundRef = useRef(null);
  const infoBarRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!projectRef.current || !backgroundRef.current || !infoBarRef.current)
      return;
    /*gsap.set(backgroundRef.current, {
      filter: "blur(0px) brightness(1)",
      scale: 1,
    });*/
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectRef.current,
          start: "top bottom", // when section enters viewport
          end: "bottom top", // when it leaves viewport
          scrub: 0.4,
        },
      });

      // 🌟 Make background move slower
      tl.to(backgroundRef.current, { y: "-10%", ease: "none" }, 0);

      // Foreground moves at normal speed or even faster
      tl.to(infoBarRef.current, { y: "-20%", ease: "none" }, 0);
    }, projectRef);

    return () => ctx.revert();
  }, []);

  // 🔹 Hover effect handlers
  const handleMouseEnter = () => {
    gsap.to(backgroundRef.current, {
      filter: "blur(4px)", // increase blur
      scale: 1.05,
      duration: 0.6,
      ease: "expo.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(backgroundRef.current, {
      filter: "blur(0px)", // reset blur
      scale: 1,
      duration: 0.6,
      ease: "expo.out",
    });
  };

  return (
    <a href={Url} target="_blank">
      <div
        ref={projectRef}
        className="relative h-full w-full overflow-hidden flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Parallax Background */}
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div
              ref={backgroundRef}
              className="w-full h-[120%] bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${Image})` }}
            ></div>
          </div>

          {/* Video stays fixed in the middle */}
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="project-detail w-2/3 overflow-hidden aspect-video bg-red-500">
              <video
                ref={videoRef}
                className="aspect-video"
                src={Video}
                muted
                loop
                playsInline
                autoPlay
              ></video>
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div
          ref={infoBarRef}
          className="relative w-full flex justify-between items-center px-5 lg:px-0 py-4 z-20"
        >
          <span className="font-primary font-bold text-xl">
            {Name?.toUpperCase()}
          </span>
          <div>
            <span className="font-primary font-semibold">{Year}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
