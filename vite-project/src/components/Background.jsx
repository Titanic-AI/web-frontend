// src/components/Background.jsx
import { motion } from "framer-motion";
import bgImage from '../assets/titanics-bg.jpg';

export default function Background({ darkMode }) {
  return (
    <>
      {/* Background image with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(8px)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          transform: 'scale(1.05)',
        }}
      />

      {/* Brightness overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.3)',
          filter: darkMode ? 'brightness(0.6)' : 'brightness(1.3)',
          zIndex: 1,
        }}
      />
    </>
  );
}