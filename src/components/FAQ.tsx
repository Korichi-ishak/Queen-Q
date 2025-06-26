import React from 'react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    question: "Is joining the Royal Launch free?",
    answer: (
      <>
        Yes, joining the waitlist costs nothing. Queen de Q is offering early access to a limited number of users who will receive special perks once the full app launches.
      </>
    ),
  },
  {
    question: "How many archetype cards are in the deck?",
    answer: (
      <>
        The Queen de Q deck features 54 unique archetype cards, each representing a different royal persona. The full app will provide detailed insights into your specific archetype and how it influences your life journey.
      </>
    ),
  },
  {
    question: "When will the full app be released?",
    answer: (
      <>
        The full Queen de Q experience is scheduled for release in Q3 2023. Royal Launch members will receive early access two weeks before the public launch, along with exclusive perks and features.
      </>
    ),
  },
  {
    question: "How is my email data handled?",
    answer: (
      <>
        We take your privacy seriously. Your email is stored securely and used only for Royal Launch communications. We never share or sell your data with third parties. You can unsubscribe at any time.
      </>
    ),
  },
  {
    question: "Can I change my archetype later?",
    answer: (
      <>
        Absolutely! While your initial card draw reveals one aspect of your royal persona, the full app will allow you to explore all 54 archetypes and discover which ones resonate most with different aspects of your life.
      </>
    ),
  },
];

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-b from-royal-purple/10 to-royal-purple/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-imperial-gold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-rose-champagne/80 max-w-2xl mx-auto">
            Everything you need to know about your royal journey
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-1 sm:space-y-2">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group border-b border-white/10 py-4 transition-all duration-300 ease-in-out"
            >
              <summary 
                className="flex justify-between items-center cursor-pointer list-none"
                aria-expanded="false"
              >
                <span className="text-lg sm:text-xl font-playfair font-medium text-rose-champagne group-open:text-imperial-gold transition-colors duration-300">
                  {item.question}
                </span>
                <span className="text-imperial-gold transition-transform duration-300 group-open:rotate-180">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="mt-4 overflow-hidden transition-[max-height] duration-300 ease-in-out">
                <p className="text-rose-champagne/90 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}; 