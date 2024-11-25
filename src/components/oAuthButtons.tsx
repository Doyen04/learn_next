
import google_icon from '@/assets/svg/google-icon.svg';
import github_icon from '@/assets/svg/github-icon.svg';

import { signIn } from "@/lib/auth";
import style from '@/styles/signup_page.module.css';
import Image from 'next/image';


export function HandleGoogleSubmit() {
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


export function HandleGithubSubmit() {
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