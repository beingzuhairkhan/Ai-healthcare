import React from 'react'
import aboutImg from "../../assets/images/about.png"
import aboutcard from "../../assets/images/about-card.png"
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <section>
        <div className='container '>
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row mt-9" >
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                <img src={aboutImg}></img>
                <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                    <img src={aboutcard}></img>
                </div>
            </div>
            {/* About Content */}
            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 ">
              <h2 className="text-3xl font-bold">Proud to be on of the nations Best</h2>
              <p className="text__para">
                For 30 year in a row , U.S. News & World Report has recognized us as one of the best public hospitals in th nation and #1 in Texas.Overall, doctors play a crucial role in promoting and maintaining the health and well-being of individuals and communities, and their expertise is essential for the functioning of healthcare systems worldwide.
              </p>
              <p className="text__para">
              Doctors work in various settings, including hospitals, clinics, private practices, research institutions, and public health organizations. They often collaborate with other healthcare professionals, such as nurses, pharmacists, therapists, and specialists, to provide comprehensive care to patients.
              </p>
              <Link to='/'>
                <button className="btn">Learn More</button>
              </Link>
            </div>
            </div>    
        </div>
    </section>
  )
}

export default About
