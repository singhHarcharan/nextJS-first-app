// This can be avoided by using serverActions. 
// Server Actions are a feature of Next.js that allows you to run server-side code in response to user interactions.

import client from "@/db/index"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    // should add zod validation here
    const user = await client.user.create({
        data: {
            username: body.username,
            password: body.password
        }
    });

    console.log(user.id);

    return NextResponse.json({ message: "Signed up" });
}