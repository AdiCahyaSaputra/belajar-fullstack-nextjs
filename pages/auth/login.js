import FormElement from "../../components/FormElement"
import InputLabel from "../../components/InputLabel"
import LoadingAuth from "../../components/LoadingAuth"
import AlertAuth from "../../components/AlertAuth"
import { guest } from "../../middlewares/authPage"

import Link from "next/link"
import { useState } from "react"
import Cookie from "js-cookie"
import Router from "next/router"

// ctx = Context -> Object
export async function getServerSideProps(ctx) {
  await guest(ctx)
  
  return {
    props: {}
  }
}

export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: ""
  })
  
  const [status, setStatus] = useState(0)
  
  async function loginHandler(e) {
    e.preventDefault()
    
    setStatus(103)
    
    const loginReq = await fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(fields)
    })
    
    if(loginReq.status !== 200) return setStatus(loginReq.status)
    
    const loginRes = await loginReq.json()
    
    // nge set jwt
    Cookie.set("token", loginRes.token)
    
    setFields({
      email: "",
      password: ""
    })
    
    // Redirect
    Router.push("/posts")
  }
  
  function getValue(e) {
    const name = e.target.name
    setFields({
      ...fields, // previous value (cuz useState just replace not re assign the value)
      // using dynamic keys in object (es2015 feature)
      [name]: e.target.value
    })
  }
  
   return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      { status === 103 ? (
          <LoadingAuth msgLoading="Authenticate" />
        ) : ""
      }
      <FormElement title="Login" submit="Login" onSubmitHandler={ loginHandler }>
        <InputLabel labelText="Email" 
        idLabel="email" 
        type="email" 
        placeholder="Enter email" 
        name="email"
        onChangeHandler={ getValue }
        value={ fields.email } />
        
        <InputLabel labelText="Password" 
        idLabel="password" 
        type="password" 
        placeholder="Password" 
        name="password"
        onChangeHandler={ getValue }
        value={ fields.password } />
      </FormElement>
      
      { status > 200 ? (
          <AlertAuth isSuccess={ false } msg={ "Login Error : " + status } />
        ) : ""
      }
      
      <Link href="/auth/register">
        <a className="hover:text-blue-600 hover:underline text-blue-400 mt-16 text-lg">Did not have an account ? Register</a>
      </Link>
      
    </div>
  )
}