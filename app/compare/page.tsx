import { CryptoComparison } from "@/components/crypto/crypto-comparison"

export default function ComparePage() {
  return (
    <div className="min-h-screen pt-28 pb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Compare Cryptocurrencies
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Side-by-side comparison of cryptocurrency performance and metrics
          </p>
        </div>
        <CryptoComparison />
      </div>
    </div>
  )
}
