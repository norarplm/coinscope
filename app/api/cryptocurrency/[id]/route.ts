import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrency")
    }

    const data = await response.json()

    // Transform the data to match our interface
    const transformedData = {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      image: data.image.large,
      current_price: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      market_cap_rank: data.market_cap_rank,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      total_volume: data.market_data.total_volume.usd,
      circulating_supply: data.market_data.circulating_supply,
      max_supply: data.market_data.max_supply,
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error("Error fetching cryptocurrency:", error)
    return NextResponse.json({ error: "Failed to fetch cryptocurrency" }, { status: 500 })
  }
}
