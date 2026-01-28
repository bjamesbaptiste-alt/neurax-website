import { motion } from 'framer-motion';

export function FloatingObjects3D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Cube 1 */}
      <motion.div
        className="absolute top-[20%] left-[10%]"
        style={{ perspective: '1000px' }}
        animate={{
          y: [0, -30, 0],
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 20, repeat: Infinity, ease: 'linear' },
          rotateY: { duration: 15, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div
          className="relative w-20 h-20"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(20deg) rotateY(20deg)',
          }}
        >
          {/* Cube faces */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/30 to-[#7B61FF]/30 backdrop-blur-sm border border-[#00D4FF]/50" style={{ transform: 'translateZ(40px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/20 to-[#FF2E97]/20 backdrop-blur-sm border border-[#7B61FF]/50" style={{ transform: 'rotateY(180deg) translateZ(40px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/25 to-[#7B61FF]/25 backdrop-blur-sm border border-[#00D4FF]/50" style={{ transform: 'rotateY(90deg) translateZ(40px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E97]/20 to-[#00D4FF]/20 backdrop-blur-sm border border-[#FF2E97]/50" style={{ transform: 'rotateY(-90deg) translateZ(40px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/30 to-[#FF2E97]/30 backdrop-blur-sm border border-[#7B61FF]/50" style={{ transform: 'rotateX(90deg) translateZ(40px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E97]/25 to-[#00D4FF]/25 backdrop-blur-sm border border-[#FF2E97]/50" style={{ transform: 'rotateX(-90deg) translateZ(40px)' }} />
        </div>
      </motion.div>

      {/* Floating Sphere 1 */}
      <motion.div
        className="absolute top-[60%] right-[15%] w-24 h-24"
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7B61FF]/40 to-[#FF2E97]/40 backdrop-blur-xl border border-[#7B61FF]/50" style={{ boxShadow: '0 20px 60px rgba(123, 97, 255, 0.4)' }} />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

      {/* Floating Torus */}
      <motion.div
        className="absolute bottom-[25%] left-[20%]"
        style={{ perspective: '1000px' }}
        animate={{
          y: [0, -25, 0],
          rotateX: [0, 360],
        }}
        transition={{
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transformStyle: 'preserve-3d' }}>
          <defs>
            <linearGradient id="torusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#7B61FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF2E97" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="url(#torusGradient)"
            strokeWidth="12"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 212, 255, 0.4))' }}
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="url(#torusGradient)"
            strokeWidth="8"
            opacity="0.5"
            style={{ transform: 'rotateY(60deg)', transformOrigin: 'center' }}
          />
        </svg>
      </motion.div>

      {/* Floating Pyramid */}
      <motion.div
        className="absolute top-[40%] right-[25%]"
        style={{ perspective: '1000px' }}
        animate={{
          y: [0, -35, 0],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 25, repeat: Infinity, ease: 'linear' },
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ transformStyle: 'preserve-3d' }}>
          <defs>
            <linearGradient id="pyramidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2E97" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <polygon
            points="40,10 70,70 10,70"
            fill="url(#pyramidGradient)"
            stroke="#FF2E97"
            strokeWidth="1.5"
            style={{ filter: 'drop-shadow(0 15px 40px rgba(255, 46, 151, 0.4))' }}
          />
        </svg>
      </motion.div>

      {/* Floating Cube 2 - Smaller */}
      <motion.div
        className="absolute bottom-[15%] right-[10%]"
        style={{ perspective: '1000px' }}
        animate={{
          y: [0, 20, 0],
          rotateZ: [0, 360],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: 18, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div
          className="relative w-16 h-16"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(30deg) rotateY(30deg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E97]/40 to-[#00D4FF]/40 backdrop-blur-sm border border-[#FF2E97]/60" style={{ transform: 'translateZ(32px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/30 to-[#7B61FF]/30 backdrop-blur-sm border border-[#00D4FF]/60" style={{ transform: 'rotateY(180deg) translateZ(32px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/35 to-[#FF2E97]/35 backdrop-blur-sm border border-[#7B61FF]/60" style={{ transform: 'rotateY(90deg) translateZ(32px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E97]/30 to-[#00D4FF]/30 backdrop-blur-sm border border-[#FF2E97]/60" style={{ transform: 'rotateY(-90deg) translateZ(32px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/40 to-[#7B61FF]/40 backdrop-blur-sm border border-[#00D4FF]/60" style={{ transform: 'rotateX(90deg) translateZ(32px)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/35 to-[#FF2E97]/35 backdrop-blur-sm border border-[#7B61FF]/60" style={{ transform: 'rotateX(-90deg) translateZ(32px)' }} />
        </div>
      </motion.div>

      {/* Floating Sphere 2 - Smaller */}
      <motion.div
        className="absolute top-[15%] right-[30%] w-16 h-16"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D4FF]/50 to-[#7B61FF]/50 backdrop-blur-xl border border-[#00D4FF]/60" style={{ boxShadow: '0 15px 45px rgba(0, 212, 255, 0.5)' }} />
          <motion.div
            className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/30 blur-md"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Floating Ring */}
      <motion.div
        className="absolute bottom-[40%] left-[8%]"
        animate={{
          y: [0, 30, 0],
          rotateZ: [0, 360],
        }}
        transition={{
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: 30, repeat: Infinity, ease: 'linear' },
        }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF2E97" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <circle
            cx="35"
            cy="35"
            r="25"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="4"
            style={{ filter: 'drop-shadow(0 8px 25px rgba(123, 97, 255, 0.5))' }}
          />
        </svg>
      </motion.div>
    </div>
  );
}