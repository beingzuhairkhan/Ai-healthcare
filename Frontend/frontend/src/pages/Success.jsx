import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <h1 className='flex justify-center text-2xl mt-10 mb-10 font-semi-bold'>Payment Successful!</h1>
      <div style={{ width: '200px', margin: 'auto' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="green"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14l4 4 8-8" />
        </svg>
      </div>
      <p  className='flex justify-center text-2xl mt-10 mb-10 font-semi-bold'>Thank you for your purchase. Your payment was successful.</p>
      {/* You can add additional content or components here */}
      <div className="py-10 text-center">
        <Link to='/home' className="px-12 btn text-white font-semibold py-3">
          Go Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
