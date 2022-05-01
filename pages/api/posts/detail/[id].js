import db from "../../../../libs/db"
import authorization from "../../../../middlewares/authorization"

export default async function handler(req, res) {
  if(req.method !== "GET") return res.status(405).end()
  
  const verify = await authorization(req, res)
  if(!verify) return res.status(401).end()
  
  const { id } = req.query
  const post = await db("posts").where({ id }).first()

  if(!post) return res.status(404).end()
  
  res.status(200).json({
    msg: `Post id ${id}`,
    post
  })
  
}