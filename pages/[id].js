import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.scss'


export default function Api() {
  const router = useRouter()
  const { id } = router.query
  
  const re = /[A-Z]{5}/
  if(!re.test(id)) return <Error statusCode={404} />
  
  return(
    <div className={styles.container}>
      <Head>
        <title>Link shortener</title>
        <meta name="description" content="THE link shortening solution for creating your short links made easy and safe!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the link api!
        </h1>

        <p className={styles.description}>
          {id}
        </p>
      </main>

    </div>
  )
}
