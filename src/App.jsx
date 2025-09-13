import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import Preloader from "./Components/Preloader";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Showreel from "./Components/Showreel";
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

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Preloader setIsPreloaderDone={setIsPreloaderDone} />
      <Navbar isPreloaderDone={isPreloaderDone} />
      <Hero isPreloaderDone={isPreloaderDone} />
      <Showreel />
    </>
  );
}

export default App;
