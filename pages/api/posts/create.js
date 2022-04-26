import db from "../../../libs/db"

export default async function handler(req, res) {
  // 405 = Method not allowed
  if(req.method !== "POST") return res.status(405).end()
  // console.log(req.body); // dapet data dari request body
  
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