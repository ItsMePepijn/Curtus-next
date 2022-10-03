import Image from "next/image"
import Link from "next/link"

import favicon from "../public/favicon.ico"

import styles from "../styles/NavBar.module.scss"

export default function NavBar(){
  return(
    <nav className={styles.navBar}>
      <Link href={"/"}><a className={styles.navBarLogo}><Image src={favicon} alt="Logo" width={40} height={40}/></a></Link>

      <div className={styles.navBarLinks}>
        <Link href={"/"}><a className={styles.navBarLinksActive}>Home</a></Link>
        <Link href={"/docs"}><a>Docs</a></Link>
        <Link href={"/apiInfo"}><a>API</a></Link>
      </div>

      <Link href={"/login"}><a className={styles.navBarLogin}>Login</a></Link>
    </nav>
  )
}