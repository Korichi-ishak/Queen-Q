import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Heart, Coffee } from 'lucide-react';
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
    <main className="min-h-screen bg-gradient-to-br from-rose-champagne/20 via-royal-purple/10 to-imperial-gold/10 flex items-center justify-center p-6">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="dialog"
            aria-labelledby="chat-title"
            aria-describedby="chat-description"
            className="relative w-full max-w-md h-[600px] bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-rose-champagne/30 overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-5 border-b border-rose-champagne/20 bg-gradient-to-r from-rose-champagne/10 to-imperial-gold/10">
              <div className="flex items-center space-x-4">
                {/* Reine-Mère Avatar */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-champagne to-imperial-gold flex items-center justify-center text-3xl shadow-lg border-2 border-white/50">
                    👵🏻
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Coffee className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 id="chat-title" className="font-playfair font-bold text-royal-purple text-xl">
                    {t('chat.reineMere')}
                  </h1>
                  <p className="text-royal-purple/70 text-sm flex items-center gap-1">
                    <span>{t('chat.online')}</span>
                    <Heart className="w-3 h-3 text-rose-champagne fill-current" />
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="p-2 hover:bg-rose-champagne/20 rounded-full transition-colors duration-200 text-royal-purple/70 hover:text-royal-purple"
                aria-label={t('accessibility.closeChat')}
              >
                <X size={22} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-5 space-y-5 overflow-y-auto bg-gradient-to-b from-white/50 to-rose-champagne/5">
              <p id="chat-description" className="sr-only">
                {t('chat.description')}
              </p>

              {/* Reine-Mère Welcome Message */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="max-w-[85%] bg-gradient-to-r from-rose-champagne/20 to-imperial-gold/20 backdrop-blur-sm text-royal-purple px-5 py-4 rounded-2xl rounded-bl-md shadow-lg border border-rose-champagne/30">
                  <p className="text-sm font-medium leading-relaxed">
                    {t('chat.welcomeMessage')}
                  </p>
                  <span className="text-xs text-royal-purple/60 mt-2 block">{t('chat.timestamp1')}</span>
                </div>
              </motion.div>

              {/* Reine-Mère Complicit Message */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className="max-w-[85%] bg-gradient-to-r from-imperial-gold/20 to-rose-champagne/20 backdrop-blur-sm text-royal-purple px-5 py-4 rounded-2xl rounded-bl-md shadow-lg border border-imperial-gold/30">
                  <p className="text-sm leading-relaxed">
                    {t('chat.complicitMessage')}
                  </p>
                  <span className="text-xs text-royal-purple/60 mt-2 block">{t('chat.timestamp2')}</span>
                </div>
              </motion.div>

              {/* Reine-Mère Tea Time Message */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <div className="max-w-[85%] bg-gradient-to-r from-rose-champagne/20 to-imperial-gold/20 backdrop-blur-sm text-royal-purple px-5 py-4 rounded-2xl rounded-bl-md shadow-lg border border-rose-champagne/30">
                  <p className="text-sm leading-relaxed">
                    {t('chat.teaTimeMessage')}
                  </p>
                  <span className="text-xs text-royal-purple/60 mt-2 block">{t('chat.timestamp3')}</span>
                </div>
              </motion.div>

              {/* Typing Indicator */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              >
                <div className="bg-white/60 backdrop-blur-sm px-5 py-4 rounded-2xl rounded-bl-md border border-rose-champagne/20">
                  <div className="flex items-center space-x-2 text-royal-purple/70">
                    <span className="text-xs">Reine-Mère tape...</span>
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-rose-champagne rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-imperial-gold rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-rose-champagne rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Chat Input */}
            <div className="p-5 border-t border-rose-champagne/20 bg-gradient-to-r from-white/70 to-rose-champagne/10">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder={t('chat.inputPlaceholder')}
                  disabled
                  className="flex-1 bg-white/60 backdrop-blur-sm text-royal-purple placeholder-royal-purple/50 px-4 py-3 rounded-2xl border border-rose-champagne/30 cursor-not-allowed opacity-70 focus:outline-none"
                  aria-label={t('accessibility.messageInput')}
                />
                <button
                  disabled
                  className="p-3 bg-gradient-to-r from-rose-champagne/40 to-imperial-gold/40 text-royal-purple rounded-2xl cursor-not-allowed opacity-50 border border-rose-champagne/30"
                  aria-label="Envoyer message (indisponible)"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex items-center justify-center mt-4 text-center">
                <div className="flex items-center gap-2 text-royal-purple/60 text-xs">
                  <Coffee className="w-4 h-4" />
                  <span>{t('chat.teaTimeAvailable')}</span>
                  <Heart className="w-3 h-3 text-rose-champagne fill-current" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}; 