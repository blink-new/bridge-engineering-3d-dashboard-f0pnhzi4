import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    
    // Create wave effect
    float wave1 = sin(pos.x * 0.5 + uTime * 2.0) * 0.3;
    float wave2 = sin(pos.z * 0.3 + uTime * 1.5) * 0.2;
    float wave3 = sin((pos.x + pos.z) * 0.4 + uTime * 2.5) * 0.15;
    
    pos.y += wave1 + wave2 + wave3;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 uv = vUv;
    
    // Create water-like color variations
    float wave = sin(vPosition.x * 0.1 + uTime) * 0.5 + 0.5;
    float wave2 = sin(vPosition.z * 0.15 + uTime * 1.2) * 0.5 + 0.5;
    
    // Blue water colors with some variation
    vec3 color1 = vec3(0.1, 0.3, 0.8); // Deep blue
    vec3 color2 = vec3(0.2, 0.5, 0.9); // Lighter blue
    vec3 color3 = vec3(0.15, 0.4, 0.85); // Medium blue
    
    vec3 finalColor = mix(color1, color2, wave);
    finalColor = mix(finalColor, color3, wave2);
    
    // Add some foam/highlight effects
    float foam = smoothstep(0.7, 1.0, wave + wave2);
    finalColor += foam * vec3(0.8, 0.9, 1.0) * 0.3;
    
    // Add transparency based on distance
    float alpha = 0.7 + sin(uTime + vPosition.x * 0.1) * 0.1;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function WaterWave() {
  const meshRef = useRef<Mesh>(null);
  
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) }
      },
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -8, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={shaderMaterial}
    >
      <planeGeometry args={[100, 100, 64, 64]} />
    </mesh>
  );
}