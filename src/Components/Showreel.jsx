import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import useMousePosition from "./useMousePosition.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  return (
    <>
      <section>
        <div className="bg-stone-50 h-screen w-screen">1</div>
      </section>
    </>
  );
}
