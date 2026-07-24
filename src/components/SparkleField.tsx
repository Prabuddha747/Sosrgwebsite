"use client";

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

// Fixed positions, not Math.random() — random values generated at render time
// differ between server and client and break SSR hydration (learned the hard
// way on the Ecosystem diagram). A hand-picked scatter reads as intentional
// anyway, not like a generic particle-library default.
const points = [
  { top: '15%', left: '12%', size: 3, delay: 0 },
  { top: '68%', left: '8%', size: 2, delay: 0.6 },
  { top: '22%', left: '88%', size: 2, delay: 1.1 },
  { top: '78%', left: '91%', size: 3, delay: 0.3 },
  { top: '40%', left: '20%', size: 2, delay: 1.6 },
  { top: '85%', left: '30%', size: 2, delay: 0.9 },
  { top: '10%', left: '55%', size: 2, delay: 1.3 },
  { top: '60%', left: '78%', size: 3, delay: 0.2 },
  { top: '30%', left: '68%', size: 2, delay: 1.8 },
  { top: '90%', left: '60%', size: 2, delay: 0.5 },
  { top: '50%', left: '5%', size: 2, delay: 1.0 },
  { top: '5%', left: '80%', size: 2, delay: 1.5 },
];

interface SparkleFieldProps {
  className?: string;
  opacity?: MotionValue<number>;
}

// Restrained by design — few points, slow twinkle, gold only. Meant for one
// emotional beat on the page, not ambient decoration sprinkled everywhere.
const SparkleField: React.FC<SparkleFieldProps> = ({ className = '', opacity }) => (
  <motion.div
    style={opacity ? { opacity } : undefined}
    className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
  >
    {points.map((p, i) => (
      <motion.span
        key={i}
        className="absolute rounded-full bg-[#B9914A]"
        style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        animate={{ opacity: [0, 1, 0], scale: [0.6, 1.3, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
      />
    ))}
  </motion.div>
);

export default SparkleField;
