import Link from 'next/link';
import style from '@/styles/signup_page.module.css'
import Image from 'next/image';
import { signIn } from '~@/auth';

import google_icon from '@/assets/svg/google-icon.svg'
import githun_icon from '@/assets/svg/github-icon.svg'

function Signup() {
    return (
        <section className={style.signup_page}>
            <div className={style.form_container}>
                <h1 className={style.form_head}>Sign Up</h1>
                <form action="" method="post" className={style.form}>
                    <input type="email" name="email" id="email" placeholder="Email" className={style.input} />
                    <input type="password" name="password" id="password" placeholder="Password" className={style.input} />
                    <input type="button" value="Submit" className={`${style.input} ${style.submit}`} />
                    <Link href=""></Link>
                </form>
                <div className={style.line_with_text}>
                    <span>OR</span>
                </div>
                <form action={async () => {
                    "use server"

                    await signIn('google')
                }}>
                    <button type='submit' className={`${style.input} ${style.google_github_auth}`} >
                        <Image src={google_icon} alt="Google Sign In" width={'20'} height={'20'} />
                        <span>Google</span>
                    </button>
                </form>

                <form action={async () => {
                    "use server"

                    await signIn('github',{redirectTo: '/'} )
                }}>
                    <button type='submit' className={`${style.input} ${style.google_github_auth}`} >
                        <Image src={githun_icon} alt='google sign in' width={'20'} height={'20'} />
                        <span>Github</span>
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Signup;