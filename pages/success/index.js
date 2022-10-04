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
    <div>
      <Head>
        <title>Curtus | Generate</title>
        <meta name="description" content="THE link shortening solution for creating your short links made easy and safe!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      
      <main className="main">
        <div className="box">
          <h1 className="subTitle">
            Your short link is ready!
          </h1>
          <p className="text">https://curtus.tech/{id}</p>
          
          <div className="buttons">
            <a href={id} className="button">Bring me there</a>
            <a className="button" onClick={copyToClipboard}>
              Copy
            </a>
          </div>
        </div>

      </main>
    </div>
  )

}