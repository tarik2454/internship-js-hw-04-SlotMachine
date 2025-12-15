"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSlotStore } from "../store/useSlotStore";
import styles from "./CelebrationEffects.module.scss";
import Image from "next/image";
import { useMemo } from "react";

import cherry from "../image/props/cheryslot.svg";
import seven from "../image/props/7slot.svg";
import seven1 from "../image/props/7slot (1).svg";
import crown from "../image/props/crownslot.svg";
import crystal from "../image/props/crystallslot.svg";
import lemon from "../image/props/lemonslot.svg";
import eew from "../image/props/eew.svg";
import sdsssd from "../image/props/sdsssd.svg";
import sdsssd1 from "../image/props/sdsssd (1).svg";
import sdsssd2 from "../image/props/sdsssd (2).svg";
import dsa from "../image/props/dsa.svg";

const props = [
  cherry,
  seven,
  seven1,
  crown,
  crystal,
  lemon,
  eew,
  sdsssd,
  sdsssd1,
  sdsssd2,
  dsa,
];

const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    image: props[Math.floor(Math.random() * props.length)],
    angle: Math.random() * 360,
    distance: Math.random() * 500 + 400,
    delay: Math.random() * 0.1,
    scale: Math.random() * 0.5 + 0.5,
    depth: Math.random() > 0.5 ? 5 : 1,
  }));
};

export const CelebrationEffects = () => {
  const { showCelebration } = useSlotStore();

  const particles = useMemo(() => generateParticles(50), [showCelebration]);

  return (
    <AnimatePresence>
      {showCelebration && (
        <div className={styles.celebrationWrapper}>
          {particles.map((particle) => {
            const explodeX =
              Math.cos((particle.angle * Math.PI) / 180) * particle.distance;
            const explodeY =
              Math.sin((particle.angle * Math.PI) / 180) * particle.distance;

            return (
              <motion.div
                key={particle.id}
                className={styles.particle}
                style={{ zIndex: particle.depth }}
                initial={{
                  x: "-50%",
                  y: "-50%",
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: ["-50%", explodeX, explodeX + (Math.random() * 200 - 100)],
                  y: ["-50%", explodeY, explodeY + 1000],
                  scale: [0, particle.scale, particle.scale],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, Math.random() * 360, Math.random() * 1080 + 360],
                }}
                transition={{
                  duration: 1.8,
                  times: [0, 0.1, 1],
                  ease: [[0.175, 0.885, 0.32, 1.275], "easeIn", "linear"],
                  delay: particle.delay,
                }}
              >
                <Image
                  src={particle.image}
                  alt="confetti"
                  width={50}
                  height={50}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};
