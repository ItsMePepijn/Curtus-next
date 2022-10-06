import '../styles/globals.scss'
import '../styles/structures.scss'
import '../styles/texts.scss'
import NextNProgress from "nextjs-progressbar";
import NavBar from "../components/navBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#ffa500"/>
      <NavBar />

      <Component {...pageProps} />;
    </>
  )
}

export default MyApp
