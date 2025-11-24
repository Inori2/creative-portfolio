import { useRef, useLayoutEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, RenderTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Vertex Shader: Standard + pass UVs
const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uRadius;
    uniform float uStrength;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // --- Velocity-based Distortion (Supersolid effect) ---
      vec2 diff = vUv - uMouse;
      float dist = length(diff);

      // Create a localized influence area
      float influence = smoothstep(uRadius, 0.0, dist);

      // Simple wave/drag effect:
      pos.z += sin(dist * 10.0 - uTime) * influence * uStrength * 0.5;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

// Fragment Shader: Velocity-based Fluid Distortion
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from mouse pointer
    float dist = distance(uv, uMouse);
    
    // Distortion radius
    float radius = 0.3;
    
    // Strength based on distance (smooth falloff)
    float strength = smoothstep(radius, 0.0, dist);
    
    // Apply velocity-based warp
    vec2 warp = uVelocity * strength * 2.0;
    
    uv -= warp;

    // RGB Shift based on velocity
    float shift = length(uVelocity) * strength * 0.7;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    float a = texture2D(uTexture, uv).a;
    
    gl_FragColor = vec4(r, g, b, a);
  }
`;

const DistortedMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uVelocity: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: null },
  },
  transparent: true,
});

export default function DistortedText() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const { viewport, gl } = useThree();
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const fullText = "Get in touch";
  
  // Refs for physics
  const lastMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentVelocity = useRef(new THREE.Vector2(0, 0));
  const targetVelocity = useRef(new THREE.Vector2(0, 0));

  // Blinking Cursor Effect
  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Reveal Animation (Typing Effect)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const typingObj = { value: 0 };
      
      ScrollTrigger.create({
        trigger: gl.domElement,
        start: "top bottom-=100",
        end: "bottom center",
        onEnter: () => {
          setIsTyping(true);
          gsap.to(typingObj, {
            value: fullText.length,
            duration: 1.5,
            ease: "none",
            onUpdate: () => {
              const count = Math.floor(typingObj.value);
              setDisplayText(fullText.substring(0, count));
            },
            onComplete: () => {
              setIsTyping(false);
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, [gl.domElement]);

  useFrame(() => {
    if (materialRef.current) {
      // Smoothly interpolate current velocity towards target (0)
      currentVelocity.current.lerp(targetVelocity.current, 0.1);
      materialRef.current.uniforms.uVelocity.value.copy(currentVelocity.current);
      targetVelocity.current.set(0, 0);
    }
  });

  const handlePointerMove = (e) => {
    if (materialRef.current) {
      const uv = e.uv;
      const deltaX = uv.x - lastMouse.current.x;
      const deltaY = uv.y - lastMouse.current.y;
      targetVelocity.current.set(deltaX, deltaY);
      materialRef.current.uniforms.uMouse.value.set(uv.x, uv.y);
      lastMouse.current.set(uv.x, uv.y);
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[viewport.width, viewport.width / 4]} />
      <shaderMaterial
        ref={materialRef}
        args={[DistortedMaterial]}
        transparent
      >
        <RenderTexture attach="uniforms-uTexture-value">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <color attach="background" args={["#0a0a0a"]} />
          <Text
            fontSize={4.5}
            color="#fafafa"
            font="/fonts/switzer/Switzer-Variable.ttf"
            fontWeight={"medium"}
            anchorX="center"
            anchorY="middle"
            letterSpacing={-0.03}
          >
            {displayText}{isTyping && showCursor ? "_" : ""}
          </Text>
        </RenderTexture>
      </shaderMaterial>
    </mesh>
  );
}
