import FormElement from "../../components/FormElement"
import InputLabel from "../../components/InputLabel"
import LoadingAuth from "../../components/LoadingAuth"
import AlertAuth from "../../components/AlertAuth"
import { guestOrAuth } from "../../middlewares/authPage"

import Link from "next/link"
import { useState } from "react"

export async function getServerSideProps(ctx) {
  await guestOrAuth(ctx) // redirect if auth
  
  return {
    props: {}
  }
}

export default function Register() {
  const [fields, setFields] = useState({
    email: "",
    password: ""
  })
  
  const [status, setStatus] = useState(0)
  
  async function registerHandler(e) {
    e.preventDefault()
    
    setStatus(103) // early hints
    
    // kirim request ke Api
    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields), // isi body nya json yang sudah di string kan
      headers: {
        "Content-Type": "application/json" // kasih tau si next kalo ini tuh json bukan string 
      }
    })
    
    if(registerReq.status !== 200) return setStatus(registerReq.status)
    
    // dapet respon
    const registerRes = await registerReq.json()
    setFields({
      email: "",
      password: ""
    })
    setStatus(200)
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
          <LoadingAuth msgLoading="Registering New User" />
        ) : ""
      }
      
      <FormElement title="Register" submit="Register" onSubmitHandler={ registerHandler }>
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
      
      { status === 200 ? (
          <AlertAuth isSuccess={ true } msg="Register Successfully, Redirect To Login ?" />
        ) : ""
      }
      { status > 200 ? (
          <AlertAuth isSuccess={ false } msg={ "Register Error : " + status } />
        ) : ""
      }
      
      <Link href="/auth/login">
        <a className="hover:text-blue-600 hover:underline text-blue-400 mt-16 text-lg">Already have account ? Login</a>
      </Link>
      
    </div>
  )
}