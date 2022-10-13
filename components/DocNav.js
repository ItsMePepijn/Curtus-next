import Link from 'next/link'
import { useRouter } from "next/router";

import styles from '../styles/Docs.module.scss'

export default function DocNav({ver, endpoints, className}) {
  const router = useRouter();
  return (
    <div className={className}>
      <p className={router.pathname.toLowerCase() == `/docs/${ver}` ? styles.titleActive : styles.title}><Link href={`/docs/${ver}`}><a>Welcome</a></Link></p>

      {endpoints.map((endpoint) => (
        <NavigationLink 
          key={endpoint}
          endpoint={endpoint}
          ver={ver}
          cls={router.query.id == endpoint ? styles.titleActive : styles.title}
        />
      ))}
    </div>
  )
}

function NavigationLink({endpoint, ver, cls}){
  const name = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

  return(
    <p className={cls}>
      <Link href={`/docs/${ver}/${endpoint}`}><a>{name}</a></Link>
    </p>
  )
}
