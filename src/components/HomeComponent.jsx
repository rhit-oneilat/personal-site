import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import TerminalIntro from './TerminalIntro';

export default function HomeComponent() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg text-center w-96"
      >
        <TerminalIntro />
        <h1 className="text-white text-3xl font-semibold mt-4">Aidan O'Neil</h1>
        <p className="text-gray-300 mt-2">Mathematician | Data Scientist | Engineer</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com/yourgithub" className="text-gray-300 hover:text-white text-2xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/aidan-o-neil" className="text-gray-300 hover:text-white text-2xl">
            <FaLinkedin />
          </a>
          <a href="mailto:oneilat@rose-hulman.edu" className="text-gray-300 hover:text-white text-2xl">
            <FaEnvelope />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
