import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Phone } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Composant PhoneMockup3D simple intégré
function PhoneMockup3D() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative w-72 h-[600px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[3rem] p-4 border-4 border-gray-800 shadow-2xl"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Écran du téléphone */}
        <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-[2.5rem] overflow-hidden border border-white/10">
          {/* Encoche */}
          <div className="h-8 bg-black rounded-b-3xl mx-auto w-32 flex items-center justify-center">
            <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
          </div>
          
          {/* Contenu de l'écran */}
          <div className="p-6 flex flex-col items-center justify-center h-full">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Phone className="w-10 h-10" />
            </motion.div>
            
            <h4 className="text-white text-xl font-bold mb-2">Réceptionniste IA</h4>
            <p className="text-gray-400 text-center text-sm mb-6">Testez l'assistant vocal intelligent</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-green-500 rounded-full text-white font-semibold shadow-lg"
            >
              ☎️ Appeler maintenant
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function InteractiveChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour! Je suis votre réceptionniste vocal NEURAX. Posez-moi une question sur nos services!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Logic
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Prix / Tarifs
    if (message.includes('prix') || message.includes('coût') || message.includes('tarif') || message.includes('combien')) {
      return "Nos tarifs sont très compétitifs! Le réceptionniste vocal IA est à 299$/mois sans engagement. Pour un site web complet avec IA intégré, nous offrons un forfait Business à 4,999$. Souhaitez-vous plus de détails sur un service en particulier?";
    }

    // Horaire / Disponibilité
    if (message.includes('heure') || message.includes('horaire') || message.includes('disponible') || message.includes('quand')) {
      return "Notre réceptionniste vocal IA est disponible 24/7, 365 jours par année! Il ne prend jamais de pause et répond à tous vos appels en moins de 2 secondes. Contrairement à un employé traditionnel, il travaille jour et nuit sans interruption.";
    }

    // Services
    if (message.includes('service') || message.includes('offre') || message.includes('proposez') || message.includes('faites')) {
      return "Nous offrons 3 services principaux: 1) Réceptionniste Vocal IA qui répond 24/7 et prend les rendez-vous automatiquement, 2) Sites Web Modernes avec design 2026 et performance optimisée, 3) Automatisation IA pour vos processus métier. Quel service vous intéresse?";
    }

    // RDV / Rendez-vous
    if (message.includes('rdv') || message.includes('rendez-vous') || message.includes('réservation') || message.includes('réserver')) {
      return "Notre IA peut gérer vos rendez-vous automatiquement! Elle vérifie votre calendrier en temps réel, propose des créneaux disponibles et confirme les réservations par SMS. Parfait pour restaurants, garages, salons de coiffure et cliniques!";
    }

    // Restaurant / Garage / Salon
    if (message.includes('restaurant') || message.includes('garage') || message.includes('salon') || message.includes('coiffure')) {
      return "Excellent choix! Notre réceptionniste IA est parfait pour votre secteur. Il peut répondre aux questions courantes, prendre les réservations, gérer les annulations et même recommander vos services. Plus de 80% moins cher qu'un employé à temps plein!";
    }

    // Installation / Mise en place
    if (message.includes('install') || message.includes('setup') || message.includes('mise en place') || message.includes('démarrer')) {
      return "Le setup est ultra rapide! 1) Appel gratuit de 15 min pour comprendre vos besoins, 2) Démo personnalisée sous 24h, 3) Configuration complète en 48h, 4) Vous êtes live! Nous offrons aussi un essai gratuit de 7 jours. Voulez-vous commencer?";
    }

    // Langues
    if (message.includes('langue') || message.includes('français') || message.includes('anglais') || message.includes('bilingue')) {
      return "Notre IA est parfaitement bilingue français-anglais avec accent québécois naturel! Elle détecte automatiquement la langue du client et s'adapte en temps réel. Idéal pour servir tous vos clients au Québec!";
    }

    // Contact / Démo
    if (message.includes('contact') || message.includes('démo') || message.includes('essai') || message.includes('test')) {
      return "Parfait! Vous pouvez: 1) Cliquer sur le bouton vert du téléphone ci-dessus pour tester la voix de l'IA maintenant, 2) Réserver un appel gratuit de 15 min pour une démo complète, ou 3) Démarrer votre essai gratuit de 7 jours immédiatement. Que préférez-vous?";
    }

    // Statistiques
    if (message.includes('statistique') || message.includes('performance') || message.includes('résultat') || message.includes('efficace')) {
      return "Nos clients adorent les résultats! L'IA répond en moins de 2 secondes, traite jusqu'à 500 appels/jour, fonctionne 24/7 avec 99.9% uptime garanti, et coûte 80% moins cher qu'un employé. Zéro appel manqué = plus de revenus!";
    }

    // Default response
    return "Excellente question! Notre équipe peut vous répondre en détail. Vous pouvez tester l'IA vocalement en cliquant sur le bouton vert du téléphone, ou me poser des questions sur nos prix, services, horaires, ou processus d'installation. Comment puis-je vous aider?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Speak the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse.text);
        utterance.lang = 'fr-CA';
        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        
        const voices = window.speechSynthesis.getVoices();
        const frenchVoice = voices.find(voice => 
          voice.lang.startsWith('fr') || voice.lang.includes('FR')
        );
        
        if (frenchVoice) {
          utterance.voice = frenchVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Quels sont vos prix?",
    "Ça fonctionne 24/7?",
    "Comment ça marche?",
    "Parfait pour restaurant?"
  ];

  return (
    <div className="w-full">
      {/* Phone Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mb-8 h-[600px] flex items-center justify-center"
      >
        <PhoneMockup3D />
      </motion.div>

      {/* Interactive Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        {/* Chat Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl mb-2 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
            💬 Testez l'IA par Chat
          </h3>
          <p className="text-gray-400 text-sm md:text-base">Posez vos questions et voyez comment l'IA répond instantanément</p>
        </div>

        {/* Chat Box */}
        <div className="relative p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl">
          
          {/* Messages Area */}
          <div className="h-[300px] overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'ai' 
                    ? 'bg-gradient-to-br from-[#00D4FF] to-[#7B61FF]' 
                    : 'bg-gradient-to-br from-[#FF2E97] to-[#7B61FF]'
                }`}>
                  {message.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`flex-1 max-w-[80%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl ${
                    message.sender === 'ai'
                      ? 'bg-white/10 border border-white/10 text-white'
                      : 'bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-white'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#00D4FF] rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Questions suggérées :</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setInputValue(question)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#00D4FF]/50 transition-all"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]/50 transition-all"
            />
            <motion.button
              onClick={handleSendMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center mt-4">
            💡 L'IA analyse votre question et répond instantanément avec synthèse vocale
          </p>
        </div>
      </motion.div>
    </div>
  );
}