import db from "libs/db"
import authorization from "middlewares/authorization"

export default async function handler(req, res) {
  if(req.method !== "DELETE") return res.status(405).end()
  
  // middlewares
  const verify = await authorization(req, res)
  if(!verify) return res.status(401).end()
  
  const { id } = req.query
  const idPostDelete = await db('posts')
    .where('id', id)
    .del()
  
  res.status(200).json({
    msg: "Delete Post Data",
    deletedPost: id
  })
}