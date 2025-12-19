import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, rating, advice } = await request.json();

    // Validate input
    if (!name || !email || !rating || !advice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Forward feedback to external API
    const response = await fetch("https://api.ach02raf.pro/send-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        rating,
        advice,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send feedback to external API");
    }

    const data = await response.json();

    return NextResponse.json({ message: "Feedback sent successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error sending feedback:", error);
    return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 });
  }
}
