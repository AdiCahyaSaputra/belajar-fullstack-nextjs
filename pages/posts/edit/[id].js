import FormElement from "../../../components/FormElement"
import InputLabel, { TextareaLabel } from "../../../components/InputLabel"
import LoadingAuth from "../../../components/LoadingAuth"
import AlertAuth from "../../../components/AlertAuth"


import { useState } from "react"
import { auth } from "../../../middlewares/authPage"
import Cookie from "js-cookie"
import Router from "next/router"
import Link from "next/link"

export async function getServerSideProps(ctx) {
  const { token } = await auth(ctx)
  const { id } = ctx.query
  
  const postReq = await fetch(`http://localhost:3000/api/posts/detail/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  
  const { post } = await postReq.json()
  
  console.log(post)
  return {
    props: {
      token,
      post
    }
  }
}


export default function PostUpdate({ token, post }) {
  const [ fields, setFields ] = useState({
    title: post.title,
    content: post.content
  })
  
  const [ status, setStatus ] = useState(0)
  
  async function editHandler(e) {
    e.preventDefault()
    
    setStatus(103)
    
    const editReq = await fetch(`/api/posts/update/${post.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method: "PUT",
      body: JSON.stringify(fields)
    })
    
    if(editReq.status !== 200) return setStatus(editReq.status)
    
    const editRes = await editReq.json()
    setStatus(200)
    Router.push("/posts")
    
  }
  
  function getValue(e) {
    const name = e.target.name
    setFields({
      ...fields,
      [name]: e.target.value
    })
  }
  
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      
      { status === 103 ? (
          <LoadingAuth msgLoading="Edit Post" />
        ) : ""
      }
      
      { status === 200 ? (
          <AlertAuth isSuccess={ true } msg="Edit Post Successfully" />
        ) : ""
      }
      { status > 200 ? (
          <AlertAuth isSuccess={ false } msg={ "Edit Post Error : " + status } />
        ) : ""
      }
      
      <FormElement title="Edit Post" 
      submit="Edit" 
      onSubmitHandler={ editHandler } >
        <InputLabel idLabel="title"
        labelText="Title"
        type="text"
        placeholder="Enter Title"
        name="title"
        value={ fields.title }
        onChangeHandler={ getValue } />
        
        <TextareaLabel placeholder="Content..."
        idLabel="content"
        labelText="Content"
        name="content"
        value={ fields.content }
        onChangeHandler={ getValue } />
        
      </FormElement>
      
      <Link href="/posts">
        <a className="hover:text-blue-600 hover:underline text-blue-400 mt-16 text-lg">See All Posts</a>
      </Link>
      
    </div>  
  )
}