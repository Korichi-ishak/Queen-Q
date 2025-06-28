import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee, Heart, Sparkles, BookOpen, Feather } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface Note {
  id: number;
  text: string;
  color: string;
  borderColor: string;
  rotation: string;
}

export const Chat: React.FC = () => {
  const { t } = useTranslation();
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const notes: Note[] = [
    {
      id: 1,
      text: t('chat.welcomeMessage'),
      color: 'from-parchment-cream to-warm-pearl',  // Palette 2 & 1
      borderColor: 'border-patina-gold',
      rotation: 'rotate-1'
    },
    {
      id: 2,
      text: t('chat.complicitMessage'),
      color: 'from-powder-rose to-antique-rose',    // Palette 2 & 3
      borderColor: 'border-rose-champagne',
      rotation: '-rotate-1'
    },
    {
      id: 3,
      text: t('chat.teaTimeMessage'),
      color: 'from-moon-milk to-powder-rose',       // Palette 3 & 2
      borderColor: 'border-smoky-gold',
      rotation: 'rotate-2'
    },
    {
      id: 4,
      text: t('chat.betaNote'),
      color: 'from-vintage-aubergine/10 to-royal-purple/10', // Palette 2 & 1
      borderColor: 'border-imperial-gold',
      rotation: '-rotate-2'
    }
  ];

  const currentNote = notes[currentNoteIndex];

  const nextNote = () => {
    setCurrentNoteIndex((prev) => (prev + 1) % notes.length);
  };

  const prevNote = () => {
    setCurrentNoteIndex((prev) => (prev - 1 + notes.length) % notes.length);
  };

  useEffect(() => {
    setShowNotes(true);
    const interval = setInterval(() => {
      setCurrentNoteIndex(prev => (prev + 1) % notes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setShowNotes(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <main 
      className="min-h-screen bg-gradient-to-br from-parchment-cream via-warm-pearl to-moon-milk relative overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Vintage Paper Texture Background */}
      <div className="absolute inset-0 opacity-30" 
           style={{
             backgroundImage: `
               radial-gradient(circle at 20% 80%, rgba(75, 46, 67, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(214, 174, 96, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(212, 181, 165, 0.1) 0%, transparent 50%)
             `
           }}>
      </div>

      {/* Floating Tea Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Tea particles using amber-smoke color */}
        <div className="absolute top-20 left-10 text-4xl animate-float opacity-30" style={{ color: '#776650' }}>☕</div>
        <div className="absolute top-40 right-20 text-3xl animate-float opacity-40" style={{ color: '#C8A96B', animationDelay: '1s' }}>🫖</div>
        <div className="absolute top-60 left-1/4 text-2xl animate-float opacity-25" style={{ color: '#B79D74', animationDelay: '2s' }}>🍰</div>
        <div className="absolute bottom-40 right-1/3 text-3xl animate-float opacity-35" style={{ color: '#D4B5A5', animationDelay: '0.5s' }}>🌸</div>
        <div className="absolute top-1/3 right-10 text-2xl animate-float opacity-30" style={{ color: '#776650', animationDelay: '1.5s' }}>📜</div>
        <div className="absolute bottom-20 left-20 text-xl animate-float opacity-40" style={{ color: '#C8A96B', animationDelay: '2.5s' }}>✨</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 pt-24">
        {/* Close Button */}
        <motion.button
          onClick={handleClose}
          className="absolute top-8 right-8 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          whileHover={{ rotate: 90 }}
          aria-label={t('accessibility.closeChat')}
        >
          <X size={20} className="text-royal-purple" />
        </motion.button>

        {/* Vintage Header */}
        <motion.div 
          className="text-center mb-12 mt-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Beta Ribbon */}
            <div className="absolute -top-8 -right-8 transform rotate-12">
              <div className="bg-gradient-to-r from-rose-champagne to-imperial-gold text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} />
                  <span className="text-sm font-bold">BETA</span>
                  <Coffee size={14} />
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -inset-4 border-4 border-dashed border-imperial-gold/40 rounded-lg transform rotate-1"></div>
            
            <h1 className="relative font-playfair text-4xl md:text-5xl font-bold text-royal-purple mb-4">
              {t('chat.title')}
            </h1>
            
            {/* Vintage Underline */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-px bg-gradient-to-r from-transparent via-imperial-gold to-transparent flex-1"></div>
              <Coffee className="text-imperial-gold" size={20} />
              <div className="h-px bg-gradient-to-r from-transparent via-imperial-gold to-transparent flex-1"></div>
            </div>
          </div>
        </motion.div>

        {/* Reine-Mère Portrait */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative">
            {/* Vintage Photo Frame */}
            <div className="w-32 h-32 bg-gradient-to-br from-parchment-cream to-powder-rose rounded-full border-8 border-warm-pearl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-2 bg-gradient-to-br from-rose-champagne to-imperial-gold rounded-full flex items-center justify-center text-6xl shadow-inner">
                👵🏻
              </div>
              
              {/* Steam animation */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-8 bg-gradient-to-t from-smoky-gold/50 to-transparent rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-imperial-gold"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-imperial-gold"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-imperial-gold"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-imperial-gold"></div>
          </div>
        </motion.div>

        {/* Handwritten Notes Area */}
        <div className="relative w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {showNotes && notes.map((note, index) => (
              <motion.div
                key={note.id}
                className={`absolute inset-0 ${index === currentNoteIndex ? 'z-20' : 'z-10'}`}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ 
                  opacity: index === currentNoteIndex ? 1 : 0.3,
                  y: index === currentNoteIndex ? 0 : 20,
                  rotateX: 0,
                  scale: index === currentNoteIndex ? 1 : 0.95
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Handwritten Note */}
                <div className={`bg-gradient-to-br ${note.color} p-8 md:p-12 rounded-lg shadow-xl border-2 ${note.borderColor} ${note.rotation} max-w-2xl mx-auto relative`}>
                  {/* Paper Holes */}
                  <div className="absolute left-6 top-8 w-3 h-3 bg-warm-pearl rounded-full border border-patina-gold/50"></div>
                  <div className="absolute left-6 top-20 w-3 h-3 bg-warm-pearl rounded-full border border-patina-gold/50"></div>
                  <div className="absolute left-6 top-32 w-3 h-3 bg-warm-pearl rounded-full border border-patina-gold/50"></div>

                  {/* Lines like notebook paper */}
                  <div className="absolute inset-8 opacity-10">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-px bg-patina-gold mb-6"></div>
                    ))}
                  </div>

                  {/* Tea stain */}
                  <div className="absolute top-4 right-8 w-8 h-8 bg-amber-smoke/20 rounded-full blur-sm"></div>
                  
                  <div className="relative z-10 font-handwriting text-lg md:text-xl leading-relaxed text-velvet-black" 
                       style={{ fontFamily: 'Kalam, cursive' }}>
                    {note.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Coming Soon Message */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-imperial-gold/30 max-w-lg mx-auto relative">
            {/* Beta Badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-imperial-gold to-rose-champagne text-royal-purple px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-6">
              {t('chat.comingSoon')}
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="text-imperial-gold" size={24} />
              <h3 className="font-playfair text-xl font-bold text-royal-purple">
                {t('chat.awakeningTitle')}
              </h3>
              <Coffee className="text-amber-600" size={24} />
            </div>
            
            <div className="text-royal-purple/80 text-sm leading-relaxed space-y-3">
              <p>
                <strong>{t('chat.evolving')}</strong> 
              </p>
              <p>
                {t('chat.awakeningMessage')}
              </p>
              <p className="italic text-imperial-gold">
                {t('chat.patience')}
              </p>
              <p className="text-xs text-royal-purple/60 mt-4">
                {t('chat.exploreJournal')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {notes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentNoteIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentNoteIndex 
                  ? 'bg-imperial-gold shadow-lg scale-125' 
                  : 'bg-smoky-gold/50 hover:bg-smoky-gold/80'
              }`}
              aria-label={`Note ${index + 1}`}
            />
          ))}
        </div>

        {/* Message Input Area (Disabled) */}
        <motion.div 
          className="mt-12 max-w-2xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="flex gap-4">
            <input
              type="text"
              placeholder={t('chat.placeholder')}
              disabled
              className="flex-1 px-4 py-3 bg-warm-pearl/50 border border-patina-gold/30 rounded-xl text-velvet-black placeholder-amber-smoke disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('accessibility.messageInput')}
            />
            <button
              disabled
              className="px-6 py-3 bg-gradient-to-r from-imperial-gold/50 to-rose-champagne/50 text-royal-purple font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed border border-imperial-gold/30"
            >
              {t('chat.sendDisabled')}
            </button>
          </div>
          <p className="text-center text-amber-smoke/70 text-sm mt-2 font-handwriting" style={{ fontFamily: 'Kalam, cursive' }}>
            {t('chat.typing')}
          </p>
        </motion.div>
      </div>

      {/* Add Kalam font for handwriting effect */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
      `}</style>
    </main>
  );
}; 