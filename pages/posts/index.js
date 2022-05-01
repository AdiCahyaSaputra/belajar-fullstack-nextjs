import { auth } from "middlewares/authPage"
import Cookie from "js-cookie"
import Router from "next/router"
import Link from "next/link"
import { useState } from "react"

import LoadingAuth from "components/LoadingAuth"
import AlertAuth from "components/AlertAuth"


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
  
  return {
    props: {
      posts,
      token
    }
  }
}

export default function PostIndex(props) {
  // populasi data posts di state biar bisa update client side jika di server side nya berubah (tidak perlu di refresh)
  const [ posts, setPosts ] = useState(props.posts)
  const [ status, setStatus ] = useState(0)
  
  async function deleteHandler(id) {
    const sure = confirm("Delete this Post ?")
    
    if(!sure) return 0;
    
    setStatus(103)
    
    const deleteReq = await fetch(`/api/posts/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${props.token}`
      }
    })
    
    if(deleteReq.status !== 200) return setStatus(deleteReq.status)
    
    // update state posts supaya sesuai dengan yang di db
    // jika post.id itu sama dengan id yang sudah di delete -> hilangkan
    const updatedPosts = posts.filter(post => post.id !== id)
    setPosts(updatedPosts)
  
    const deleteRes = await deleteReq.json()
    setStatus(200)
  }
  
  function logout() {
    Cookie.remove("token")
    Router.replace("/auth/login")
  }
  
  function getExcerpt(str) {
    str = str.split("")
    str.splice(20, str.length -1, "...")
    return str.join("")
  }
  
  return (
    <div className="container mx-auto p-4">
      { status === 103 ? (
          <LoadingAuth msgLoading="Delete Post" />
        ) : ""
      }
      
      { status === 200 ? (
          <AlertAuth isSuccess={ true } msg="Delete Post Successfully" />
        ) : ""
      }
      { status > 200 ? (
          <AlertAuth isSuccess={ false } msg={ "Delete Post Error : " + status } />
        ) : ""
      }
      
      <div>
        <a className="hover:text-blue-600 hover:underline 
        text-blue-400 text-lg"
        onClick={ logout } >
          Logout
        </a>
        <h1 className="text-xl font-bold">All Post Data</h1>
      </div>
      
      <Link href="/posts/create">
        <a className="my-4 inline-block rounded-md shadow-md py-2 px-4 bg-blue-600 text-white font-semibold">Create New Post</a>
      </Link>
      
      { posts.map(post => {
          return (
            
            <div key={ post.id } className="border border-gray-100 my-2 p-4 bg-white shadow-md rounded-md">
              <h1 className="text-lg font-semibold text-gray-700">{ post.title }</h1>
              <p className="text-sm font-medium text-gray-400">{ getExcerpt(post.content) }</p>
              <div className="py-1 rounded-md hover:bg-red-700 px-3 text-sm inline-block font-medium mt-2 bg-red-600 text-white"
              onClick={ () => deleteHandler(post.id) }
              >
                Delete This Post
              </div>
              <div className="ml-2 py-1 rounded-md hover:bg-purple-700 px-3 text-sm inline-block font-medium mt-2 bg-purple-600 text-white"
              onClick={ () => Router.push(`/posts/edit/${post.id }`) }
              >
                Edit This Post
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}