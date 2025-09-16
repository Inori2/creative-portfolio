import { useState, useEffect, useRef } from "react";
import gsap from "gsap/all";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

export const Works = () => {
  return (
    <>
      <section id="works">
        <div className="w-screen h-fit bg-stone-50 px-5 py-10">
          <div className="content-wrapper h-[200vh] w-full flex gap-8">
            <h2 className="font-primary font-bold text-8xl text-stone-950 tracking-tighter">
              {"recent works".toUpperCase()}
            </h2>
            <p className="font-primary text-stone-600 leading-1.5"></p>
          </div>
        </div>
      </section>
    </>
  );
};
