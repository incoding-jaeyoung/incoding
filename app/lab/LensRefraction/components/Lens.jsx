"use client"
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { useFBO, useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Lens({ children, damping = 0.14, ...props }) {
  const ref = useRef();
  const { nodes } = useGLTF("/lab/LensRefraction/glb/lens-transformed2.glb");
  const buffer = useFBO();
  const viewport = useThree((state) => state.viewport);
  const [scene] = useState(() => new THREE.Scene());
  const defaultScale = Math.min(viewport.width, viewport.height) * 0.14;

  useFrame((state, delta) => {
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 1]);

    easing.damp3(
      ref.current.position,
      [
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        1,
      ],
      damping,
      delta
    );

    state.gl.setRenderTarget(buffer);
    state.gl.setClearColor("#ecedef");
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });

  useEffect(() => {
    const lensElement = ref.current;

    // Animate lens from scale 0 to full size on load
    gsap.fromTo(
      lensElement.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: defaultScale,
        y: defaultScale,
        z: defaultScale,
        duration: 0.6,
        ease: "power3.out",
        onUpdate: () => {
          lensElement.visible = true;
        },
      }
    );

    ScrollTrigger.create({
      trigger: '.contents-wrapper',
      start: 'top 100%',
      end: 'top+=300 100%',
      onUpdate: (self) => {
        const scale = defaultScale * (1 - self.progress);
        lensElement.scale.set(scale, scale, scale);
        lensElement.visible = scale > 0;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>
      <mesh
        scale={defaultScale}
        ref={ref}
        rotation-x={Math.PI / 2}
        geometry={nodes.Cylinder.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.14}
          thickness={1.4}
          anisotropy={0.14}
          chromaticAberration={0.14}
          distortion={0.14}
          distortionScale={1.4}
          temporalDistortion={0.14}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/lab/LensRefraction/glb/lens-transformed2.glb");
