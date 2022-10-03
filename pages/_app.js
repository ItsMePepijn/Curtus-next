import '../styles/globals.scss'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#ffa500"/>
      <Component {...pageProps} />;
    </>
  )
}

export default MyApp
