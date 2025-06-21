import React from 'react';
import { SketchProps } from 'react-p5';

const brightGruvbox = {
  bg: '#1d2021',
  blue: '#89b482',
  aqua: '#9ec07f',
  green: '#c0ca33',
  yellow: '#ffdd55',
  orange: '#ffa044',
  red: '#ff6655',
  purple: '#e199b8',
  fg: '#f2e5c7',
  gray2: '#665c54',
  gray3: '#928374'
};

const scl = 5;
const LOOP_DURATION = 1800;
let cols, rows, terrain = [];

export default function P5Sketch(p5) {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(30);
    initGrid(p5);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    initGrid(p5);
  };

  p5.draw = () => {
    p5.background(brightGruvbox.bg);
    const theta = p5.TWO_PI * (p5.frameCount % LOOP_DURATION) / LOOP_DURATION;
    generateTerrain(p5, theta);
    drawContours(p5);
  };

  function initGrid(p5) {
    cols = Math.floor(p5.width / scl);
    rows = Math.floor(p5.height / scl);
    terrain = Array.from({ length: cols }, () => Array(rows).fill(0));
  }

  function generateTerrain(p5, theta) {
    const R = 15;
    let loopAngle = theta * 0.025;
    let waveT = theta * 0.05;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let xoff = x * 0.05;
        let yoff = y * 0.05;

        let loopX = R * Math.cos(loopAngle);
        let loopY = R * Math.sin(loopAngle);

        let elevation =
          p5.noise(xoff * 0.3 + loopX, yoff * 0.3 + loopY) * 60 +
          p5.noise(xoff * 0.1 + loopX * 1.5, yoff * 0.1 + loopY * 1.5) * 30 +
          p5.noise(xoff * 0.03 + loopX * 2.5, yoff * 0.03 + loopY * 2.5) * 15 +
          Math.sin(xoff + waveT) * 10 +
          Math.cos(yoff + waveT) * 8;

        terrain[x][y] = elevation - 60;
      }
    }
  }

  function drawContours(p5) {
    const contourLevels = [
      { level: -50, color: brightGruvbox.blue },
      { level: -35, color: brightGruvbox.gray3 },
      { level: -25, color: brightGruvbox.aqua },
      { level: -15, color: brightGruvbox.green },
      { level: -5, color: brightGruvbox.yellow },
      { level: 5, color: brightGruvbox.orange },
      { level: 15, color: brightGruvbox.red },
      { level: 25, color: brightGruvbox.purple },
      { level: 35, color: brightGruvbox.fg },
      { level: 45, color: brightGruvbox.gray2 }
    ];

    for (let { level, color } of contourLevels) {
      p5.fill(color + 'AA');
      drawDotsAtContour(p5, level, 1.3);
    }
  }

  function drawDotsAtContour(p5, target, threshold) {
    for (let x = 1; x < cols - 1; x++) {
      for (let y = 1; y < rows - 1; y++) {
        let val = terrain[x][y];
        if (Math.abs(val - target) < threshold) {
          let px = x * scl;
          let py = y * scl;
          p5.ellipse(px, py, 1.2, 1.2);
        }
      }
    }
  }
}
