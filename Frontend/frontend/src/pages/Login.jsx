import React, { useState , useContext} from 'react'
import { BsHandIndex } from 'react-icons/bs';
import { Link , useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config.js';
import { toast } from 'react-toastify';
import HasLoader from "react-spinners/HashLoader.js"
import {authContext} from "../context/AuthContext.jsx"
const Login = () => {
  const [formdata , setFormdata] = useState({
    email:"",
    password:"",

  });

  const [login , setLogin] = useState(false)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(authContext)
  const handleInputSumbit = e=>{
    setFormdata({...formdata , [e.target.name]:e.target.value});
  }
  const submitHandler = async event=>{
    
    event.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      });
      const result = await res.json()
      if(!res.ok){
        throw new Error(result.message)
      }
      dispatch({
        type:'LOGIN_SUCCESS',
        payload:{
          user:result.data,
          token:result.token,
          role:result.role
        }
      })
      // console.log(result , 'login data');
      setLoading(false)
      toast.success(result.message)
      navigate('/home')
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  return (
    <section className="px-5 lg:px-0 mt-[50px]">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          hello ! <span className="text-primaryColor"> Welcome </span> Back
        </h3>
        <form action='' className="px-5 lg:px-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input type='email' placeholder='Enter your Email' name='email' value={formdata.email} onChange={handleInputSumbit}
            className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"></input>
          </div>
          <div className="mb-5">
            <input type='password' placeholder='Enter your password' name='password' value={formdata.password} onChange={handleInputSumbit}
            className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"></input>
          </div>
          <div className="mt-7 ">
            <button type='submit' className="w-full bg-primaryColor rounded-md py-2 font-semibold text-[20px] btn">{loading?<HasLoader size={30} color="#ffffff"/>:'login'}</button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account? <Link to="/register" className="text-primaryColor text-[15px] font-medium">
           Register
            </Link>
          </p>
          
        </form>
        </div>
      
    </section>
  )
}

export default Login
