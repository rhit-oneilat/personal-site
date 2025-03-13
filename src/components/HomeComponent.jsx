import React, { useRef, useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import * as THREE from 'three';

export default function HomeComponent() {
  const mountRef = useRef(null);
  const contentRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    animationHeight: '30vh',
    contentScale: 1
  });

  useEffect(() => {
    if (!mountRef.current) return;

    // Get header height - assume there's a header with some height
    // Replace this with actual code to get your header's height
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;

    const updateDimensions = () => {
      if (!mountRef.current || !contentRef.current) return;

      const windowHeight = window.innerHeight;
      const availableHeight = windowHeight - headerHeight;
      const contentHeight = contentRef.current.scrollHeight;

      // Calculate animation height as a percentage of available space
      // Adjust animation to take 30-40% of available space
      const animationHeightValue = Math.floor(availableHeight * 0.4);

      // Calculate remaining space for content
      const remainingSpace = availableHeight - animationHeightValue;

      // Scale content if needed to fit in remaining space
      let scale = 1;
      if (contentHeight > remainingSpace) {
        scale = remainingSpace / contentHeight;
      }

      setDimensions({
        animationHeight: `${animationHeightValue}px`,
        contentScale: scale
      });

      return {
        width: mountRef.current.clientWidth,
        height: animationHeightValue
      };
    };

    const { width, height } = updateDimensions();

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
      const radius = 6;

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
      const { width: newWidth, height: newHeight } = updateDimensions();
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    observer.observe(mountRef.current);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    // Run the resize handler one more time after content has fully rendered
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="h-[calc(100vh-var(--header-height,0px))] bg-gruvbox-bg text-gruvbox-fg flex flex-col overflow-hidden">
      <div
        className="w-full pointer-events-none"
        style={{ height: dimensions.animationHeight }}
      >
        <div ref={mountRef} className="w-full h-full" />
      </div>

      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center w-full px-4 md:px-8 flex-grow"
        style={{
          transform: `scale(${dimensions.contentScale})`,
          transformOrigin: 'center center'
        }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gruvbox-orange text-center">
          Aidan O'Neil
        </h1>
        <p className="mt-4 md:mt-6 text-xl md:text-2xl lg:text-3xl text-gruvbox-fg2 text-center">
          Mathematician | Data Scientist | Engineer
        </p>
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-gruvbox-fg3 text-center max-w-3xl">
          Transforming complex problems into elegant solutions through mathematics and code.
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap gap-4 md:gap-6 justify-center">
          <a href="/resume" className="px-6 py-3 text-lg md:text-xl bg-gruvbox-orange rounded-lg font-medium hover:shadow-lg transition-all duration-300">
            View My Resume
          </a>
          <a href="/projects" className="px-6 py-3 text-lg md:text-xl bg-gruvbox-bg1 border border-gruvbox-bg3 rounded-lg font-medium hover:bg-gruvbox-bg2 transition-all duration-300">
            Check Out My Work
          </a>
        </div>
        <div className="mt-6 md:mt-8 flex justify-center gap-6 md:gap-8">
          <a href="https://github.com/yourgithub" className="text-gruvbox-fg4 hover:text-gruvbox-fg0 transition-colors duration-300 text-3xl md:text-4xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/aidan-o-neil" className="text-gruvbox-fg4 hover:text-gruvbox-fg0 transition-colors duration-300 text-3xl md:text-4xl">
            <FaLinkedin />
          </a>
          <a href="mailto:oneilat@rose-hulman.edu" className="text-gruvbox-fg4 hover:text-gruvbox-fg0 transition-colors duration-300 text-3xl md:text-4xl">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
}
