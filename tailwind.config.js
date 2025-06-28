/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PALETTE 1 - Royauté sacrée (Palette principale)
        'royal-purple': '#3B1E50',      // Pourpre profond royal - Fond principal, blocs
        'imperial-gold': '#D6AE60',     // Or impérial métallique - Titres, ornements, contours
        'rose-champagne': '#D4B5A5',    // Rose champagne doux - Accents émotionnels, hover, douceur
        'velvet-black': '#1B1B1B',      // Noir velours - Texte et cadres
        'warm-pearl': '#FDF7F2',        // Blanc nacré chaud - Fond clair alternatif, respiration visuelle
        
        // PALETTE 2 - Cabinet de curiosités féminin
        'vintage-aubergine': '#4B2E43',  // Aubergine vieilli - Fond et profondeur
        'patina-gold': '#B79D74',        // Doré patiné - Contours, effets graphiques
        'powder-rose': '#E8C5C1',       // Rose poudre - Cœur visuel doux, soutien du rose champ.
        'parchment-cream': '#F5EBD6',    // Crème parchemin - Fond papier ancien
        'ink-black': '#181818',          // Encre noire - Texte net, éléments vintage
        
        // PALETTE 3 - Rituel et lumière
        'inked-indigo': '#241B2F',       // Indigo noir encré - Fond nuit / mystère
        'smoky-gold': '#C8A96B',         // Or doux fumé - Art déco discret, éléments métalliques
        'antique-rose': '#E3BBB2',       // Rose ancien - Ambiance sentimentale
        'moon-milk': '#FFF9F3',          // Lait de lune - Fond clair alternatif
        'amber-smoke': '#776650',        // Fumée d'ambre - Pour lier avec les objets graphiques
        
        // Palette secondaire pour variations (basée sur Palette 1)
        'violet-aubergine': '#5A2A6D',   // Fonds secondaires, boutons secondaires, hover
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-royal': 'linear-gradient(135deg, #3B1E50 0%, #5A2A6D 50%, #4B2E43 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D6AE60 0%, #C8A96B 50%, #B79D74 100%)',
        'gradient-rose': 'linear-gradient(135deg, #D4B5A5 0%, #E8C5C1 50%, #E3BBB2 100%)',
      }
    },
  },
  plugins: [],
}

