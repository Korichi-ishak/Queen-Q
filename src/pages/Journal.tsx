import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Save, Heart, Spade, Crown } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface Sticker {
  id: string;
  type: 'heart' | 'spade' | 'crown';
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

export const Journal: React.FC = () => {
  const { t } = useTranslation();
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef<Position>({ x: 0, y: 0 });

  // Load stickers from localStorage on mount
  useEffect(() => {
    const savedStickers = localStorage.getItem('journal-stickers');
    if (savedStickers) {
      try {
        setStickers(JSON.parse(savedStickers));
      } catch (error) {
        console.error('Error loading stickers:', error);
      }
    }
  }, []);

  // Save stickers to localStorage
  const saveStickers = (newStickers: Sticker[]) => {
    localStorage.setItem('journal-stickers', JSON.stringify(newStickers));
    setStickers(newStickers);
    showSaveToast();
  };

  const showSaveToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleStickerDragStart = (e: React.DragEvent, stickerType: 'heart' | 'spade' | 'crown') => {
    e.dataTransfer.setData('sticker-type', stickerType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const stickerType = e.dataTransfer.getData('sticker-type') as 'heart' | 'spade' | 'crown';
    
    if (canvasRef.current && stickerType) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newSticker: Sticker = {
        id: `${stickerType}-${Date.now()}`,
        type: stickerType,
        x: Math.max(0, Math.min(x - 20, rect.width - 40)), // Keep within bounds
        y: Math.max(0, Math.min(y - 20, rect.height - 40))
      };

      const newStickers = [...stickers, newSticker];
      saveStickers(newStickers);
    }
  };

  const handleStickerMouseDown = (e: React.MouseEvent, stickerId: string) => {
    e.preventDefault();
    setDraggedSticker(stickerId);
    
    const sticker = stickers.find(s => s.id === stickerId);
    if (sticker) {
      dragOffsetRef.current = {
        x: e.clientX - sticker.x,
        y: e.clientY - sticker.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedSticker && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffsetRef.current.x;
      const y = e.clientY - rect.top - dragOffsetRef.current.y;

      const newStickers = stickers.map(sticker =>
        sticker.id === draggedSticker
          ? {
              ...sticker,
              x: Math.max(0, Math.min(x, rect.width - 40)),
              y: Math.max(0, Math.min(y, rect.height - 40))
            }
          : sticker
      );
      setStickers(newStickers);
    }
  };

  const handleMouseUp = () => {
    if (draggedSticker) {
      localStorage.setItem('journal-stickers', JSON.stringify(stickers));
      setDraggedSticker(null);
      showSaveToast();
    }
  };

  const resetJournal = () => {
    setStickers([]);
    localStorage.removeItem('journal-stickers');
    showSaveToast();
  };

  const getStickerIcon = (type: 'heart' | 'spade' | 'crown') => {
    switch (type) {
      case 'heart':
        return (
          <div className="relative">
            <Heart className="w-8 h-8 text-red-500 fill-current drop-shadow-lg" />
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md scale-150"></div>
          </div>
        );
      case 'spade':
        return (
          <div className="relative">
            <Spade className="w-8 h-8 text-royal-purple fill-current drop-shadow-lg" />
            <div className="absolute inset-0 bg-royal-purple/20 rounded-full blur-md scale-150"></div>
          </div>
        );
      case 'crown':
        return (
          <div className="relative">
            <Crown className="w-8 h-8 text-imperial-gold fill-current drop-shadow-lg" />
            <div className="absolute inset-0 bg-imperial-gold/20 rounded-full blur-md scale-150"></div>
            <div className="absolute top-0 right-0 w-1 h-1 bg-imperial-gold rounded-full animate-ping"></div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#f9f5ef] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair font-bold text-4xl text-royal-purple mb-4">
            {t('journal.title')}
          </h1>
          <p className="text-royal-purple/70 text-lg">
            {t('journal.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sticker Palette */}
          <motion.div
            className="w-full lg:w-64 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-champagne/20"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-playfair font-bold text-xl text-royal-purple mb-4 text-center">
              {t('journal.stickers')}
            </h2>
            
            <div className="space-y-4">
              {[
                { type: 'heart' as const, label: t('journal.heart') },
                { type: 'spade' as const, label: t('journal.spade') },
                { type: 'crown' as const, label: t('journal.crown') }
              ].map(({ type, label }) => (
                <div
                  key={type}
                  draggable
                  onDragStart={(e) => handleStickerDragStart(e, type)}
                  className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl cursor-grab active:cursor-grabbing hover:bg-white/80 transition-colors duration-200 border border-rose-champagne/10"
                  role="button"
                  tabIndex={0}
                  aria-label={`Glisser l'autocollant ${label}`}
                >
                  {getStickerIcon(type)}
                  <span className="font-medium text-royal-purple">{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={resetJournal}
              className="w-full mt-6 flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-xl transition-colors duration-200 border border-red-500/20"
              aria-label="Effacer tous les autocollants"
            >
              <RefreshCw size={18} />
              <span>{t('journal.reset')}</span>
            </button>
          </motion.div>

          {/* Canvas */}
          <motion.div
            className="flex-1 max-w-4xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              ref={canvasRef}
              onDragOver={handleCanvasDragOver}
              onDrop={handleCanvasDrop}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative w-full h-[500px] bg-gradient-to-br from-white via-rose-champagne/5 to-imperial-gold/5 rounded-2xl shadow-xl border-2 border-rose-champagne/20 overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(214, 174, 96, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(212, 181, 165, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 40% 80%, rgba(214, 174, 96, 0.05) 0%, transparent 50%)
                `,
              }}
              role="application"
              aria-label="Zone de création du journal"
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-white/20 to-transparent pointer-events-none" />
              
                             {/* Drop Zone Hint */}
               {stickers.length === 0 && (
                 <div className="absolute inset-0 flex items-center justify-center text-royal-purple/40 font-medium text-lg pointer-events-none">
                   {t('journal.dragHint')}
                 </div>
               )}

              {/* Stickers */}
              <AnimatePresence>
                {stickers.map((sticker) => (
                  <motion.div
                    key={sticker.id}
                    className={`absolute cursor-move select-none ${
                      draggedSticker === sticker.id ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      left: sticker.x,
                      top: sticker.y,
                      width: 40,
                      height: 40
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Déplacer autocollant ${sticker.type}`}
                  >
                    {getStickerIcon(sticker.type)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-4 text-center text-royal-purple/60 text-sm">
              {stickers.length} {stickers.length !== 1 ? t('journal.countPlural') : t('journal.count')} {stickers.length !== 1 ? t('journal.placedPlural') : t('journal.placed')}
            </div>
          </motion.div>
        </div>

        {/* Save Toast */}
        <AnimatePresence>
          {showToast && (
                         <motion.div
               className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 z-50"
               initial={{ opacity: 0, y: 50, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 50, scale: 0.9 }}
               transition={{ duration: 0.3 }}
             >
               <Save size={18} />
               <span>{t('journal.saved')}</span>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}; 