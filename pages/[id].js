import Head from 'next/head'
import { useRouter } from 'next/router'

import Error404 from './404'

import styles from '../styles/Home.module.scss'

export default function Api({data}) {
  // const router = useRouter()
  // const { id } = router.query
  
  // const re = /[A-Z]{5}/
  // if(!re.test(id)) return <Error404 />

  // if(!data.ID) return <Error404 />
  const { ID , originalAddress } = data;  

  return(
    <div className={styles.container}>
      <Head>
        <title>Link shortener</title>
        <meta name="description" content="THE link shortening solution for creating your short links made easy and safe!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Are you sure you want to visit this url?
        </h1>

        <p className={styles.description}>
          {ID}
          <br />
          {originalAddress}
        </p>
      </main>

    </div>
  )
}

export async function getServerSideProps(router){
  let dev = process.env.NODE_ENV !== 'production'
  let fetched = await fetch(`${(dev ? "http://localhost:3000" : "https://curtus.tech ")}/api/retrieve?id=${router.query.id}`, {method: 'GET' });

  let data = await fetched.json();

  return {
    props: {
      data
    }
  }
}
