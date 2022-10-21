import Head from "next/head"
import Link from "next/link"

export default function Error404() {
  return (
    <div>
      <Head>
        <title>404: This page does not exist</title>
        <meta name="description" content="This page does not exist!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="main">
        <h1 className="title">Page Not Found</h1>

        <p className="subTitle">You seem lost, are you sure you are on the right page?</p>

        <p className="text">
          Did you look for these?<br/><br/>
          <Link href={"/"}><a className="special">Home</a></Link>
          <br/>
          <Link href={"/generate"}><a className="special">Generate</a></Link>
        </p>
      </div>
    </div>
  )
}