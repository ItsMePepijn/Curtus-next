
import generateId from "../../modules/generateId"

const { connectToDatabase } = require('../../modules/mongodb');

export default async function handler(req, res) {

  if(req.method !== "POST") return res.status(405).json({ error: "Method not allowed, POST must be used for this endpoint", usedMethod: req.method });

  var { key, url } = req.body;

  if(!key) return res.status(400).json({ error: "Missing API key"});
  if(!url) return res.status(400).json({ error: "Missing URL"});

  if(!url.startsWith("http://") || !url.startsWith("https://")) url = "https://" + url;

  if(key.startsWith("USR_")){
    const ID = generateId(5);

    try{
      let { db } = await connectToDatabase();
      await db.collection("urls").insertOne({
        _id: ID,
        generatedBy: key,
        url: url
      })

      const user = (key === "USR_") ? "Anonymous user" : "User"
    
      return res.status(201).json({ ID: ID, type: user, generatedLink: `https://curtus.tech/${ID}`, originalAddress: url});

    } 
    catch(e){
      return res.status(500).json({ error: "Internal server error" });
    }

  }
  else if(key === process.env.ADMIN_KEY){
    const ID = generateId(5);

    try{
      let { db } = await connectToDatabase();
      await db.collection("urls").insertOne({
        _id: ID,
        generatedBy: key,
        url: url
      })
      
      return res.status(201).json({ ID: ID, generatedLink: `https://curtus.tech/${ID}`, originalAddress: url});

    } 
    catch(e){
      return res.status(500).json({ error: "Internal server error"});
    }
  }

  else return res.status(401).json({ error: "Invalid API key" });
}
