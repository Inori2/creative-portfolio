import { useEffect, useRef } from "react";
import Project from "./ui/Project";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const projectsRef = useRef(null);

  useEffect(() => {
    if (!projectsRef.current) return;

    const ctx = gsap.context(() => {
      const projects = projectsRef.current.querySelectorAll(
        ".projects-container"
      );
      const createdOverlays = [];

      projects.forEach((project, i) => {
        const background = project.querySelector(".project-background");
        if (!background) return;

        // ✅ Create and track overlay for cleanup later
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        background.appendChild(overlay);
        createdOverlays.push(overlay);

        // Initial state
        gsap.set(overlay, {
          autoAlpha: 1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          zIndex: 10,
        });

        // Reveal animation
        gsap.to(overlay, {
          autoAlpha: 0,
          ease: "power3.out",
          duration: 0.4,
          scrollTrigger: {
            trigger: project,
            start: "top-=50 80%",
            once: true,
          },
          delay: i * 0.1,
        });
      });

      // Floating stagger effect
      gsap.to(projects, {
        y: (i) => 80 - i * 25,
        ease: "none",
        stagger: { each: 0.1 },
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      });

      // ✅ Cleanup function
      return () => {
        // Kill all ScrollTrigger instances
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        // Remove all overlays from DOM
        createdOverlays.forEach((overlay) => overlay.remove());
      };
    }, projectsRef);

    return () => ctx.revert(); // Revert GSAP context safely
  }, []);

  return (
    <section id="works">
      <div className="w-screen h-fit bg-stone-50 lg:px-5 lg:py-10">
        {/* Heading */}
        <div className="content-wrapper h-fit w-full flex flex-col gap-4 pb-20">
          <h2 className="font-primary font-bold text-8xl text-stone-950 tracking-tighter">
            {"recent works".toUpperCase()}
          </h2>
          <p className="font-primary text-stone-600 tracking-wide text-3xl">
            Featured projects crafted with love and passion to drive real
            impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className="projects-wrapper flex flex-col gap-20 lg:grid lg:grid-cols-12 lg:gap-x-5 lg:gap-y-40"
          ref={projectsRef}
        >
          <div className="projects-container col-span-6 w-full h-[500px] md:h-[700px] lg:h-[600px]">
            <Project />
          </div>
          <div className="projects-container col-span-6 w-full h-[500px] md:h-[700px] lg:h-[800px]">
            <Project />
          </div>
          <div className="projects-container col-span-6 w-full h-[500px] md:h-[700px] lg:h-[800px]">
            <Project />
          </div>
          <div className="projects-container col-span-6 w-full h-[500px] md:h-[700px] lg:h-[500px] lg:pl-20 lg:mt-20">
            <Project />
          </div>
          <div className="projects-container col-span-6 w-full h-[500px] md:h-[700px] lg:h-[500px] lg:px-20">
            <Project />
          </div>
        </div>
      </div>
    </section>
  );
}
