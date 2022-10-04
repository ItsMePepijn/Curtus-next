import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../../components/navBar'
import styles from '../../styles/Home.module.scss'

export default function Api() {
  return(
    <div>
      <Head>
        <title>Curtus | Shortening API</title>
        <meta name="description" content="THE link shortening solution for creating your short links made easy and safe!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="main">
        <div className="box">
          <h1 className="subTitle">
            Welcome to the api!
          </h1>
          <p className="text">Get started by reading <Link href={"/docs"}><a>/docs</a></Link></p>
          
        </div>

      </main>

    </div>
  )
}
