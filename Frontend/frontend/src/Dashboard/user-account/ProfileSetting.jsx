import React, { useEffect, useState } from 'react'
import { Link , useNavigate  } from 'react-router-dom';
import UploadCloudinary from '../../utils/UploadCloudinary.js';

import { BASE_URL , token } from '../../../config.js';
import { toast } from 'react-toastify';
import HasLoader from "react-spinners/HashLoader.js"

const ProfileSetting = ({user}) => {
    const [seletecdFile, setSeletecdFile] = useState("");

    const [loading, setLoading] = useState(false)
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        photo: null,
        gender: "",
        bloodType: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        setFormdata({
            name: user.name,
            email: user.email,
            photo: user.photo,
            gender: user.gender,
            bloodType: user.bloodType  
        });
    }, [user]);

    const handleInputSumbit = e => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    const handleFileSumbit = async event => {
        const file = event.target.files[0];
        const data = await UploadCloudinary(file);
        setSeletecdFile(data.url);
        setFormdata({ ...formdata, photo: data.url });
    }

    const submitHandler = async event => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/auth/${user._id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formdata)
            });
            const { message } = await res.json();
            if (!res.ok) {
                throw new Error(message);
            }
            setLoading(false);
            toast.success(message);
            navigate('/users/profile/me');
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    return (
        <div>
            <form  onSubmit={submitHandler} className="mt-10">
                <div className="mb-5">
                    <input type='text' placeholder='Enter your Full name' name='name' value={formdata.name} onChange={handleInputSumbit}
                        className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"/>
                </div>
                <div className="mb-5">
                    <input type='email' placeholder='Enter your Email' name='email' value={formdata.email} onChange={handleInputSumbit} aria-readonly readOnly
                        className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"/>
                </div>
                <div className="mb-5">
                    <input type='password' placeholder='Enter your password' name='password' value={formdata.password} onChange={handleInputSumbit}
                        className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"/>
                </div>
                <div className="mb-5">
                    <input type='text' placeholder='Blood Type' name='blood' value={formdata.bloodType} onChange={handleInputSumbit}
                        className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"/>
                </div>
                <div className="mb-5 flex items-center justify-between ">
                  

                    <label className="text-headingColor font-bold text-[16px] leading-7">
                        Gender:
                        <select name='gender' value={formdata.gender} onChange={handleInputSumbit} className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="mb-5 flex items-center gap-3">
                    {formdata.photo && (<figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                        <img className="rounded-full" src={formdata.photo}></img>

                    </figure>)}
                    <div className="relative w-[130px] h-[50px]">
                        <input type='file' name='photo' id='customfile' onChange={handleFileSumbit} accept='.jpg , .png' className="absolute top-0 w-full h-full opacity-0  cursor-pointer"></input>
                        <label htmlFor='customfile' className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[16px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer ">
                           {seletecdFile ? seletecdFile.name : "Upload Photo"}
                        </label>
                    </div>
                </div>
                <div className="mt-7 ">
                    <button disabled={loading && true} type='submit' className="w-full bg-primaryColor rounded-md py-2 font-semibold text-[20px] btn">{loading ? <HasLoader size={35} color="#ffffff" /> : 'Update'}</button>
                </div>
                <p className="mt-5 text-textColor text-center">
                    Already have an account? <Link to="/login" className="text-primaryColor text-[15px] font-medium">
                        login
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default ProfileSetting
