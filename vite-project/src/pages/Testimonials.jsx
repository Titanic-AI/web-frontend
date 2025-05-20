import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  "“Clean design, intuitive flow, and surprisingly fun to test different passenger scenarios. This tool makes history interactive!” – Love",
  "“Clean UI and great predictions!” – Sonali",
  "“It’s the perfect blend of education and interactivity. The interface is modern and easy to use” – Erbakan",
  "“From the animated inputs to the smooth transitions, this survival calculator is a UI gem. It's like time travel with a modern twist” – Jamal",
  "“I appreciate the thoughtful layout and responsive design. Everything just works, even on mobile. Love it!” – Marlis",
  "“Who knew predicting Titanic survival could be this addictive? Beautiful interface, fast results, and a fun way to learn about history and data!” – Ahtisham",
  "“It’s like a mini time capsule with a tech upgrade. The interface is smooth, colors are soothing, and the experience is just awesome” – Utkarshni",
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
        setVisible(true);
      }, 500); // duration of fade out
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#003366" }}>
        What Users Say
      </h2>

      <div
        style={{
          position: "relative",
          width: "80%",
          maxWidth: "600px",
          minHeight: "100px",
          textAlign: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {visible && (
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "1.2rem",
                color: "#333",
                padding: "1rem",
                fontStyle: "italic",
              }}
            >
              {testimonials[index]}
            </motion.blockquote>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Testimonials;
