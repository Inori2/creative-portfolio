import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, RenderTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Vertex Shader: Standard + pass UVs
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
    // The faster the mouse moves, the more the UVs are pulled
    vec2 warp = uVelocity * strength * 2.0; // Multiplier for intensity
    
    uv -= warp;

    vec4 color = texture2D(uTexture, uv);
    
    // RGB Shift based on velocity
    float shift = length(uVelocity) * strength * 0.7;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    
    gl_FragColor = vec4(r, g, b, color.a);
  }
`;

const DistortedMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uMouse: { value: new THREE.Vector2(0.6, 0.6) },
    uVelocity: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: null },
  },
  transparent: true,
});

export default function DistortedText() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const { viewport } = useThree();
  
  // Refs for physics
  const lastMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentVelocity = useRef(new THREE.Vector2(0, 0));
  const targetVelocity = useRef(new THREE.Vector2(0, 0));

  useFrame(() => {
    if (materialRef.current) {
      // Smoothly interpolate current velocity towards target (0)
      // This creates the "relaxation" or "snap back" effect
      currentVelocity.current.lerp(targetVelocity.current, 0.1);
      
      materialRef.current.uniforms.uVelocity.value.copy(currentVelocity.current);
      
      // Decay target velocity to 0 (so it stops when mouse stops)
      targetVelocity.current.set(0, 0);
    }
  });

  const handlePointerMove = (e) => {
    if (materialRef.current) {
      const uv = e.uv;
      
      // Calculate delta (velocity)
      const deltaX = uv.x - lastMouse.current.x;
      const deltaY = uv.y - lastMouse.current.y;
      
      // Update target velocity based on movement
      // We accumulate it slightly to give it "momentum"
      targetVelocity.current.set(deltaX, deltaY);
      
      // Update mouse position uniform
      materialRef.current.uniforms.uMouse.value.set(uv.x, uv.y);
      
      // Store last position
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
            anchorX="center"
            anchorY="middle"
            letterSpacing={-0.05}
          >
            Get in touch
          </Text>
        </RenderTexture>
      </shaderMaterial>
    </mesh>
  );
}
