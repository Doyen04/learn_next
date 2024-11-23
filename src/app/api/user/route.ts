import { log } from "console";
import { NextResponse } from "next/server";
import { prisma } from "~@/lib/prisma";

export function GET() {
    return NextResponse.json({sucess: true})
}

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const emailExist = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        const userExist = await prisma.user.findUnique({
            where: {
                username: data.username,
            }
        })
        if (userExist) {
            return NextResponse.json({error: "username already exists"})
        }
        if (emailExist) {
            return NextResponse.json({error: "email already exists"})
        }
        return NextResponse.json(data);
    } catch (e) {
        log(e)
        return NextResponse.json({error: "bad"})
    }
}