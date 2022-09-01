// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import generateId from "../../modules/generateId"

export default function handler(req, res) {

  if(req.method === "POST"){ 
    const { key } = req.body;

    if(!key) return res.status(400).json({ error: "Missing API key"});

    if(key.startsWith("USR_")){
      const ID = generateId(5);
      if(key === "USR_") return res.status(201).json({ ID: ID, type: "Anonymous user", generatedLink: `https://dummy-site.com/${ID}`, originalAddress: "https://waylongerdummy-site.com/this-is-way-too-long"});
    }
    
  }

}
