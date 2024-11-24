

import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export function GET() {
    return NextResponse.json({sucess: true})
}

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const {username, email, password} = data

        const emailExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        const userExist = await prisma.user.findUnique({
            where: {
                username: username,
            }
        })
        if (userExist) {
            return NextResponse.json({message: "username already exists"},{status: 409})
        }
        if (emailExist) {
            return NextResponse.json({message: "email already exists"}, {status: 409})
        }
        //work on this
        //how to chane data base then y the error
        const hashedPassword = await hash(password, 10)
        
        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword,
            }
        })
        return NextResponse.json({ username: newUser.username , email , message: "user-- created sucessfully"},{status: 201});
    } catch (e) {
        console.log(e)
        return NextResponse.json({message: "bad"},{status: 500})
    }
}