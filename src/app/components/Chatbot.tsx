import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour! 👋 Je suis l'assistant virtuel de NEURAX. Comment puis-je vous aider aujourd'hui?",
      sender: 'bot',
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

  const quickReplies = [
    'Tarifs IA Vocal',
    'Sites web',
    'Démo',
    'Contact'
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('prix') || message.includes('tarif') || message.includes('coût') || message.includes('ia vocal')) {
      return "Notre IA Vocal coûte **299$/mois** sans engagement. Nous offrons aussi un **essai gratuit de 7 jours** pour que vous puissiez le tester! 🎙️\n\nVoulez-vous en savoir plus sur nos forfaits sites web?";
    }
    
    if (message.includes('site') || message.includes('web')) {
      return "Nous proposons 3 forfaits sites web:\n\n📦 **STARTER** - 2,500$\n🚀 **BUSINESS** - 4,999$ (IA inclus)\n⭐ **PREMIUM** - 7,999$\n\nLivraison en 2-3 semaines. Voulez-vous remplir notre questionnaire?";
    }
    
    if (message.includes('démo') || message.includes('demo') || message.includes('essai')) {
      return "Génial! 🎉 Nous offrons:\n\n✅ **Démo personnalisée** (15 min)\n✅ **Essai gratuit 7 jours** pour l'IA Vocal\n\nJe peux vous rediriger vers notre formulaire de contact?";
    }
    
    if (message.includes('contact') || message.includes('appel') || message.includes('téléphone')) {
      return "Pour nous contacter:\n\n📧 **Email:** hello@neurax.ai\n📞 **Téléphone:** (514) 555-5555\n\nOu cliquez sur \"Démarrer gratuitement\" pour un appel découverte gratuit! 🚀";
    }
    
    if (message.includes('bonjour') || message.includes('salut') || message.includes('allo')) {
      return "Bonjour! 😊 Comment puis-je vous aider avec votre projet d'IA ou de site web?";
    }
    
    if (message.includes('merci') || message.includes('thanks')) {
      return "Avec plaisir! 🙌 N'hésitez pas si vous avez d'autres questions. Notre équipe est là pour vous aider!";
    }

    if (message.includes('automatisation') || message.includes('workflow')) {
      return "Notre service d'**Automatisation IA** permet de:\n\n⚡ Automatiser vos processus\n🔗 Intégrer vos outils existants\n💰 Obtenir un ROI rapide\n\nChaque projet est sur devis selon vos besoins. Voulez-vous en discuter?";
    }
    
    return "Je comprends votre question! 🤔 Pour une réponse personnalisée, je vous invite à:\n\n1. Remplir notre **questionnaire** (5 min)\n2. Réserver un **appel gratuit** (15 min)\n3. Nous contacter par **email ou téléphone**\n\nQue préférez-vous?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] flex items-center justify-center shadow-lg hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2E97] rounded-full flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            1
          </motion.div>
        )}

        {/* Pulse Effect */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#00D4FF]"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed bottom-28 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] rounded-3xl border border-white/20 bg-[#0A0A0A] backdrop-blur-[40px] flex flex-col overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)' }}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-[#00D4FF]/10 to-[#7B61FF]/10 border-b border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/5 to-[#7B61FF]/5"></div>
              <div className="relative flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Assistant NEURAX
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    En ligne
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'bot'
                      ? 'bg-gradient-to-br from-[#00D4FF] to-[#7B61FF]'
                      : 'bg-gradient-to-br from-[#FF2E97] to-[#7B61FF]'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-white'
                      : 'bg-white/5 border border-white/10 text-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-[#00D4FF] rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 py-3 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 hover:border-[#00D4FF]/50 hover:bg-white/10 transition-all duration-300"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#050505]/80 backdrop-blur-xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Écrivez votre message..."
                  className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 focus:border-[#00D4FF]/50 focus:outline-none text-sm placeholder-gray-500 transition-colors"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Propulsé par l'IA NEURAX 🚀
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}