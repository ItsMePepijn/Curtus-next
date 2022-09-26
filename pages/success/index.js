import { useRouter } from "next/router"

import NavBar from "../../components/navBar"
import Error404 from "../404"

export default function Redirect(){
  const router = useRouter()
  const { id } = router.query

  const re = /[A-Z]{5}/
  if(!re.test(id)) return <Error404 />

}