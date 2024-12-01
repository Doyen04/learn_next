"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";


async function verifyEmail(email: string, token:string) {
    if (!email || !token) {
        toast.error("Invalid or missing verification details.");
        return;
    }
    try {
        const res = await fetch('/api/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                token
            })
        })
        const data = await res.json();
        if (res.ok) {
            toast.success("Email verified successfully!")
        } else {
            toast.error(`Failed to verify email.${data?.message} Please try again.`)
        }
    } catch (e) {
        console.log(e);
        
    }
}

export default function Verify() {
    const param = useSearchParams()
    const email = param.get("email") as string;
    const token = param.get("token")as string;
    const params = new URLSearchParams(decodeURIComponent(param.toString()))

    // Decode parameters
    // const email = (!rawEmail || !rawToken)?  
    // const token = rawToken 
    // Call the verifyEmail function with the email and token
    // You can use the fetch API or a library like axios to make a POST request to your server
    
    useEffect(() => {
        verifyEmail(email, token); // Call verifyEmail inside a function passed to useEffect
    }, [email, token]);

    return (
        <div>
            <h1>Verify your email</h1>
            <h1>{decodeURI(email)}</h1>
            <h1>{decodeURIComponent(email)}</h1>
            <h1>{email}</h1>
            <p>{param.get('email')}</p>
            <p>{param.get('token')}</p>
            <p>{params.get('email')}</p>
            <p>{params.get('token')}</p>
            <p>Please check your email for a verification link. If you havenot received it, please check your spam folder.</p>
            <Link href="/">Back to Home</Link>
        </div>
    )
}