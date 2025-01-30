import style from "@/styles/admin.module.css"

export default function AdminHome() {
    return (
        <main className={style.home}>
            <header className={style.admin_header}><h1>Dashboard</h1></header>
            <section className={style.main_container}>
                <section className={style.card_graph_container}>
                    <div className={style.card_container}>
                        <section className={style.streak}></section>
                        <section className={style.progress}></section>
                        <section className={style.courses}></section>
                    </div>
                    <div className={style.graph_container}>
                        <div className={style.graph}>

                        </div>
                        <div className={style.sub_graph}>
                            <article className={style.best_shit}></article>
                            <article className={style.best_shit}></article>
                        </div>
                    </div>
                </section>
                <aside className={style.leaderboard}>
                
                </aside>
            </section>


        </main>
    )
}