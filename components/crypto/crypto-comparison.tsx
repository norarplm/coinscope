"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, TrendingUp, TrendingDown, Search, Clock, Flame } from "lucide-react"
import Image from "next/image"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
  max_supply: number
}

interface SearchResult {
  id: string
  name: string
  symbol: string
  thumb: string
  market_cap_rank: number
}

export function CryptoComparison() {
  const [selectedCryptos, setSelectedCryptos] = useState<Cryptocurrency[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [chartData, setChartData] = useState<any>(null)
  const [timeframe, setTimeframe] = useState("7")
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([])

  // Popular cryptocurrencies for quick access
  const popularCryptos = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
      market_cap_rank: 1,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      market_cap_rank: 2,
    },
    {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      thumb: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png",
      market_cap_rank: 3,
    },
    {
      id: "binancecoin",
      name: "BNB",
      symbol: "BNB",
      thumb: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png",
      market_cap_rank: 4,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
      market_cap_rank: 5,
    },
    {
      id: "usd-coin",
      name: "USDC",
      symbol: "USDC",
      thumb: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png",
      market_cap_rank: 6,
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      thumb: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png",
      market_cap_rank: 7,
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      thumb: "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png",
      market_cap_rank: 8,
    },
  ]

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("recent-crypto-searches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchCryptos()
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  useEffect(() => {
    if (selectedCryptos.length > 0) {
      generateChartData()
    }
  }, [selectedCryptos, timeframe])

  const searchCryptos = async () => {
    try {
      setIsSearching(true)
      const response = await fetch(`/api/search?q=${searchTerm}`)
      const data = await response.json()
      setSearchResults(data.coins?.slice(0, 8) || [])
    } catch (error) {
      console.error("Error searching cryptocurrencies:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const addCrypto = async (crypto: SearchResult) => {
    if (selectedCryptos.length >= 4 || selectedCryptos.some((c) => c.id === crypto.id)) return

    try {
      const response = await fetch(`/api/cryptocurrency/${crypto.id}`)
      const data = await response.json()
      setSelectedCryptos([...selectedCryptos, data])
      setSearchTerm("")
      setSearchResults([])

      // Add to recent searches
      const updatedRecentSearches = [crypto, ...recentSearches.filter((r) => r.id !== crypto.id)].slice(0, 6)
      setRecentSearches(updatedRecentSearches)
      localStorage.setItem("recent-crypto-searches", JSON.stringify(updatedRecentSearches))
    } catch (error) {
      console.error("Error fetching cryptocurrency:", error)
    }
  }

  const removeCrypto = (cryptoId: string) => {
    setSelectedCryptos(selectedCryptos.filter((crypto) => crypto.id !== cryptoId))
  }

  const generateChartData = async () => {
    try {
      const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]
      const datasets = []

      for (let i = 0; i < selectedCryptos.length; i++) {
        const crypto = selectedCryptos[i]
        const response = await fetch(`/api/price-history/${crypto.id}?days=${timeframe}`)
        const data = await response.json()

        if (data.prices) {
          datasets.push({
            label: crypto.name,
            data: data.prices.map((price: [number, number]) => ({
              x: new Date(price[0]).toLocaleDateString(),
              y: price[1],
            })),
            borderColor: colors[i],
            backgroundColor: colors[i] + "20",
            tension: 0.4,
            pointRadius: 2,
            pointHoverRadius: 6,
          })
        }
      }

      if (datasets.length > 0) {
        setChartData({
          datasets,
        })
      }
    } catch (error) {
      console.error("Error generating chart data:", error)
      // Fallback to mock data
      const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]
      const days = Number.parseInt(timeframe)
      const labels = Array.from({ length: days }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (days - 1 - i))
        return date.toLocaleDateString()
      })

      setChartData({
        labels,
        datasets: selectedCryptos.map((crypto, index) => ({
          label: crypto.name,
          data: Array.from({ length: days }, () => crypto.current_price * (0.8 + Math.random() * 0.4)),
          borderColor: colors[index],
          backgroundColor: colors[index] + "20",
          tension: 0.4,
        })),
      })
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

  return (
    <div className="space-y-8">
      {/* Enhanced Search Section */}
      <Card className="glass-morphism border border-purple-500/20 rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Add Cryptocurrencies to Compare
          </CardTitle>
          <p className="text-muted-foreground">Search and add up to 4 cryptocurrencies for comparison</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-xl border border-purple-500/30 focus:border-purple-400 text-lg transition-colors"
              />
              {isSearching && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full" />
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 z-10 mt-2 glass-morphism border border-purple-500/20 rounded-xl max-h-80 overflow-y-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                    {searchResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between p-3 hover:bg-purple-500/10 cursor-pointer rounded-xl transition-all duration-200 ${
                          selectedCryptos.some((c) => c.id === result.id) ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => !selectedCryptos.some((c) => c.id === result.id) && addCrypto(result)}
                      >
                        <div className="flex items-center space-x-3">
                          <Image
                            src={result.thumb || "/placeholder.svg"}
                            alt={result.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium">{result.name}</p>
                            <p className="text-sm text-muted-foreground">{result.symbol.toUpperCase()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result.market_cap_rank && (
                            <Badge variant="secondary" className="text-xs">
                              #{result.market_cap_rank}
                            </Badge>
                          )}
                          <Plus className="h-4 w-4 text-purple-400" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recent Searches and Popular Cryptos */}
          <div className="space-y-4">
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((crypto) => (
                    <motion.button
                      key={crypto.id}
                      onClick={() => addCrypto(crypto)}
                      disabled={selectedCryptos.some((c) => c.id === crypto.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                        selectedCryptos.some((c) => c.id === crypto.id)
                          ? "opacity-50 cursor-not-allowed border-muted"
                          : "border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10"
                      }`}
                      whileHover={{ scale: selectedCryptos.some((c) => c.id === crypto.id) ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={crypto.thumb || "/placeholder.svg"}
                        alt={crypto.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium">{crypto.symbol.toUpperCase()}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-muted-foreground">Popular Cryptocurrencies</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {popularCryptos.map((crypto) => (
                  <motion.button
                    key={crypto.id}
                    onClick={() => addCrypto(crypto)}
                    disabled={selectedCryptos.some((c) => c.id === crypto.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      selectedCryptos.some((c) => c.id === crypto.id)
                        ? "opacity-50 cursor-not-allowed border-muted"
                        : "border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10"
                    }`}
                    whileHover={{ scale: selectedCryptos.some((c) => c.id === crypto.id) ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Image
                      src={crypto.thumb || "/placeholder.svg"}
                      alt={crypto.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium">{crypto.symbol}</p>
                      <p className="text-xs text-muted-foreground">#{crypto.market_cap_rank}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{selectedCryptos.length}/4 cryptocurrencies selected</p>
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i < selectedCryptos.length ? "bg-purple-400" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Cryptos */}
      <AnimatePresence>
        {selectedCryptos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {selectedCryptos.map((crypto, index) => (
              <motion.div
                key={crypto.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="card-3d"
              >
                <Card className="glass-morphism border border-purple-500/20 rounded-xl relative overflow-hidden group">
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.8 }}
                    className="absolute top-2 right-2 z-10 p-1 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors"
                    onClick={() => removeCrypto(crypto.id)}
                  >
                    <X className="h-4 w-4 text-red-400" />
                  </motion.button>

                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Image
                          src={crypto.image || "/placeholder.svg"}
                          alt={crypto.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold">{crypto.name}</h3>
                        <p className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{formatPrice(crypto.current_price)}</span>
                        <div
                          className={`flex items-center space-x-1 ${
                            crypto.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span className="text-sm">{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Market Cap</p>
                        <p className="font-medium">{formatMarketCap(crypto.market_cap)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chart Section */}
      {chartData && selectedCryptos.length > 0 && (
        <Card className="glass-morphism border border-purple-500/20 rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Price Comparison Chart
              </CardTitle>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32 border border-purple-500/30 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">3 Months</SelectItem>
                  <SelectItem value="365">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top" as const,
                      labels: {
                        color: "#a1a1aa",
                        usePointStyle: true,
                        pointStyle: "circle",
                      },
                    },
                    tooltip: {
                      mode: "index",
                      intersect: false,
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      titleColor: "#ffffff",
                      bodyColor: "#ffffff",
                      borderColor: "#8b5cf6",
                      borderWidth: 1,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: "#a1a1aa",
                      },
                      grid: {
                        color: "#374151",
                      },
                    },
                    y: {
                      ticks: {
                        color: "#a1a1aa",
                        callback: (value) => "$" + Number(value).toLocaleString(),
                      },
                      grid: {
                        color: "#374151",
                      },
                    },
                  },
                  interaction: {
                    mode: "nearest",
                    axis: "x",
                    intersect: false,
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      {selectedCryptos.length > 1 && (
        <Card className="glass-morphism border border-purple-500/20 rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Detailed Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left p-3">Metric</th>
                    {selectedCryptos.map((crypto) => (
                      <th key={crypto.id} className="text-center p-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Image
                            src={crypto.image || "/placeholder.svg"}
                            alt={crypto.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span>{crypto.symbol.toUpperCase()}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-500/10">
                    <td className="p-3 font-medium">Current Price</td>
                    {selectedCryptos.map((crypto) => (
                      <td key={crypto.id} className="p-3 text-center">
                        {formatPrice(crypto.current_price)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="p-3 font-medium">Market Cap</td>
                    {selectedCryptos.map((crypto) => (
                      <td key={crypto.id} className="p-3 text-center">
                        {formatMarketCap(crypto.market_cap)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-purple-500/10">
                    <td className="p-3 font-medium">24h Change</td>
                    {selectedCryptos.map((crypto) => (
                      <td key={crypto.id} className="p-3 text-center">
                        <span className={crypto.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}>
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Market Rank</td>
                    {selectedCryptos.map((crypto) => (
                      <td key={crypto.id} className="p-3 text-center">
                        <Badge variant="secondary">#{crypto.market_cap_rank}</Badge>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
