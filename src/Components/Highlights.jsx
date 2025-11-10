import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AboutVideo from "/videos/about-me-video.mp4";
import Services from "./ui/Services";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

const servicesData = [
  {
    number: "[01]",
    services: "Web Design",
    details:
      "Building human-centered web experiences that look as good as they feel.",
  },
  {
    number: "[02]",
    services: "No Code Development",
    details:
      "Developing fully responsive websites using Webflow and other no-code tools, turning design ideas into live, interactive experiences.",
  },
  {
    number: "[03]",
    services: "Motion & Interaction",
    details:
      "Crafting smooth animations that support the story, guide attention, and create a sense of flow.",
  },
  {
    number: "[04]",
    services: "Art Direction",
    details:
      "Defining the overall visual tone, mood, and message to keep every element aligned and consistent.",
  },
];

export default function Highlight() {
  const containerRef = useRef();
  const highlightsSectionRef = useRef();
  const servicesRefs = useRef([]);
  servicesRefs.current = [];

  const addToRefs = (el) => {
    if (el && !servicesRefs.current.includes(el)) {
      servicesRefs.current.push(el);
    }
  };

  useGSAP(
    () => {
      const allElements = servicesRefs.current.flatMap((container) => {
        const selector = gsap.utils.selector(container);
        return [
          selector(".service-number"),
          selector(".service-title"),
          selector(".service-details"),
        ];
      });
      gsap.set(allElements, { autoAlpha: 0 });

      const allBorders = servicesRefs.current.map((c) =>
        gsap.utils.selector(c)(".service-border")
      );
      gsap.set(allBorders, { scaleX: 0, transformOrigin: "left" });

      servicesRefs.current.forEach((container, index) => {
        const selector = gsap.utils.selector(container);
        const numberEl = selector(".service-number");
        const titleEl = selector(".service-title");
        const detailsEl = selector(".service-details");
        const borderEl = selector(".service-border");

        const service = servicesData[index];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            toggleActions: "play none none none",
          },
        });

        tl.to(numberEl, { autoAlpha: 1, duration: 0 })
          .from(numberEl, { text: "", duration: 0.5, ease: "none" })
          .to(titleEl, { autoAlpha: 1, duration: 0 })
          .from(titleEl, { text: "", duration: 1, ease: "none" })
          .to(detailsEl, { autoAlpha: 1, duration: 0 })
          .from(detailsEl, {
            text: "",
            duration: 1.5,
            ease: "none",
          })
          .to(borderEl, { scaleX: 1, duration: 1, ease: "power2.out" });
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      <section ref={highlightsSectionRef} className="z-99 lg:mt-0">
        <div className="w-screen h-[250vh] relative">
          <div
            ref={containerRef}
            className="bg-neutral-950 w-full h-[130svh] lg:h-screen sticky top-0 lg:grid lg:grid-cols-12 pt-30 pb-5 px-5 gap-5 z-10"
          >
            <div className="grid-items lg:col-span-4 flex flex-col justify-between lg:h-full gap-5 sm:pb-5">
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
                <video
                  className="rounded-2xl"
                  src={AboutVideo}
                  autoPlay
                  playsInline
                  loop
                  muted
                ></video>
              </div>
            </div>
            <div className="grid-items lg:col-span-6 lg:col-start-7 flex flex-col">
              <div className="top-content h-full flex flex-col gap-10">
                {servicesData.map((service) => (
                  <Services
                    key={service.number}
                    ref={addToRefs}
                    number={service.number}
                    services={service.services}
                    details={service.details}
                  />
                ))}
              </div>
              <div className="bottom-content w-full flex justify-end">
                <span className="text-xs text-neutral-500 font-primary text-right">
                  02 — ABOUT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
