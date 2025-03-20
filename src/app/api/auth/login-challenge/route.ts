import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { userId } = await req.json();

    if (!userStore[userId]) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const challengeOptions = await generateAuthenticationOptions({
        rpID: process.env.RP_ID || 'localhost',
    });

    challengeStore[userId] = challengeOptions.challenge;

    return NextResponse.json({ options: challengeOptions });
}
