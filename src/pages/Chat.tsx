import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export const Chat: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <main className="min-h-screen bg-royalPurple flex items-center justify-center p-6">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="dialog"
            aria-labelledby="chat-title"
            aria-describedby="chat-description"
            className="relative w-full max-w-sm h-[540px] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center space-x-3">
                {/* Queen Mother Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-imperial-gold to-rose-champagne flex items-center justify-center text-2xl shadow-lg">
                    👑
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20"></div>
                </div>
                <div>
                  <h1 id="chat-title" className="font-playfair font-bold text-white text-lg">
                    {t('chat.queenMother')}
                  </h1>
                  <p className="text-rose-champagne/80 text-sm">{t('chat.online')}</p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 text-white/70 hover:text-white"
                aria-label="Fermer le chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <p id="chat-description" className="sr-only">
                Fenêtre de chat avec la Reine-Mère, actuellement indisponible
              </p>

              {/* User Message */}
              <motion.div
                className="flex justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="max-w-[80%] bg-gradient-to-r from-royal-purple to-royal-purple/80 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-lg">
                  <p className="text-sm">Bonjour... 👋</p>
                  <span className="text-xs text-white/70 mt-1 block">14:32</span>
                </div>
              </motion.div>

              {/* Queen Mother Message */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className="max-w-[80%] bg-gradient-to-r from-imperial-gold to-rose-champagne text-royal-purple px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
                  <p className="text-sm font-medium">Coming soon... ✨</p>
                  <span className="text-xs text-royal-purple/70 mt-1 block">14:33</span>
                </div>
              </motion.div>

              {/* Typing Indicator */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-rose-champagne rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-rose-champagne rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-rose-champagne rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder={t('chat.comingSoon')}
                  disabled
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 px-4 py-3 rounded-full border border-white/20 cursor-not-allowed opacity-60"
                  aria-label="Zone de message indisponible"
                />
                <button
                  disabled
                  className="p-3 bg-imperial-gold/30 text-white rounded-full cursor-not-allowed opacity-40"
                  aria-label="Envoyer message (indisponible)"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-center text-rose-champagne/60 text-xs mt-3">
                {t('chat.teaTime')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}; 