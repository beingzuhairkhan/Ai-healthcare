import React, { useState } from 'react'
import Loader from "../../components/loader/Loading.jsx"
import Error from '../../components/Error/Error.jsx'
import UploadCloudinary from "../../hooks/useFetchData.jsx"
import { BASE_URL } from '../../../config.js'
import Tabs from "../../Dashboard/doctor-account/Tabs.jsx"
import d from "../../assets/images/doctor-img01.png"
import star from "../../assets/images/Star.png"
import DoctorAbout from '../../pages/doctors/DoctorAbout.jsx'
import Profile from './Profile.jsx'
import Appointment from './Appointment.jsx'
const DashBoard = () => {
  const {data , loading , error} = UploadCloudinary(`${BASE_URL}/doctors/profile/me`)
  const [tab , setTab] = useState('overview');
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader/>}
        {error && !loading && <Error/>}
        {
          ! loading && !error &&(
            <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
              <Tabs tab={tab} setTab={setTab}/>
              <div className="lg:col-span-2">
                
                  {data.isApproved === "pending" && (
                    <div className="flex p-3 mb-4 text-yellow-400 bg-yellow-50 rounded-lg mt-10">
                      <svg aria-hidden="true"
                      className="flex-shrink-0 w-8 h-5"
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                      >
                        <path fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 00 11-2 0 1 1 0 012 0zM9 9a1 1 0 000
                        2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule="evenodd"
                        
                        ></path>
                      </svg>
                      <span className="sr-only">Info</span>
                      <div className="ml-3 text-sm font-medium">
                        To get approval please complete your profile. we&apos;labelreview manually and approve within 3days
                      </div>
                    </div>
                  )}
                
                <div className="mt-8">
                  {tab === "overview" && <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        {/* <img src={data?.photo} className="w-full"></img> */}
                        <img src={data.photo} className="w-full rounded-[10px]"></img>
                      </figure>
                      <div>
                        <span className="py-2 bg-[#CCF0F3] text-irisBlueColor  px-4 lg:py-2 lg:px-6 rounded
                        text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">{data.specialization}</span>
                        <h3 className="text-[15px] font-bold text-headingColor leading-9 mt-2">{data.name}</h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={star}></img>{data.averageRating}
                          </span>
                          <span className="flex items-center  text-headingColor text-[14px]  leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                           ({data.totalRating})
                          </span>
                            
                        </div>
                          <p className="text_para text-justify mt-3 font-semibold">{data?.bio}</p>
                      </div>
                    </div>
                    <DoctorAbout  name={data.name} about={data.about} qualifications={data.qualifications} experiences={data.experiences} specialization={data.specialization} 
                     />
                      
                      
                      
                      </div>}
                  {tab === "appointments" && <Appointment appointments={data.appointments}/>}
                  {tab === "settings" && <Profile doctorData={data}/>}
                   </div>

            </div>
            </div>
       ) }

      </div>
    </section>
  )
}

export default DashBoard
