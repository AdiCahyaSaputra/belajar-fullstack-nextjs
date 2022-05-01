import db from "libs/db"
import authorization from "middlewares/authorization"

export default async function handler(req, res) {
  // 405 = Method not allowed
  if(req.method !== "POST") return res.status(405).end()
  
  // middlewares
  const verify = await authorization(req, res)
  if(!verify) return res.status(401).end()
  
  const { title, content } = req.body;
  
  // return post id
  const idPost = await db('posts').insert({
    title,
    content
  })
  
  // select * from posts where id = {idPost}
  // method .first() biar gk return array of object
  const post = await db('posts').where('id', idPost).first()
  
  res.status(200).json({
    msg: "Create Post Successfully",
    post
  })
}