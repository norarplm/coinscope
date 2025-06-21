"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Star, Heart } from "lucide-react"
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
}

export function FavoritesSection() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoriteCryptos, setFavoriteCryptos] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("crypto-favorites")
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites)
      setFavorites(favoriteIds)
      if (favoriteIds.length > 0) {
        fetchFavoriteDetails(favoriteIds)
      }
    }

    // Listen for storage changes (when favorites are updated from other components)
    const handleStorageChange = () => {
      const updatedFavorites = localStorage.getItem("crypto-favorites")
      if (updatedFavorites) {
        const favoriteIds = JSON.parse(updatedFavorites)
        setFavorites(favoriteIds)
        if (favoriteIds.length > 0) {
          fetchFavoriteDetails(favoriteIds)
        } else {
          setFavoriteCryptos([])
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for same-page updates
    window.addEventListener("favoritesUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favoritesUpdated", handleStorageChange)
    }
  }, [])

  const fetchFavoriteDetails = async (favoriteIds: string[]) => {
    if (favoriteIds.length === 0) {
      setFavoriteCryptos([])
      return
    }

    try {
      setLoading(true)
      const promises = favoriteIds.map((id) => fetch(`/api/cryptocurrency/${id}`).then((res) => res.json()))
      const results = await Promise.all(promises)
      setFavoriteCryptos(results.filter((crypto) => crypto && !crypto.error))
    } catch (error) {
      console.error("Error fetching favorite cryptocurrencies:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = (cryptoId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const newFavorites = favorites.filter((id) => id !== cryptoId)
    setFavorites(newFavorites)
    localStorage.setItem("crypto-favorites", JSON.stringify(newFavorites))

    // Dispatch custom event for same-page updates
    window.dispatchEvent(new Event("favoritesUpdated"))

    setFavoriteCryptos((prev) => prev.filter((crypto) => crypto.id !== cryptoId))
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

  if (favorites.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <Card className="glass-morphism border border-purple-500/20 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            <Heart className="h-6 w-6 text-red-400" />
            <span>Your Favorites</span>
            <Badge variant="secondary" className="ml-2">
              {favorites.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(favorites.length)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-muted rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {favoriteCryptos.map((crypto, index) => (
                  <motion.div
                    key={crypto.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link href={`/crypto/${crypto.id}`}>
                      <Card className="glass-morphism border border-purple-500/20 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer relative group">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors"
                          onClick={(e) => removeFavorite(crypto.id, e)}
                        >
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </motion.button>

                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Image
                              src={crypto.image || "/placeholder.svg"}
                              alt={crypto.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate group-hover:text-purple-400 transition-colors">
                                {crypto.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold">{formatPrice(crypto.current_price)}</span>
                              <div
                                className={`flex items-center space-x-1 text-xs ${
                                  crypto.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {crypto.price_change_percentage_24h >= 0 ? (
                                  <TrendingUp className="h-3 w-3" />
                                ) : (
                                  <TrendingDown className="h-3 w-3" />
                                )}
                                <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
                              </div>
                            </div>
                            <div className="text-xs">
                              <p className="text-muted-foreground">Market Cap</p>
                              <p className="font-medium">{formatMarketCap(crypto.market_cap)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
