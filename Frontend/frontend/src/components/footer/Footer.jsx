import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin , FaInstagramSquare  } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <footer className="px-[200px] mt-[100px]">
    <div className="row">
      <div className="col-6 col-md-2 mb-3">
        <h1 className="text-xl font-semibold mb-[20px]" >Quick Links</h1>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About Us</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Services</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Blog</a></li>
        </ul>
      </div>

      <div className="col-6 col-md-2 mb-3">
        <h1 className="text-xl font-semibold mb-[20px]">I want to :</h1>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Find a Doctor</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Find a Location</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Request a Appointment</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Get a Opinion</a></li>

        </ul>
      </div>

      <div className="col-6 col-md-2 mb-3">
        <h1 className="text-xl font-semibold mb-[20px]">Support</h1>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Donate</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Contact Us</a></li>
          
        </ul>
      </div>

      <div className="col-md-5 offset-md-1 mb-3">
        <form>
          <h5 className="text-xl font-semibold mb-[20px]">Contact Us</h5>
        
          <div className="d-flex flex-column flex-sm-row h-[70px] w-full gap-2">
            <label for="newsletter1" className="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" className="form-control" placeholder="Email address" fdprocessedid="4eudd8"/>
            <button className=" btn-primary bg-primaryColor h-[40px] w-[180px] rounded-[10px]" type="button" fdprocessedid="9zg3jd">Submit</button>
          </div>
        </form>
      </div>
    </div>

    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top font-bold">
  <p>© 2024 Company, Inc. All rights reserved.</p>
  <ul className="list-unstyled d-flex text-2xl">
    <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="50px" height="50px"><FaSquareXTwitter /></svg></a></li>
    <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="50" height="50"><FaLinkedin /></svg></a></li>
    <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="50" height="50"><FaInstagramSquare /></svg></a></li>
  </ul>
</div>

  </footer>
    </div>
     
  )
}

export default Footer
