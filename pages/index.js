import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Curtus | Shortening Links Made Easy and Safe</title>
        <meta name="description" content="Curtus is a link shortening solution for creating your short links, made EASY and SAFE!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the link shortener!
        </h1>

      </main>
    </div>
  )
}
