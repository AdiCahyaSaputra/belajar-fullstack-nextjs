import jwt from "jsonwebtoken"

// return promises
export default async function authorization(req, res) {
  // middleware: check dari req.headers
  const { authorization } = req.headers // tipe _spasi_ token
  if(!authorization) return res.status(401).end()
  
  const [authType, authToken] = authorization.split(' ') // split antara tipe dan token
  if(authType !== "Bearer") return res.status(401).end()
  
  return jwt.verify(authToken, "iniTokenRahasiaKu", async function(err, decoded) {
    if(err) return res.status(401).end()
    // return decode jika sudah resolve / rejected
    return await decoded
  })
}