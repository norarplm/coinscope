"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react"
import Link from "next/link"
import { InvestmentSimulator } from "@/components/sections/investment-simulator"

export function HeroSection() {
  const features = [
    { icon: TrendingUp, text: "Real-time Data" },
    { icon: Shield, text: "Secure & Reliable" },
    { icon: Zap, text: "Lightning Fast" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent neon-text">
              CoinScope
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Advanced cryptocurrency market analytics platform with real-time data, comprehensive analysis, and powerful
            comparison tools
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 h-14 px-8 text-lg rounded-xl shadow-lg shadow-purple-500/20"
              >
                <Link href="/markets">
                  Explore Markets <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 backdrop-blur-sm h-14 px-8 text-lg rounded-xl shadow-lg"
              >
                <Link href="/compare">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Compare Cryptos
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-muted-foreground"
                whileHover={{ scale: 1.1, color: "#8b5cf6" }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="h-5 w-5 text-purple-400" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Investment Simulator */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <InvestmentSimulator />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
