

import Link from 'next/link';
import style from '@/styles/signup_page.module.css';
import Image from 'next/image';
import { signIn } from "@/lib/auth";


import { Lightbulb } from 'lucide-react';

import google_icon from '@/assets/svg/google-icon.svg';
import github_icon from '@/assets/svg/github-icon.svg';

import Form from '@/components/submit';

function HandleGoogleSubmit() {
    return (
        <form action={async () => {
            "use server"
            const res = await signIn('google', { redirectTo: "/" })

            console.log(res)

            // console.error("github sign-in failed", error);
        }}>
            <button type='submit' className={`${style.input} ${style.google_github_auth}`} >
                <Image src={google_icon} alt="Google Sign In" width={'20'} height={'20'} />
                <span>Google</span>
            </button>
        </form>
    )


}


function HandleGithubSubmit() {
    return (
        <form action={async () => {
            "use server"
            const res = await signIn('github', { redirectTo: "/" });
            console.log(res)

            // console.error("github sign-in failed", error);

        }} >
            <button type='submit' className={`${style.input} ${style.google_github_auth}`}>
                <Image src={github_icon} alt='GitHub Sign In' width={'20'} height={'20'} />
                <span>GitHub </span>
            </button>
        </form>
    )

}

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
                <div className={style.signup_page_button}>
                    <Link href={'/signup'}>Signup</Link>
                </div>
            </header>
            <div className={style.form_container}>
                <div style={{ padding: '20px', border: '1px solid #dcdcdc6d', borderRadius: '5px' }}>
                    <h1 className={style.form_head}>Sign In</h1>

                    <Form/>
                    <div className={style.line_with_text}>
                        <span>OR</span>
                    </div>
                    <HandleGoogleSubmit />
                    <HandleGithubSubmit />
                </div>
            </div>
        </section>
    );
}

export default Signin;
