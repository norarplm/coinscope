"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function BackgroundEffects() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [cryptoLogos, setCryptoLogos] = useState<
    Array<{ id: number; x: number; y: number; delay: number; logo: string; size: string }>
  >([])
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; x: number; char: string; duration: number }>>([])
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)

    // Generate floating crypto logos with actual crypto symbols
    const cryptoSymbols = [
      { symbol: "₿", name: "Bitcoin" },
      { symbol: "Ξ", name: "Ethereum" },
      { symbol: "◊", name: "Diamond" },
      { symbol: "₳", name: "Cardano" },
      { symbol: "●", name: "Dot" },
      { symbol: "◆", name: "Diamond2" },
      { symbol: "▲", name: "Triangle" },
      { symbol: "■", name: "Square" },
      { symbol: "⟠", name: "Stellar" },
      { symbol: "Ł", name: "Litecoin" },
      { symbol: "Ð", name: "Dogecoin" },
      { symbol: "⚡", name: "Lightning" },
      { symbol: "🔷", name: "Blue Diamond" },
      { symbol: "🔶", name: "Orange Diamond" },
      { symbol: "⭐", name: "Star" },
    ]

    const sizes = ["text-lg", "text-xl", "text-2xl", "text-3xl"]

    const newCryptoLogos = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      logo: cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)].symbol,
      size: sizes[Math.floor(Math.random() * sizes.length)],
    }))
    setCryptoLogos(newCryptoLogos)

    // Reduced matrix characters for cyberpunk effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789₿ΞÐŁȺ"
    const newMatrixChars = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      char: chars[Math.floor(Math.random() * chars.length)],
      duration: Math.random() * 4 + 3,
    }))
    setMatrixChars(newMatrixChars)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: isDark
              ? [
                  "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 50%)",
                ]
              : [
                  "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.35) 0%, transparent 50%)",
                ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      {/* Light mode sun rays */}
      {!isDark && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 right-10 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          {/* Additional light rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-32 bg-gradient-to-b from-yellow-300/20 to-transparent"
              style={{
                left: `${20 + i * 10}%`,
                top: `${10 + i * 5}%`,
                transformOrigin: "bottom",
              }}
              animate={{
                rotate: [0, 10, -10, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Matrix Rain Effect for Dark Mode Only */}
      {isDark && (
        <div className="absolute inset-0">
          {matrixChars.map((char) => (
            <motion.div
              key={char.id}
              className="absolute text-green-400/15 font-mono text-sm"
              style={{
                left: `${char.x}%`,
                top: "-10%",
              }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 0.3, 0.3, 0],
              }}
              transition={{
                duration: char.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 8,
              }}
            >
              {char.char}
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-purple-400/20" : "bg-blue-400/30"}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6 + particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced floating crypto symbols with better styling */}
      {cryptoLogos.map((crypto) => (
        <motion.div
          key={crypto.id}
          className={`absolute font-bold select-none ${crypto.size} ${
            isDark ? "text-purple-400/8" : "text-blue-400/10"
          }`}
          style={{
            left: `${crypto.x}%`,
            top: `${crypto.y}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-30, 30, -30],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 15 + crypto.delay,
            repeat: Number.POSITIVE_INFINITY,
            delay: crypto.delay,
            ease: "easeInOut",
          }}
        >
          {crypto.logo}
        </motion.div>
      ))}

      {/* Holographic scanning lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(90deg, 
            transparent 0%, 
            ${isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(59, 130, 246, 0.08)"} 50%, 
            transparent 100%
          )`,
          backgroundSize: "200px 100%",
          backgroundRepeat: "no-repeat",
        }}
        animate={{
          backgroundPositionX: ["-200px", "calc(100% + 200px)"],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Pulsing energy orbs */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full blur-xl ${
              isDark
                ? "bg-gradient-to-r from-purple-500/8 via-pink-500/8 to-cyan-500/8"
                : "bg-gradient-to-r from-blue-400/15 via-green-400/15 to-teal-400/15"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 12 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Light mode specific effects */}
      {!isDark && (
        <>
          {/* Floating clouds */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-24 h-12 bg-white/20 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${20 + Math.random() * 40}%`,
                }}
                animate={{
                  x: [0, 100, 200],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Light sparkles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
