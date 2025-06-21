import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const searchParams = request.nextUrl.searchParams
  const days = searchParams.get("days") || "7"

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=${days}&interval=${days === "1" ? "hourly" : "daily"}`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch price history")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching price history:", error)
    return NextResponse.json({ error: "Failed to fetch price history" }, { status: 500 })
  }
}
