import { motion } from 'framer-motion';
import { Sparkles, Users, Target, Award, Heart, Zap } from 'lucide-react';

export function AboutSection() {
  const teamMembers = [
    {
      name: 'Yochka Ephraim Joseph',
      role: 'Spécialiste en Réceptionniste Vocale IA',
      description: 'Expert en solutions d\'IA conversationnelle, Yochka transforme votre accueil téléphonique en une expérience fluide et professionnelle disponible 24/7. Sa mission : faire en sorte qu\'aucun appel ne reste sans réponse, permettant aux entrepreneurs de se concentrer sur l\'essentiel de leur activité.',
      gradient: 'from-[#00D4FF] to-[#7B61FF]',
      icon: '🤖',
      image: '/images/yochka.jpg' // Remplacez par le chemin réel de votre image
    },
    {
      name: 'James Baptiste',
      role: 'Spécialiste en Design Web',
      description: 'Créateur de sites web modernes et performants, James conçoit des présences en ligne qui captivent et convertissent. Son approche allie esthétique soignée et fonctionnalité optimale pour donner à chaque entreprise la vitrine numérique qu\'elle mérite.',
      gradient: 'from-[#7B61FF] to-[#FF2E97]',
      icon: '🎨',
      image: '/images/james.jpg' // Remplacez par le chemin réel de votre image
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Expertise complémentaire',
      description: 'Web et IA réunis sous un même toit',
      color: '#00D4FF'
    },
    {
      icon: Heart,
      title: 'Approche personnalisée',
      description: 'Solutions adaptées à votre réalité',
      color: '#7B61FF'
    },
    {
      icon: Sparkles,
      title: 'Service bilingue',
      description: 'Français et anglais',
      color: '#FF2E97'
    },
    {
      icon: Target,
      title: 'Support local',
      description: 'Une équipe accessible et à l\'écoute',
      color: '#00D4FF'
    },
    {
      icon: Award,
      title: 'Innovation accessible',
      description: 'Technologie de pointe à prix compétitifs',
      color: '#7B61FF'
    }
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]"></div>
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#00D4FF] rounded-full blur-[200px]"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#7B61FF] rounded-full blur-[200px]"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/5 backdrop-blur-xl mb-6"
          >
            <span className="text-[#00D4FF] font-medium">À propos de Neurax</span>
          </motion.div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
          >
            Qui{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#FF2E97] bg-clip-text text-transparent">
              sommes-nous ?
            </span>
          </h2>
        </motion.div>

        {/* Origin Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 to-[#7B61FF]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 
                    className="text-2xl md:text-3xl mb-4"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                  >
                    Notre histoire
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    <strong className="text-white">Neurax est né en 2025</strong> d'une vision simple : combiner l'intelligence artificielle et le design web pour transformer la façon dont les entreprises canadiennes communiquent avec leurs clients.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Nous sommes une <strong className="text-white">équipe de deux passionnés</strong> qui unissent leurs expertises complémentaires pour offrir des solutions innovantes et accessibles aux entrepreneurs et entreprises de toutes tailles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Members */}
        <div className="mb-24" id="team">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 
              className="text-3xl md:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
            >
              Notre{' '}
              <span className="bg-gradient-to-r from-[#7B61FF] to-[#FF2E97] bg-clip-text text-transparent">
                équipe
              </span>
            </h3>
            <p className="text-xl text-gray-400">
              Deux expertises, une vision commune
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#7B61FF]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#00D4FF]/50 transition-all duration-300 h-full">
                  {/* Photo personnelle */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      {/* Gradient border effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-3xl blur-md opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                      
                      {/* Photo container */}
                      <div className="relative w-48 h-48 rounded-3xl overflow-hidden border-2 border-white/20">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback si l'image ne charge pas
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=0a0a0a&color=00D4FF&bold=true`;
                          }}
                        />
                        {/* Overlay gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                      </div>
                      
                      {/* Icon badge */}
                      <div className={`absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-2xl shadow-lg border-2 border-[#050505]`}>
                        {member.icon}
                      </div>
                    </div>
                  </div>

                  {/* Name and role */}
                  <div className="text-center mb-4">
                    <h4 
                      className="text-2xl md:text-3xl mb-2"
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                    >
                      {member.name}
                    </h4>
                    <div className="inline-block px-4 py-2 rounded-full bg-[#0D0D0D] border border-white/30">
                      <span className="text-sm font-medium text-white">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-center">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/20 to-[#FF2E97]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#FF2E97] mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 
                className="text-3xl md:text-4xl mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
              >
                Notre{' '}
                <span className="bg-gradient-to-r from-[#7B61FF] to-[#FF2E97] bg-clip-text text-transparent">
                  mission
                </span>
              </h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Chez Neurax, nous croyons que <strong className="text-white">chaque entreprise, quelle que soit sa taille, mérite des outils technologiques de qualité professionnelle</strong>. Nous rendons l'innovation accessible en combinant création web sur mesure et intelligence artificielle vocale pour propulser votre croissance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/20 via-[#7B61FF]/20 to-[#FF2E97]/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <p className="text-xl md:text-2xl text-gray-300 mb-6">
                <strong 
                  className="bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Prêt à révolutionner votre présence numérique ?
                </strong>
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full font-semibold shadow-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all"
              >
                Contactez-nous dès aujourd'hui
                <Zap className="inline-block w-5 h-5 ml-2" />
              </motion.a>
              <p className="text-sm text-gray-500 mt-4">
                Consultation gratuite • Sans engagement
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}