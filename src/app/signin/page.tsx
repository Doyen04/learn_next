
import Link from 'next/link';
import style from '@/styles/signup_page.module.css'
import Image from 'next/image';
import { signIn } from '~@/lib/auth';
import { Lightbulb } from 'lucide-react';


import google_icon from '@/assets/svg/google-icon.svg'
import github_icon from '@/assets/svg/github-icon.svg'

import AnimatedInput from '@/components/animatedInput';
import AnimatedButton from '@/components/animatedButton';

function Signin() {

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
                    <Link href={'/signup'}>Signup</Link>
                </div>
            </header>
            <div className={style.form_container}>
                <div style={{ padding: '20px', border: '1px solid #dcdcdc6d', borderRadius: '5px' }}>
                    <h1 className={style.form_head}>Sign In</h1>
                    <form action={''} method="post" className={style.form} >
                        <AnimatedInput type='email' name='email' placeholder='Email' input_style={style.input} placeholder_style={style._placeholder} />
                        <AnimatedInput type='password' name='password' placeholder='Password' input_style={style.input} placeholder_style={style._placeholder} />
                        <span className={style.forgotten_password}>
                            Forgotten password? <Link href={'/recover'}>here</Link>
                        </span>
                        {/* <input type="button" value="Submit" className={`${style.input} ${style.submit}`} /> */}
                        <AnimatedButton text='SIGNIN' type='button' style={`${style.input} ${style.submit}`} />
                        <Link href=""></Link>
                    </form>
                    <div className={style.line_with_text}>
                        <span>OR</span>
                    </div>
                    <form action={async () => {
                        "use server"

                        await signIn('google', { redirectTo: "/" })
                    }}>
                        <button type='submit' className={`${style.input} ${style.google_github_auth}`} >
                            <Image src={google_icon} alt="Google Sign In" width={'20'} height={'20'} />
                            <span>Google</span>
                        </button>
                    </form>

                    <form action={async () => {
                        "use server"

                        await signIn('github', { redirectTo: '/' })
                    }}>
                        <button type='submit' className={`${style.input} ${style.google_github_auth}`} >
                            <Image src={github_icon} alt='google sign in' width={'20'} height={'20'} />
                            <span>Github</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signin;