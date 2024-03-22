import React from 'react'
import userImg from "../../assets/images/doctor-img01.png"
import { useContext , useState , useEffect} from 'react'
import { authContext } from '../../context/AuthContext'
import ProfileSetting from './ProfileSetting'
import MyBooking from './MyBooking'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../../config.js'
import Loading from '../../components/loader/Loading.jsx'
 import Error from "../../components/Error/Error.jsx"
const Myaacount = () => {

    const {dispatch} = useContext(authContext)
    const [tab , setTab] = useState('bookings')
     
    const {data:userData , loading , error} = useFetchData(`${BASE_URL}/users/profile/me`)
 

   
    const handleLogout = ()=>{
        dispatch({type:'LOGOUT'})
    }
  return (
   <section>
    <div className="max-w-full px-5 max-auto mt-10">
    {loading && !error && <Loading/>}
    {error && !loading && <Error errorMessage={error}/>}
    {
        !loading && !error && <div className=" gap-10 flex justify-evenly">
        <div className="pb-[50px] px-[40px] rounded-md">
            <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                    <img src={userData.photo} className="rounded-full w-full h-full"></img>
                </figure>
            </div>
            <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                 {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">{userData.email}</p>
                <p className="text-textColor text-[15px] leading-6 font-medium">Blood Type: 
                <span className=" text-headingColor text-[22px] leading-8">
                  {userData.bloodType}
                    </span></p>
            </div>
            <div className="mt-[50px] md:mt-[100px] ">
                <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white ">Logout</button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white  ">Delete account</button>
            </div>
        </div>
        <div className="md:col-span-2 md:px-[30px]">
          <div>
            <button onClick={()=>setTab('bookings')} className={`${tab === 'bookings' && 'bg-primaryColor text-white font-normal'}p-5 mr-5 px-4 py-2 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primary`}>
                My Bookings
            </button>
            <button onClick={()=>setTab('settings')} className={` ${tab === 'settings' && 'bg-primaryColor text-white font-normal'}p-5 mr-5 px-4 py-2 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primary`}>
               Profile Settings
            </button>
          </div>
          {
            tab === 'bookings' && <MyBooking/>
          }
          {
            tab === 'settings' && <ProfileSetting user={userData}/>
          }
        </div>
    </div>}
</div>

   </section>
  )
}

export default Myaacount
