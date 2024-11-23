import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest){
    const body = await request.json();
    const cookieStore = await cookies();
    cookieStore.set('jwt', body.jwt);
    console.log(cookieStore.get('jwt'))
    return NextResponse.json({status: 201});
}