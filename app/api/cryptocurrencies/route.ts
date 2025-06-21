import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get("page") || "1"
  const perPage = searchParams.get("per_page") || "50"

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrencies")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error)
    return NextResponse.json({ error: "Failed to fetch cryptocurrencies" }, { status: 500 })
  }
}
