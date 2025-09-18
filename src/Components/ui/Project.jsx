import { useState, useRef, useEffect } from "react";
import gsap from "gsap/all";

export default function Project({ Image, Name, Category, Video }) {
  const projectRef = useRef(null);
  const backgroundRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlay, setIsPlay] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {}, projectRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-stone-950 flex justify-center items-center"
          style={{ backgroundImage: `url(${Image})` }}
        >
          <div className="project-detail w-2/3 overflow-hidden aspect-video bg-red-500">
            <video
              className="aspect-video"
              src={{ Video }}
              muted
              loop
              playsInline
              autoPlay
            ></video>
          </div>
        </div>
        <div className="project-infor w-full h-[50px] bg-red-400 flex justify-between">
          <span>{Name}</span>
          <span>{Category}</span>
        </div>
      </div>
    </>
  );
}
