import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Error404 from './404'

import styles from '../styles/Home.module.scss'
import NavBar from '../components/navBar'

export default function Api({data}) {
  const router = useRouter()
  const { id } = router.query
  
  const re = /[A-Z]{5}/
  if(!re.test(id)) return <Error404 />

  if(!data.ID) return <Error404 />
  const { ID , originalAddress } = data;  

  return(
    <div className={styles.container}>
      <Head>
        <title>Curtus | Shortening Links Made Easy and Safe</title>
        <meta name="description" content="Curtus is a link shortening solution for creating your short links, made EASY and SAFE!"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className={styles.main}>
        <div className={styles.box}>
          <h1 className={styles.subTitle}>
            Are you sure you want to visit this url?
          </h1>
          <p className={styles.text}>{originalAddress}</p>
          
          <div className={styles.buttons}>
            <Link href={originalAddress}><a className={styles.button}>Yes, I am sure</a></Link>
          </div>
        </div>

      </main>

    </div>
  )
}

export async function getServerSideProps(router){
  let dev = process.env.NODE_ENV !== 'production'
  let fetched = await fetch(`${(dev ? "http://localhost:3000" : "https://curtus.tech")}/api/retrieve?id=${router.query.id}`, {method: 'GET' });

  let data = await fetched.json();

  return {
    props: {
      data
    }
  }
}
