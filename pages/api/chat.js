import { SiteClient } from "datocms-client"

//Connection with datocms full-access which allow send data via POST METHOD
export default async function handler(req, res) {

  //Condition for creates item in DB only when has POST METHOD
  if(req.method === "POST"){
    const TOKEN = "a3f467688e4f6f569c6329d5c44e8b"
    const client = new SiteClient(TOKEN)

    //Creates the new item with message submited in chat form
    const recorder = await client.items.create({
      itemType: "1051395",  //Model ID in datocms DB
      ...req.body   //JSON created by HOOK EFFECT in /pages/index.js
    })

    res.status(200).json({
      recorder: recorder  //Record the item in DB
    })

    return
  }

  //Error message in internal problem with DB
  res.status(404).json({
    message: "Estamos com problemas, tente novamente mais tarde :/"
  })
}
