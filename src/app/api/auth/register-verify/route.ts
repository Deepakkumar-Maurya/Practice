import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { NextResponse } from "next/server";

const userStore: Record<string, any> = {}; // Replace with a real database in production
let challengeStore: Record<string, string> = {}; // Temporary store for challenges

export async function POST(req: Request) {
  try {
    const { attestationResponse, nationalId } = await req.json();

    console.log('----->inside register verify', nationalId, attestationResponse);

    if (!attestationResponse || !nationalId) {
      return NextResponse.json(
        { error: "Missing attestation response or National ID" },
        { status: 400 }
      );
    }

    // if (!challengeStore[nationalId]) {
    //   return NextResponse.json(
    //     { error: "Challenge not found or expired" },
    //     { status: 400 }
    //   );
    // }
    console.log(localStorage.getItem("challengeStore"));

    const expectedChallenge = challengeStore[nationalId];

    const verificationResult = await verifyRegistrationResponse({
      expectedChallenge,
      expectedOrigin: process.env.EXPECTED_ORIGIN || "http://localhost:3001/register",
      expectedRPID: process.env.RP_ID || "localhost",
      response: attestationResponse,
    });

    if (!verificationResult.verified) {
      return NextResponse.json(
        { error: "WebAuthn verification failed" },
        { status: 400 }
      );
    }

    // Store user's passkey credentials (replace with database storage)
    userStore[nationalId] = { passkey: verificationResult.registrationInfo };

    // Remove challenge after verification
    delete challengeStore[nationalId];

    return NextResponse.json({ verified: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error during WebAuthn verification" },
      { status: 500 }
    );
  }
}
