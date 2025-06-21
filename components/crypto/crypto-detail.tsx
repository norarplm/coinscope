"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Globe, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CryptoDetailProps {
  cryptoId: string
}

interface CryptoDetail {
  id: string
  name: string
  symbol: string
  image: {
    large: string
  }
  market_data: {
    current_price: { usd: number }
    market_cap: { usd: number }
    market_cap_rank: number
    price_change_percentage_24h: number
    total_volume: { usd: number }
    circulating_supply: number
    max_supply: number
    total_supply: number
    high_24h: { usd: number }
    low_24h: { usd: number }
    ath: { usd: number }
    atl: { usd: number }
  }
  description: {
    en: string
  }
  links: {
    homepage: string[]
    blockchain_site: string[]
  }
}

export function CryptoDetail({ cryptoId }: CryptoDetailProps) {
  const [crypto, setCrypto] = useState<CryptoDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCryptoDetail()
  }, [cryptoId])

  const fetchCryptoDetail = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/crypto-detail/${cryptoId}`)
      const data = await response.json()
      setCrypto(data)
    } catch (error) {
      console.error("Error fetching crypto detail:", error)
    } finally {
      setLoading(false)
    }
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
      <div className="space-y-6">
        <Card className="glass-morphism animate-pulse">
          <CardContent className="p-8">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-12 bg-muted rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!crypto) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-foreground mb-4">Cryptocurrency not found</h1>
        <p className="text-muted-foreground">The requested cryptocurrency could not be found.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Header */}
      <Card className="glass-morphism cyber-border">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Image
                src={crypto.image.large || "/placeholder.svg"}
                alt={crypto.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{crypto.name}</h1>
                <p className="text-xl text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              #{crypto.market_data.market_cap_rank}
            </Badge>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-4xl md:text-5xl font-bold text-foreground">
              {formatPrice(crypto.market_data.current_price.usd)}
            </span>
            <div
              className={`flex items-center space-x-2 text-xl ${
                crypto.market_data.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {crypto.market_data.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="h-6 w-6" />
              ) : (
                <TrendingDown className="h-6 w-6" />
              )}
              <span>{Math.abs(crypto.market_data.price_change_percentage_24h).toFixed(2)}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-xl font-semibold">{formatMarketCap(crypto.market_data.market_cap.usd)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-xl font-semibold">{formatMarketCap(crypto.market_data.total_volume.usd)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">24h High</p>
              <p className="text-xl font-semibold">{formatPrice(crypto.market_data.high_24h.usd)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">24h Low</p>
              <p className="text-xl font-semibold">{formatPrice(crypto.market_data.low_24h.usd)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism cyber-border">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Market Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">All-Time High</span>
              <span className="font-semibold">{formatPrice(crypto.market_data.ath.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">All-Time Low</span>
              <span className="font-semibold">{formatPrice(crypto.market_data.atl.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Circulating Supply</span>
              <span className="font-semibold">{crypto.market_data.circulating_supply?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Supply</span>
              <span className="font-semibold">{crypto.market_data.total_supply?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Supply</span>
              <span className="font-semibold">{crypto.market_data.max_supply?.toLocaleString() || "∞"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism cyber-border">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {crypto.links.homepage[0] && (
              <Link
                href={crypto.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg glass-morphism hover:bg-purple-500/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-purple-400" />
                  <span>Official Website</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Link>
            )}
            {crypto.links.blockchain_site.slice(0, 3).map((link, index) => {
              if (!link) return null
              const domain = new URL(link).hostname
              return (
                <Link
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg glass-morphism hover:bg-purple-500/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-purple-400" />
                    <span className="capitalize">{domain.replace("www.", "")}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {crypto.description.en && (
        <Card className="glass-morphism cyber-border">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About {crypto.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: crypto.description.en.slice(0, 1000) + (crypto.description.en.length > 1000 ? "..." : ""),
              }}
            />
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
