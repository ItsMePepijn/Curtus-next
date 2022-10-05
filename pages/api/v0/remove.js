
import * as errors from "../../../errors/index";

const {connectToDatabase} = require('../../../modules/mongodb');

export default async function handler(req, res) {

  if(req.method !== "DELETE") return res.status(errors.invalidMethod.status).json(errors.invalidMethod);

  const { key, id } = req.body;

  if(!key) return res.status(errors.missingApiKey.status).json(errors.missingApiKey);
  if(!id) return res.status(errors.missingId.status).json(errors.missingId);
  
  if(key.startsWith("USR_")){
    try{
      let { db } = await connectToDatabase();
      let r = await db.collection("urls").find({ _id: id }).toArray();

      if(r.length === 0) return res.status(errors.idNotFound.status).json(errors.idNotFound);
      const { _id, url, generatedBy } = r[0];

      if(generatedBy !== key) return res.status(errors.unauthorized.status).json(errors.unauthorized);

      await db.collection("urls").deleteOne({ _id: id });
      return res.status(200).json({ ID: _id, url: url, message: "ID deleted" });
    }
    catch(e){
      return res.status(errors.internalServerError.status).json(errors.internalServerError);
    }
  }
  else{
    res.status(errors.invalidApiKey.status).json(errors.invalidApiKey);
  }

}