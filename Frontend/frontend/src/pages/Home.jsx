import React from "react";
import hero1 from "../assets/images/hero-img01.png";
import hero2 from "../assets/images/hero-img02.png";
import hero3 from "../assets/images/hero-img03.png";
import icon1 from "../assets/images/icon01.png";
import icon2 from "../assets/images/icon02.png";
import icon3 from "../assets/images/icon03.png";
import videoicon from "../assets/images/video-icon.png";
import featureimg from "../assets/images/feature-img.png";
import pavatar from "../assets/images/patient-avatar.png";
import Bot from "../assets/images/bot-icon.png";
import faq from "../assets/images/faq-img.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/about/About.jsx";
import ServiceList from "../components/services/ServicesList.jsx";
import DoctorList from "../components/doctors/DoctorList.jsx";
import FaqList from "../components/faq/FaqList.jsx";
// import Testimonial from '../components/testimonial/Testimonial.jsx'

const Home = () => {
  return (
    <>
      {/* Hero section start */}
      <section>
        <div className="hero_section pt-[60px] 2xl:h-[700px]">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
              {/* hero__content */}
              <div>
                <div className="lg:w-[570px]">
                  <h1 className="text-[36px] leading-[46px] text-headingColor font-[800px] md:text-[60px] md:leading-[70px]">
                    We help patients live a healthy, longer life.
                  </h1>
                  <p className="text__para text-justify">
                    Our AI healthcare website harnesses the power of artificial
                    intelligence to revolutionize healthcare delivery. Through
                    cutting-edge technology, we provide personalized and
                    accessible medical solutions, including symptom assessment,
                    diagnostic support, treatment recommendations, and health
                    monitoring. Our platform empowers patients with reliable
                    information, connects them with healthcare providers, and
                    enhances overall health outcomes. Experience the future of
                    healthcare with our AI-driven platform.
                  </p>
                
                  <Link to='/doctors'>
                  <button className="btn"> Request an Appointment  </button>
                  </Link>
                </div>
              </div>
              {/* hero_img */}
              <div className="flex gap-[30px] justify-end">
                <div>
                  <img className="w-full" src={hero1}></img>
                </div>
                <div>
                  <img src={hero2} className="w-full mb-[30px]"></img>
                  <img src={hero3} className="w-full"></img>
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="h-[80px] w-[80px] bottom-0 animate-bounce ml-[50px] fixed mb-[50px] ">
              <a href="https://mediafiles.botpress.cloud/250d0195-0d6e-4132-9c5e-ac69d54d78ca/webchat/bot.html">
                <img className="rounded-full" src={Bot}></img>
              </a>
            </div>
          </section>
        </div>
      </section>
      {/* Hero section end */}

      <section>
        <div className="container">
          <div className="lg:w-[470px]  mx-auto mt-9">
            <h2 className="text-3xl text-center font-bold ">
              Providing the best medical services
            </h2>
            <p className="text_para text-center">
              World-class care for everyone. our health system offers unmatched
              , expert health care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap:5 lg:gap[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon1}></img>
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-headingColor font-[400] mt-4 text-center ">
                  World-class care for everyone. our health system offers
                  unmatched , expert health care.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon2}></img>
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-headingColor font-[400] mt-4 text-center ">
                  World-class care for everyone. our health system offers
                  unmatched , expert health care.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon3}></img>
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-headingColor font-[400] mt-4 text-center ">
                  World-class care for everyone. our health system offers
                  unmatched , expert health care.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Services Section */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto mt-[50px]">
            <h2 className="text-3xl font-bold text-center ">
              Our Medical Service
            </h2>
            <p className="text__para text-center">
              World-class care for everyone. our health system offers unmatched,
              expert health care
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* Feature section */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row mt-[50px]">
            {/* feature Content */}
            <div className="xl:w-[670px]">
              <h2 className="text-3xl font-bold">
                Get Virtual Treatment <br /> anytime.
              </h2>
              <ul className="pl-4">
                <li className="text__para">
                  1. Schedule the appointment directly.
                </li>
                <li className="text__para">
                  2. Search the physician here , and contact their office.
                </li>
                <li className="text__para">
                  3. View our Physician s who are accepting new patients. use
                  the online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to="/">
                <button className="btn">Learn More</button>
              </Link>
            </div>
            {/* feature image */}
            <div className=" relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureimg} className="w-3/4"></img>

              <div className="bg-rose-100 w-[150px] lg:w-[248px] absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px] ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[600]">
                      tue, 24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[600]">
                      10:00Am
                    </p>
                  </div>
                  <span className="bg-black w-10 h-10 lg-w-[34px] flex items-center justify-center  rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoicon}></img>
                  </span>
                </div>
                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                  Consultation
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px] ">
                  <img src={pavatar}></img>
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Wayne Collins
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Container */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto mt-[80px]">
            <h2 className="text-3xl font-bold text-center ">
              Our Great Doctors
            </h2>
            <p className="text__para text-center">
              World-class care for everyone. our health system offers unmatched,
              expert health care
            </p>
          </div>
          <DoctorList />
        </div>
      </section>

      {/* Faq section */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0 mt-[100px]">
            <div className="w-[400px] hidden md:block">
              <img src={faq}></img>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold ">
                Most Question by our beloved patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      {/* testimonial */}
      {/* <section>
        <div className="container">
        <div className="xl:w-[470px] mx-auto mt-[80px]">
            <h2 className="text-3xl font-bold text-center ">What our Patient say</h2>
            <p className="text__para text-center" >World-class care for everyone. our health system offers unmatched, expert health care</p>

          </div> */}
      {/* <Testimonial/> */}
      {/* </div>
       </section> */}
    </>
  );
};

export default Home;
