import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import Preloader from "./Components/Preloader";
import Navbar from "./Components/ui/Navbar";
import Hero from "./Components/Hero";
import Showreel from "./Components/Showreel";
import Highlight from "./Components/Highlights";
import Works from "./Components/Works";
import Footer from "./Components/Footer";
import Process from "./Components/Process";
import PixelTransition from "./Components/PixelTransition";
import ImageTransition from "./Components/ImageTransition";
import CTA from "./Components/CTA";

function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  // Force re-render on resize
  const [, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <Preloader setIsPreloaderDone={setIsPreloaderDone} />
        <Navbar isPreloaderDone={isPreloaderDone} />
        <Hero isPreloaderDone={isPreloaderDone} />
        <Showreel isPreloaderDone={isPreloaderDone} />
        <Highlight />
        <Process />
        <Works />
        <ImageTransition />
        <CTA />
        <PixelTransition />
        <Footer />
      </ReactLenis>
    </>
  );
}

export default App;
