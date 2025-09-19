import { useEffect, useRef } from "react";
import Project from "./ui/Project";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const projectsRef = useRef(null);

  useEffect(() => {
    const projects = projectsRef.current.querySelectorAll(
      ".projects-container"
    );

    projects.forEach((project, index) => {
      // Each project moves at a slightly different speed
      const moveDistance = 150 - index * 20;
      // Top project moves more, bottom project moves less

      gsap.to(project, {
        y: -moveDistance,
        ease: "none",
        scrollTrigger: {
          trigger: projectsRef.current, // section triggers the animation
          start: "top bottom", // starts when section enters viewport
          end: "bottom top", // ends when section leaves viewport
          scrub: true, // smooth scroll-tied animation
        },
      });
    });
  }, []);

  return (
    <section id="works">
      <div className="w-screen h-fit bg-stone-50 px-5 py-10">
        {/* Heading and paragraph - stays fixed */}
        <div className="content-wrapper h-fit w-full flex flex-col gap-4 pb-20">
          <h2 className="font-primary font-bold text-8xl text-stone-950 tracking-tighter">
            {"recent works".toUpperCase()}
          </h2>
          <p className="font-primary text-stone-600 tracking-wide text-xl">
            Featured projects crafted with love and passion to drive real
            impact.
          </p>
        </div>

        {/* Parallax containers */}
        <div
          className="projects-wrapper lg:grid lg:grid-cols-12 gap-x-5 gap-y-40"
          ref={projectsRef}
        >
          <div className="projects-container col-span-6 w-full h-[600px]">
            <Project />
          </div>
          <div className="projects-container col-span-6 w-full h-[800px]">
            <Project />
          </div>
          <div className="projects-container col-span-6 w-full h-[800px]">
            <Project />
          </div>
          <div className="projects-container col-span-6 w-full h-[500px] pl-20">
            <Project />
          </div>
          <div className="projects-container col-span-6 w-full h-[500px] px-20">
            <Project />
          </div>
        </div>
      </div>
    </section>
  );
}
