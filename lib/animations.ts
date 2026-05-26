export const fadeUp = {
  initial:   { opacity: 0, y: 24 },
  animate:   { opacity: 1, y: 0 },
  transition:{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export const fadeIn = {
  initial:   { opacity: 0 },
  animate:   { opacity: 1 },
  transition:{ duration: 0.4, ease: "easeOut" }
};

export const slideInLeft = {
  initial:   { opacity: 0, x: -32 },
  animate:   { opacity: 1, x: 0 },
  transition:{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }
};

export const slideInRight = {
  initial:   { opacity: 0, x: 32 },
  animate:   { opacity: 1, x: 0 },
  transition:{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }
};

export const scaleIn = {
  initial:   { opacity: 0, scale: 0.92 },
  animate:   { opacity: 1, scale: 1 },
  transition:{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export const staggerItem = {
  initial:   { opacity: 0, y: 16 },
  animate:   { opacity: 1, y: 0 },
  transition:{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

export const counterSpring = { stiffness: 100, damping: 20, mass: 0.8 };

export const pageTransition = {
  initial:   { opacity: 0, y: 12 },
  animate:   { opacity: 1, y: 0 },
  exit:      { opacity: 0, y: -8 },
  transition:{ duration: 0.35, ease: "easeInOut" }
};
