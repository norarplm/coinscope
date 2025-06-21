import { Suspense } from "react"
import { CryptoDetail } from "@/components/crypto/crypto-detail"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface CryptoPageProps {
  params: {
    id: string
  }
}

export default function CryptoPage({ params }: CryptoPageProps) {
  return (
    <div className="min-h-screen pt-28 pb-10">
      <div className="container mx-auto px-4">
        <Suspense fallback={<LoadingSpinner />}>
          <CryptoDetail cryptoId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
