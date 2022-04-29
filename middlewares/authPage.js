import cookie from "next-cookies"

export async function guest(ctx) {
  const { token } = cookie(ctx)
  
  // if token exist (isLogin = true) -> Redirect
  if(token) return ctx.res.writeHead(302, { 
    Location: "/posts"
  }).end()
  
  // isLogin = false -> Login Page or return 0
  return await 0;
}

export async function auth(ctx) {
  const { token } = cookie(ctx)
  
  // if token !exist (isLogin = false) -> Redirect to login page
  if(!token) return ctx.res.writeHead(302, {
    Location: "/auth/login"
  }).end()
  
  // if exist (isLogin = true) -> give access (with token)
  return await {
    token
  }
  
}