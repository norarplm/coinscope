"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface SearchResult {
  id: string
  name: string
  symbol: string
  thumb: string
  market_cap_rank: number
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const searchCryptos = async () => {
      if (query.length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${query}`)
        const data = await response.json()
        setResults(data.coins?.slice(0, 5) || [])
        setIsOpen(true)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchCryptos, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search cryptos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 h-10 rounded-xl border border-purple-500/30 bg-background/50 backdrop-blur-sm focus:border-purple-400 transition-all duration-300"
        />
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full" />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 glass-morphism border border-purple-500/20 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/crypto/${result.id}`}
                  className="flex items-center space-x-3 p-3 hover:bg-purple-500/10 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl group"
                  onClick={() => {
                    setIsOpen(false)
                    setQuery("")
                  }}
                >
                  <Image
                    src={result.thumb || "/placeholder.svg"}
                    alt={result.name}
                    width={28}
                    height={28}
                    className="rounded-full group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground group-hover:text-purple-400 transition-colors">
                      {result.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{result.symbol.toUpperCase()}</p>
                  </div>
                  {result.market_cap_rank && (
                    <span className="text-xs text-muted-foreground bg-purple-500/20 px-2 py-1 rounded-full">
                      #{result.market_cap_rank}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
