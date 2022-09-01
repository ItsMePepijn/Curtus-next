// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import generateId from "../../modules/generateId"

export default function handler(req, res) {

  if(req.method === "POST"){
    res.status(200).json({ id: generateId(5) })
  }

}
