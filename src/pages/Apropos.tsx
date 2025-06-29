import React from 'react';
import { motion } from 'framer-motion';
import { SmoothScroll } from '../components/SmoothScroll';
import { Mail } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const CreativeProfileImage = ({ suit }: { suit: 'hearts' | 'diamonds' }) => {
    const iconPath = suit === 'hearts'
        ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" // Cœur
        : "M12 2L2 12l10 10 10-10L12 2z"; // Carreau

    const gradientId = `gradient-${suit}`;

    return (
        <div className="relative aspect-square w-full max-w-[250px] mx-auto flex items-center justify-center">
            {/* Flou lumineux en arrière-plan */}
            <div className="absolute inset-0 bg-imperial-gold/20 rounded-full blur-xl animate-pulse-slow"></div>
            
            {/* Orbe principal */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-royal-purple/50 to-inked-indigo/80 border-2 border-imperial-gold/30 shadow-2xl shadow-black/50 flex items-center justify-center">
                <svg
                    viewBox="0 0 24 24"
                    className="w-1/2 h-1/2 relative z-10"
                    style={{ filter: `drop-shadow(0 0 12px rgba(250, 212, 163, 0.7))` }}
                >
                    <defs>
                        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#D4B5A5" />
                            <stop offset="100%" stopColor="#C8A96B" />
                        </radialGradient>
                    </defs>
                    <path d={iconPath} fill={`url(#${gradientId})`} />
                </svg>
            </div>
        </div>
    );
};

const Flourish = () => (
    <div className="text-center my-16 md:my-24">
        <svg width="150" height="20" viewBox="0 0 100 20" className="mx-auto text-imperial-gold/40">
            <path d="M0 10 C 20 20, 30 0, 50 10 S 70 0, 100 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    </div>
);

const Apropos: React.FC = () => {
    const { t } = useTranslation();
    return (
        <SmoothScroll>
            <div className="bg-inked-indigo text-rose-champagne font-sans overflow-hidden">
                {/* Section d'introduction */}
                <section
                    className="py-24 md:py-32 px-6 text-center"
                >
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-playfair text-6xl md:text-7xl font-bold text-imperial-gold mb-8">
                            {t('about.title')}
                        </h1>
                        <p className="text-2xl md:text-3xl font-playfair italic text-rose-champagne/90 mb-12">
                            {t('about.intro.subtitle')}
                        </p>
                        <div className="text-lg md:text-xl text-left space-y-6 text-rose-champagne/80 leading-relaxed">
                            <p>{t('about.intro.p1')}</p>
                            <p>{t('about.intro.p2')}</p>
                            <p>{t('about.intro.p3')}</p>
                            <p className="text-center pt-4 font-playfair italic text-xl text-imperial-gold">{t('about.intro.p4')}</p>
                        </div>
                    </div>
                </section>

                <Flourish />

                {/* Section Reine Karine */}
                <section
                    className="py-20 md:py-24 px-6"
                >
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-center">
                        <div className="md:col-span-1">
                            <CreativeProfileImage suit="hearts" />
                        </div>
                        <div className="md:col-span-2">
                            <h2 className="font-playfair text-5xl font-bold text-imperial-gold mb-6">{t('about.karine.title')}</h2>
                            <div className="space-y-4 text-lg text-rose-champagne/80 leading-relaxed">
                                <p>{t('about.karine.p1')}</p>
                                <p>{t('about.karine.p2')}</p>
                                <p>{t('about.karine.p3')}</p>
                                <p className="italic pt-2">{t('about.karine.p4')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Flourish />

                {/* Section Reine Marie-Ève */}
                <section
                    className="py-20 md:py-24 px-6"
                >
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-center">
                        <div className="md:col-span-2 md:order-2">
                            <h2 className="font-playfair text-5xl font-bold text-imperial-gold mb-6">{t('about.marie-eve.title')}</h2>
                            <div className="space-y-4 text-lg text-rose-champagne/80 leading-relaxed">
                                <p>{t('about.marie-eve.p1')}</p>
                                <p>{t('about.marie-eve.p2')}</p>
                                <p>{t('about.marie-eve.p3')}</p>
                                <p>{t('about.marie-eve.p4')}</p>
                            </div>
                        </div>
                        <div className="md:col-span-1 md:order-1">
                            <CreativeProfileImage suit="diamonds" />
                        </div>
                    </div>
                </section>

                <Flourish />
            </div>
        </SmoothScroll>
    );
};

export default Apropos; 