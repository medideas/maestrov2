import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest){
    const body = await request.json();
    const jwt = body.jwt;
    await (await cookies()).set({
        name: 'jwt',
        value: jwt,
      })
    return NextResponse.json({status: 201});
}