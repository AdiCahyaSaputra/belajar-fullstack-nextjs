import db from "../../../../libs/db"
import authorization from "../../../../middlewares/authorization"

export default async function handler(req, res) {
  if(req.method !== "PUT") return res.status(405).end()
  
  // middlewares
  const verify = await authorization(req, res)
  if(!verify) return res.status(401).end()
  
  // req.query = Object { id: [id] }
  const { id } = req.query
  const { title, content } = req.body
  
  const idPostUpdate = await db('posts')
  .where({ id })
  .update({
    title, content
  }, ['id']) // .update(data, [return = 1 atau 'column']) tapi g di support return nya karena itu issue bawaan mysql
  
  const post = await db('posts').where('id', id).first()
  
  res.status(200).json({
    msg: "Update Post Data",
    id,
    post
  })
  
}