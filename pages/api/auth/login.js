import db from "../../../libs/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).end()
  
  const { email, password } = req.body
  const user = await db('users')
    .where({ email })
    .first()
    
  if(!user) return res.status(401).end() // 401 = unauthorized
  
  const isAuthUser = await bcrypt.compare(password, user.password) // (plainText, passwordHashed) return boolean
  if(!isAuthUser) return res.status(401).end()
  
  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_SECRET, { expiresIn: "7d" })
  
  // (user, tokenRahasia, option atau callback) kalo pake callback nanti jadi nya async btw
  // return json web token
  
  res.status(200).json({
    msg: "Authenticate!",
    token
  })
}