import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global", {
      headers: {
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to fetch global stats")
    }

    const data = await response.json()
    return NextResponse.json(data.data)
  } catch (error) {
    console.error("Error fetching global stats:", error)
    return NextResponse.json({ error: "Failed to fetch global stats" }, { status: 500 })
  }
}
