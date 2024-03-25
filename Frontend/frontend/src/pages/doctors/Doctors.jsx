import React, { useEffect, useState } from 'react'
import { doctors } from '../../assets/data/doctor'
import DoctorCard from '../../components/doctors/DoctorCard'
import { BASE_URL } from '../../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from "../../components/loader/Loading"
import Error from "../../components/Error/Error"
const Doctors = () => {
  const [query , setQuery] = useState('')
  const [debounceQuery , setDebounceQuery] = useState('')
  const handleSearch = ()=>{
    setQuery(query.trim())
    console.log('handle search')
  }

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setDebounceQuery(query)
    },700)
    return ()=> clearTimeout(timeout)
  },[query])
  const {data:doctors , loading , error} = useFetchData(`${BASE_URL}/doctors?query=${query}`)

  return (
    <>
    {/* Search Bar  */}
    <section className="bg-[#fff9ea]">
      <div className="container text-center">
         <h2 className="heading">Find a Doctor</h2>
         <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between ">
          <input type='search' className="py-3.5 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor "placeholder='Search Doctor by name ' value={query} onChange={e=>setQuery(e.target.value)}/>
          <button onClick={handleSearch} className="btn mt-0 rounded-[0px] rounded-r-md py-3.5">Search</button>
         </div>
      </div>
    </section>


    <section>
         <div className="container">
         {loading && <Loader/>}
    {error && <Error/>}
        {!loading && !error &&( <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] mb-[200px]">
        {doctors.map((doctor)=>(<DoctorCard key={doctor.id} doctor={doctor}/>))}
      
    </div>)}
         </div>
    </section>
    </>
  )
}

export default Doctors
