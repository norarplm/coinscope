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
      throw new Error("Failed to fetch cryptocurrency detail")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching cryptocurrency detail:", error)
    return NextResponse.json({ error: "Failed to fetch cryptocurrency detail" }, { status: 500 })
  }
}
