'use server'

import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { UserSchema } from "@/lib/zodSchema";
import { sendVerificationEmail } from "@/components/email";


export async function GET() {
    return NextResponse.json({ sucess: true })
}

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const { username, email, password } = data

        if (!username || !email || !password) {
            return NextResponse.json({ message: "empty exists" }, { status: 409 })
        }

        const validatedData = UserSchema.safeParse(data)
        if (!validatedData.success) {
            return NextResponse.json({ message: "error validating data" }, { status: 409 })
        }

        const userExist = await prisma.user.findUnique({
            where: {
                username: username,
            }
        })
        
        if (userExist) {
            return NextResponse.json({ message: "username already exists" }, { status: 409 })
        }

        const emailExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (emailExist) {
            return NextResponse.json({ message: "email already exists" }, { status: 409 })
        }

        //work on this
        //how to chane data base then y the error
        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: username,
                username: username,
                email: email,
                password: hashedPassword,
            }
        })
        sendVerificationEmail(email, username);

        return NextResponse.json({ username: newUser.username, email, message: "user created sucessfully" }, { status: 201 });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "bad" }, { status: 500 })
    }
}