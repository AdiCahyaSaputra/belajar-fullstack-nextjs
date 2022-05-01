import jwt from "jsonwebtoken"

// return promises
export default async function authorization(req, res) {
  const { authorization } = req.headers

  if(!authorization) return res.status(401).end()
  
  const [authType, authToken] = authorization.split(' ')

  if(authType !== "Bearer") return res.status(401).end()
  
  return jwt.verify(authToken, process.env.JWT_SECRET, async function(err, decoded) {
    if(err) return res.status(401).end()
    return await decoded
  })
}
