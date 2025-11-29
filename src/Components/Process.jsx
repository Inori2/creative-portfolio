import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

export default function Process() {
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const slide1Ref = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  const processContainerRef = useRef(null);

  const ProcessData = [
    {
      title: "01",
      titleText: "Direction",
      description:
        "I start by aligning with your vision—defining goals, understanding your audience, and analyzing competitors. From there, I craft a clear creative direction, blending typography, color, and motion to build designs that are not only beautiful but drive real business results.",
    },
    {
      title: "02",
      titleText: "Design",
      description:
        "With the foundation set, I explore multiple concepts to find the perfect fit. My goal is to create designs that are intuitive, visually refined, and rooted in real user needs—shaped by collaboration and continuous feedback to achieve the best result.",
    },
    {
      title: "03",
      titleText: "Interaction",
      description:
        "Motion and interaction bring a design to life, turning a good experience into a memorable one. I craft thoughtful details that spark delight and engagement, dedicating extra care to ensure every interaction leaves users saying, wow.",
    },
    {
      title: "04",
      titleText: "Development",
      description:
        "From idea to reality, I build high-performing websites that are fast, responsive, and scalable. I work closely with you to refine every detail, ensuring the final product looks incredible and works seamlessly for you.",
    },
  ];

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        let { isDesktop } = context.conditions;

        // Blinking cursor animation
        gsap.fromTo(
          cursorRef.current,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            repeat: -1,
            yoyo: true,
            duration: 0.5,
            ease: "power2.inOut",
          }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: isDesktop ? "+=200%" : "+=400%",
            scrub: true,
            pin: true,
          },
        });

        // Set initial state
        gsap.set(".process-description", { autoAlpha: 0 });
        gsap.set(".process-title", { autoAlpha: 0 });
        gsap.set(".item-description", { autoAlpha: 0 });

        let splitInstances = [];
        let textTl = null;

        // Helper to animate text based on direction
        const animateText = (direction) => {
          if (direction > 0) {
            // Play forward
            if (!textTl) {
              // Initialize splits and timeline
              textTl = gsap.timeline();

              // Animate Description (Lines)
              const splitTexts = gsap.utils.toArray(".process-description");
              splitTexts.forEach((text) => {
                const childSplit = new SplitText(text, {
                  type: "lines",
                  linesClass: "line-child",
                  mask: "lines",
                });
                const parentSplit = new SplitText(text, {
                  type: "lines",
                  linesClass: "line-parent",
                  mask: "lines",
                });
                splitInstances.push(childSplit, parentSplit);
                gsap.set(text, { autoAlpha: 1 });
                textTl.fromTo(
                  childSplit.lines,
                  { yPercent: 100 },
                  {
                    yPercent: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power3.out",
                  },
                  0
                );
              });

              // Animate Titles (Chars)
              const splitTitles = gsap.utils.toArray(".process-title");
              splitTitles.forEach((text) => {
                const split = new SplitText(text, {
                  type: "chars",
                  charsClass: "char-child",
                  mask: "chars",
                });
                splitInstances.push(split);
                gsap.set(text, { autoAlpha: 1 });
                textTl.fromTo(
                  split.chars,
                  { xPercent: 100 },
                  {
                    xPercent: 0,
                    duration: 1,
                    ease: "power3.out",
                  },
                  0
                );
              });

              // Animate Item Descriptions (Simple Fade)
              textTl.to(
                ".item-description",
                { autoAlpha: 1, duration: 1, ease: "power3.out" },
                0
              );
            }
            textTl.play();
          } else {
            // Reverse
            if (textTl) {
              textTl.reverse();
            }
          }
        };

        let hasPlayedForward = false;

        // Step 1: Expand the box and the first slide, and type text
        tl.to(boxRef.current, {
          width: "100vw",
          height: "100vh",
          duration: 1,
          ease: "none",
          onUpdate: function () {
            if (!boxRef.current) return;
            const currentWidth = parseFloat(
              getComputedStyle(boxRef.current).width
            );
            const viewportWidth = window.innerWidth;
            const widthPercent = (currentWidth / viewportWidth) * 100;

            // Play forward when reaching 100vw
            if (
              tl.scrollTrigger.direction > 0 &&
              widthPercent >= 99 &&
              !hasPlayedForward
            ) {
              hasPlayedForward = true;
              animateText(1);
            }
            // Reverse when going back and width is at or below 95vw
            else if (
              tl.scrollTrigger.direction < 0 &&
              widthPercent <= 95 &&
              hasPlayedForward
            ) {
              hasPlayedForward = false;
              animateText(-1);
            }
          },
        })
          .to(
            slide1Ref.current,
            {
              width: "100vw",
              duration: 1,
              ease: "none",
            },
            "<"
          )
          .to(
            textRef.current,
            {
              text: "PROCESS",
              duration: 1,
              ease: "none",
            },
            "<"
          )
          // Hold the state (sticky) for a bit after expansion
          .to({}, { duration: 1 });

        // Step 2: Horizontal Scroll (Mobile Only)
        if (!isDesktop && processContainerRef.current) {
          const scrollAmount =
            processContainerRef.current.scrollWidth - window.innerWidth + 40; // +40 for padding/gap buffer

          tl.to(processContainerRef.current, {
            x: -scrollAmount,
            ease: "none",
            duration: 3, // Adjust relative duration for scroll length
          });
        }
      },
      containerRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="w-screen h-fit min-h-screen bg-neutral-950 justify-center items-center flex overflow-hidden"
    >
      <div
        ref={boxRef}
        className="w-[35vw] h-[35vw] bg-stone-200 flex overflow-hidden relative"
      >
        {/* Scroll Container */}
        <div ref={scrollContainerRef} className="flex flex-row h-full w-max">
          {/* Slide 1 (Initial) */}
          <div
            ref={slide1Ref}
            className="w-[35vw] h-full p-5 flex flex-col-reverse items-end shrink-0 gap-5"
          >
            <div className="flex flex-row items-end shrink-0 justify-between w-full">
              {" "}
              <div className="font-primary font-medium hidden sm:block text-neutral-400 text-base uppercase shrink-0">
                04 — FROM START TO FINISH
              </div>
              <div className="text-neutral-950 font-bold font-primary text-7xl md:text-9xl flex items-end whitespace-nowrap">
                <span ref={textRef}></span>
                <span ref={cursorRef}>|</span>
              </div>
            </div>
            <div className="description w-full grid grid-cols-12">
              <span className="process-description font-primary font-bold text-neutral-900 text-2xl col-span-12 md:col-span-6 block tracking-tight">
                Every project begins with a clear purpose and strategic
                decisions, meticulously crafted to deliver meaningful,
                pixel-perfect outcomes.
              </span>
            </div>
            <div
              ref={processContainerRef}
              className="process-container w-full overflow-visible flex flex-nowrap gap-10 md:grid md:grid-cols-12 md:gap-10 pb-4"
            >
              {ProcessData.map((item, index) => (
                <div
                  key={index}
                  className="process-items w-[85vw] md:w-auto md:min-w-0 shrink-0 md:col-span-3 font-primary flex flex-col gap-2"
                >
                  <div className="top-content flex md:flex-col lg:flex-row w-full gap-2 lg:items-center">
                    <span className="process-title text-neutral-400 text-sm uppercase">
                      [{item.title}]
                    </span>
                    <span className="process-title font-bold text-neutral-900 text-2xl">
                      {item.titleText}
                    </span>
                  </div>
                  <div className="bottom-content w-full">
                    <p className="process-description text-neutral-600 text-sm tracking-wide whitespace-normal wrap-break">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
