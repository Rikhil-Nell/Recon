"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // PARTICLES
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 16;     // x (-8 to 8)
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16; // y (-8 to 8)
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;  // z (-2 to 2)
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // LINE CONNECTIONS
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.15,
    });

    const linesMesh = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(linesMesh);

    // MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // SCROLL FADE
    const handleScroll = () => {
      if (!container) return;
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const opacity = Math.max(0, 0.3 - (scrollY / maxScroll) * 0.3);
      container.style.opacity = opacity.toString();
    };
    window.addEventListener("scroll", handleScroll);

    // ANIMATION LOOP
    let animationFrameId: number;
    const render = () => {
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;
      linesMesh.rotation.y = particles.rotation.y;
      linesMesh.rotation.x = particles.rotation.x;

      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Recalculate lines based on proximity limit = 2.5
      const linePositions = [];
      const particlePositions = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 2.5) {
            linePositions.push(
              particlePositions[i * 3],
              particlePositions[i * 3 + 1],
              particlePositions[i * 3 + 2],
              particlePositions[j * 3],
              particlePositions[j * 3 + 1],
              particlePositions[j * 3 + 2]
            );
          }
        }
      }

      linesMesh.geometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      linesMesh.geometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-30 transition-opacity ease-out duration-300" style={{ transform: "translateZ(0)", willChange: "transform, opacity" }} />;
}
