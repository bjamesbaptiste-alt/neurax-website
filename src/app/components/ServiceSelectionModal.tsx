import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Mic, ArrowRight } from 'lucide-react';

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: 'website' | 'vocal') => void;
}

export function ServiceSelectionModal({ isOpen, onClose, onSelectService }: ServiceSelectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-4xl"
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] rounded-full flex items-center justify-center shadow-2xl shadow-[#00D4FF]/50"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Content */}
              <div className="bg-[#0a0a0a] border-2 border-white/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/30 via-[#050505]/50 to-[#7B61FF]/30"></div>
                <motion.div
                  animate={{ 
                    x: [0, 100, 0],
                    y: [0, -50, 0]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#00D4FF]/20 rounded-full blur-[120px]"
                />
                <motion.div
                  animate={{ 
                    x: [0, -100, 0],
                    y: [0, 100, 0]
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#7B61FF]/20 rounded-full blur-[120px]"
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8 md:mb-12">
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl md:text-4xl lg:text-5xl mb-4"
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                    >
                      Quel service vous intéresse ?
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg md:text-xl text-gray-400"
                    >
                      Choisissez le service pour lequel vous souhaitez démarrer un projet
                    </motion.p>
                  </div>

                  {/* Service Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Website Card */}
                    <motion.button
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => {
                        onClose();
                        window.open('https://form.typeform.com/to/C4IBY7sF', '_blank');
                      }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-[#7B61FF]/50 transition-all duration-300 text-left overflow-hidden"
                    >
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 to-[#FF2E97]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-[#7B61FF] to-[#FF2E97] mb-6">
                          <Globe className="w-8 h-8 md:w-10 md:h-10" />
                        </div>

                        {/* Title */}
                        <h3 
                          className="text-2xl md:text-3xl mb-3"
                          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                        >
                          Site Web Moderne
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 mb-6">
                          Design 2026, responsive, optimisé conversion. De concept à site live en 2-3 semaines.
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-6">
                          {[
                            'Design sur-mesure',
                            'Performance optimisée',
                            'À partir de 2,500$'
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#FF2E97]"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-[#7B61FF] font-medium group-hover:gap-4 transition-all">
                          Démarrer ce projet
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#7B61FF] to-[#FF2E97] rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    </motion.button>

                    {/* Vocal IA Card */}
                    <motion.button
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => {
                        onClose();
                        window.open('https://form.typeform.com/to/bXiJB3SS', '_blank');
                      }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-[#00D4FF]/50 transition-all duration-300 text-left overflow-hidden"
                    >
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#7B61FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] mb-6">
                          <Mic className="w-8 h-8 md:w-10 md:h-10" />
                        </div>

                        {/* Title */}
                        <h3 
                          className="text-2xl md:text-3xl mb-3"
                          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                        >
                          Réceptionniste Vocal IA
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 mb-6">
                          Répond 24/7, prend les RDV automatiquement, ne manque jamais un appel.
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-6">
                          {[
                            'Disponible 24/7',
                            'Prise RDV automatique',
                            '299$/mois'
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7B61FF]"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-[#00D4FF] font-medium group-hover:gap-4 transition-all">
                          Démarrer ce projet
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}