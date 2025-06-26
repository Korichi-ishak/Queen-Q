/// <reference types="vite/client" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': {
        src?: string;
        background?: string;
        speed?: string;
        loop?: boolean;
        autoplay?: boolean;
        style?: React.CSSProperties;
        className?: string;
      };
    }
  }
}
