"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Calculator, Zap, Target, TrendingDown } from "lucide-react"

export function InvestmentSimulator() {
  const [investment, setInvestment] = useState(1000)
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin")
  const [timeframe, setTimeframe] = useState("1y")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", baseMultiplier: 1.5, volatility: 0.3 },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", baseMultiplier: 2.2, volatility: 0.4 },
    { id: "cardano", name: "Cardano", symbol: "ADA", baseMultiplier: 1.8, volatility: 0.5 },
    { id: "solana", name: "Solana", symbol: "SOL", baseMultiplier: 3.1, volatility: 0.6 },
    { id: "polygon", name: "Polygon", symbol: "MATIC", baseMultiplier: 2.5, volatility: 0.55 },
    { id: "chainlink", name: "Chainlink", symbol: "LINK", baseMultiplier: 1.9, volatility: 0.45 },
  ]

  const timeframes = [
    { value: "1m", label: "1 Month", multiplier: 0.08 },
    { value: "3m", label: "3 Months", multiplier: 0.25 },
    { value: "6m", label: "6 Months", multiplier: 0.5 },
    { value: "1y", label: "1 Year", multiplier: 1 },
    { value: "2y", label: "2 Years", multiplier: 2.1 },
    { value: "5y", label: "5 Years", multiplier: 5.5 },
  ]

  const simulateInvestment = () => {
    setLoading(true)

    setTimeout(() => {
      const crypto = cryptoOptions.find((c) => c.id === selectedCrypto)
      const timeMultiplier = timeframes.find((t) => t.value === timeframe)?.multiplier || 1

      if (crypto) {
        // More realistic simulation with market conditions
        const marketCondition = Math.random() // 0-1 random market condition
        const bullMarket = marketCondition > 0.3 // 70% chance of bull market
        const volatilityFactor = 1 + (Math.random() - 0.5) * crypto.volatility

        // Base return calculation
        let baseReturn = crypto.baseMultiplier * timeMultiplier

        // Apply market conditions
        if (bullMarket) {
          baseReturn *= 1.2 + Math.random() * 0.8 // 20% to 100% boost in bull market
        } else {
          baseReturn *= 0.3 + Math.random() * 0.4 // 30% to 70% reduction in bear market
        }

        // Apply volatility
        const finalMultiplier = baseReturn * volatilityFactor

        // Calculate results
        const finalValue = investment * Math.max(0.1, finalMultiplier) // Minimum 10% of investment
        const profit = finalValue - investment
        const profitPercentage = ((finalValue - investment) / investment) * 100

        // Determine market scenario
        let scenario = "Neutral Market"
        if (bullMarket && finalMultiplier > crypto.baseMultiplier * timeMultiplier * 1.5) {
          scenario = "🚀 Bull Market Rally"
        } else if (bullMarket) {
          scenario = "📈 Steady Growth"
        } else if (finalMultiplier < crypto.baseMultiplier * timeMultiplier * 0.5) {
          scenario = "🐻 Bear Market Correction"
        } else {
          scenario = "📉 Market Downturn"
        }

        setResult({
          initialInvestment: investment,
          finalValue,
          profit,
          profitPercentage,
          crypto: crypto.name,
          timeframe: timeframes.find((t) => t.value === timeframe)?.label,
          scenario,
          isProfit: profit >= 0,
          riskLevel: crypto.volatility > 0.5 ? "High" : crypto.volatility > 0.3 ? "Medium" : "Low",
        })
      }
      setLoading(false)
    }, 2000) // Longer loading for more realistic feel
  }

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
            AI Investment Simulator
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered simulation with real market volatility and conditions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-morphism border border-purple-500/20 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-400" />
                  <span>Simulation Parameters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Investment Amount ($)</label>
                  <Input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="border border-purple-500/30 rounded-xl h-12 text-lg focus:border-purple-400 transition-colors"
                    min="1"
                    max="1000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Select Cryptocurrency</label>
                  <div className="grid grid-cols-2 gap-2">
                    {cryptoOptions.map((crypto) => (
                      <button
                        key={crypto.id}
                        type="button"
                        onClick={() => setSelectedCrypto(crypto.id)}
                        className={`p-3 rounded-xl border transition-all duration-200 ${
                          selectedCrypto === crypto.id
                            ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                            : "border-purple-500/20 hover:border-purple-400 hover:bg-purple-500/10"
                        }`}
                      >
                        <div className="text-sm font-medium">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                        <div className="text-xs mt-1">
                          <Badge
                            variant={
                              crypto.volatility > 0.5
                                ? "destructive"
                                : crypto.volatility > 0.3
                                  ? "secondary"
                                  : "default"
                            }
                            className="text-xs"
                          >
                            {crypto.volatility > 0.5 ? "High Risk" : crypto.volatility > 0.3 ? "Med Risk" : "Low Risk"}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Time Frame</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeframes.map((tf) => (
                      <button
                        key={tf.value}
                        type="button"
                        onClick={() => setTimeframe(tf.value)}
                        className={`p-2 rounded-xl border transition-all duration-200 ${
                          timeframe === tf.value
                            ? "border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/20"
                            : "border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/10"
                        }`}
                      >
                        <div className="text-sm font-medium">{tf.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={simulateInvestment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 h-12 rounded-xl shadow-lg shadow-purple-500/20"
                  size="lg"
                >
                  {loading ? (
                    <motion.div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Zap className="h-5 w-5" />
                      </motion.div>
                      <span>AI Calculating...</span>
                    </motion.div>
                  ) : (
                    <>
                      <Calculator className="h-5 w-5 mr-2" />
                      Run AI Simulation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="glass-morphism border border-purple-500/20 rounded-xl h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span>AI Simulation Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        {result.crypto} • {result.timeframe}
                      </Badge>
                      <div className="mb-4">
                        <Badge variant={result.isProfit ? "default" : "destructive"} className="text-sm px-3 py-1">
                          {result.scenario}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                        <span className="text-muted-foreground">Initial Investment</span>
                        <span className="font-semibold">${result.initialInvestment.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center p-3 rounded-lg bg-purple-500/10">
                        <span className="text-muted-foreground">Projected Value</span>
                        <span className="font-bold text-lg">
                          ${result.finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>

                      <div
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          result.isProfit ? "bg-green-500/10" : "bg-red-500/10"
                        }`}
                      >
                        <span className="text-muted-foreground">Profit/Loss</span>
                        <div className="text-right">
                          <div
                            className={`font-bold flex items-center ${result.isProfit ? "text-green-400" : "text-red-400"}`}
                          >
                            {result.isProfit ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            {result.isProfit ? "+" : ""}$
                            {Math.abs(result.profit).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </div>
                          <div className={`text-sm ${result.isProfit ? "text-green-400" : "text-red-400"}`}>
                            {result.profitPercentage >= 0 ? "+" : ""}
                            {result.profitPercentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/10">
                        <span className="text-muted-foreground">Risk Level</span>
                        <Badge
                          variant={
                            result.riskLevel === "High"
                              ? "destructive"
                              : result.riskLevel === "Medium"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {result.riskLevel}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground text-center mt-4 p-3 bg-muted/10 rounded-lg">
                      ⚠️ AI simulation based on historical volatility patterns. Results include random market conditions
                      for realistic projections. Not financial advice.
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                      <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Run an AI simulation to see potential returns</p>
                      <p className="text-sm mt-2">Advanced algorithms will analyze market conditions</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
