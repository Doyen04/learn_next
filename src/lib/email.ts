import { EmailTemplate } from "@/components/emailDataFile";
import nodemailer from "nodemailer"
import React from "react";

export const sendVerificationEmail = async (email: string, token: string) => {
    // nodemailer configuration. make sure to replace this with your native email provider in production.
    // we will use mailtrap in this tutorial, so make sure you have the correct configuration in your .env
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
        from: '"Blog Nextjs Auth" <t@test.com>',
        to: email,
        subject: 'Email Verification',
        react: React.createElement(EmailTemplate),
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
