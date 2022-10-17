import Head from 'next/head'

import styles from '../../../styles/Docs.module.scss'

import * as docs from '../../api/v0/docs/index'
import DocNav from '../../../components/DocNav'

export default function Api() {
  var endpoints = Object.keys(docs);
  return(
    <div>
      <Head>
        <title>Curtus | v0 Documentation</title>
        <meta name="description" content="THE link shortening solution for creating your short links made easy and safe!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className={styles.boxWide}>
          <DocNav ver="v0" endpoints={endpoints} className={styles.left}/>
          <div className={styles.right}>
            <h1 className="subTitle">
              Welcome to the v0 api docs!
            </h1>

            <p>
              You found the Curtus Developer Documentation! Here you can find everything about intergrating Curtus into your projects.
            </p>

            <h2></h2>
    
          </div>
          
        </div>

      </main>

    </div>
  )
}