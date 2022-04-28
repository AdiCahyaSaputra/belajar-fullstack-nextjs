import FormElement from "../../components/FormElement"
import InputLabel from "../../components/InputLabel"

import Link from "next/link"
import { useState } from "react"

export default function Register() {
  const [fields, setFileds] = useState({
    email: "",
    password: ""
  })
  
  const [status, setStatus] = useState("normal")
  
  async function registerHandler(e) {
    e.preventDefault()
    
    setStatus("registering")
    
    // kirim request ke Api
    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields), // isi body nya json yang sudah di string kan
      headers: {
        "Content-Type": "application/json" // kasih tau si next kalo ini tuh json bukan string 
      }
    })
    
    if(registerReq.status !== 200) return setStatus("error")
    
    // dapet respon
    const registerRes = await registerReq.json()
    setFileds({
      email: "",
      password: ""
    })
    setStatus("success")
  }
  
  function getValue(e) {
    const name = e.target.name
    setFileds({
      ...fields, // previous value (cuz useState just replace not re assign the value)
      // using dynamic keys in object (es2015 feature)
      [name]: e.target.value
    })
  }
  
  
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      { status === "registering" ? (
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center">
          <h1 className="text-sm font-bold rounded-sm py-2 px-4 bg-gray-700 text-white shadow-md inline-block animate-bounce uppercase">
            Registering New User
          </h1>
        </div>
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
      
      { status === "success" ? (
          <p className="text-sm font-medium text-green-600 mt-12 py-2 px-4 rounded-sm bg-green-100">
            Register Successfully
          </p>
        ) : ""
      }
      { status === "error" ? (
          <p className="text-sm font-medium text-red-600 mt-12 py-2 px-4 rounded-sm bg-red-100">
            Register Error
          </p>
        ) : ""
      }
      
      <Link href="/auth/login">
        <a className="hover:text-blue-600 hover:underline text-blue-400 mt-16 text-lg">Already have account ? Login</a>
      </Link>
      
    </div>
  )
}