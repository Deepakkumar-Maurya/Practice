import { generateRegistrationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";

const challengeStore: Record<string, string> = {}; // Consider using a database instead

export async function POST(req: Request) {
  try {
    const { nationalId } = await req.json();
    console.log('====>', nationalId);

    if (!nationalId) {
      return NextResponse.json(
        { error: "National ID is required" },
        { status: 400 }
      );
    }

    const userID = new TextEncoder().encode(nationalId);
    console.log('---->userId', userID);

    const challengeOptions = await generateRegistrationOptions({
      rpID: process.env.RP_ID || "localhost",
      rpName: "key-node",
      attestationType: "none",
      userName: nationalId, // Display name
      userID: userID, // Unique identifier (can be a UUID or hashed ID)
      timeout: 60000, // 1-minute timeout
    });

    // Store challenge temporarily (consider using a database for persistence)
    challengeStore[nationalId] = challengeOptions.challenge;
    // store challenge in session

    return NextResponse.json({ options: challengeOptions });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error generating registration options" },
      { status: 500 }
    );
  }
}
