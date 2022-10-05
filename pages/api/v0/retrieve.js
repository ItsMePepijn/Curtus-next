
import * as errors from "../../../errors/index";

const { connectToDatabase } = require('../../../modules/mongodb');

export default async function handler(req, res) {

  if(req.method !== "GET") return res.status(errors.invalidMethod.status).json(errors.invalidMethod);

  const { id } = req.query;

  if(!id) return res.status(errors.missingId.status).json(errors.missingId);

  try{
    let { db } = await connectToDatabase();
    let r = await db.collection("urls").find({ _id: id }).toArray();

    if(r.length === 0) return res.status(errors.idNotFound.status).json(errors.idNotFound);
    const { _id , url } = r[0];      

    return res.status(201).json({ ID: _id, originalAddress: url});

  } 
  catch(e){
    return res.status(errors.internalServerError.status).json(errors.internalServerError);
  }
}
