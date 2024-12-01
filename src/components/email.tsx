'use server'

import { EmailTemplate } from "@/components/emailDataFile";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

import nodemailer from "nodemailer"


export const sendVerificationEmail = async (email: string, username: string) => {
    const { renderToStaticMarkup } = await import("react-dom/server");

    // nodemailer configuration. make sure to replace this with your native email provider in production.
    // we will use mailtrap in this tutorial, so make sure you have the correct configuration in your .env
    const token = await hash(`${new Date(Date.now())} ${email}`, 10)
    
    await prisma.verificationToken.upsert({
        where: {
            identifier: email
        },
        update: {
            token: token,
            expires: new Date(Date.now() + 3600000)
        },
        create: {
            identifier: email,
            token: token,
            expires: new Date(Date.now() + 3600000)
        }
    })


const htmiString = renderToStaticMarkup(<EmailTemplate email={email} token={token} username={username} />)
console.log(htmiString);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: true,

    auth: {
        type: "OAUTH2",
        user: process.env.MAIL_USERNAME as string,
        clientId: process.env.MAIL_CLIENT_ID as string,
        clientSecret: process.env.MAIL_CLIENT_SECRET as string,
        refreshToken: process.env.MAIL_REFRESH_TOKEN as string,
    },
    tls: {
        rejectUnauthorized: false
    }


})

// the content of the email
const emailData = {
    from: '"Learn-Next" <t@test.com>',
    to: email,
    subject: 'Email Verification',
    html: htmiString,
};

try {
    // send the email
    console.log(123456789);

    const rs = await transporter.sendMail(emailData);
    console.log(rs);
} catch (error) {

    console.error('Failed to send email:', error);
    throw error;
}
};
