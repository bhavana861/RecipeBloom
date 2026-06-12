import React, { useState } from "react";
import "./InputForm.css";
import axios from 'axios'

const InputForm = ({setIsOpen}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isSignUp,setIsSignUp]=useState(false)
    const [error,setError]=useState("")

    const handleOnSubmit=async(e)=>{
         e.preventDefault()
         let endpoint=(isSignUp)?"signUp":"login"
         await axios.post(`http://localhost:5000/${endpoint}`,{email,password})
         .then((res)=>{
          localStorage.setItem("token",res.data.token)
          localStorage.setItem("user",JSON.stringify(res.data.user))
          setIsOpen()
         })
         .catch(data=>setError(data.response?.data?.error))
        
    }
  return (
    <form className="login-form" onSubmit={handleOnSubmit}>

      <h2>Welcome back </h2>
      <p className="subtitle">Login to RecipeBloom 🍴</p>
      <div className="form-control">
        <label>Email</label>
        <input  type="email"  className="input" placeholder="Enter your email " onChange={(e)=>setEmail(e.target.value)}  required />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input   type="password"  className="input" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required />
      </div>

      <button className="login-submit"> {(isSignUp)?"Sign Up":"Login"}  </button>
    { (error!="") &&  <h6 className="error-msg">{error}</h6>}

      <p className="create" onClick={()=>setIsSignUp(prev=>!prev)}>
       {(isSignUp)? "Already have an account":" Create new account"}
      </p>

    </form>
  );
};

export default InputForm;