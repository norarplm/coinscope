import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`, {
      headers: {
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to search cryptocurrencies")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching cryptocurrencies:", error)
    return NextResponse.json({ error: "Failed to search cryptocurrencies" }, { status: 500 })
  }
}
