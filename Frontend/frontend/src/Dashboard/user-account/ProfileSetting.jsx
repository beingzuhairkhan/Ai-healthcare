import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UploadCloudinary from '../../utils/UploadCloudinary.js';
import { BASE_URL, token } from '../../../config.js';
import { toast } from 'react-toastify';
import HasLoader from "react-spinners/HashLoader.js";

const ProfileSetting = ({ user }) => {
    const [selectedFile, setSelectedFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: null,
        gender: "",
        bloodType: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            name: user.name,
            email: user.email,
            photo: user.photo,
            gender: user.gender,
            bloodType: user.bloodType
        });
    }, [user]);

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async event => {
        const file = event.target.files[0];
        const data = await UploadCloudinary(file);
        setSelectedFile(data.url);
        setFormData({ ...formData, photo: data.url });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/updateProfile/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
                // body: formData
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
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mt-10">
                <div className="mb-5">
                    <input type='text' placeholder='Enter your Full name' name='name' value={formData.name} onChange={handleInputChange} className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer" />
                </div>
                <div className="mb-5">
                    <input type='email' placeholder='Enter your Email' name='email' value={formData.email} onChange={handleInputChange} aria-readonly readOnly className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer" />
                </div>
                <div className="mb-5">
                    <input type='password' placeholder='Enter your password' name='password' value={formData.password} onChange={handleInputChange} className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer" />
                </div>
                <div className="mb-5">
                    <input type='text' placeholder='Blood Type' name='bloodType' value={formData.bloodType} onChange={handleInputChange} className="w-full px-4 py-1 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer" />
                </div>
                <div className="mb-5 flex items-center justify-between ">
                    <label className="text-headingColor font-bold text-[16px] leading-7">
                        Gender:
                        <select name='gender' value={formData.gender} onChange={handleInputChange} className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img className="rounded-full" src={formData.photo} alt="user" />
                        </figure>
                    )}
                    <div className="relative w-[130px] h-[50px]">
                        <input type='file' name='photo' id='customfile' onChange={handleFileChange} accept='.jpg , .png' className="absolute top-0 w-full h-full opacity-0 cursor-pointer" />
                        <label htmlFor='customfile' className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[16px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer ">
                            {selectedFile ? selectedFile.name : "Upload Photo"}
                        </label>
                    </div>
                </div>
                <div className="mt-7 ">
                    <button disabled={loading} type='submit' className="w-full bg-primaryColor rounded-md py-2 font-semibold text-[20px] btn">{loading ? <HasLoader size={35} color="#ffffff" /> : 'Update'}</button>
                </div>
                <p className="mt-5 text-textColor text-center">
                    Already have an account? <Link to="/login" className="text-primaryColor text-[15px] font-medium">
                        login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ProfileSetting;
