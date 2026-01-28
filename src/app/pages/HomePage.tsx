import { motion, useScroll, useTransform } from 'motion/react';
import { Mic, Globe, Zap, CheckCircle2, ArrowRight, Clock, Phone, TrendingUp } from 'lucide-react';
import { Hero3D } from '@/app/components/Hero3D';
import { FloatingObjects3D } from '@/app/components/FloatingObjects3D';
import { PhoneMockup3D } from '@/app/components/PhoneMockup3D';

interface HomePageProps {
  onOpenQuestionnaire: () => void;
}

export function HomePage({ onOpenQuestionnaire }: HomePageProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20">
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00D4FF]/20 rounded-full blur-[120px]"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-[#7B61FF]/20 rounded-full blur-[120px]"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, -100, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-[#FF2E97]/20 rounded-full blur-[120px]"
          ></motion.div>

          <FloatingObjects3D />
        </div>

        <div className="absolute inset-0 hidden lg:block">
          <Hero3D />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-[1440px] mx-auto w-full flex flex-col items-center text-center px-4 md:px-8 mt-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-[80px] xl:text-[96px] mb-6 md:mb-8 max-w-6xl leading-[1.1]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
          >
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#FF2E97] bg-clip-text text-transparent">
              L'INTELLIGENCE ARTIFICIELLE
            </span>
            <br />
            AU SERVICE DE VOTRE ENTREPRISE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 md:mb-14 max-w-4xl"
          >
            Réceptionnistes vocaux IA • Sites Web modernes • Automatisation intelligente
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-5 mb-16 md:mb-24 w-full sm:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenQuestionnaire}
              className="relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#FF2E97] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></motion.div>
              <span className="relative flex items-center gap-2 justify-center text-base md:text-lg font-medium">
                Démarrer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(0, 212, 255, 0.3)',
                    '0 0 40px rgba(0, 212, 255, 0.5)',
                    '0 0 20px rgba(0, 212, 255, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 md:px-10 py-4 md:py-5 border-2 border-white/30 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all duration-300 text-base md:text-lg font-medium"
            >
              Parler à un expert
            </motion.button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl"
          >
            {[
              { value: '24/7', label: 'Toujours actif', icon: <Clock className="w-5 h-5 md:w-6 md:h-6" /> },
              { value: '-80%', label: 'vs employé', icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" /> },
              { value: '500+', label: 'Appels/jour', icon: <Phone className="w-5 h-5 md:w-6 md:h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 to-[#7B61FF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl">
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7B61FF]/20 border border-[#00D4FF]/30 text-[#00D4FF]">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-400 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* DEMO VIDEO SECTION */}
      <section className="relative py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              VOYEZ NEURAX EN <span className="bg-gradient-to-r from-[#00D4FF] to-[#FF2E97] bg-clip-text text-transparent">ACTION</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400">
              L'IA qui transforme votre service client
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-12 h-[600px] flex items-center justify-center"
          >
            <PhoneMockup3D />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              "Notre IA comprend, répond et agit comme votre meilleur employé"
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenQuestionnaire}
              className="px-8 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300"
            >
              Tester gratuitement
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              Des <span className="bg-gradient-to-r from-[#FF2E97] to-[#00D4FF] bg-clip-text text-transparent">Chiffres</span> Qui Parlent
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { value: '24/7', label: 'Toujours actif' },
              { value: '<2 sec', label: 'Réponse moyenne' },
              { value: '99.9%', label: 'Uptime garanti' },
              { value: '-80%', label: 'vs employé' },
              { value: '🤖', label: 'IA Avancée' },
              { value: '🇨🇦', label: 'Québec Local' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#00D4FF]/30 bg-[#0D0D0D] text-center hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300"
                style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)' }}
              >
                <div className="text-4xl md:text-6xl lg:text-7xl mb-2 md:mb-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-lg lg:text-xl text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/20 p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/80 via-[#7B61FF]/80 to-[#FF2E97]/80"></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>

            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00D4FF] rounded-full blur-[100px] opacity-40 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FF2E97] rounded-full blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                PRÊT À PROPULSER VOTRE ENTREPRISE ?
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
                Rejoignez les PME qui ne manquent plus jamais un appel
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 md:px-10 py-4 md:py-5 border-2 border-white/30 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all duration-300 text-base md:text-lg font-medium"
                >
                  Parler à un expert
                </motion.button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center text-sm md:text-base">
                {['✓ Setup en 48h', '✓ Sans engagement', '✓ Support en français'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
