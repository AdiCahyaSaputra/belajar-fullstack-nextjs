import cookie from "next-cookies"

export async function guestOrAuth(ctx) {
  const { token } = cookie(ctx)
  
  // auth (async cuz return res)
  if(token) return ctx.res.writeHead(302, { 
    Location: "/posts"
  }).end()
  
  // guest (sync)
  return await 0;
}