import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We start by diving deep into your brand, goals, and audience to uncover the core problem.",
    position: [0, 0, 1.51], // Front
    rotation: [0, 0, 0],
  },
  {
    id: "02",
    title: "Strategy",
    description:
      "Crafting a roadmap that aligns creative vision with business objectives for maximum impact.",
    position: [1.51, 0, 0], // Right
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: "03",
    title: "Design",
    description:
      "Visualizing the concept with high-fidelity mockups, focusing on aesthetics and usability.",
    position: [0, 0, -1.51], // Back
    rotation: [0, Math.PI, 0],
  },
  {
    id: "04",
    title: "Development",
    description:
      "Bringing designs to life with clean, performant code and smooth, interactive animations.",
    position: [-1.51, 0, 0], // Left
    rotation: [0, -Math.PI / 2, 0],
  },
];

function Cube({ rotationRef }) {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current && rotationRef.current) {
      // Smoothly interpolate rotation
      meshRef.current.rotation.y = gsap.utils.interpolate(
        meshRef.current.rotation.y,
        rotationRef.current.rotationY,
        0.1
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="black" roughness={0.1} metalness={0.5} />
        {processSteps.map((step) => (
          <Html
            key={step.id}
            position={step.position}
            rotation={step.rotation}
            transform
            occlude
            distanceFactor={1.5}
          >
            <div className="flex flex-col gap-2 text-center select-none pointer-events-none">
              <span className="font-secondary text-neutral-400 text-md tracking-wider">
                ({step.id})
              </span>
              <h3 className="font-primary font-bold text-6xl text-white tracking-tighter">
                {step.title.toUpperCase()}
              </h3>
              <p className="font-primary text-neutral-300 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          </Html>
        ))}
      </mesh>
    </Float>
  );
}

export default function Process() {
  const triggerRef = useRef(null);
  const rotationRef = useRef({ rotationY: 0 });

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "+=4000", // Longer scroll distance for 4 steps
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        // Rotate -90 degrees (PI/2) for each step
        // Total rotation = 3 steps * 90 deg = 270 deg
        rotationRef.current.rotationY = -self.progress * (Math.PI / 2) * 3;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden bg-neutral-50 relative">
      <div ref={triggerRef} className="h-screen w-full relative">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Cube rotationRef={rotationRef} />
        </Canvas>
      </div>
    </section>
  );
}