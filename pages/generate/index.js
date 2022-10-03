import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';

import validateUrl from '../../modules/validateUrl';

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

    if(!validateUrl(data.url)) return alert("Provided URL is invalid!")


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

  const input = React.createRef();
  const span = React.createRef();

  const focus = () => {
    if(input.current.value === ""){
      input.current.classList.add(styles.inputFocussed);
      span.current.classList.add(styles.httpsFocussed);
    }
  }

  const checkState = () => {
    input.current.className = styles.input;
    span.current.className = styles.https;
    
    if(input.current.value === "") return;

    if(!validateUrl(input.current.value)) {
      input.current.className = styles.input;
      span.current.className = styles.https;

      input.current.classList.add(styles.inputFocussedFalse);
      span.current.classList.add(styles.httpsFocussedFalse);
    }
    else{
      input.current.className = styles.input;
      span.current.className = styles.https;

      input.current.classList.add(styles.inputFocussedTrue);
      span.current.classList.add(styles.httpsFocussedTrue);
    }
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
        
          <form onSubmit={handleSubmission} method='post' className={styles.form}>

            <div className={styles.inputContainer}>
              <div className={styles.inputShadow}>

                <span className={styles.https} ref={span} >https://</span>
                <input className={styles.input} ref={input} onFocus={focus} onBlur={checkState} onKeyUp={checkState} id="url" type="text" placeholder="URL"/>

              </div>
            </div>

            <br></br>

            <input className={styles.button} type="submit" value="Submit"/>
          </form>
        </div>


      </main>
    </div>
  )
}
