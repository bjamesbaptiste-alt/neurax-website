import { Mic, Globe, Zap, CheckCircle2, ArrowRight, Sparkles, MessageSquare, Code, Rocket, BarChart3, Clock, Phone, Play, TrendingUp, Target } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { Questionnaire } from './components/Questionnaire';
import { Chatbot } from './components/Chatbot';
import { Hero3D } from './components/Hero3D';
import { FloatingObjects3D } from './components/FloatingObjects3D';
import { PhoneMockup3D, PhoneMockup3DHandle } from './components/PhoneMockup3D';
import { Icon3D } from './components/Icon3D';
import { Header } from './components/Header';
import { ServiceSelectionModal } from './components/ServiceSelectionModal';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';
import { InteractiveChatDemo } from './components/InteractiveChatDemo';

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [selectedService, setSelectedService] = useState<'website' | 'vocal' | undefined>();
  const [showServiceModal, setShowServiceModal] = useState(false);
  const phoneMockupRef = useRef<PhoneMockup3DHandle>(null);

  const handleServiceSelection = (service?: 'website' | 'vocal') => {
    if (service) {
      setSelectedService(service);
    }
    setShowQuestionnaire(true);
  };

  if (showQuestionnaire) {
    return <Questionnaire initialService={selectedService} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Header onOpenQuestionnaire={handleServiceSelection} />

      {/* Chatbot */}
      <Chatbot />

      {/* Service Selection Modal */}
      <ServiceSelectionModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        onSelectService={(service) => {
          setShowServiceModal(false);
          handleServiceSelection(service);
        }}
      />

      {/* Fixed background grid */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        ></div>
      </div>

      {/* SECTION 1: HERO */}
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

          {/* Floating 3D Objects */}
          <FloatingObjects3D />
        </div>

        {/* Hero 3D */}
        <div className="absolute inset-0 hidden lg:block">
          <Hero3D />
        </div>

        {/* Hero Content */}
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

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-5 mb-16 md:mb-24 w-full sm:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowServiceModal(true)}
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
              onClick={() => {
                const demoSection = document.getElementById('demo');
                demoSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300 cursor-pointer"
            >
              Tester gratuitement
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: SERVICES - Bento Grid */}
      <section className="relative py-16 md:py-24 px-4 md:px-8" id="services">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              Nos <span className="bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400">Des outils puissants pour votre croissance</p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1 - IA VOCALE (LARGE - 2x width on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-[40px] hover:border-[#00D4FF]/50 transition-all duration-500 overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#7B61FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] mb-6">
                  <Mic className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <h3 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                  Réceptionniste Vocal IA
                </h3>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl">
                  Répond 24/7, prend les RDV automatiquement, ne manque jamais un appel. Parfait pour restaurants, garages, salons.
                </p>
                
                {/* Features list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {[
                    'Disponible 24/7',
                    'Voix naturelle et humaine',
                    'Prise RDV automatique',
                    'Répond aux questions courantes',
                    '299$/mois'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#00D4FF] flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const demoSection = document.getElementById('demo');
                    demoSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300 cursor-pointer"
                >
                  Tester gratuitement
                </motion.button>
              </div>

              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </motion.div>

            {/* Card 2 - SITES WEB (MEDIUM) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-[40px] hover:border-[#7B61FF]/50 transition-all duration-500 overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 to-[#FF2E97]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#FF2E97] mb-6">
                  <Globe className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                  Sites Web Modernes
                </h3>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-6">
                  Design 2026, responsive, optimisé conversion. De concept à site live en 2-3 semaines.
                </p>
                
                <div className="space-y-2 mb-6">
                  {[
                    'Design sur-mesure (Figma)',
                    '100% responsive',
                    'Performance optimisée',
                    'Intégration IA disponible',
                    'À partir de 2,500$'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7B61FF] flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 border border-white/20 rounded-full hover:bg-white/5 hover:border-[#7B61FF]/50 transition-all duration-300"
                >
                  Voir portfolio
                </motion.button>
              </div>

              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#7B61FF] to-[#FF2E97] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </motion.div>

            {/* Card 3 - AUTOMATISATION (MEDIUM) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-[40px] hover:border-[#FF2E97]/50 transition-all duration-500 overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E97]/10 to-[#00D4FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#FF2E97] to-[#00D4FF] mb-6">
                  <Zap className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                  Automatisation IA
                </h3>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-6">
                  Workflows intelligents pour gagner du temps et vous concentrer sur votre cœur de métier.
                </p>
                
                <div className="space-y-2 mb-6">
                  {[
                    'Processus personnalisés',
                    'Intégrations multiples',
                    'ROI rapide',
                    'Sur devis'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF2E97] flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 border border-white/20 rounded-full hover:bg-white/5 hover:border-[#FF2E97]/50 transition-all duration-300"
                >
                  Découvrir
                </motion.button>
              </div>

              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#FF2E97] to-[#00D4FF] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEMO VIDEO */}
      <section className="relative py-16 md:py-24 px-4 md:px-8" id="demo">
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

          {/* 3D Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-12 h-[600px] flex items-center justify-center"
          >
            <PhoneMockup3D ref={phoneMockupRef} />
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
              onClick={() => {
                phoneMockupRef.current?.startCall();
              }}
              className="px-8 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300"
            >
              Tester gratuitement
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: PROCESS TIMELINE */}
      <section className="relative py-16 md:py-24 px-4 md:px-8" id="process">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              Notre <span className="bg-gradient-to-r from-[#7B61FF] to-[#FF2E97] bg-clip-text text-transparent">Processus</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400">4 étapes simples vers le succès</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <MessageSquare className="w-8 h-8" />, step: '01', title: 'APPEL GRATUIT', duration: '15 min', description: 'Consultation initiale pour comprendre vos besoins' },
              { icon: <Target className="w-8 h-8" />, step: '02', title: 'DÉMO', duration: '24h', description: 'Présentation personnalisée de la solution' },
              { icon: <Code className="w-8 h-8" />, step: '03', title: 'SETUP IA', duration: '48h', description: 'Configuration et intégration complète' },
              { icon: <Rocket className="w-8 h-8" />, step: '04', title: 'LIVE GO!', duration: '∞', description: 'Lancement et support continu' }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Connecting line (desktop only) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-[2px] bg-gradient-to-r from-[#00D4FF] to-transparent z-0"></div>
                )}
                
                <div className="relative p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-[40px] hover:border-[#00D4FF]/50 transition-all duration-300 h-full" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                  <div className="text-6xl md:text-7xl lg:text-[120px] mb-4 bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent opacity-50" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                    {process.step}
                  </div>
                  <div className="inline-block p-3 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7B61FF]/20 mb-4 border border-[#00D4FF]/30">
                    {process.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                    {process.title}
                  </h3>
                  <div className="text-[#00D4FF] mb-3 font-medium">{process.duration}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: STATS/SOCIAL PROOF */}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '24/7', label: 'Toujours actif' },
              { value: '<2 sec', label: 'Réponse moyenne' },
              { value: '99.9%', label: 'Uptime garanti' },
              { value: '-80%', label: 'vs employé' }
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

      {/* SECTION 6: PRICING */}
      <section className="relative py-16 md:py-24 px-4 md:px-8" id="pricing">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              Tarifs <span className="bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent">Transparents</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400">Choisissez le plan qui vous convient</p>
          </motion.div>

          {/* 3 Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[
              {
                name: 'STARTER',
                price: '2,500$',
                period: '',
                description: 'Parfait pour démarrer',
                features: [
                  'Site web moderne',
                  '✓ 5 pages',
                  '✓ Responsive',
                  '✓ Support 30 jours'
                ],
                popular: false
              },
              {
                name: 'BUSINESS',
                price: '4,999$',
                period: '',
                description: 'Notre offre la plus populaire',
                features: [
                  'Site web complet',
                  'IA Vocal inclus',
                  '✓ Site illimité',
                  '✓ IA base',
                  '✓ Intégré',
                  '✓ Support 60 jours'
                ],
                popular: true
              },
              {
                name: 'PREMIUM',
                price: '7,999$',
                period: '',
                description: 'Solution complète',
                features: [
                  'Tout inclus',
                  '✓ Premium design',
                  '✓ IA avancé',
                  '✓ Workflow auto',
                  '✓ Support 90 jours'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 md:p-8 rounded-3xl border backdrop-blur-[40px] transition-all duration-500 ${
                  plan.popular
                    ? 'border-[#00D4FF] bg-gradient-to-br from-[#00D4FF]/10 to-[#7B61FF]/10 md:scale-110 shadow-[0_0_60px_rgba(0,212,255,0.3)]'
                    : 'border-white/10 bg-white/[0.03] hover:border-[#00D4FF]/50'
                }`}
                style={{ boxShadow: plan.popular ? '0 0 60px rgba(0, 212, 255, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.3)' }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full text-xs md:text-sm font-medium">
                    POPULAIRE ⭐
                  </div>
                )}

                <div className="mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 md:mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://form.typeform.com/to/C4IBY7sF', '_blank')}
                  className={`w-full py-3 md:py-4 rounded-full transition-all duration-300 text-sm md:text-base ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]'
                      : 'border border-white/20 hover:bg-white/5 hover:border-[#00D4FF]/50'
                  }`}
                >
                  Choisir
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Monthly IA Vocal Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-6 md:p-8 rounded-3xl border border-[#00D4FF]/50 bg-gradient-to-r from-[#00D4FF]/10 to-[#7B61FF]/10 backdrop-blur-[40px] text-center"
            style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)' }}
          >
            <h3 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent">IA VOCAL SEUL - 299$/mois</span>
            </h3>
            <p className="text-gray-400 mb-6">Sans engagement</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://form.typeform.com/to/bXiJB3SS', '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300"
            >
              Essai gratuit 7 jours
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="relative py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/20 p-12 md:p-16 text-center"
          >
            {/* Strong gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/80 via-[#7B61FF]/80 to-[#FF2E97]/80"></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>

            {/* Animated glow orbs */}
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
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
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

      {/* SECTION 8: ABOUT */}
      <AboutSection />

      {/* SECTION 9: CONTACT */}
      <ContactSection />

      {/* SECTION 10: FOOTER */}
      <footer className="relative py-12 md:py-16 px-4 md:px-8 border-t border-white/10 bg-[#050505]">
        <div className="max-w-[1440px] mx-auto">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center mb-12">
            <span 
              className="text-2xl md:text-3xl tracking-[0.3em] mb-3" 
              style={{ 
                fontFamily: 'Orbitron, monospace', 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00D4FF 0%, #7B61FF 50%, #FF2E97 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              NEURAX
            </span>
            <div className="h-[2px] w-32 bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#FF2E97] rounded-full mb-3"></div>
            <p className="text-gray-400 text-sm">L'IA au service des PME québécoises</p>
          </div>

          {/* 4 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">IA Vocal</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Sites Web</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Automatisation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">À propos</a></li>
                <li><a href="#team" className="hover:text-[#00D4FF] transition-colors">Équipe</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Carrières</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="mailto:hello@neurax.ai" className="hover:text-[#00D4FF] transition-colors">Email</a></li>
                <li><a href="tel:+15145555555" className="hover:text-[#00D4FF] transition-colors">Téléphone</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 Neurax • Montréal, QC 🇨🇦
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}