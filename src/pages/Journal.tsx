import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Book, Heart, Eye, Trash2 } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface JournalEntry {
  id: string;
  date: string;
  archetype?: string;
  title: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative' | 'reflective';
}

export const Journal: React.FC = () => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    title: '',
    content: '',
    mood: 'neutral'
  });
  const [isWriting, setIsWriting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journal-entries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading journal entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = (newEntries: JournalEntry[]) => {
    localStorage.setItem('journal-entries', JSON.stringify(newEntries));
    setEntries(newEntries);
    showSaveToast();
  };

  const showSaveToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const saveEntry = () => {
    if (!currentEntry.title || !currentEntry.content) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('fr-FR'),
      title: currentEntry.title,
      content: currentEntry.content,
      mood: currentEntry.mood || 'neutral',
      archetype: currentEntry.archetype
    };

    const newEntries = [newEntry, ...entries];
    saveEntries(newEntries);
    
    setCurrentEntry({ title: '', content: '', mood: 'neutral' });
    setIsWriting(false);
  };

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    saveEntries(newEntries);
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'positive': return '✨';
      case 'negative': return '💙';
      case 'reflective': return '🤔';
      default: return '📝';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'positive': return 'from-rose-champagne to-antique-rose';
      case 'neutral': return 'from-smoky-gold to-patina-gold';
      case 'reflective': return 'from-royal-purple to-vintage-aubergine';
      case 'melancholic': return 'from-inked-indigo to-amber-smoke';
      default: return 'from-velvet-black to-ink-black';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-champagne/10 via-white to-royal-purple/5 pt-24 pb-12 px-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Book className="w-8 h-8 text-royal-purple" />
            <h1 className="font-playfair font-bold text-4xl text-royal-purple">
              {t('journal.title')}
            </h1>
          </div>
          <p className="text-royal-purple/70 text-lg max-w-2xl mx-auto">
            {t('journal.subtitle')}
          </p>
        </motion.div>

        {/* New Entry Section */}
        {!isWriting ? (
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-champagne/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setIsWriting(true)}
              className="w-full p-4 text-left bg-gradient-to-r from-royal-purple/10 to-rose-champagne/10 hover:from-royal-purple/20 hover:to-rose-champagne/20 rounded-xl transition-all duration-300 border border-royal-purple/20 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-royal-purple/20 rounded-full flex items-center justify-center group-hover:bg-royal-purple/30 transition-colors">
                  <Heart className="w-5 h-5 text-royal-purple" />
                </div>
                <span className="text-royal-purple/70 group-hover:text-royal-purple transition-colors">
                  {t('journal.newEntry')}
                </span>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-champagne/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-royal-purple mb-2">
                  {t('journal.entryTitle')}
                </label>
                <input
                  type="text"
                  value={currentEntry.title || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                  placeholder={t('journal.titlePlaceholder')}
                  className="w-full p-3 border border-rose-champagne/30 rounded-lg focus:ring-2 focus:ring-royal-purple/20 focus:border-royal-purple/40 bg-white/70 transition-colors"
                />
              </div>

              {/* Archetype Input */}
              <div>
                <label className="block text-sm font-medium text-royal-purple mb-2">
                  {t('journal.archetype')} ({t('journal.optional')})
                </label>
                <input
                  type="text"
                  value={currentEntry.archetype || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, archetype: e.target.value })}
                  placeholder={t('journal.archetypePlaceholder')}
                  className="w-full p-3 border border-rose-champagne/30 rounded-lg focus:ring-2 focus:ring-royal-purple/20 focus:border-royal-purple/40 bg-white/70 transition-colors"
                />
              </div>

              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-royal-purple mb-2">
                  {t('journal.mood')}
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'positive', label: t('journal.moodPositive'), emoji: '✨' },
                    { value: 'neutral', label: t('journal.moodNeutral'), emoji: '📝' },
                    { value: 'reflective', label: t('journal.moodReflective'), emoji: '🤔' },
                    { value: 'melancholic', label: t('journal.moodMelancholic'), emoji: '💙' }
                  ].map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.value as any })}
                      className={`p-2 rounded-lg border transition-all ${
                        currentEntry.mood === mood.value
                          ? 'border-royal-purple bg-royal-purple/10 text-royal-purple'
                          : 'border-rose-champagne/30 hover:border-royal-purple/40 text-royal-purple/60'
                      }`}
                    >
                      <span className="mr-1">{mood.emoji}</span>
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Textarea */}
              <div>
                <label className="block text-sm font-medium text-royal-purple mb-2">
                  {t('journal.reflection')}
                </label>
                <textarea
                  value={currentEntry.content || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                  placeholder={t('journal.contentPlaceholder')}
                  rows={8}
                  className="w-full p-3 border border-rose-champagne/30 rounded-lg focus:ring-2 focus:ring-royal-purple/20 focus:border-royal-purple/40 bg-white/70 resize-none transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={saveEntry}
                  disabled={!currentEntry.title || !currentEntry.content}
                  className="flex items-center gap-2 px-4 py-2 bg-royal-purple text-white rounded-lg hover:bg-royal-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {t('journal.save')}
                </button>
                <button
                  onClick={() => {
                    setCurrentEntry({ title: '', content: '', mood: 'neutral' });
                    setIsWriting(false);
                  }}
                  className="px-4 py-2 border border-rose-champagne/30 text-royal-purple rounded-lg hover:bg-rose-champagne/10 transition-colors"
                >
                  {t('journal.cancel')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Entries List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <Eye className="w-16 h-16 text-royal-purple/30 mx-auto mb-4" />
              <h3 className="text-xl font-playfair text-royal-purple/60 mb-2">
                {t('journal.noEntries')}
              </h3>
              <p className="text-royal-purple/40">
                {t('journal.startWriting')}
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <motion.div
                key={entry.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-champagne/20 group hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-6 h-6 bg-gradient-to-r ${getMoodColor(entry.mood)} rounded-full flex items-center justify-center text-xs`}>
                        {getMoodIcon(entry.mood)}
                      </div>
                      <h3 className="font-playfair font-bold text-xl text-royal-purple">
                        {entry.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-royal-purple/60">
                      <span>{entry.date}</span>
                      {entry.archetype && (
                        <span className="bg-royal-purple/10 px-2 py-1 rounded-full">
                          {entry.archetype}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-royal-purple/40 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-royal-purple/80 leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Save Toast */}
      {showToast && (
        <motion.div
          className="fixed bottom-6 right-6 bg-royal-purple text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          {t('journal.saved')}
        </motion.div>
      )}
    </main>
  );
};