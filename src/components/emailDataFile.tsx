
import { ReactNode } from "react";


export function EmailTemplate({ email, token, username }: { email: string, token: string, username: string }): ReactNode {
    // Add your own styling here if needed.
    return (
        <div style={{
            maxWidth: '600px',
            margin: '20px auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px black',
            overflow: 'hidden',
            padding: "10px",
        }}>

            <header style={{
                backgroundColor: '#007BFF',
                color: 'white',
                textAlign: 'center',
                padding: '20px',
                fontSize: '24px'
            }}>
                Learn-Next
            </header>

            <section style={{
                padding: '20px',
                color: '#333333',
                marginTop: 0,
            }}>
                <h2 style={{ margin: 0 }}>Hello, {username}!</h2>
                <p>
                    Thank you for signing up with 
                    <strong> Learn-Next</strong>.
                    Please verify your email address to complete your registration.
                </p>
                <p>
                    Simply click the button below to confirm your email address:
                </p>
                <p>
                    <a style={{
                        color: 'white',
                        textDecoration: 'none',
                        display: 'inline-block',
                        backgroundColor: 'grey',
                        padding: '12px 20px',
                        borderRadius: '5px',
                        fontSize: '16px',
                        marginTop: '20px',
                    }} href={`http://localhost:3000/email/verify?email=${email}&token=${token}`}>Verify Email</a>
                </p>
                <p>
                    If you did not sign up for this account, you can safely ignore this email.
                </p>
                <p>
                    Thank you,<br />
                    The Learn-Next Team
                </p>
            </section>
            <footer style={{
                backgroundColor: '#f4f4f4',
                textAlign: 'center',
                padding: '10px',
                fontSize: '14px',
                color: '#001B1F',
                textDecoration: 'none'
            }}>
                <p>
                    Need help? Contact us at <a href="mailto:solaopeyemi93@gmail.com">support@example.com</a>.
                </p>
                <p>
                    © 2024 Learn-Next. All rights reserved.
                </p>
            </footer>
        </div >
    )
}

