"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<
    "loading" | "shrink" | "logo" | "done"
  >("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrink"), 1200);
    const t2 = setTimeout(() => setPhase("logo"), 2000);
    const t3 = setTimeout(() => setPhase("done"), 2800);
    const t4 = setTimeout(() => onComplete(), 3200);

    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [onComplete]);

  const squares = [
    { size: 280, delay: 0, color: "hsl(232, 47%, 23%)" },
    { size: 210, delay: 0.1, color: "hsl(233, 39%, 33%)" },
    { size: 150, delay: 0.2, color: "hsl(231, 34%, 41%)" },
    { size: 100, delay: 0.3, color: "hsl(32, 47%, 52%)" },
    { size: 60, delay: 0.4, color: "hsl(32 85% 58%)" },
  ];

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* BACKGROUND */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #ebeffe, #f3f5fb 70%)",
            }}
          />

          {/* NOISE */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')]" />

          {/* MAIN BOX */}
          <motion.div
            className="relative flex items-center justify-center"
            animate={{
              scale: phase === "shrink" || phase === "logo" ? 0.5 : 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              width: 260,
              height: 260,
              background: "rgba(20,27,58,0.9)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
            }}
          >
            {/* SQUARES */}
            {phase !== "logo" && (
              <div className="absolute inset-0 flex items-center justify-center">
                {squares.map((sq, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-xl"
                    style={{
                      width: sq.size,
                      height: sq.size,
                      backgroundColor: sq.color,
                    }}
                    initial={{ scale: 0, rotate: 45, opacity: 0 }}
                    animate={{
                      scale:
                        phase === "loading"
                          ? [0, 1.1, 1]
                          : phase === "shrink"
                          ? 0
                          : 0,
                      rotate: phase === "loading" ? [45, 0] : 0,
                      opacity:
                        phase === "loading"
                          ? 1
                          : phase === "shrink"
                          ? 0
                          : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </div>
            )}

            {/* LOGO */}
            <motion.img
              src="/alubond-logo.png"
              alt="Alubond"
              className="relative z-10 w-24"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: phase === "logo" ? 1 : 0,
                scale: phase === "logo" ? 1 : 0.9,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;