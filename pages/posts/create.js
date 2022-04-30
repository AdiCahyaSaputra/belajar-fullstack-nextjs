import FormElement from "../../components/FormElement"
import InputLabel, { TextareaLabel } from "../../components/InputLabel"
import LoadingAuth from "../../components/LoadingAuth"
import AlertAuth from "../../components/AlertAuth"


import { useState } from "react"
import { auth } from "../../middlewares/authPage"
import Cookie from "js-cookie"
import Router from "next/router"
import Link from "next/link"

export async function getServerSideProps(ctx) {
  const { token } = await auth(ctx)

  return {
    props: {
      token
    }
  }
}


export default function PostCreate({ token }) {
  const [ fields, setFields ] = useState({
    title: "",
    content: ""
  })
  
  const [ status, setStatus ] = useState(0)
  
  async function createHandler(e) {
    e.preventDefault()
    
    setStatus(103)
    
    const createReq = await fetch("/api/posts/create", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method: "POST",
      body: JSON.stringify(fields)
    })
    
    if(createReq.status !== 200) return setStatus(createReq.status)
    
    const createRes = await createReq.json()
    setStatus(200)
    setFields({
      title: "",
      content: ""
    })
    
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
          <LoadingAuth msgLoading="Create new Post" />
        ) : ""
      }
      
      { status === 200 ? (
          <AlertAuth isSuccess={ true } msg="Create Post Successfully" />
        ) : ""
      }
      { status > 200 ? (
          <AlertAuth isSuccess={ false } msg={ "Create Post Error : " + status } />
        ) : ""
      }
      
      <FormElement title="Create Post" 
      submit="Create" 
      onSubmitHandler={ createHandler } >
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