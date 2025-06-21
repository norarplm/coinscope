"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  total_volume: number
  circulating_supply: number
}

export function CryptoListings() {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    fetchCryptos()
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("crypto-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [page])

  const fetchCryptos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cryptocurrencies?page=${page}`)
      const data = await response.json()
      setCryptos(data)
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (cryptoId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const newFavorites = favorites.includes(cryptoId)
      ? favorites.filter((id) => id !== cryptoId)
      : [...favorites, cryptoId]

    setFavorites(newFavorites)
    localStorage.setItem("crypto-favorites", JSON.stringify(newFavorites))

    // Dispatch custom event for same-page updates
    window.dispatchEvent(new Event("favoritesUpdated"))
  }

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`
    if (price < 1) return `$${price.toFixed(4)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-morphism animate-pulse card-3d border border-purple-500/20 rounded-xl">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptos.map((crypto, index) => (
          <motion.div
            key={crypto.id}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            whileHover={{
              y: -10,
              rotateX: 5,
              rotateY: 5,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            onHoverStart={() => setHoveredCard(crypto.id)}
            onHoverEnd={() => setHoveredCard(null)}
            style={{ perspective: 1000 }}
          >
            <Link href={`/crypto/${crypto.id}`}>
              <Card className="glass-morphism border border-purple-500/20 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer card-3d relative overflow-hidden group">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10"
                  animate={{
                    opacity: hoveredCard === crypto.id ? 0.8 : 0,
                    scale: hoveredCard === crypto.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Image
                          src={crypto.image || "/placeholder.svg"}
                          alt={crypto.name}
                          width={40}
                          height={40}
                          className="rounded-full shadow-lg"
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-purple-400 transition-colors">
                          {crypto.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20">
                        #{crypto.market_cap_rank}
                      </Badge>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded-full hover:bg-purple-500/20 transition-colors"
                        onClick={(e) => toggleFavorite(crypto.id, e)}
                      >
                        <Star
                          className={`h-4 w-4 transition-colors ${
                            favorites.includes(crypto.id)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground hover:text-yellow-400"
                          }`}
                        />
                      </motion.button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.span
                        className="text-2xl font-bold text-foreground"
                        animate={{
                          scale: hoveredCard === crypto.id ? 1.05 : 1,
                          color: hoveredCard === crypto.id ? "#8b5cf6" : undefined,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {formatPrice(crypto.current_price)}
                      </motion.span>
                      <motion.div
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                          crypto.price_change_percentage_24h >= 0
                            ? "text-green-400 bg-green-400/10"
                            : "text-red-400 bg-red-400/10"
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium text-sm">
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </span>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Market Cap</p>
                        <p className="font-medium">{formatMarketCap(crypto.market_cap)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Volume (24h)</p>
                        <p className="font-medium">{formatMarketCap(crypto.total_volume)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 rounded-xl"
        >
          Previous
        </Button>
        <div className="flex items-center px-4 py-2 glass-morphism rounded-lg">
          <span className="text-sm text-muted-foreground">Page {page}</span>
        </div>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          className="border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 rounded-xl"
        >
          Next
        </Button>
      </motion.div>
    </div>
  )
}
