import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "Comment fonctionne la révélation d'archétype ?",
      answer: "Notre système unique analyse vos réponses pour identifier votre archétype principal parmi 54 possibilités, basé sur des recherches en psychologie et symbolisme."
    },
    {
      question: "Combien de temps dure le processus ?",
      answer: "La révélation complète prend environ 15-20 minutes, incluant le questionnaire et l'analyse personnalisée de votre archétype."
    },
    {
      question: "Puis-je refaire le test ?",
      answer: "Oui, vous pouvez refaire l'expérience après 30 jours, car nous évoluons et notre archétype dominant peut changer avec le temps."
    },
    {
      question: "Les résultats sont-ils fiables ?",
      answer: "Nos archétypes sont basés sur des recherches approfondies en psychologie jungienne et validation par des experts en développement personnel."
    }
  ];

  return (
    <section 
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, 
          #000000 0%, 
          #000000 60%, 
          rgba(59, 30, 80, 0.3) 80%, 
          rgba(59, 30, 80, 0.6) 95%, 
          rgba(59, 30, 80, 0.8) 100%)`
      }}
    >
      {/* Étoiles animées mystiques similaires au footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div 
              className="bg-imperial-gold rounded-full shadow-lg shadow-imperial-gold/30" 
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`
              }}
            />
          </div>
        ))}
        {/* Particules dorées flottantes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-imperial-gold/50 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header mystique */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-transparent bg-gradient-to-br from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text mb-6">
              Mystères Révélés
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-imperial-gold to-transparent animate-pulse"></div>
          </div>
          <p className="text-lg text-rose-champagne/70 mt-8 max-w-2xl mx-auto">
            Les réponses aux questions qui éclairent votre chemin vers la révélation
          </p>
        </div>

        {/* FAQ Items avec animations */}
        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-r from-black via-royal-purple/20 to-black backdrop-blur-sm border border-imperial-gold/30 rounded-2xl p-8 hover:border-imperial-gold/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-imperial-gold/10"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Effet de lumière au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-imperial-gold/5 via-transparent to-imperial-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Badge numéro mystique */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-imperial-gold to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                {index + 1}
              </div>

              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-imperial-gold mb-6 group-hover:text-yellow-300 transition-colors relative z-10">
                {item.question}
              </h3>
              <p className="text-rose-champagne/90 leading-relaxed text-base sm:text-lg relative z-10">
                {item.answer}
              </p>

              {/* Effet de particules au hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-imperial-gold/40 rounded-full animate-ping"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};