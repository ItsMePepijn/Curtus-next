import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.scss'

import SliderThumb from '../components/SliderThumb'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Curtus | Shortening Links Made Easy and Safe</title>
        <meta name="description" content="Curtus is a link shortening solution for creating your short links, made EASY and SAFE!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SliderThumb />

      <main className="main">
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Curtus</h1>

          <h2 className="subTitle">Shortening links made <span className={styles.special}>easy</span> and <span className={styles.special}>safe</span>.</h2>
          <br></br>
          <br></br>

          <Link href={"/generate"}><a className="button">Get Started</a></Link>
        </div>
      </main>
    </div>
  )
}
