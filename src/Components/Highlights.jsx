import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText, TextPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AboutVideo from "/videos/about-me-video.mp4";
import Services from "./ui/Services";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText, TextPlugin);

const servicesData = [
  {
    number: "[01]",
    services: "Design",
    details:
      "Building human-centered web experiences that look as good as they feel.",
  },
  {
    number: "[02]",
    services: "Development",
    details:
      "Developing fully responsive websites using Webflow and other no-code tools, turning design ideas into live, interactive experiences.",
  },
  {
    number: "[03]",
    services: "Interaction",
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
  const aboutVideoRef = useRef();

  const introTopContentRef = useRef(null);
  const introCircleRef = useRef(null);
  const introH3WrapperRef = useRef(null);
  const introH3Ref = useRef(null);
  const botContentRef = useRef(null);
  const scrollTextRef = useRef(null);

  const inactivityTimeoutRef = useRef(null);
  const typingTimelineRef = useRef(null); // Ref to store the GSAP timeline

  const addToRefs = (el) => {
    if (el && !servicesRefs.current.includes(el)) {
      servicesRefs.current.push(el);
    }
  };

  useGSAP(
    () => {
      // Existing setup for allElements and allBorders
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

      // New animation for Introduction section
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: highlightsSectionRef.current, // Trigger when Highlights section comes into view
          start: "top center+=100", // Adjust start point as needed
          toggleActions: "play none none none",
          // markers: true, // For debugging
        },
      });

      // Initial state for h3
      gsap.set(introH3Ref.current, { yPercent: 100 });
      gsap.set(introCircleRef.current, { opacity: 0 });

      introTl
        .to(introCircleRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        })
        .to(
          introH3Ref.current,
          { yPercent: 0, duration: 0.8, ease: "power2.out" },
          "<0.2"
        );

      // New animation for bot-content
      const splitBotContent = new SplitText(botContentRef.current, {
        type: "lines",
        mask: "lines",
      });
      gsap.set(splitBotContent.lines, { yPercent: 100, autoAlpha: 0 }); // Initial state

      introTl.to(
        splitBotContent.lines,
        {
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.07,
          duration: 0.8,
          ease: "power2.out",
        },
        ">-0.3"
      ); // Start this animation slightly before the introTl finishes, or after a small delay

      // New animation for about-video
      gsap.set(aboutVideoRef.current, { clipPath: "inset(0% 0% 100% 0%)" }); // Initial state: closed from top

      introTl.to(
        aboutVideoRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)", // Final state: fully open
          duration: 1,
          ease: "power2.out",
        },
        ">-0.5"
      );

      // Existing animations for Services components
      servicesRefs.current.forEach((container) => {
        const selector = gsap.utils.selector(container);
        const numberEl = selector(".service-number");
        const titleEl = selector(".service-title");
        const detailsEl = selector(".service-details");
        const borderEl = selector(".service-border");

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


      // New animation for scrollTextRef
      const phrase1 = "02 — ABOUT";
      const phrase2 = "SCROLL FOR MORE";
      const inactivityDelay = 2000; // 2 seconds of inactivity

      gsap.set(scrollTextRef.current, { text: "" }); // Set initial text to empty

      const typingTimeline = gsap.timeline({
        onStart: () => {
          gsap.set(scrollTextRef.current, { autoAlpha: 1 });
        },
        paused: true, // Start paused
      });

      typingTimeline
        .addLabel("typePhrase1")
        .to(scrollTextRef.current, {
          text: phrase1,
          duration: 1.5,
          ease: "none",
          onComplete: () => {
            startInactivityTimer();
          },
        })
        .addLabel("deletePhrase1")
        .to(scrollTextRef.current, {
          delay: 2, // Display phrase1 for 2 seconds
          text: "", // Delete phrase1
          duration: 1,
          ease: "none",
          onComplete: () => {
            startInactivityTimer(); // Restart timer after deletion
          },
        })
        .addLabel("typePhrase2")
        .to(scrollTextRef.current, {
          text: phrase2,
          duration: 1.5,
          ease: "none",
          onComplete: () => {
            startInactivityTimer();
          },
        })
        .addLabel("deletePhrase2")
        .to(scrollTextRef.current, {
          delay: 1, // Display phrase2 for 2 seconds
          text: "", // Delete phrase2
          duration: 1,
          ease: "none",
          onComplete: () => {
            typingTimeline.goto("typePhrase1"); // Loop back to type phrase1
            startInactivityTimer();
          },
        });

      typingTimelineRef.current = typingTimeline; // Store timeline in ref

      // Initial ScrollTrigger to start the animation
      ScrollTrigger.create({
        trigger: scrollTextRef.current,
        start: "top bottom",
        onEnter: () => typingTimeline.play("typePhrase1"), // Start at typePhrase1
        onLeaveBack: () => {
          typingTimeline.pause(0); // Reset and pause if scrolled back up
          clearInactivityTimer();
        },
      });

      // Function to start/reset inactivity timer
      const startInactivityTimer = () => {
        clearInactivityTimer();
        inactivityTimeoutRef.current = setTimeout(() => {
          // If currently typing phrase1, delete it and type phrase2
          if (
            typingTimeline.currentLabel() === "typePhrase1" ||
            typingTimeline.currentLabel() === "deletePhrase1"
          ) {
            typingTimeline.play("deletePhrase1");
          }
        }, inactivityDelay);
      };

      const clearInactivityTimer = () => {
        if (inactivityTimeoutRef.current) {
          clearTimeout(inactivityTimeoutRef.current);
          inactivityTimeoutRef.current = null;
        }
      };

      // Event listeners for user activity
      const handleUserActivity = () => {
        clearInactivityTimer();
        // If we are in the middle of typing phrase2 or deleting phrase1/phrase2 due to inactivity,
        // we should revert to typing phrase1 and then restart the inactivity timer.
        if (
          typingTimeline.currentLabel() === "deletePhrase1" ||
          typingTimeline.currentLabel() === "typePhrase2" ||
          typingTimeline.currentLabel() === "deletePhrase2"
        ) {
          typingTimeline.pause();
          gsap.to(scrollTextRef.current, {
            text: phrase1,
            duration: 0.5,
            ease: "none",
            onComplete: () => {
              startInactivityTimer();
            },
          });
        } else if (typingTimeline.currentLabel() === "typePhrase1") {
          // If already typing phrase1, just ensure it's fully typed and restart timer
          gsap.to(scrollTextRef.current, {
            text: phrase1,
            duration: 0.5, // Quickly complete typing if not finished
            ease: "none",
            onComplete: () => {
              startInactivityTimer();
            },
          });
        } else {
          startInactivityTimer(); // If not in any specific state, just restart timer
        }
      };

      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("scroll", handleUserActivity);

      // Cleanup function for event listeners
      return () => {
        window.removeEventListener("mousemove", handleUserActivity);
        window.removeEventListener("scroll", handleUserActivity);
        clearInactivityTimer();
        if (typingTimelineRef.current) {
          typingTimelineRef.current.kill(); // Kill the timeline on unmount
        }
      };
    },
    { scope: containerRef }
  );

  return (
    <>
      <section id="about" ref={highlightsSectionRef} className="z-99 lg:mt-0">
        <div className="w-screen h-[250vh] relative">
          <div
            ref={containerRef}
            className="bg-neutral-950 w-full h-fit lg:min-h-dvh sticky top-0 lg:grid lg:grid-cols-12 pt-30 pb-5 px-5 gap-5 z-10"
          >
            <div className="grid-items lg:col-span-4 flex flex-col justify-between gap-5 sm:pb-5">
              <div className="container flex flex-col gap-3">
                <div
                  ref={introTopContentRef}
                  className="top-content flex gap-4 items-center"
                >
                  <div
                    ref={introCircleRef}
                    className="circle h-3.5 w-3.5 bg-neutral-50 rounded-full"
                  ></div>
                  <div ref={introH3WrapperRef} className="overflow-hidden">
                    <h3
                      ref={introH3Ref}
                      className="introduction text-3xl font-primary font-bold text-neutral-50 tracking-wide"
                    >
                      Introduction
                    </h3>
                  </div>
                </div>
                <div
                  ref={botContentRef}
                  className="bot-content w-full text-xl leading-7.5 font-primary text-neutral-400"
                >
                  3 years into the digital playground, I'm currently based in Ho
                  Chi Minh City, designing experiences that give brands a head
                  start in a crowded world.
                </div>
              </div>
              <div
                ref={aboutVideoRef}
                className="about-video aspect-video overflow-hidden"
              >
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
            <div className="grid-items lg:col-span-6 lg:col-start-7 flex flex-col justify-between pt-5 lg:pt-0">
              <div className="top-content flex flex-col gap-10">
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
                <span
                  ref={scrollTextRef}
                  className="text-xs text-neutral-500 font-primary text-right blinking-cursor"
                >
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
