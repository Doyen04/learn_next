"use client"
import style from '@/styles/header.module.css'

function Button() {
    function handletoggle() {
        const nav = document.querySelector('nav') as HTMLElement
        
        
        nav.style.display = (nav.style.display == 'none' || nav.style.display == '')? 'flex' : 'none'
        console.log(nav);
    }
    return(
        <button onClick={handletoggle} className={style.menu_toggle}>
                | | |
            </button>
    )
}

export default Button;