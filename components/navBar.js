import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";

import favicon from "../public/favicon.ico"

import styles from "../styles/NavBar.module.scss"

const navigationRoutes = ["Home", "Generate", "Docs", "API"]

export default function NavBar(){
  const router = useRouter();
  return(
    <nav className={styles.navBar}>
      <Link href={"/"}><a className={styles.navBarLogo}><Image src={favicon} alt="Logo" width={40} height={40}/></a></Link>

      <div className={styles.navBarLinks}>
        {navigationRoutes.map((route) => {
          var name = route;

          route = route == "Home" ? "" : route;
          route = route == "API" ? "apiInfo" : route;
          return(
            <NavigationLink 
              key={route}
              name={name}
              route={route.toLowerCase() == "apiinfo" ? "api" : route.toLowerCase()}
              cls = {router.pathname.toLowerCase() === `/${route.toLowerCase()}` ? styles.navBarLinksItemActive : styles.navBarLinksItem}
            />
          )

        })}

      </div>

      <Link href={"/login"}><a className={styles.navBarLogin}>Login</a></Link>
    </nav>
  )
}

function NavigationLink({name, route, cls}){
  return(
    <Link href={`/${route}`}>
      <a className={cls}>{name}</a>
    </Link>
  )
}