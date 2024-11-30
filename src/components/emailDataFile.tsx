
import { ReactNode } from "react";


export function EmailTemplate({ email, token, username }: { email: string, token: string, username: string }): ReactNode {
    // Add your own styling here if needed.
    const emailWrapper = {
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
    }
    const emailHeader = {
        backgroundColor: '#007BFF',
        color: '#ffffff',
        textAlign: 'center',
        padding: '20px',
        fontSize: '24px'
    }
    const emailBody = {
        padding: '20px',
        color: '#333333'
    }
    const h2 = {
        marginTop: 0,
    }
    const ctaButton = {
        display: 'inline-block',
        backgroundColor: '#007BFF',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '12px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        marginTop: '20px',
    }
    const emailFooter = {
        backgroundColor: '#f4f4f4',
        color: '#555555',
        textAlign: 'center',
        padding: '10px',
        fontSize: '14px',
    }
    // A
    const link = {
        color: '#007BFF',
        textDecoration: 'none'
    }
    return (
        <div className={`${emailWrapper}`}>

            <header className={`${emailHeader}`}>
                Learn-Next
            </header>

            <section className={`${emailBody} ${h2}`}>
                <h2 className={`${h2}`}>Hello, {username}!</h2>
                <p>
                    Thank you for signing up with
                    <strong>Learn-Next</strong>.
                    Please verify your email address to complete your registration.
                </p>
                <p>
                    Simply click the button below to confirm your email address:
                </p>
                <p>
                    <a className={`${link} ${ctaButton}`} href={`http://localhost:3000/email/verify?email=${email}&token=${token}`}>Verify Email</a>
                </p>
                <p>
                    If you did not sign up for this account, you can safely ignore this email.
                </p>
                <p>
                    Thank you,<br />
                    The Learn-Next Team
                </p>
            </section>
            <footer className={`${emailFooter} ${link}`}>
                <p>
                    Need help? Contact us at <a href="mailto:solaopeyemi93@gmail.com">support@example.com</a>.
                </p>
                <p>
                    ©2024 Learn-Next. All rights reserved.
                </p>
            </footer>
        </div >
    )
}

