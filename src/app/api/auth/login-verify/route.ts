import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { userId, cred } = await req.json();

    if (!userStore[userId]) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const expectedChallenge = challengeStore[userId];

    const verificationResult = await verifyAuthenticationResponse({
        expectedChallenge,
        expectedOrigin: process.env.EXPECTED_ORIGIN || 'http://localhost:3000',
        expectedRPID: process.env.RP_ID || 'localhost',
        response: cred,
        authenticator: userStore[userId].passkey,
    });

    if (!verificationResult.verified) {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 400 });
    }

    return NextResponse.json({ success: true, userId });
}
