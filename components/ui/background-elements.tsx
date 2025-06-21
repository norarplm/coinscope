"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function BackgroundElements() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const cryptoSymbols = ["₿", "Ξ", "₳", "◊", "Ł", "Ð", "⟠", "Ⱥ"]
  const isDark = theme === "dark"

  return (
    <>
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-purple-400/20" : "bg-yellow-400/30"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100, -200],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Crypto Symbols */}
      <div className="absolute inset-0 overflow-hidden">
        {cryptoSymbols.map((symbol, i) => (
          <motion.div
            key={i}
            className={`absolute text-4xl font-bold ${isDark ? "text-purple-400/10" : "text-yellow-600/20"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-96 h-96 rounded-full ${
              isDark
                ? "bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10"
                : "bg-gradient-to-r from-yellow-300/20 via-orange-300/20 to-red-300/20"
            } blur-3xl`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  )
}
