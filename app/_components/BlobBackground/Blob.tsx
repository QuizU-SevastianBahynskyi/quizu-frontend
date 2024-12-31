"use client"

import React, { useState, useEffect, useMemo } from "react";

interface BlobProps {
  xPosition?: number;
  yPosition?: number;
  size?: number;
  amplitude?: number;
  numPoints?: number;
  speed?: number;
  period?: number;
  rotationSpeed?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  showGuides?: boolean;
  tension?: number;
  smoothness?: number;
  phaseOffset?: number;
  irregularity?: number;
  randomness?: number;
  seed?: number;
}

const useFrameLoop = () => {
  const frameRate = 60;
  const frameDuration = 1000 / frameRate;
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      if (deltaTime >= frameDuration) {
        setFrame((prevFrame) => prevFrame + 1);
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [frameDuration]);

  return frame;
};

// Pseudo-random number generator for consistent randomness
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Generate unique frequencies for each point
const generateUniqueFrequencies = (seed: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    primary: 0.5 + seededRandom(seed + i) * 0.5,
    secondary: 0.3 + seededRandom(seed + i + count) * 0.4,
    phase: seededRandom(seed + i + count * 2) * Math.PI * 2,
    amplitude: 0.8 + seededRandom(seed + i + count * 3) * 0.4
  }));
};

const Blob: React.FC<BlobProps> = ({
  xPosition = window.innerWidth / 2,
  yPosition = window.innerHeight / 2,
  size = 50,
  amplitude = 0.2,
  numPoints = 4,
  speed = 0.1,
  period = Math.PI * 2,
  rotationSpeed = 0.5,
  color = "#ffffff",
  backgroundColor = "transparent",
  className = "",
  showGuides = false,
  tension = 1,
  smoothness = 1,
  phaseOffset = 0,
  irregularity = 0,
  randomness = 0.5,
  seed = 12345
}) => {
  const frame = useFrameLoop();
  const time = frame * speed;
  const rotation = frame * rotationSpeed;

  // Generate unique movement patterns for each point
  const frequencies = useMemo(() => 
    generateUniqueFrequencies(seed, numPoints), 
    [seed, numPoints]
  );

  // Noise function for organic movement
  const noise = (x: number, y: number, t: number) => {
    return Math.sin(x * 1.5 + t) * Math.cos(y * 1.5 + t) * 0.5 +
           Math.sin(x * 2.3 + t * 1.2) * Math.cos(y * 2.1 + t * 0.9) * 0.25 +
           Math.sin(x * 3.7 + t * 0.8) * Math.cos(y * 3.2 + t * 1.1) * 0.125;
  };

  // Generate points with unique behaviors
  const points = Array.from({ length: numPoints }, (_, i) => {
    const angle = (i / numPoints) * Math.PI * 2;
    const baseRadius = 1;
    
    // Get unique frequency patterns for this point
    const freq = frequencies[i];
    
    // Create complex movement pattern
    const timeOffset = time * freq.primary + freq.phase;
    const secondaryOffset = Math.sin(time * freq.secondary) * randomness;
    
    // Add organic movement using noise
    const noiseX = noise(Math.cos(angle), Math.sin(angle), time * 0.5) * randomness;
    const noiseY = noise(Math.sin(angle), Math.cos(angle), time * 0.5) * randomness;
    
    // Calculate final position with all random factors
    const radiusVariation = (
      irregularity * Math.sin(timeOffset) * freq.amplitude +
      noiseX * amplitude
    );
    
    const currentRadius = baseRadius + radiusVariation;

    const x = Math.cos(angle) * currentRadius + 
             Math.sin(timeOffset) * amplitude * freq.amplitude +
             noiseX;
    const y = Math.sin(angle) * currentRadius + 
             Math.cos(timeOffset) * amplitude * freq.amplitude +
             noiseY;

    // Calculate control points with varying tension
    const ctrlDistance = (4 / 3) * Math.tan(Math.PI / (numPoints * 2)) * 
                        tension * (1 + secondaryOffset * 0.3);
    
    const smoothingFactor = smoothness * (1 + Math.sin(timeOffset) * 0.2);
    const cp1Angle = angle - Math.PI / 2 + (noiseX * Math.PI * 0.1);
    const cp2Angle = angle + Math.PI / 2 + (noiseY * Math.PI * 0.1);

    return {
      x,
      y,
      controlPoints: [
        {
          x: x + Math.cos(cp1Angle) * ctrlDistance * smoothingFactor,
          y: y + Math.sin(cp1Angle) * ctrlDistance * smoothingFactor
        },
        {
          x: x + Math.cos(cp2Angle) * ctrlDistance * smoothingFactor,
          y: y + Math.sin(cp2Angle) * ctrlDistance * smoothingFactor
        }
      ]
    };
  });

  // Generate SVG path
  const pathData = points.reduce((path, point, i) => {
    const nextPoint = points[(i + 1) % points.length];
    
    if (i === 0) {
      path += `M ${point.x} ${point.y} `;
    }
    
    path += `C ${point.controlPoints[1].x} ${point.controlPoints[1].y} 
             ${nextPoint.controlPoints[0].x} ${nextPoint.controlPoints[0].y} 
             ${nextPoint.x} ${nextPoint.y} `;
    
    return path;
  }, "") + "Z";

  return (
    <svg
      width={size}
      height={size}
      style={{
        overflow: "visible",
        backgroundColor,
        position: 'absolute',
        left: xPosition,
        top: yPosition,
      }}
    >
      <g transform={`scale(${size / 2}) rotate(${rotation})`}>
        <path
          className={className}
          d={pathData}
          fill={color}
        />
        {showGuides && points.map((point, i) => (
          <React.Fragment key={i}>
            <line
              x1={point.x}
              y1={point.y}
              x2={point.controlPoints[0].x}
              y2={point.controlPoints[0].y}
              stroke="#ff0000"
              strokeWidth="0.02"
            />
            <line
              x1={point.x}
              y1={point.y}
              x2={point.controlPoints[1].x}
              y2={point.controlPoints[1].y}
              stroke="#0000ff"
              strokeWidth="0.02"
            />
            <circle
              cx={point.controlPoints[0].x}
              cy={point.controlPoints[0].y}
              r="0.05"
              fill="#ff0000"
            />
            <circle
              cx={point.controlPoints[1].x}
              cy={point.controlPoints[1].y}
              r="0.05"
              fill="#0000ff"
            />
            <circle cx={point.x} cy={point.y} r="0.05" fill="#00ff00" />
          </React.Fragment>
        ))}
      </g>
    </svg>
  );
};

export default Blob;