import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Shared mouse state
const mouseState = { x: 0, y: 0 };

function MouseTracker() {
  const { viewport } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseState.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return null;
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const originalPositions = useRef<Float32Array | null>(null);
  
  const particlesCount = 800;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useEffect(() => {
    originalPositions.current = new Float32Array(positions);
  }, [positions]);

  useFrame((state) => {
    if (ref.current && originalPositions.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      
      // React to mouse - create a repulsion effect
      const posArray = ref.current.geometry.attributes.position.array as Float32Array;
      const mouseX = mouseState.x * 3;
      const mouseY = mouseState.y * 3;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const origX = originalPositions.current[i3];
        const origY = originalPositions.current[i3 + 1];
        const origZ = originalPositions.current[i3 + 2];
        
        const dx = origX - mouseX;
        const dy = origY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 2;
        
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.5;
          posArray[i3] = origX + dx * force;
          posArray[i3 + 1] = origY + dy * force;
        } else {
          // Smoothly return to original position
          posArray[i3] += (origX - posArray[i3]) * 0.05;
          posArray[i3 + 1] += (origY - posArray[i3 + 1]) * 0.05;
        }
        posArray[i3 + 2] = origZ;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function OrbitingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mouseInfluenceX = mouseState.x * 0.3;
    const mouseInfluenceY = mouseState.y * 0.3;
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2 + mouseInfluenceY;
      ring1Ref.current.rotation.y = time * 0.1 + mouseInfluenceX;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.15 + Math.PI / 3 + mouseInfluenceY * 0.8;
      ring2Ref.current.rotation.z = time * 0.1 + mouseInfluenceX * 0.8;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.25 + mouseInfluenceX * 0.6;
      ring3Ref.current.rotation.z = time * 0.15 + Math.PI / 6 + mouseInfluenceY * 0.6;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.005, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const baseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      // Pulse more when mouse is near center
      const mouseDistance = Math.sqrt(mouseState.x ** 2 + mouseState.y ** 2);
      const mousePulse = Math.max(0, 1 - mouseDistance) * 0.1;
      meshRef.current.scale.setScalar(baseScale + mousePulse);
      
      // Slight position offset based on mouse
      meshRef.current.position.x = mouseState.x * 0.2;
      meshRef.current.position.y = mouseState.y * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={0.15} />
    </mesh>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const orbRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        Math.cos((i / 6) * Math.PI * 2) * 4,
        (Math.random() - 0.5) * 3,
        Math.sin((i / 6) * Math.PI * 2) * 4,
      ] as [number, number, number],
      speed: 0.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + mouseState.x * 0.2;
      groupRef.current.rotation.x = mouseState.y * 0.1;
    }
    
    // Individual orb reactions
    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        const time = state.clock.elapsedTime;
        const baseY = orbs[i].position[1];
        orb.position.y = baseY + Math.sin(time * orbs[i].speed + orbs[i].phase) * 0.5;
        
        // Scale based on mouse proximity (approximate 2D distance)
        const scale = 1 + Math.abs(mouseState.x) * 0.3;
        orb.scale.setScalar(scale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh 
          key={i} 
          position={orb.position}
          ref={(el) => { orbRefs.current[i] = el; }}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#00ffff" : "#8b5cf6"} />
        </mesh>
      ))}
    </group>
  );
}

export function QuantumParticles() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <MouseTracker />
        <ParticleField />
        <OrbitingRings />
        <CoreSphere />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
