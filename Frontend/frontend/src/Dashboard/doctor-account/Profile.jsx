import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import UploadCloudinary from '../../utils/UploadCloudinary';
import { BASE_URL, token } from '../../../config.js';
import { toast } from 'react-toastify';
const Profile = ({doctorData}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
        photo: null



    });

    useEffect(()=>{
        setFormData({
            name:doctorData?.name,
            email: doctorData?.email,
        
        phone: doctorData?.phone,
        bio: doctorData?.bio,
        gender: doctorData?.gender,
        specialization: doctorData?.specialization,
        ticketPrice: doctorData?.ticketPrice,
        qualifications: doctorData?.qualifications,
        experiences: doctorData?.experiences,
        timeSlots: doctorData?.timeSlots,
        about: doctorData?.about,
        photo: doctorData?.photo
        })
    },[doctorData])

    const handleFileInputChange = async event=>{
        const file = event.target.files[0]
        const data = await UploadCloudinary(file);
        console.log(data);
        setFormData({...formData,photo:data?.url})
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // You can perform any submission logic here
        console.log(formData); // For example, logging the form data
    };

   const updateProfileHandle = async e=>{
       e.preventDefault();
       try {
        const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
                Authorization: `Bearer ${token}`


            },
            body:JSON.stringify(formData)
        })
        const result = await res.json();
        // if(res.ok){
        //     throw Error(result.message)
        // }
        toast.success(result.message);

       } catch (error) {
        toast.error(error.message)
       }

   }

   // reysable function for deleting
   const deleteItem=(key , index)=>{
    setFormData(prevFormData=>({
        ...prevFormData , [key]:prevFormData[key].filter((_,i)=> i != index)
    }))
   }

   // reusable function for adding item
   const addItem=(key , item)=>{
    setFormData(prevFormData=>({...prevFormData , [key]:[...prevFormData[key] , item]}))
   }

   //reusable input change
   const handleQualificationChangeFun = (key , index , event)=>{
    const {name , value} = event.target

    setFormData(prevFormData => {
        const updateItem = [...prevFormData[key]]

        updateItem[index][name] = value;

        return {
            ...prevFormData , [key]:updateItem ,
        }
    })
   }
// Qualification start
   const addQualification = e=>{
    e.preventDefault();

    addItem("qualifications",{
        startingDate: '', endingDate: '', degree: 'PHD', university: 'Mumbai'
    })
   }
   const handleQualificationChange = (event , index)=>{
    handleQualificationChangeFun('qualifications',index,event)
   }

   const deleteQualification = (e, index)=>{
    e.preventDefault()
    deleteItem('qualifications' , index)
   }

   // Qualification end

   // experiences start
   const addexperiences = e=>{
    e.preventDefault();

    addItem("experiences",{
        startingDate: '', endingDate: '', position: 'MD', hospital: 'apollo' 
    })
   }
   const handleexperiencesChange = (event , index)=>{
    handleQualificationChangeFun('experiences',index,event)
   }

   const deleteexperiences = (e, index)=>{
    e.preventDefault()
    deleteItem('experiences' , index)
   }
     // experiences end
   
       // timeslot start
   const addtimeSlots = e=>{
    e.preventDefault();

    addItem("timeSlots",{
        day: 'sunday', startingTime: '10:00', endingTime: '12:00'  
    })
   }
   const handletimeSlotsChange = (event , index)=>{
    handleQualificationChangeFun('timeSlots',index,event)
   }

   const deletetimeSlots = (e, index)=>{
    e.preventDefault()
    deleteItem('timeSlots' , index)
   }
     // timeslot end
   

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">Profile Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <p className="form__label">Name*</p>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Full Name'
                        className="form__input"
                        required
                    />
                </div>
                <div className="mb-3">
                    <p className="form__label">Email*</p>
                    <input
                        type='email'
                        name='mail'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='example@gmail.com'
                        className="form__input"
                        required
                        readOnly aria-readonly
                        disabled={true}
                    />

                </div>
                <div className="mb-3">
                    <p className="form__label">Bio</p>
                    <input
                        type='text'
                        name='bio'
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder='Bio'
                        className="form__input"
                        maxLength={100}
                    />

                </div>
                <div className="mb-3">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className="form__label">Gender*</p>
                            <select name='gender' value={formData.gender} onChange={handleChange} className="form__input py-3.5 ">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Specialization*</p>
                            <select name='specialization' value={formData.specialization} onChange={handleChange} className="form__input py-3.5 ">
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Ticket Prices</p>
                            <input type='number' placeholder='100' className="form__input" name='ticketPrice' value={formData.ticketPrice} onChange={handleChange} ></input>
                        </div>
                    </div>
                    <div className="mb-3">
                        <p className="form__label">Qualifications*</p>
                        {formData.qualifications?.map((item, index) => <div key={index}>
                            <div >
                                <div className="grid grid-cols-2 gap-5 ">
                                    <div>
                                        <p className='form__label' >Starting Date*</p>
                                        <input onChange={e=>handleQualificationChange(e , index)} className='form__input' type='date' name='startingDate' value={item.startingDate} ></input>
                                    </div>
                                    <div>
                                        <p className='form__label' >Ending Date*</p>
                                        <input  onChange={e=>handleQualificationChange(e , index)} className='form__input' type='date' name='endingDate' value={item.endingDate}  ></input>
                                    </div>

                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-4 ">
                                    <div>
                                        <p className='form__label' >Degree*</p>
                                        <input  onChange={e=>handleQualificationChange(e , index)} className='form__input' type='text' name='degree' value={item.degree}  ></input>
                                    </div>
                                    <div>
                                        <p className='form__label' >University*</p>
                                        <input  onChange={e=>handleQualificationChange(e , index)} className='form__input' type='text' name='university' value={item.university}  ></input>
                                    </div>


                                </div>
                                <button onClick={e=>deleteQualification(e,index)} className="bg-red-600 rounded-full text-white text-[20px] mt-4 mb-[30px] cursor-pointer" ><AiOutlineDelete /></button>
                            </div>
                        </div>)}
                        <button onClick={addQualification} className="bg-[#000] py-2 px-5 text-white font-semibold rounded-md h-fit cursor-pointer">Add Qualification</button>

                    </div>
                    <div className="mb-3 mt-10">
                        <p className="form__label">Experiences*</p>
                        {formData.experiences?.map((item, index) => <div key={index}>
                            <div >
                                <div className="grid grid-cols-2 gap-5 ">
                                    <div>
                                        <p className='form__label' >Starting Date*</p>
                                        <input  onChange={e=>handleexperiencesChange(e , index)} className='form__input' type='date' name='startingDate' value={item.startingDate} ></input>
                                    </div>
                                    <div>
                                        <p className='form__label' >Ending Date*</p>
                                        <input  onChange={e=>handleexperiencesChange(e , index)} className='form__input' type='date' name='endingDate' value={item.endingDate}   ></input>
                                    </div>

                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-4 ">
                                    <div>
                                        <p className='form__label' >Position*</p>
                                        <input  onChange={e=>handleexperiencesChange(e , index)} className='form__input' type='text' name='position' value={item.position}></input>
                                    </div>
                                    <div>
                                        <p className='form__label' >Hospital*</p>
                                        <input  onChange={e=>handleexperiencesChange(e , index)} className='form__input' type='text' name='hospital' value={item.hospital} ></input>
                                    </div>


                                </div>
                                <button onClick={e=>deleteexperiences(e,index)} className="bg-red-600 rounded-full text-white text-[20px] mt-4 mb-[30px] cursor-pointer" ><AiOutlineDelete /></button>
                            </div>
                        </div>)}
                        <button onClick={addexperiences}  className="bg-[#000] py-2 px-5 text-white font-semibold rounded-md h-fit cursor-pointer">Add Experiences</button>

                    </div>
                    <div className="mb-3 mt-10">
                        <p className="form__label">TimeSlots*</p>
                        {formData.timeSlots?.map((item, index) => <div key={index}>
                            <div >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-[30px] ">
                                    <div>
                                        <p className='form__label' >Day*</p>
                                        <select name='day' value={item.day} className='form__input' onChange={e=>handletimeSlotsChange(e , index)}>
                                            <option value="">Select</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className='form__label' >Starting Time*</p>
                                        <input onChange={e=>handletimeSlotsChange(e , index)} className='form__input' type='time' name='startingTime' value={item.startingTime}  ></input>
                                    </div>
                                    <div>
                                        <p className='form__label' >Ending Time*</p>
                                        <input onChange={e=>handletimeSlotsChange(e , index)} className='form__input' type='time' name='endingTime' value={item.endingTime}  ></input>
                                    </div>

                                </div>
                                <button onClick={e=>deletetimeSlots(e,index)} className="bg-red-600 rounded-full text-white text-[20px] mt-1.5 mb-[30px] cursor-pointer" ><AiOutlineDelete /></button>

                            </div>
                        </div>)}
                        <button onClick={addtimeSlots}  className="bg-[#000] py-2 px-5 text-white font-semibold rounded-md h-fit cursor-pointer">Add TimeSlot</button>

                    </div>
                    <div className="mb-3">
                        <p className="form__label">About</p>
                        <textarea name='about' rows={5} className='form__input' value={formData.about} placeholder='Write about yourself' onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        {formData.photo && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img className="rounded-full" src={formData.photo}></img>

                        </figure>}
                        <div className="relative w-[130px] h-[50px]">
                            <input type='file' name='photo' id='customfile' onChange={handleFileInputChange} accept='.jpg , .png' className="absolute top-0 w-full h-full opacity-0  cursor-pointer"></input>
                            <label htmlFor='customfile' className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[16px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer ">
                                Upload Photo
                            </label>
                        </div>
                    </div>
                    <div className="mt-7">
                        <button type='submit' onClick={updateProfileHandle} className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">Update Profile</button>
                    </div>


                </div>

            </form>
        </div>
    );
};

export default Profile;
