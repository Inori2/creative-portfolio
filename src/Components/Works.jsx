import { useState, useEffect, useRef } from "react";
import Project from "./ui/Project";
import gsap from "gsap/all";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Works() {
  return (
    <>
      <section id="works">
        <div className="w-screen h-fit bg-stone-50 px-5 py-10">
          <div className="content-wrapper h-fit w-full flex flex-col gap-4 pb-">
            <h2 className="font-primary font-bold text-8xl text-stone-950 tracking-tighter">
              {"recent works".toUpperCase()}
            </h2>
            <p className="font-primary text-stone-600 tracking-wide text-xl">
              Featured projects crafted with love and passion to drive real
              impact.
            </p>
          </div>
          <div className="projects-wrapper lg:grid lg:grid-cols-2 gap-5 py-20">
            <div className="projects-container col-span-1 w-full h-[600px] ">
              <Project />
            </div>
            <div className="projects-container col-span-1 w-full h-[800px]">
              <Project />
            </div>
          </div>
          <div className="projects-wrapper lg:grid lg:grid-cols-2 gap-5 py-20">
            <div className="projects-container col-span-1 w-full h-[800px]">
              <Project />
            </div>
            <div className="projects-container col-span-1 w-full h-[600px] pl-20">
              <Project />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
