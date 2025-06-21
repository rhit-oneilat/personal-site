import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function HomeComponent() {
  const [P5Sketch, setP5Sketch] = useState(null);

  useEffect(() => {
    import('./P5Sketch.jsx').then((mod) => {
      setP5Sketch(() => mod.default);
    });
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gruvbox-bg text-gruvbox-fg">
      {/* Background animation (only loaded client-side) */}
      <div className="absolute inset-0 z-0">
        {P5Sketch ? <P5Sketch /> : null}
      </div>

      {/* Centered content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="bg-gruvbox-bg/80 backdrop-blur-md border border-gruvbox-bg3 rounded-xl p-8 md:p-12 max-w-2xl text-center shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gruvbox-orange">
            Aidan O'Neil
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gruvbox-fg2">
            Mathematician | Data Scientist | Engineer
          </p>
          <p className="mt-4 text-lg text-gruvbox-fg3">
            Finding the patterns others miss.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a
              href="/resume"
              className="px-6 py-3 text-lg bg-gruvbox-orange rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              View My Resume
            </a>
            <a
              href="/projects"
              className="px-6 py-3 text-lg bg-gruvbox-bg1 border border-gruvbox-bg3 rounded-lg font-medium hover:bg-gruvbox-bg2 transition-all duration-300"
            >
              Check Out My Work
            </a>
          </div>
          <div className="mt-6 flex justify-center gap-6">
            <a
              href="https://github.com/yourgithub"
              className="text-gruvbox-fg4 hover:text-gruvbox-fg0 text-3xl transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/aidan-o-neil"
              className="text-gruvbox-fg4 hover:text-gruvbox-fg0 text-3xl transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:oneilat@rose-hulman.edu"
              className="text-gruvbox-fg4 hover:text-gruvbox-fg0 text-3xl transition-colors duration-300"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
