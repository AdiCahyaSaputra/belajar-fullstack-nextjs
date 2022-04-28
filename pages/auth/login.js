import FormElement from "../../components/FormElement"
import InputLabel from "../../components/InputLabel"

import Link from "next/link"

export default function Login() {
  
  function loginHandler(e) {
    e.preventDefault()
    console.log("submit")
  }
  
   return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <FormElement title="Login" submit="Login" onSubmitHandler={ loginHandler }>
        <InputLabel labelText="Email" idLabel="email" type="email" placeholder="Enter email" name="email" />
        <InputLabel labelText="Password" idLabel="password" type="password" placeholder="Password" name="password" />
      </FormElement>
      
      <Link href="/auth/register">
        <a className="hover:text-blue-600 hover:underline text-blue-400 mt-16 text-lg">Did not have an account ? Register</a>
      </Link>
      
    </div>
  )
}