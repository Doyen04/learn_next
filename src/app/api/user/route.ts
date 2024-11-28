

import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

import { prisma } from "@/lib/prisma";
import { UserSchema } from "@/lib/zodSchema";


export function GET() {
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
        const _email = "oluwasolaopeyemi93@gmail.com"

        const sendVerificationEmail = async (email: string, token: string) => {
            // nodemailer configuration. make sure to replace this with your native email provider in production.
            // we will use mailtrap in this tutorial, so make sure you have the correct configuration in your .env
            const transporter: nodemailer.Transporter = nodemailer.createTransport({
                pool: true,
                host: process.env.MAIL_HOST,
                port: Number(process.env.EMAIL_PORT) || 0,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
                
            })

            // the content of the email
            const emailData = {
                from: '"Blog Nextjs Auth" <verification@test.com>',
                to: email,
                subject: 'Email Verification',
                html: `
                <p>Click the link below to verify your email:</p>
                <a href="http://localhost:3000/email/verify?email=${email}&token=${token}">Verify Email</a>`,
            };

            try {
                // send the email
                await transporter.sendMail(emailData);
            } catch (error) {
                console.error('Failed to send email:', error);
                throw error;
            }
        };

        sendVerificationEmail(_email, "tttttt");

        return NextResponse.json({ username: newUser.username, email, message: "user created sucessfully" }, { status: 201 });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "bad" }, { status: 500 })
    }
}