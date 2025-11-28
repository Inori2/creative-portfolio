import { useEffect, useRef } from "react";
import Project from "./ui/Project";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./ui/Button";
import Bgimg1 from "/images/project-img-2.jpg";
import Project1 from "/videos/project-1.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const projectsRef = useRef(null);

  useEffect(() => {
    if (!projectsRef.current) return;

    const mm = gsap.matchMedia();
    const projects = projectsRef.current.querySelectorAll(
      ".projects-container"
    );

    /** 🔹 Overlay Reveal (Runs on ALL devices) */
    projects.forEach((project, i) => {
      const overlay = project.querySelector(".overlay");
      if (!overlay) return;

      // Reveal animation
      gsap.to(overlay, {
        autoAlpha: 0,
        ease: "power3.out",
        duration: 0.4,
        scrollTrigger: {
          trigger: project,
          start: "top-=100 80%",
          once: true,
        },
        delay: i * 0.1,
      });
    });

    /** 🔹 Parallax Floating Effect (Desktop ONLY) */
    mm.add("(min-width: 1024px)", () => {
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

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    /** Cleanup */
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="works"
      className="flex flex-col justify-center items-center py-10 bg-neutral-50 z-10 relative"
    >
      <div className="w-screen h-fit lg:px-5">
        {/* Heading */}
        <div className="content-wrapper h-fit w-full flex flex-col gap-4 pb-10 px-5">
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
            <Project
              Name="Do Tran '25"
              Year="2025"
              Url="https://do-tran.vercel.app"
              Image={Bgimg1}
              Video={Project1}
            />
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
          <div className="projects-container col-span-6 w-full h-[500px] md:h-[700px] lg:h-[500px] lg:px-20 lg:ml-50">
            <Project />
          </div>
        </div>
      </div>
      <Button
        className="flex gap-4 items-center justify-center px-6 py-4 bg-neutral-50 rounded-full text-neutral-950 font-primary font-bold text-xl mix-blend-difference"
        Text="Let's shape what's next."
        Link=" &#109;&#97;&#105;&#108;&#116;&#111;&#58;&#116;&#114;&#97;&#110;&#110;&#104;&#97;&#116;&#115;&#97;&#110;&#103;&#50;&#48;&#48;&#48;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"
      />
    </section>
  );
}
