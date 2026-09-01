import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Bot, Cpu, Zap, Cog, Sparkles, Star, Circle } from 'lucide-react';

const robotIcons = [Bot, Cpu, Zap, Cog, Sparkles];
const particleShapes = [Star, Circle, Sparkles];

export function BackgroundAnimation() {
  const { animationsEnabled } = useTheme();
  
  if (!animationsEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating robot icons */}
      {[...Array(8)].map((_, i) => {
        const Icon = robotIcons[i % robotIcons.length];
        return (
          <motion.div
            key={i}
            className="absolute opacity-[0.02]"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon size={30 + Math.random() * 25} className="text-primary" />
          </motion.div>
        );
      })}
      
      {/* Enhanced floating particles */}
      {[...Array(12)].map((_, i) => {
        const Shape = particleShapes[i % particleShapes.length];
        return (
        <motion.div
          key={`particle-${i}`}
          className="absolute opacity-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            rotate: 0,
            scale: 0.5
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: -50,
            rotate: 360,
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Shape className="h-3 w-3 text-primary" />
        </motion.div>
        );
      })}
      
      {/* Gradient orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-xl"
          style={{
            width: 200 + Math.random() * 100,
            height: 200 + Math.random() * 100,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}