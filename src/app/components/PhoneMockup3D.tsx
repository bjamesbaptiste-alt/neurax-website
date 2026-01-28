import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Grid3x3 } from 'lucide-react';

export interface PhoneMockup3DHandle {
  startCall: () => void;
}

// Types Vapi
interface VapiInstance {
  start: (assistantId: string) => Promise<void>;
  stop: () => void;
  isSpeechActive: () => boolean;
  send: (message: any) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    Vapi: new (publicKey: string) => VapiInstance;
  }
}

export const PhoneMockup3D = forwardRef<PhoneMockup3DHandle>((props, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [audioLevels, setAudioLevels] = useState([0.3, 0.5, 0.4, 0.6, 0.5, 0.4, 0.3]);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [vapiStatus, setVapiStatus] = useState<string>('Prêt à appeler');
  const [isVapiSpeaking, setIsVapiSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [vapi, setVapi] = useState<VapiInstance | null>(null);
  const [vapiReady, setVapiReady] = useState(false);
  
  // ✅ VOS CLÉS VAPI CONFIGURÉES
  const VAPI_PUBLIC_KEY = '70c92dbd-2937-4da0-8884-edc63dc82a2e';
  const VAPI_ASSISTANT_ID = 'bde29016-68ab-4ec6-9d81-147af8678af4';
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const timerRef = useRef<number | null>(null);
  const ringingOscillatorRef = useRef<OscillatorNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const visualizerIntervalRef = useRef<number | null>(null);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Charger le SDK Vapi au montage
  useEffect(() => {
    const loadVapiSDK = () => {
      if (document.getElementById('vapi-sdk')) {
        initializeVapi();
        return;
      }

      const script = document.createElement('script');
      script.id = 'vapi-sdk';
      script.src = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/index.js';
      script.async = true;
      script.onload = () => {
        console.log('✅ Vapi SDK chargé avec succès');
        initializeVapi();
      };
      script.onerror = () => {
        console.error('❌ Erreur de chargement du SDK Vapi');
        setVapiStatus('Erreur SDK');
      };
      document.body.appendChild(script);
    };

    const initializeVapi = () => {
      try {
        if (window.Vapi) {
          const vapiInstance = new window.Vapi(VAPI_PUBLIC_KEY);
          
          // Événements Vapi
          vapiInstance.on('call-start', () => {
            console.log('📞 Appel Vapi démarré');
            setCallState('connected');
            playConnectionSound();
            setVapiStatus('Connecté');
          });

          vapiInstance.on('call-end', () => {
            console.log('📴 Appel Vapi terminé');
            handleCallEnd();
          });

          vapiInstance.on('speech-start', () => {
            console.log('🗣️ Vapi parle');
            setIsVapiSpeaking(true);
            setIsUserSpeaking(false);
          });

          vapiInstance.on('speech-end', () => {
            console.log('🤐 Vapi arrête de parler');
            setIsVapiSpeaking(false);
          });

          vapiInstance.on('volume-level', (level: number) => {
            // Mettre à jour le visualiseur audio
            if (callState === 'connected') {
              const newLevels = audioLevels.map(() => Math.random() * level * 0.8 + 0.2);
              setAudioLevels(newLevels);
            }
          });

          vapiInstance.on('error', (error: any) => {
            console.error('❌ Erreur Vapi:', error);
            setVapiStatus('Erreur');
          });

          setVapi(vapiInstance);
          setVapiReady(true);
          console.log('✅ Vapi initialisé avec succès');
        }
      } catch (error) {
        console.error('❌ Erreur d\'initialisation Vapi:', error);
        setVapiStatus('Erreur init');
      }
    };

    loadVapiSDK();

    return () => {
      if (vapi && callState !== 'idle') {
        vapi.stop();
      }
    };
  }, []);

  // Initialize Audio Context
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // Play ringing sound
  const playRingingSound = () => {
    const audioContext = initAudioContext();
    
    if (ringingOscillatorRef.current) {
      ringingOscillatorRef.current.stop();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
    
    oscillator.start();
    ringingOscillatorRef.current = oscillator;
    
    let time = audioContext.currentTime;
    for (let i = 0; i < 4; i++) {
      gainNode.gain.setValueAtTime(0.2, time);
      gainNode.gain.linearRampToValueAtTime(0, time + 0.4);
      time += 0.5;
    }
    
    setTimeout(() => {
      if (ringingOscillatorRef.current) {
        ringingOscillatorRef.current.stop();
        ringingOscillatorRef.current = null;
      }
    }, 2000);
  };

  // Play connection sound
  const playConnectionSound = () => {
    const audioContext = initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  // Play end call sound
  const playEndCallSound = () => {
    const audioContext = initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Animate audio visualizer
  const startVisualizer = () => {
    if (visualizerIntervalRef.current) {
      clearInterval(visualizerIntervalRef.current);
    }

    visualizerIntervalRef.current = setInterval(() => {
      if (callState === 'connected' && !isUserSpeaking && !isVapiSpeaking) {
        setAudioLevels(prev => prev.map(() => Math.random() * 0.3 + 0.1));
      }
    }, 100);
  };

  const stopVisualizer = () => {
    if (visualizerIntervalRef.current) {
      clearInterval(visualizerIntervalRef.current);
      visualizerIntervalRef.current = null;
    }
  };

  // Timer for call duration
  useEffect(() => {
    if (callState === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      startVisualizer();
    } else {
      stopVisualizer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [callState, isUserSpeaking, isVapiSpeaking]);

  // Update current time every minute
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Start call avec VRAI Vapi
  const startCall = async () => {
    if (!vapi || !vapiReady) {
      console.error('❌ Vapi non prêt');
      setVapiStatus('Service non disponible');
      return;
    }

    try {
      setCallState('ringing');
      setVapiStatus('Connexion à Vapi...');
      playRingingSound();

      console.log('🚀 Démarrage appel Vapi...');
      
      // Lancer l'appel Vapi RÉEL
      await vapi.start(VAPI_ASSISTANT_ID);
      
      console.log('✅ Appel Vapi démarré avec succès');
    } catch (error) {
      console.error('❌ Erreur démarrage Vapi:', error);
      setVapiStatus('Erreur de connexion');
      setCallState('idle');
    }
  };

  // End call
  const endCall = () => {
    if (vapi && callState !== 'idle') {
      vapi.stop();
    }
    handleCallEnd();
  };

  // Handle call end cleanup
  const handleCallEnd = () => {
    setCallState('ended');
    playEndCallSound();
    setIsUserSpeaking(false);
    setIsVapiSpeaking(false);
    stopVisualizer();
    
    setTimeout(() => {
      setCallState('idle');
      setCallDuration(0);
      setIsMuted(false);
      setIsSpeaker(false);
      setVapiStatus('Prêt à appeler');
    }, 1500);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (ringingOscillatorRef.current) {
      ringingOscillatorRef.current.stop();
      ringingOscillatorRef.current = null;
    }
  };

  const toggleMute = () => {
    if (callState === 'connected' && vapi) {
      setIsMuted(!isMuted);
      // Vapi gère le mute automatiquement via le microphone
    }
  };

  const toggleSpeaker = () => {
    setIsSpeaker(!isSpeaker);
  };

  const handleKeypad = () => {
    // Keypad functionality
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isCallActive = callState === 'ringing' || callState === 'connected';

  // Get conversation state for display
  const getConversationState = () => {
    if (isVapiSpeaking) return { text: '🤖 IA parle...', color: 'from-[#00D4FF] to-[#7B61FF]' };
    if (isUserSpeaking) return { text: '🎤 Vous parlez...', color: 'from-[#34c759] to-[#30d158]' };
    return { text: '👂 En écoute...', color: 'from-white/20 to-white/10' };
  };

  const conversationState = getConversationState();

  useImperativeHandle(ref, () => ({
    startCall,
  }));

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '2000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isHovered ? 0 : [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* iPhone 14 Pro Style */}
        <motion.div
          className="relative w-[320px] h-[650px] bg-gradient-to-b from-[#1c1c1e] via-[#2c2c2e] to-[#1c1c1e] rounded-[55px] p-[3px]"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: `
              0 0 0 2px rgba(30, 30, 30, 1),
              0 0 0 3px rgba(60, 60, 60, 0.5),
              0 20px 60px -10px rgba(0, 0, 0, 0.9),
              0 40px 100px -20px rgba(0, 212, 255, 0.15),
              inset 0 1px 1px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[25px] z-30 flex items-center justify-center gap-3 px-4">
            <div className="w-[14px] h-[14px] bg-[#1a1a1a] rounded-full border border-[#333] shadow-inner"></div>
            <div className="w-[8px] h-[8px] bg-[#0a0a0a] rounded-full"></div>
          </div>

          {/* Screen Bezel */}
          <div className="relative w-full h-full bg-black rounded-[52px] overflow-hidden shadow-2xl">
            {/* Screen Content */}
            <div className="relative w-full h-full bg-gradient-to-b from-[#000000] to-[#0a0a0a]">
              
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-[50px] flex items-center justify-between px-8 text-white text-[13px] font-medium z-20 pt-[6px]">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {currentTime.getHours().toString().padStart(2, '0')}:{currentTime.getMinutes().toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <div className="flex items-end gap-[1.5px] h-2.5">
                    {[2.5, 4, 5.5, 7].map((h, i) => (
                      <div key={i} className={`w-[2px] rounded-sm bg-white`} style={{ height: `${h}px` }}></div>
                    ))}
                  </div>
                  <span className="text-white text-[11px] font-semibold tracking-tight">LTE</span>
                  <div className="flex items-center">
                    <div className="relative w-[22px] h-[11px] border-[1.5px] border-white/90 rounded-[3px] flex items-center justify-center">
                      <div className="absolute inset-[1.5px] bg-white rounded-[1.5px]"></div>
                      <div className="absolute -right-[1.5px] top-1/2 -translate-y-1/2 w-[1.2px] h-[5px] bg-white/90 rounded-r-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Screen Content */}
              <div className="absolute inset-0 pt-[60px] pb-[40px] px-6">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/40 via-[#16213e]/30 to-[#0f3460]/40 backdrop-blur-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex-1 flex flex-col items-center justify-center pt-8">
                    <motion.div
                      className="relative mb-6"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF] via-[#7B61FF] to-[#FF2E97] rounded-full blur-2xl opacity-50 animate-pulse"></div>
                      <div className="relative w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#00D4FF]/20 via-[#7B61FF]/20 to-[#FF2E97]/20 border-4 border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-xl">
                        <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#00D4FF]/30 to-[#7B61FF]/30 flex items-center justify-center">
                          <motion.div
                            className="text-white/90"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.h2
                      className="text-white text-3xl font-semibold mb-2 tracking-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      NEURAX IA
                    </motion.h2>

                    <motion.p
                      className="text-white/60 text-[15px] mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {callState === 'idle' && (vapiReady ? 'Réceptionniste Vocal' : 'Chargement...')}
                      {callState === 'ringing' && vapiStatus}
                      {callState === 'connected' && formatTime(callDuration)}
                      {callState === 'ended' && 'Appel terminé'}
                    </motion.p>

                    {callState === 'connected' && (
                      <motion.div
                        className="mb-3 px-4 py-1.5 rounded-full text-[11px] font-medium text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          background: `linear-gradient(135deg, ${conversationState.color})`,
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {conversationState.text}
                      </motion.div>
                    )}

                    {callState === 'ringing' && (
                      <motion.div
                        className="flex gap-2 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-[#00D4FF] rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </motion.div>
                    )}

                    {callState === 'connected' && (
                      <motion.div
                        className="flex items-center justify-center gap-[6px] h-12 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        {audioLevels.map((level, i) => (
                          <motion.div
                            key={i}
                            className="w-[3px] rounded-full shadow-lg"
                            style={{
                              background: isUserSpeaking 
                                ? 'linear-gradient(to top, #34c759, #30d158)' 
                                : 'linear-gradient(to top, #00D4FF, #7B61FF)',
                              boxShadow: isUserSpeaking 
                                ? '0 0 8px rgba(52, 199, 89, 0.5)'
                                : '0 0 8px rgba(0, 212, 255, 0.5)',
                            }}
                            animate={{
                              height: `${level * 40}px`,
                            }}
                            transition={{
                              duration: 0.1,
                              ease: 'easeOut',
                            }}
                          />
                        ))}
                      </motion.div>
                    )}

                    {callState === 'connected' && (
                      <motion.div
                        className="text-white/40 text-xs flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-[2px]">
                            <div className="w-1 h-3 bg-[#00D4FF] rounded-full"></div>
                            <div className="w-1 h-3 bg-[#00D4FF] rounded-full"></div>
                            <div className="w-1 h-3 bg-[#00D4FF] rounded-full"></div>
                          </div>
                          <span>HD</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${vapiReady ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                          <span>VAPI</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {callState === 'connected' && (
                    <motion.div
                      className="space-y-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="grid grid-cols-3 gap-6 px-4">
                        <button
                          onClick={toggleMute}
                          className={`flex flex-col items-center gap-2 transition-all ${
                            isMuted ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                            isMuted 
                              ? 'bg-white text-[#1c1c1e]' 
                              : 'bg-white/10 text-white backdrop-blur-xl'
                          }`}>
                            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                          </div>
                          <span className="text-white text-xs">mute</span>
                        </button>

                        <button 
                          onClick={handleKeypad}
                          className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
                        >
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white">
                            <Grid3x3 className="w-6 h-6" />
                          </div>
                          <span className="text-white text-xs">clavier</span>
                        </button>

                        <button
                          onClick={toggleSpeaker}
                          className={`flex flex-col items-center gap-2 transition-all ${
                            isSpeaker ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                            isSpeaker 
                              ? 'bg-white text-[#1c1c1e]' 
                              : 'bg-white/10 text-white backdrop-blur-xl'
                          }`}>
                            <Volume2 className="w-6 h-6" />
                          </div>
                          <span className="text-white text-xs">audio</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-8 pb-6">
                    {!isCallActive && (
                      <motion.button
                        onClick={startCall}
                        disabled={!vapiReady}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-b from-[#34c759] to-[#2fb04a] flex items-center justify-center shadow-2xl ${
                          !vapiReady ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        style={{
                          boxShadow: '0 8px 30px rgba(52, 199, 89, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Phone className="w-8 h-8 text-white" />
                      </motion.button>
                    )}

                    {isCallActive && (
                      <motion.button
                        onClick={endCall}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mx-auto w-20 h-20 rounded-full bg-gradient-to-b from-[#ff3b30] to-[#e02020] flex items-center justify-center shadow-2xl"
                        style={{
                          boxShadow: '0 8px 30px rgba(255, 59, 48, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <PhoneOff className="w-8 h-8 text-white" />
                      </motion.button>
                    )}
                  </div>

                  {callState === 'idle' && (
                    <motion.p
                      className="text-white/40 text-[11px] text-center px-8 pb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {vapiReady ? '✅ Vapi prêt - Cliquez pour appeler' : '⏳ Chargement Vapi...'}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none mix-blend-overlay"></div>
            </div>
          </div>

          {/* Physical Buttons */}
          <div className="absolute right-[-4px] top-[120px] w-[3px] h-[60px] bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] rounded-r-sm"></div>
          <div className="absolute right-[-4px] top-[200px] w-[3px] h-[45px] bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] rounded-r-sm"></div>
          <div className="absolute right-[-4px] top-[260px] w-[3px] h-[45px] bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] rounded-r-sm"></div>
          <div className="absolute left-[-4px] top-[160px] w-[3px] h-[30px] bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] rounded-l-sm"></div>
        </motion.div>
      </motion.div>
    </div>
  );
});

PhoneMockup3D.displayName = 'PhoneMockup3D';