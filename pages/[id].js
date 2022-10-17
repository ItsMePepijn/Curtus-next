import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { setCookie, getCookie, hasCookie } from 'cookies-next'

import Error404 from './404'
import Settings from '../components/RedirectSettings'
import * as cookie from '../modules/cookies'

export default function Api({data}) {
  const router = useRouter()
  const { id } = router.query
  
  const re = /[A-Z]{5}/
  if(!re.test(id)) return <Error404 />

  if(!data.ID) return <Error404 />
  const { originalAddress } = data;

  let cookies = new cookie.Settings();

  if(typeof window !== 'undefined'){
    if(hasCookie("redirectSettings")){
      cookies = JSON.parse(getCookie("redirectSettings"));
      console.log("Found cookies")
    }else{
      setCookie("redirectSettings", cookies, cookies.rules());
      console.log("Created cookies")
    }
    console.log(cookies)
  }

  return(
    <div>
      <Head>
        <title>Curtus | Shortening Links Made Easy and Safe</title>
        <meta name="description" content="Curtus is a link shortening solution for creating your short links, made EASY and SAFE!"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="box">
          <h1 className="subTitle">
            Are you sure you want to visit this url?
          </h1>
          <p className="text">{originalAddress}</p>
          
          <div className="buttons">
            <Link href={originalAddress}><a className="button">Yes, I am sure</a></Link>
          </div>
        </div>

      </main>

      <Settings data={cookies}/>
    </div>
  )
}

export async function getServerSideProps(router){
  let dev = process.env.NODE_ENV !== 'production'
  const apiVersion = process.env.PRODUCTION_API_VERSION

  let fetched = await fetch(`${(dev ? "http://localhost:3000" : "https://curtus.tech")}/api/${apiVersion}/retrieve?id=${router.query.id}`, {method: 'GET' });

  let data = await fetched.json();

  return {
    props: {
      data
    }
  }
}
