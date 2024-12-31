"use client";
import React, { useState, useEffect } from "react";

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
}

const useFrameLoop = () => {
  const speed = 1;
  const frameRate = 60;
  const frameDuration = 1000 / frameRate;

  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameDuration) {
        setFrame((prevFrame) => prevFrame + speed);
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, frameDuration]);

  return frame;
};

const Blob: React.FC<BlobProps> = ({
  xPosition = window.innerWidth / 2,
  yPosition = window.innerHeight / 2,
  size = 50,
  amplitude = 0.2,
  numPoints = 4,
  speed = 1,
  period = Math.PI * 2,
  rotationSpeed = 0.5,
  color = "#ffffff",
  backgroundColor = "transparent",
  className = "",
  showGuides = false,
}) => {
  speed = speed / 10;
  const frame = useFrameLoop();

  const controlPointDist = (4 / 3) * Math.tan(Math.PI / (numPoints * 2));
  const time = frame * speed;
  const rotation = frame * rotationSpeed;

  const points = [
    {
      x: 1 + Math.sin(time) * amplitude,
      y: 0,
      controlPoints: [
        {
          x: 1 + Math.sin(time) * amplitude - Math.sin(time + (period / 12) * 1) * amplitude,
          y: -controlPointDist - Math.sin(time + (period / 12) * 1) * amplitude,
        },
        {
          x: 1 + Math.sin(time) * amplitude + Math.sin(time + (period / 12) * 1) * amplitude,
          y: controlPointDist + Math.sin(time + (period / 12) * 1) * amplitude,
        },
      ],
    },
    {
      x: 0,
      y: 1 + Math.sin(time + (period / 12) * 3) * amplitude,
      controlPoints: [
        {
          x: controlPointDist + Math.sin(time + (period / 12) * 2) * amplitude,
          y: 1 + Math.sin(time + (period / 12) * 2) * amplitude,
        },
        {
          x: -controlPointDist + Math.sin(time + (period / 12) * 3) * amplitude,
          y: 1 + Math.sin(time + (period / 12) * 3) * amplitude,
        },
      ],
    },
    {
      x: -1 + Math.sin(time + (period / 12) * 6) * amplitude,
      y: 0,
      controlPoints: [
        {
          x: -1 + Math.sin(time + (period / 12) * 5) * amplitude,
          y: controlPointDist + Math.sin(time + (period / 12) * 5) * amplitude,
        },
        {
          x: -1 + Math.sin(time + (period / 12) * 7) * amplitude,
          y: -controlPointDist + Math.sin(time + (period / 12) * 7) * amplitude,
        },
      ],
    },
    {
      x: 0,
      y: -1 + Math.sin(time + (period / 12) * 9) * amplitude,
      controlPoints: [
        {
          x: -controlPointDist + Math.sin(time + (period / 12) * 8) * amplitude,
          y: -1 + Math.sin(time + (period / 12) * 8) * amplitude,
        },
        {
          x: controlPointDist + Math.sin(time + (period / 12) * 10) * amplitude,
          y: -1 + Math.sin(time + (period / 12) * 10) * amplitude,
        },
      ],
    },
  ];

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
      <g
        transform={`scale(${size / 2}) rotate(${rotation})`}
      >
        <path
          className={className}
          d={`M ${points[0].x} ${points[0].y} 
              C ${points[0].controlPoints[1].x} ${points[0].controlPoints[1].y} 
                ${points[1].controlPoints[0].x} ${points[1].controlPoints[0].y} 
                ${points[1].x} ${points[1].y} 
              S ${points[2].controlPoints[0].x} ${points[2].controlPoints[0].y} 
                ${points[2].x} ${points[2].y} 
              S ${points[3].controlPoints[0].x} ${points[3].controlPoints[0].y} 
                ${points[3].x} ${points[3].y} 
              S ${points[0].controlPoints[0].x} ${points[0].controlPoints[0].y} 
                ${points[0].x} ${points[0].y} Z`}
          fill={color}
        />
        {showGuides &&
          points.map((point, i) => (
            <React.Fragment key={i}>
              <line
                x1={point.x}
                y1={point.y}
                x2={point.controlPoints[0].x}
                y2={point.controlPoints[0].y}
                stroke="#ff0000"
                strokeWidth="0.02"
              />
              <circle
                cx={point.controlPoints[0].x}
                cy={point.controlPoints[0].y}
                r="0.05"
                fill="#ff0000"
              />
              {i === 0 && (
                <>
                  <line
                    x1={point.x}
                    y1={point.y}
                    x2={point.controlPoints[1].x}
                    y2={point.controlPoints[1].y}
                    stroke="#0000ff"
                    strokeWidth="0.02"
                  />
                  <circle
                    cx={point.controlPoints[1].x}
                    cy={point.controlPoints[1].y}
                    r="0.05"
                    fill="#0000ff"
                  />
                </>
              )}
              <circle cx={point.x} cy={point.y} r="0.05" fill="#ff0000" />
            </React.Fragment>
          ))}
      </g>
    </svg>
  );
};

export default Blob;
