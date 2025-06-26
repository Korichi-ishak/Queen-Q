import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sophia Laurent",
    role: "Early Adopter",
    quote: "Queen de Q helped me understand my true royal archetype. The insights were surprisingly accurate!",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    name: "Marcus Reynolds",
    role: "Beta Tester",
    quote: "The Visionary archetype resonated deeply with me. Can't wait for the full app launch!",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    name: "Eliza Montgomery",
    role: "Royal Member",
    quote: "Discovering my archetype was like finding a missing piece of myself. Truly transformative.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "James Chen",
    role: "Community Leader",
    quote: "The card deck experience is magical. Each archetype reveals something profound about your nature.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

export const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: {
        perView: 1.1,
        spacing: 24,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      // Auto-play plugin
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 6000); // 6 seconds per slide
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          clearNextTimeout();
        }

        return () => {
          clearNextTimeout();
        };
      },
    ]
  );

  // Intersection Observer to lazy load the slider
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-gradient-to-b from-royal-purple/5 to-royal-purple/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-imperial-gold mb-4">
            Royal Testimonials
          </h2>
          <p className="text-lg sm:text-xl text-rose-champagne/80 max-w-2xl mx-auto">
            Hear from those who have discovered their royal archetype
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-3xl mx-auto">
          {isVisible ? (
            <div className="keen-slider-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="keen-slider__slide">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-full">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-imperial-gold/30">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width="48"
                            height="48"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-playfair font-bold text-imperial-gold">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-rose-champagne/70">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <blockquote className="relative">
                        <span className="absolute top-0 left-0 text-4xl text-imperial-gold/20">"</span>
                        <p className="text-rose-champagne/90 italic pl-6 line-clamp-2">
                          {testimonial.quote}
                        </p>
                        <span className="absolute bottom-0 right-0 text-4xl text-imperial-gold/20">"</span>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              {loaded && instanceRef.current && (
                <div className="flex justify-center mt-6 gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => instanceRef.current?.moveToIdx(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === idx 
                          ? "bg-imperial-gold w-6" 
                          : "bg-white/20 hover:bg-imperial-gold/50"
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <TestimonialsSkeleton />
          )}
        </div>
      </div>
    </section>
  );
};

// Skeleton loader for testimonials
const TestimonialsSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-64">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-imperial-gold/20 mr-4"></div>
        <div>
          <div className="h-4 bg-imperial-gold/20 rounded w-24 mb-2"></div>
          <div className="h-3 bg-rose-champagne/20 rounded w-16"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-rose-champagne/20 rounded w-full"></div>
        <div className="h-3 bg-rose-champagne/20 rounded w-5/6"></div>
        <div className="h-3 bg-rose-champagne/20 rounded w-4/6"></div>
      </div>
    </div>
    <div className="flex justify-center mt-6 gap-2">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
      ))}
    </div>
  </div>
); 