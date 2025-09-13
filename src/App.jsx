import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import Preloader from "./Components/Preloader";
import Navbar from "./Components/Navbar";
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
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      <Navbar isPreloaderDone={isPreloaderDone} />
    </>
  );
}

export default App;
