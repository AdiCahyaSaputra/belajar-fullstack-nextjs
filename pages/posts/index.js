import { auth } from "../../middlewares/authPage"
import Cookie from "js-cookie"
import Router from "next/router"

export async function getServerSideProps(ctx) {
  const { token } = await auth(ctx)
  // fetch in server side !== in client side cuz in server side using fetch node js (polyfill)
  // not support relative path "/api/posts" == false. "http://localhost:3000/api/posts" == true
  
  const postsReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "GET"
  })
  
  const { posts } = await postsReq.json() // array of object posts
  console.log(posts)
  
  
  return {
    props: {
      posts
    }
  }
}

export default function PostIndex({ posts }) {
  
  function logout() {
    Cookie.remove("token")
    Router.push("/auth/login")
  }
  
  function getExcerpt(str) {
    str = str.split("")
    str.splice(20, str.length -1, "...")
    return str.join("")
  }
  
  return (
    <div className="container mx-auto p-4">
      <a className="hover:text-blue-600 hover:underline 
      text-blue-400 text-lg"
      onClick={ logout } >
        Logout
      </a>
      <h1 className="text-xl font-bold mb-4">All Post Data</h1>
      { posts.map(post => {
          return (
            <div key={ post.id } className="border border-gray-100 my-2 p-4 bg-white shadow-md rounded-md">
              <h1 className="text-lg font-semibold text-gray-700">{ post.title }</h1>
              <p className="text-sm font-medium text-gray-400">{ getExcerpt(post.content) }</p>
            </div>
          )
        }
      )}
    </div>
  )
}