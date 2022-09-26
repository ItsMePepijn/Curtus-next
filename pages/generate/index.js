import Head from 'next/head';
import {useRouter} from 'next/router';

import NavBar from '../../components/navBar'

import styles from '../../styles/Home.module.scss'

export default function Page() {
  const router = useRouter();

  const handleSubmission = async (e) => {
    e.preventDefault();

    const data = {
      key: process.env.ADMIN_KEY,
      url: document.getElementById("url").value
    }
    const JSONdata = JSON.stringify(data);

    let dev = process.env.NODE_ENV !== 'production'
    
    const res = await fetch(`${(dev? "http://localhost:3000" : "https://curtus.tech")}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSONdata,
    })

    const result = await res.json();
    if(result.error) return alert(result.error);
    if(result.ID) return router.push(`/success?id=${result.ID}`);
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
            Generate your short link!
          </h1>
        
          <form onSubmit={handleSubmission} method='post'>
            <input className={styles.input} id="url" type="text" placeholder="URL"/>
            <br></br>
            <input className={styles.submit} type="submit" value="Submit"/>
          </form>
        </div>


      </main>
    </div>
  )
}
