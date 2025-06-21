import { CryptoListings } from "@/components/crypto/crypto-listings"
import { FavoritesSection } from "@/components/crypto/favorites-section"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function MarketsPage() {
  return (
    <div className="min-h-screen pt-28 pb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Crypto Markets
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time cryptocurrency prices, market caps, and trading data
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <FavoritesSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <CryptoListings />
        </Suspense>
      </div>
    </div>
  )
}
