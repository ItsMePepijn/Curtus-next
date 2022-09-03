
const { connectToDatabase } = require('../../modules/mongodb');

export default async function handler(req, res) {

  if(req.method !== "GET") return res.status(405).json({ error: "Method not allowed, GET must be used for this endpoint", usedMethod: req.method });

  const { key, id } = req.body;

  if(!key) return res.status(400).json({ error: "Missing API key"});
  if(!id) return res.status(400).json({ error: "Missing ID"});

  if(key.startsWith("USR_")){

    try{
      let { db } = await connectToDatabase();
      let r = await db.collection("urls").find({ _id: id }).toArray();

      if(r.length === 0) return res.status(404).json({ error: "ID not found" });
      const { _id , url } = r[0];      

      return res.status(201).json({ ID: _id, originalAddress: url});

    } 
    catch(e){
      return res.status(500).json({ error: "Internal server error" });
    }

  }

  else return res.status(401).json({ error: "Invalid API key" });
}
