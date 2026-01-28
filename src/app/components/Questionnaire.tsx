import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Send } from 'lucide-react';
import { useState } from 'react';

interface QuestionnaireProps {
  initialService?: 'website' | 'vocal';
}

export function Questionnaire({ initialService }: QuestionnaireProps) {
  const [formData, setFormData] = useState({
    // Service selection (pre-selected if coming from modal)
    selectedService: initialService || '',
    
    // Section 1
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    role: '',
    businessType: '',
    hasWebsite: '',
    currentWebsiteUrl: '',
    
    // Section 2
    mainGoals: [] as string[],
    visitorAction: '',
    serviceArea: '',
    targetCustomers: '',
    competitors: '',
    differentiation: '',
    mainMessage: [] as string[],
    
    // Section 3
    pageCount: '',
    essentialPages: [] as string[],
    specialFeatures: [] as string[],
    contentProvider: '',
    contentReady: '',
    
    // Section 4
    hasBranding: '',
    preferredColors: '',
    designStyle: [] as string[],
    favoriteSites: '',
    dislikes: [] as string[],
    
    // Section 5
    hasDomain: '',
    domainName: '',
    hasHosting: '',
    needsEmail: '',
    contentManager: '',
    
    // Section 6
    currentTools: [] as string[],
    wantsAI: '',
    
    // Section 7
    budget: '',
    timeline: '',
    specificDate: '',
    timingReason: '',
    
    // Section 8
    additionalInfo: '',
    questions: '',
    howHeard: '',
    referredBy: '',
    acceptContact: false
  });

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(v => v !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Add form submission logic
    alert('Merci! Nous avons bien reçu votre questionnaire.');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-24 px-4 md:px-8" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent">
              Questionnaire
            </span>{' '}
            Projet Web
          </h1>
          <p className="text-lg text-gray-400">
            Aidez-nous à mieux comprendre votre projet pour vous offrir la meilleure solution
          </p>
        </motion.div>

        {/* Form - Note: Using div instead of form for artifacts compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          {/* SECTION 1: INFORMATIONS DE BASE */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-[40px]" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
            <h2 className="text-2xl md:text-3xl mb-6 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] text-lg">1</span>
              Informations de base
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nom complet <span className="text-[#FF2E97]">*</span></label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00D4FF]/50 focus:outline-none transition-colors"
                  placeholder="Jean Tremblay"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nom de votre entreprise <span className="text-[#FF2E97]">*</span></label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00D4FF]/50 focus:outline-none transition-colors"
                  placeholder="Mon Entreprise Inc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Adresse courriel <span className="text-[#FF2E97]">*</span></label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00D4FF]/50 focus:outline-none transition-colors"
                    placeholder="jean@entreprise.ca"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Numéro de téléphone <span className="text-[#FF2E97]">*</span></label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00D4FF]/50 focus:outline-none transition-colors"
                    placeholder="(514) 555-5555"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Votre poste/rôle dans l'entreprise</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00D4FF]/50 focus:outline-none transition-colors"
                  placeholder="Propriétaire, Gérant, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Type d'entreprise <span className="text-[#FF2E97]">*</span></label>
                <div className="space-y-3">
                  {['Restaurant/Café', 'Garage/Mécanique', 'Salon (coiffure/esthétique)', 'Commerce de détail', 'Services professionnels', 'Autre'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="businessType"
                        value={type}
                        checked={formData.businessType === type}
                        onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                        className="w-5 h-5 text-[#00D4FF] bg-white/5 border-white/10"
                      />
                      <span className="group-hover:text-[#00D4FF] transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Avez-vous déjà un site web ?</label>
                <div className="space-y-3">
                  {[
                    'Non, c\'est un nouveau projet',
                    'Oui, je veux le refaire complètement',
                    'Oui, je veux juste des améliorations'
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="hasWebsite"
                        value={option}
                        checked={formData.hasWebsite === option}
                        onChange={(e) => setFormData({...formData, hasWebsite: e.target.value})}
                        className="w-5 h-5 text-[#00D4FF] bg-white/5 border-white/10"
                      />
                      <span className="group-hover:text-[#00D4FF] transition-colors">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL de votre site actuel (si applicable)</label>
                <input
                  type="url"
                  value={formData.currentWebsiteUrl}
                  onChange={(e) => setFormData({...formData, currentWebsiteUrl: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00D4FF]/50 focus:outline-none transition-colors"
                  placeholder="https://www.monsite.ca"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full text-lg font-medium flex items-center gap-3 hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all duration-300"
            >
              <Send className="w-6 h-6" />
              Envoyer le questionnaire
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Les champs marqués d'un <span className="text-[#FF2E97]">*</span> sont obligatoires
          </p>
        </motion.div>
      </div>
    </div>
  );
}