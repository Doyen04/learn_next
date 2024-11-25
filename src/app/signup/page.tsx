
import Link from 'next/link';
import style from '@/styles/signup_page.module.css'

import { Lightbulb } from 'lucide-react';


import { HandleGithubSubmit, HandleGoogleSubmit } from '@/components/oAuthButtons';
import { SignUpForm } from '@/components/signUpForm';

function Signup() {

    return (
        <section className={style.signup_page}>
            <header className={style.signup_page_header}>
                <div className={style.signup_page_logo}>
                    <Link href={'/'}>
                        <Lightbulb color='#3c6caf' size={'40px'} />
                        <p>Learn</p>
                    </Link>
                </div>
                <div className={style.signup_page_button} >
                    <Link href={'/signin'}>LOGIN</Link>
                </div>
            </header>
            <div className={style.form_container}>
                <div style={{ padding: '20px', border: '1px solid #dcdcdc6d', borderRadius: '5px' }}>
                    <h1 className={style.form_head}>Sign Up</h1>
                    <SignUpForm />
                    <div className={style.line_with_text}>
                        <span>OR</span>
                    </div>
                    <HandleGithubSubmit/>
                    <HandleGoogleSubmit/>
                </div>
            </div>
        </section>
    )
}

export default Signup;