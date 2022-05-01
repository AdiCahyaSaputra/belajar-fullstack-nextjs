import db from "libs/db"
import bcrypt from "bcryptjs"

export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).end()
  
  const { email, password } = req.body
  
  const salt = bcrypt.genSaltSync(10) // generate salt / str random dengan level kesulitan 10
  const passwordHash = bcrypt.hashSync(password, salt) // ('strPwNya', salt) return nya pw dengan strRandom + salt nya
  
  const registerId = await db('users').insert({
    email, password: passwordHash
  })
  
  const user = await db('users')
    .where({ id: registerId })
    .first()
  
  res.status(200).json({
    msg: "Register Successfully",
    user
  })
}