import { motion } from 'framer-motion';

interface Icon3DProps {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient?: string;
  size?: number;
}

export function Icon3D({ Icon, gradient = 'from-[#00D4FF] to-[#7B61FF]', size = 60 }: Icon3DProps) {
  return (
    <motion.div
      className="relative"
      style={{ perspective: '1000px' }}
      whileHover={{ scale: 1.1 }}
      animate={{
        rotateY: [0, 360],
      }}
      transition={{
        rotateY: {
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }
      }}
    >
      <motion.div
        className={`relative bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center`}
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 50px -12px rgba(0, 212, 255, 0.5)',
        }}
        whileHover={{
          rotateX: 15,
          rotateY: 15,
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center"
          style={{
            transform: 'translateZ(15px)',
            backfaceVisibility: 'hidden',
          }}
        >
          <Icon className="w-8 h-8" strokeWidth={2} />
        </div>

        {/* Back face */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-50 flex items-center justify-center`}
          style={{
            transform: 'translateZ(-15px) rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <Icon className="w-8 h-8" strokeWidth={2} />
        </div>

        {/* Top face */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-70`}
          style={{
            transform: `rotateX(90deg) translateZ(${size/2}px)`,
            height: '30px',
            top: '-15px',
          }}
        />

        {/* Bottom face */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-30`}
          style={{
            transform: `rotateX(-90deg) translateZ(${size/2}px)`,
            height: '30px',
            bottom: '-15px',
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl"
          style={{
            background: `linear-gradient(135deg, rgba(0, 212, 255, 0.6), rgba(123, 97, 255, 0.6))`,
            transform: 'translateZ(-20px)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}