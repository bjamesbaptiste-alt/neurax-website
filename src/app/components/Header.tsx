import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenQuestionnaire: (service?: 'website' | 'vocal') => void;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: 'website' | 'vocal') => void;
}

function ServiceSelectionModal({ isOpen, onClose, onSelectService }: ServiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-2xl w-full"
      >
        <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent">
          Quel service vous intéresse ?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            onClick={() => onSelectService('website')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#00D4FF]/50 transition-all"
          >
            <div className="text-4xl mb-4">🌐</div>
            <h4 className="text-xl font-semibold mb-2">Site Web Moderne</h4>
            <p className="text-gray-400">Création de sites web sur mesure</p>
          </motion.button>

          <motion.button
            onClick={() => onSelectService('vocal')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#7B61FF]/50 transition-all"
          >
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="text-xl font-semibold mb-2">Réceptionniste IA</h4>
            <p className="text-gray-400">Assistant vocal intelligent 24/7</p>
          </motion.button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 text-gray-400 hover:text-white transition-colors"
        >
          Annuler
        </button>
      </motion.div>
    </div>
  );
}

export function Header({ onOpenQuestionnaire }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tester notre réceptionniste AI', href: '#demo' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      style={{ opacity: headerOpacity }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/images/neurax-logo.png"
              alt="NEURAX AI Solutions"
              className="h-24 md:h-36 w-auto"
              onError={(e) => {
                // Fallback si l'image ne charge pas
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] bg-clip-text text-transparent">NEURAX</div>';
                }
              }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={() => setShowServiceModal(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full font-medium relative overflow-hidden group shadow-lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#FF2E97] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative flex items-center gap-2">
                Démarrer un projet
              </span>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 212, 255, 0.3)',
                    '0 0 30px rgba(0, 212, 255, 0.5)',
                    '0 0 20px rgba(0, 212, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#050505]/98 backdrop-blur-xl border-t border-white/10"
      >
        <nav className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-300 hover:text-white transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            onClick={() => {
              setShowServiceModal(true);
              setIsMobileMenuOpen(false);
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] rounded-full font-medium mt-4"
          >
            Démarrer un projet
          </motion.button>
        </nav>
      </motion.div>

      {/* Service Selection Modal */}
      <ServiceSelectionModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        onSelectService={(service) => {
          setShowServiceModal(false);
          onOpenQuestionnaire(service);
        }}
      />
    </motion.header>
  );
}