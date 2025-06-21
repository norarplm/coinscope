"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, BarChart3, Search, Shield, Zap, Globe } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-Time Market Data",
      description: "Get live cryptocurrency prices, market caps, and trading volumes updated every second.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive charts and technical indicators to analyze market trends and patterns.",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Quickly find any cryptocurrency with our intelligent search and filtering system.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee for uninterrupted access.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with sub-second response times for all market data.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Track thousands of cryptocurrencies from exchanges worldwide in one platform.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay ahead in the cryptocurrency market
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass-morphism cyber-border hover:cyber-glow transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
