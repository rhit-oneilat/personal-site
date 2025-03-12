import React, { useRef, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import * as THREE from 'three';

export default function HomeComponent() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    console.log("Initializing Three.js scene");

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#282828');

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * 2 * Math.PI;
      const radius = 5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x83a598,
      size: 0.2,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(mountRef.current);

    return () => {
      observer.disconnect();
      mountRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gruvbox-bg text-gruvbox-fg flex flex-col items-center relative">
      <div className="absolute top-0 left-0 w-full h-1/2 z-0 pointer-events-none">
        <div ref={mountRef} className="w-full h-full" />
      </div>

      <div className="flex flex-col items-center justify-end h-screen w-full px-4 md:px-8 relative pb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-gruvbox-orange relative">
          Aidan O'Neil
        </h1>
        <p className="mt-6 text-3xl text-gruvbox-fg2 relative">
          Mathematician | Data Scientist | Engineer
        </p>
        <p className="mt-8 text-xl text-gruvbox-fg3 text-center max-w-3xl relative">
          Transforming complex problems into elegant solutions through mathematics and code.
        </p>
        <div className="mt-10 flex flex-wrap gap-6 justify-center relative">
          <a href="/resume" className="px-8 py-4 text-xl bg-gruvbox-orange rounded-lg font-medium hover:shadow-lg transition-all duration-300">
            View My Resume
          </a>
          <a href="/projects" className="px-8 py-4 text-xl bg-gruvbox-bg1 border border-gruvbox-bg3 rounded-lg font-medium hover:bg-gruvbox-bg2 transition-all duration-300">
            Check Out My Work
          </a>
        </div>
        <div className="mt-12 flex justify-center gap-8 relative">
          <a href="https://github.com/yourgithub" className="text-gruvbox-fg4 hover:text-gruvbox-fg0 transition-colors duration-300 text-4xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/aidan-o-neil" className="text-gruvbox-fg4 hover:text-gruvbox-fg0 transition-colors duration-300 text-4xl">
            <FaLinkedin />
          </a>
          <a href="mailto:oneilat@rose-hulman.edu" className="text-gruvbox-fg4 hover:text-gruvbox-fg0 transition-colors duration-300 text-4xl">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
}
