import { Lightbulb } from "lucide-react";



export function EmailTemplate(email: string, token: string) {
    return (
        <div style={{backgroundColor: "grey",display:"flex", flexDirection:"column",gap:'20px'}} >
            <Lightbulb />
            <h1>Thanks for SIGNING UP for learn_next application</h1>
            <p>Click the link below to verify your email:</p>
            <a href={`http://localhost:3000/email/verify?email=${email}&token=${token}`}>Verify Email</a>`
        </div>
    )
}