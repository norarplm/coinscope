"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-gray-300 animate-pulse" />
  }

  const isDark = theme === "dark"

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-background"
      style={{
        backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="h-4 w-4 text-slate-700" />
        </motion.div>
        <motion.div
          animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="h-4 w-4 text-yellow-500" />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
