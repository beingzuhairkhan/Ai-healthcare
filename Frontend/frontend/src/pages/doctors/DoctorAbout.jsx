import React from 'react'

const DoctorAbout = ({name , about , qualifications , experiences}) => {
  return (
    <div className="px-[1px]">
      <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">About of
      <span className="text-irisBlueColor font-bold text-[24px] leading-9">{name}</span>
      </h3>
      <p className="text-justify">{about}</p>
      <div className="mt-[15px]">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
         Education
        </h3>
        <ul className="pt-4 md:p-5">
          {qualifications?.map((item,index)=>
           <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
           <div>
               <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">{(item.startingDate)}   -    {(item.endingDate)}</span>
               <p className="text-[16px] leading-6 font-medium text-textColor">{item.degree}</p>
           </div>
           <p className="text-[16px] leading-6 font-medium text-textColor">{item.university}</p>
       </li>)}
           
        </ul>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
         Experience
        </h3>
        <ul className="pt-4 md:p-5">
          {experiences?.map((item,index)=> <li key={index}  className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                <div>
                    <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">{(item.startingDate)}   -   {(item.endingDate)}</span>
                    <p className="text-[16px] leading-6 font-medium text-textColor">{item.position}</p>
                </div>
                <p className="text-[16px] leading-6 font-medium text-textColor">{item.hospital}</p>
            </li>)}
           
        </ul>
        <div>
           
        </div>
      </div>
    </div>
  )
}

export default DoctorAbout
