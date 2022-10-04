import Head from "next/head"

import NavBar from "../components/navBar"

export default function Error404() {
  return (
    <div>
      <Head>
        <title>404: This page does not exist</title>
        <meta name="description" content="This page does not exist!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <NavBar />

      <h1>404 - Page Not Found</h1>
    </div>
  )
}