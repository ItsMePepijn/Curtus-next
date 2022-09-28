import { useRouter } from "next/router"
import Head from "next/head"

import NavBar from "../../components/navBar"
import Error404 from "../404"

import styles from "../../styles/Home.module.scss"

export default function Redirect(){
  const router = useRouter()
  const { id } = router.query

  const re = /[A-Z]{5}/
  if(!re.test(id)) return <Error404 />

  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://curtus.tech/" + id)
  }
  return(
    <div className={styles.container}>
      <Head>
        <title>Curtus | Generate</title>
        <meta name="description" content="THE link shortening solution for creating your short links made easy and safe!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      
      <main className={styles.main}>
        <div className={styles.box}>
          <h1 className={styles.subTitle}>
            Your short link is ready!
          </h1>
          <p className={styles.text}>https://curtus.tech/{id}</p>
          
          <div className={styles.buttons}>
            <a href={id} className={styles.button}>Bring me there</a>
            <a className={styles.button} onClick={copyToClipboard}>
              Copy
            </a>
          </div>
        </div>

      </main>
    </div>
  )

}