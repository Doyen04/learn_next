import Link from 'next/link';
import style from '@/styles/signup_page.module.css'


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
                <input type="button" value="Google" className={`${style.input} ${style.google_github_auth}`} />
                <input type="button" value="Github" className={`${style.input} ${style.google_github_auth}`} />
            </div>
        </section>
    )
}

export default Signup;