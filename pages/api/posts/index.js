import db from "libs/db"
import authorization from "middlewares/authorization"

export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(405).end()
  
  // middlewares
  const verify = await authorization(req, res) // return err atau decode dan ketika error, code yg bawah nya bakal tetep jalan karena error nya cuma di simpen di variable tidak di tampilkan
  if(!verify) return res.status(401).end() // ketika decode / verify JWT nya nggak ada (dengan kata lain, error)
  
  const posts = await db("posts")
  res.status(200).json({
    msg: "Get Posts Data",
    posts
  })
}