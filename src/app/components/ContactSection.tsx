import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    // Validation simple
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.service || !formData.message) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (e.key === 'Enter' && target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@neurax.ca',
      link: 'mailto:contact@neurax.ca'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '(514) 123-4567',
      link: 'tel:+15141234567',
      badge: 'Réceptionniste IA 24/7'
    },
    {
      icon: Clock,
      label: 'Disponibilité',
      value: 'Lun-Ven: 9h-18h',
      subtext: 'Réponse sous 24h garantie'
    },
    {
      icon: MapPin,
      label: 'Région',
      value: 'Montréal, Québec',
      subtext: 'Service partout au Canada'
    }
  ];

  const features = [
    'Consultation gratuite de 30 minutes',
    'Devis détaillé sous 24-48h',
    'Aucun engagement requis',
    'Support 100% en français'
  ];

  const stats = [
    { value: '50+', label: 'Clients satisfaits' },
    { value: '24h', label: 'Temps de réponse' },
    { value: '100%', label: 'Satisfaction client' }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]"></div>
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#00D4FF] rounded-full blur-[150px] opacity-20"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full blur-[150px] opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/5 backdrop-blur-xl mb-6"
          >
            <span className="text-[#00D4FF] font-medium">Contactez-nous</span>
          </motion.div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
          >
            Démarrons votre projet{' '}
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#FF2E97] bg-clip-text text-transparent">
              ensemble
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Obtenez une consultation gratuite et un devis détaillé sous 24-48h. 
            Aucun engagement, 100% personnalisé.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 to-[#7B61FF]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
                <div 
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Form (3 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 via-[#7B61FF]/20 to-[#FF2E97]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-50"></div>
              
              {/* Form Container */}
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
                <h3 
                  className="text-2xl md:text-3xl mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                >
                  Demandez une soumission gratuite
                </h3>
                <p className="text-gray-400 mb-8">
                  Remplissez le formulaire et notre équipe vous contactera sous 24h
                </p>

                <div className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 outline-none transition-all"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 outline-none transition-all"
                        placeholder="Tremblay"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Entreprise <span className="text-gray-500">(optionnel)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 outline-none transition-all"
                      placeholder="Votre entreprise inc."
                    />
                  </div>

                  {/* Contact Info Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 outline-none transition-all"
                        placeholder="jean@entreprise.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 outline-none transition-all"
                        placeholder="(514) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Service and Budget Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Service désiré *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 outline-none transition-all"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="website">Site Web Moderne</option>
                        <option value="vocal">Réceptionniste Vocal IA</option>
                        <option value="both">Les deux services</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Budget estimé <span className="text-gray-500">(optionnel)</span>
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 outline-none transition-all"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="2500-5000">2,500$ - 5,000$</option>
                        <option value="5000-10000">5,000$ - 10,000$</option>
                        <option value="10000+">10,000$+</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Description du projet *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 outline-none transition-all resize-none"
                      placeholder="Décrivez-nous votre projet, vos objectifs et vos besoins spécifiques..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting || submitSuccess}
                    whileHover={!isSubmitting && !submitSuccess ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting && !submitSuccess ? { scale: 0.98 } : {}}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full font-semibold relative overflow-hidden group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!submitSuccess ? (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#FF2E97] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              Demander une soumission gratuite
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </span>
                      </>
                    ) : (
                      <span className="relative flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        Message envoyé avec succès!
                      </span>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    * Champs obligatoires • Vos informations sont confidentielles et sécurisées
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Info (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Info Cards */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#7B61FF]/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 
                  className="text-xl mb-6"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                >
                  Coordonnées directes
                </h4>
                <div className="space-y-5">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7B61FF]/20 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <info.icon className="w-5 h-5 text-[#00D4FF]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-400 mb-1">{info.label}</div>
                        <div className="font-medium text-white group-hover/item:text-[#00D4FF] transition-colors">
                          {info.value}
                        </div>
                        {info.badge && (
                          <div className="inline-block mt-1 px-2 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xs text-[#00D4FF]">
                            {info.badge}
                          </div>
                        )}
                        {info.subtext && (
                          <div className="text-sm text-gray-500 mt-1">{info.subtext}</div>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 to-[#FF2E97]/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 
                  className="text-xl mb-6"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                >
                  Ce qui est inclus
                </h4>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#7B61FF]/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 
                  className="text-xl mb-6"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}
                >
                  Confiance et sécurité
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-300">Données sécurisées</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-300">Confidentialité garantie</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}