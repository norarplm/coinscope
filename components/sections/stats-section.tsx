"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface GlobalStats {
  total_market_cap: { usd: number }
  total_volume: { usd: number }
  market_cap_percentage: { btc: number }
  active_cryptocurrencies: number
}

export function StatsSection() {
  const [stats, setStats] = useState<GlobalStats | null>(null)

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const response = await fetch("/api/global-stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching global stats:", error)
      }
    }

    fetchGlobalStats()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toLocaleString()}`
  }

  const statsData = [
    {
      title: "Total Market Cap",
      value: stats ? formatNumber(stats.total_market_cap.usd) : "$0",
      change: "+2.4%",
    },
    {
      title: "24h Volume",
      value: stats ? formatNumber(stats.total_volume.usd) : "$0",
      change: "+5.1%",
    },
    {
      title: "Bitcoin Dominance",
      value: stats ? `${stats.market_cap_percentage.btc.toFixed(1)}%` : "0%",
      change: "-0.3%",
    },
    {
      title: "Active Cryptocurrencies",
      value: stats ? stats.active_cryptocurrencies.toLocaleString() : "0",
      change: "+12",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Global Crypto Stats
          </h2>
          <p className="text-xl text-muted-foreground">Real-time cryptocurrency market overview</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="glass-morphism cyber-border hover:cyber-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</h3>
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
