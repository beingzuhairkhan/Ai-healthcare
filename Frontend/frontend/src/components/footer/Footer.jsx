import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTwitterSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="container py-5">
      <div className="row">
        <div className="col-6 col-md-3 mb-3">
          <h1 className="text-xl font-semibold mb-4">Quick Links</h1>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About Us</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Services</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Blog</a></li>
          </ul>
        </div>

        <div className="col-6 col-md-3 mb-3">
          <h1 className="text-xl font-semibold mb-4">I want to :</h1>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Find a Doctor</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Find a Location</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Request an Appointment</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Get an Opinion</a></li>
          </ul>
        </div>

        <div className="col-6 col-md-3 mb-3">
          <h1 className="text-xl font-semibold mb-4">Support</h1>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Donate</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Contact Us</a></li>
          </ul>
        </div>

        <div className="col-md-3 mb-3">
          <h5 className="text-xl font-semibold mb-4">Contact Us</h5>
          <form>
            <div className="d-flex flex-column flex-sm-row h-[70px] w-full gap-2">
              <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
              <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
              <button className="btn btn-primary bg-primaryColor h-[40px] w-[180px] rounded-[10px]" type="button">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center border-top pt-4">
        <p className="mb-0">&copy; 2024 Company, Inc. All rights reserved.</p>
        <ul className="list-unstyled d-flex text-2xl">
          <li className="ms-3"><a className="link-body-emphasis" href="#"><FaTwitterSquare /></a></li>
          <li className="ms-3"><a className="link-body-emphasis" href="#"><FaLinkedin /></a></li>
          <li className="ms-3"><a className="link-body-emphasis" href="#"><FaInstagramSquare /></a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
