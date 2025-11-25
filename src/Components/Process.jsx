import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Process() {
    const containerRef = useRef(null);
    const boxRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const slide1Ref = useRef(null);
    const textRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Blinking cursor animation
            gsap.fromTo(cursorRef.current, {
                opacity: 1
            }, {
                opacity: 0,
                repeat: -1,
                yoyo: true,
                duration: 0.5,
                ease: "power2.inOut"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: true,
                    pin: true,
                }
            });

            // Step 1: Expand the box and the first slide, and type text
            tl.to(boxRef.current, {
                width: "100vw",
                height: "100vh",
                duration: 1,
                ease: "none",
            })
            .to(slide1Ref.current, {
                width: "100vw",
                duration: 1,
                ease: "none",
            }, "<")
            .to(textRef.current, {
                text: "MY WAY",
                duration: 1,
                ease: "none",
            }, "<");

            // Step 2: Horizontal Scroll
            tl.to(scrollContainerRef.current, {
                x: "-200vw",
                ease: "none",
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-screen min-h-screen bg-neutral-950 justify-center items-center flex overflow-hidden">
            <div ref={boxRef} className="w-[35vw] h-[35vw] bg-neutral-50 flex overflow-hidden relative">
                {/* Scroll Container */}
                <div ref={scrollContainerRef} className="flex flex-row h-full w-max">
                    {/* Slide 1 (Initial) */}
                    <div ref={slide1Ref} className="w-[35vw] h-full p-5 flex items-end flex-shrink-0 justify-between">
                        <div className="font-primary font-medium text-neutral-400 text-base uppercase flex-shrink-0">04 — PROCESS</div>
                        <div className="text-neutral-950 font-bold font-primary text-9xl flex items-end whitespace-nowrap">
                            <span ref={textRef}></span>
                            <span ref={cursorRef}>|</span>
                        </div>
                    </div>
                    {/* Slide 2 */}
                    <div className="w-[100vw] h-full flex-shrink-0 bg-neutral-50 p-5 flex items-center justify-center">
                        <h2 className="text-neutral-950 text-4xl font-primary">Phase 1: Research</h2>
                    </div>
                    {/* Slide 3 */}
                    <div className="w-[100vw] h-full flex-shrink-0 bg-neutral-50 p-5 flex items-center justify-center">
                        <h2 className="text-neutral-950 text-4xl font-primary">Phase 2: Design</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}