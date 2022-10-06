import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';

import validateUrl from '../../modules/validateUrl';

import NavBar from '../../components/navBar'

import form from '../../styles/Form.module.scss'

export default function Page() {
  const router = useRouter();
  const inputContainer = React.createRef();
  const input = React.createRef();
  const span = React.createRef();

  const handleSubmission = async (e) => {
    e.preventDefault();

    const data = {
      key: process.env.ADMIN_KEY,
      url: document.getElementById("url").value
    }

    if(!validateUrl(data.url)){
      await inputContainer.current.classList.add(form.inputShadowError);
      input.current.classList.add(form.inputFocussedFalse);
      span.current.classList.add(form.httpsFocussedFalse);
      setTimeout(() => {
        inputContainer.current.classList.remove(form.inputShadowError);
        input.current.classList.remove(form.inputFocussedFalse);
        span.current.classList.remove(form.httpsFocussedFalse); 
      }, 300);
      return;
    }

    const JSONdata = JSON.stringify(data);

    let dev = process.env.NODE_ENV !== 'production'
    const apiVersion = process.env.PRODUCTION_API_VERSION
    
    const res = await fetch(`${(dev? "http://localhost:3000" : "https://curtus.tech")}/api/${apiVersion}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSONdata,
    })

    const result = await res.json();
    if(result.title) return alert(result.title);
    if(result.ID) return router.push(`/success?id=${result.ID}`);
  }

  const focus = () => {
    if(input.current.value == ""){
      input.current.classList.add(form.inputFocussed);
      span.current.classList.add(form.httpsFocussed);
    }
  }

  const checkState = () => {
    input.current.className = form.input;
    span.current.className = form.https;
    
    if(input.current.value == "") return;

    if(!validateUrl(input.current.value)) {
      input.current.className = form.input;
      span.current.className = form.https;

      input.current.classList.add(form.inputFocussedFalse);
      span.current.classList.add(form.httpsFocussedFalse);
    }
    else{
      input.current.className = form.input;
      span.current.className = form.https;

      input.current.classList.add(form.inputFocussedTrue);
      span.current.classList.add(form.httpsFocussedTrue);
    }
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
            Generate your short link!
          </h1>
        
          <form onSubmit={handleSubmission} method='post'>

            <div className={form.inputContainer}>
              <div className={form.inputShadow} ref={inputContainer}>

                <span className={form.https} ref={span} >https://</span>
                <input className={form.input} ref={input} onFocus={focus} onBlur={checkState} onKeyUp={checkState} id="url" type="text" placeholder="URL"/>

              </div>
            </div>

            <br></br>

            <input className="button" type="submit" value="Submit"/>
          </form>
        </div>


      </main>
    </div>
  )
}
