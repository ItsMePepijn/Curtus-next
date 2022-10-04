import '../styles/globals.scss'
import '../styles/structures.scss'
import '../styles/texts.scss'
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
