
import generateId from "../../../modules/generateId"
import * as errors from "../../../errors/index";

const { connectToDatabase } = require('../../../modules/mongodb');

export default async function handler(req, res) {

  if(req.method !== "POST") return res.status(errors.invalidMethod.status).json(errors.invalidMethod);

  var { key, url } = req.body;

  if(!key) return res.status(errors.missingApiKey.status).json(errors.missingApiKey);
  if(!url) return res.status(errors.missingUrl.status).json(errors.missingUrl);

  if(!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;

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
      return res.status(errors.internalServerError.status).json(errors.internalServerError);
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
      return res.status(errors.internalServerError.status).json(errors.internalServerError);
    }
  }

  else return res.status(errors.invalidApiKey.status).json(errors.invalidApiKey);
}
