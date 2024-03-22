import React, { useState } from 'react'
import signUp from '../assets/images/signup.gif'
import avatar from "../assets/images/doctor-img01.png"
import { Link , useNavigate  } from 'react-router-dom';
// import UploadCloudinary from "../utils/UploadCloudinary.js"
import UploadCloudinary from "../utils/UploadCloudinary.js"
import { BASE_URL } from '../../config.js';
// import { Toast } from 'react-toastify';
import { toast } from 'react-toastify';
import HasLoader from "react-spinners/HashLoader.js"
const SignUp = () => {
  const [seletecdFile , setSeletecdFile] = useState("");
  const [previewUrl , setPreviewUrl] = useState("");
  const [loading , setLoading] = useState(false)
  const [formdata , setFormdata] = useState({
    name:"",
    email:"",
    password:"",
    photo:seletecdFile,
    gender:"",
    role:"",

  });

  const navigate = useNavigate ()

  const handleInputSumbit = e=>{
    setFormdata({...formdata , [e.target.name]:e.target.value});
  }

  const handleFileSumbit = async event=>{
    const file = event.target.files[0];
    const data = await UploadCloudinary(file)
    console.log(data)
    setPreviewUrl(data.url)
    setSeletecdFile(data.url)
    setFormdata({...formdata, photo:data.url})

  }
  const submitHandler = async event=>{
    
    event.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      });
      const {message} = await res.json()
      if(!res.ok){
        throw new Error(message)
      }
      setLoading(false)
      toast.success(message)
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  return (
   <section className="px-5 xl:px-0 mt-10">
    <div className="max-w-[1170px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* img box */}
        <div className="hidden lg:block bg-primaryColor rounded-l-lg">
          <figure className="rounded-l-lg">
            <img src={signUp} className="w-full rounded-l-lg">
            </img>
          </figure>
          </div>
          {/* signup form */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form action="" onSubmit={submitHandler}>
            <div className="mb-5">
            <input required type='text' placeholder='Enter your Full name' name='name' value={formdata.name} onChange={handleInputSumbit} 
            className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"></input>
          </div>
          <div className="mb-5">
            <input required type='email' placeholder='Enter your Email' name='email' value={formdata.email} onChange={handleInputSumbit} 
            className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"></input>
          </div>
          <div className="mb-5">
            <input required type='password' placeholder='Enter your password' name='password' value={formdata.password} onChange={handleInputSumbit}
            className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"></input>
          </div>
         <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Are you a:
            <select name='role' value={formdata.role} onChange={handleInputSumbit}  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
            <option value="">Select</option>
              <option value="patient">patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>

          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select name='gender'value={formdata.gender} onChange={handleInputSumbit}  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
         </div>
         <div className="mb-5 flex items-center gap-3">
      {seletecdFile &&     <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
            <img className="rounded-full" src={previewUrl}></img>

          </figure>}
          <div className="relative w-[130px] h-[50px]">
            <input type='file' name='photo' id='customfile' onChange={handleFileSumbit} accept='.jpg , .png' className="absolute top-0 w-full h-full opacity-0  cursor-pointer"></input>
            <label htmlFor='customfile' className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[16px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer ">
              Upload Photo
            </label>
          </div>
         </div>
         <div className="mt-7 ">
            <button disabled={loading && true} type='submit' className="w-full bg-primaryColor rounded-md py-2 font-semibold text-[20px] btn">{loading?<HasLoader size={35} color="#ffffff"/>:'SignUp'}</button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Already have an account? <Link to="/login" className="text-primaryColor text-[15px] font-medium">
           login
            </Link>
          </p>

            </form>
        </div>
      </div>
    </div>

   </section>
  )
}

export default SignUp
