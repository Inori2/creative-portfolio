import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AboutVideo from "/videos/about-me-video.mp4";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

export default function Highlight() {
  const containerRef = useRef();
  return (
    <>
      <section className="z-10 lg:mt-0">
        <div className="w-screen h-[350vh] relative">
          <div
            ref={containerRef}
            className="bg-neutral-950 w-full h-screen sticky top-0 grid grid-cols-12 pt-30 pb-5 px-5 gap-5"
          >
            <div className="grid-items col-span-4 flex flex-col justify-between h-full">
              <div className="container flex flex-col gap-3">
                <div className="top-content flex gap-4 items-center">
                  <div className="circle h-3 w-3 bg-neutral-50 rounded-full"></div>
                  <h3 className="introduction text-2xl font-primary font-bold text-neutral-50 tracking-wide">
                    Introduction
                  </h3>
                </div>
                <div className="bot-content w-full text-sm leading-5 font-primary text-neutral-400">
                  3 years into the digital playground, I’m currently based in Ho
                  Chi Minh City, designing experiences that give brands a head
                  start in a crowded world.
                </div>
              </div>
              <div className="about-video aspect-video">
                <video src={AboutVideo} autoPlay playsInline loop muted></video>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
