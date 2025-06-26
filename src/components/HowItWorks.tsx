import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  icon: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: '🃏',
    title: 'Stop the deck',
    description: 'Click or press Space to pause the mystical card shuffle'
  },
  {
    icon: '🔍',
    title: 'Reveal your archetype',
    description: 'Discover which royal persona aligns with your essence'
  },
  {
    icon: '👑',
    title: 'Claim royal perks – join the list',
    description: 'Secure exclusive access to the Royal Launch experience'
  }
];

export const HowItWorks: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-royal-purple/10 to-royal-purple/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-imperial-gold mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-rose-champagne/80 max-w-2xl mx-auto">
            Three simple steps to unlock your royal destiny
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-imperial-gold text-royal-purple font-bold text-sm flex items-center justify-center">
                {index + 1}
              </div>

              {/* Step Card */}
              <div className="bg-royal-purple/5 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/10 hover:border-imperial-gold/30 transition-all duration-300 group">
                
                {/* Icon */}
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-playfair font-bold text-imperial-gold">
                    {step.title}
                  </h3>
                  <p className="text-rose-champagne/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Decorative gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-imperial-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connection Lines (desktop) */}
        <div className="hidden md:block relative mt-8">
          <div className="absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-imperial-gold/50 to-imperial-gold/20 transform -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-imperial-gold/20 to-imperial-gold/50 transform -translate-y-1/2" />
        </div>
      </div>
    </section>
  );
}; 