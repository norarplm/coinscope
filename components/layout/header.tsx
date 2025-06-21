"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/crypto/search-bar"
import { Menu, X, Zap, TrendingUp, BarChart3 } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: TrendingUp },
    { href: "/markets", label: "Markets", icon: BarChart3 },
    { href: "/compare", label: "Compare", icon: Zap },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-purple-500/20 light:bg-blue-500/10 light:backdrop-blur-md light:border-blue-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo - Back to Thunder */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Zap className="h-6 w-6 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-cyan-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent neon-text">
                CoinScope
              </span>
              <div className="text-xs text-muted-foreground/60 -mt-1">Analytics Pro</div>
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">

            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-foreground hover:text-purple-400 transition-all duration-300 hover:bg-purple-500/10 group"
                >
                  <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Enhanced Search Bar - Smaller and moved right */}
          <motion.div
            className="hidden lg:block max-w-xs ml-auto mr-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <SearchBar />
          </motion.div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-purple-500/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden border-t border-purple-500/20"
        >
          <nav className="flex flex-col space-y-2 py-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-foreground hover:text-purple-400 transition-all duration-300 hover:bg-purple-500/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}
            <div className="pt-4 px-4">
              <SearchBar />
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  )
}
