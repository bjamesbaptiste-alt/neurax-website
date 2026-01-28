import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

export function Hero3D() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const rotateX = useTransform(scrollY, [0, 500], [0, -30]);
  const rotateY = useTransform(scrollY, [0, 500], [0, 20]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ perspective: '2000px', opacity }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="relative w-full max-w-4xl"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Central 3D Structure */}
        <motion.div
          className="relative mx-auto"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: mousePosition.y,
            rotateY: mousePosition.x,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          {/* Main Hexagon Platform */}
          <motion.div
            className="relative w-[400px] h-[400px] mx-auto"
            animate={{
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Hexagon Base */}
            <svg
              className="absolute inset-0"
              viewBox="0 0 400 400"
              style={{
                transform: 'translateZ(0px)',
                filter: 'drop-shadow(0 30px 60px rgba(0, 212, 255, 0.3))',
              }}
            >
              <defs>
                <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#7B61FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF2E97" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <polygon
                points="200,50 320,125 320,275 200,350 80,275 80,125"
                fill="url(#hexGradient)"
                stroke="#00D4FF"
                strokeWidth="2"
              />
            </svg>

            {/* Rotating Rings */}
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                animate={{
                  rotateX: [0, 360],
                }}
                transition={{
                  duration: 15 - index * 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 0.5,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <svg
                  className="absolute inset-0"
                  viewBox="0 0 400 400"
                  style={{
                    transform: `translateZ(${50 + index * 20}px) scale(${1 - index * 0.15})`,
                  }}
                >
                  <circle
                    cx="200"
                    cy="200"
                    r={150 - index * 30}
                    fill="none"
                    stroke={index === 0 ? '#00D4FF' : index === 1 ? '#7B61FF' : '#FF2E97'}
                    strokeWidth="2"
                    opacity={0.6 - index * 0.15}
                  />
                </svg>
              </motion.div>
            ))}

            {/* Central Core Sphere */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
              animate={{
                scale: [1, 1.1, 1],
                rotateY: [0, 360],
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
              }}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(80px)',
              }}
            >
              <div className="relative w-full h-full">
                {/* Sphere */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D4FF] via-[#7B61FF] to-[#FF2E97]"
                  style={{
                    boxShadow: '0 20px 60px rgba(0, 212, 255, 0.6), inset 0 -20px 40px rgba(0, 0, 0, 0.4)',
                  }}
                />
                {/* Shine */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/40 blur-xl" />
                
                {/* Pulsing Glow */}
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] blur-2xl"
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            {/* Orbiting Particles */}
            {[...Array(8)].map((_, index) => {
              const angle = (index / 8) * Math.PI * 2;
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF]"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) translateZ(60px)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.25,
                  }}
                />
              );
            })}
          </motion.div>

          {/* Connecting Lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: 'translateZ(50px)',
            }}
          >
            {[
              { x1: 200, y1: 200, x2: 100, y2: 150 },
              { x1: 200, y1: 200, x2: 320, y2: 170 },
              { x1: 200, y1: 200, x2: 110, y2: 280 },
              { x1: 200, y1: 200, x2: 330, y2: 260 },
            ].map((line, index) => (
              <motion.line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#00D4FF"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#00D4FF]/20 via-[#7B61FF]/20 to-[#FF2E97]/20 blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}