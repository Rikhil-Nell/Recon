"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GridDistortion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const setSize = () => {
      if (container) {
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
    setSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // SHADER MATERIAL
    const geometry = new THREE.PlaneGeometry(2, 2, 16, 16);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uStrength: { value: 1.5 },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uStrength;
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          // Wave distortion - map uv from [0,1]
          float dist = distance(uv, uMouse);
          float strength = uStrength * (1.0 - smoothstep(0.0, 0.5, dist));
          pos.z += sin(pos.x * 3.0 + uTime) * 0.05;
          pos.z += sin(pos.y * 3.0 + uTime * 0.8) * 0.05;
          pos.z += strength * sin(uTime * 2.0) * 0.3;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          // Grid line pattern
          vec2 grid = fract(vUv * 12.0);
          float line = min(
            smoothstep(0.0, 0.02, grid.x),
            smoothstep(0.0, 0.02, grid.y)
          );
          float alpha = (1.0 - line) * 0.15;
          // Gradient fade edges
          float edgeFade = vUv.x * (1.0 - vUv.x) * vUv.y * (1.0 - vUv.y) * 16.0;
          gl_FragColor = vec4(0.0, 1.0, 0.255, alpha * edgeFade); // 0.255 mapping to approx #00ff41
        }
      `,
      transparent: true,
      wireframe: false,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // MOUSE TRACKING for uMouse
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height; // invert Y for WebGL
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ANIMATION LOOP
    let animationFrameId: number;
    let time = 0;
    const render = () => {
      time += 0.01;
      material.uniforms.uTime.value = time;
      
      // Lerp mouse
      material.uniforms.uMouse.value.x += (targetMouse.x - material.uniforms.uMouse.value.x) * 0.1;
      material.uniforms.uMouse.value.y += (targetMouse.y - material.uniforms.uMouse.value.y) * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // RESIZE
    const handleResize = () => setSize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-2 pointer-events-none" style={{ transform: "translateZ(0)" }} />;
}
