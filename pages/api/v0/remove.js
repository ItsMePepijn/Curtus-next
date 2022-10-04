
const {connectToDatabase} = require('../../../modules/mongodb');

export default async function handler(req, res) {

  if(req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed, DELETE must be used for this endpoint", usedMethod: req.method });

  const { key, id } = req.body;

  if(!key) return res.status(400).json({ error: "Missing key"});
  if(!id) return res.status(400).json({ error: "Missing ID"});
  
  if(key.startsWith("USR_")){
    try{
      let { db } = await connectToDatabase();
      let r = await db.collection("urls").find({ _id: id }).toArray();

      if(r.length === 0) return res.status(404).json({ error: "ID not found" });
      const { _id, url, generatedBy } = r[0];

      if(generatedBy !== key) return res.status(401).json({ error: "You are not authorized to delete this ID" });

      await db.collection("urls").deleteOne({ _id: id });
      return res.status(200).json({ ID: _id, url: url, message: "ID deleted" });
    }
    catch(e){
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  else{
    res.status(401).json({ error: "Invalid API key" });
  }

}