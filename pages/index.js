import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import NavBar from '../components/navBar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Curtus | Shortening Links Made Easy and Safe</title>
        <meta name="description" content="Curtus is a link shortening solution for creating your short links, made EASY and SAFE!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className={styles.sliderThumb}></div>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Curtus</h1>

          <h2 className={styles.subTitle}>Shortening links made <a className={styles.special}>easy</a> and <a className={styles.special}>safe</a>.</h2>
        </div>
      </main>
    </div>
  )
}
