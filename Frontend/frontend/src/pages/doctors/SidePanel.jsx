import React from 'react'
import { BASE_URL , token } from './../../../config.js'
import { toast } from 'react-toastify';
const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
    const bookingHandler = async () => {
        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Booking failed. Please try again.'); // Handle missing error message
            }
            if ( data.session.url) { // Check if data.session is defined
                window.location.href = data.session.url;
            } else {
                throw new Error('Booking session URL not found.'); // Handle missing URL
            }
        } catch (error) {
            toast.error(error.message || 'Booking failed. Please try again.'); // Handle missing error message
        }
    };
    return (

        <div className="shadow-panelShadow ml-[400px] w-[400px] p-3 lg:p-5 rounded-md mt-[50px]  
    ">
            <div className="flex items-center justify-between gap-10 ">
                <p className="text__para mt-0 font-semibold">Ticket Price</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">{ticketPrice} INR</span>
            </div>
            <div className="mt-[30px]">
                <p className="text__para mt-0 font-semibold text-headingColor">Available Time Slots</p>
                <ul className="mt-3">
                    {timeSlots?.map((item, index) => (
                        <li key={index} className="flex items-center justify-between mb-2">
                            <p className="text-[15px] leading-6 text-headingColor font-semibold">
                                {item.day.charAt(0).toUpperCase()+item.day.slice(1)}
                            </p>
                            <p className="text-[15px] leading-6 text-headingColor font-semibold">
                            {item.startingTime} - {item.endingTime}
                            </p>
                        </li>
                    ))}


                </ul>
                <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">Book Appointment</button>

            </div>
        </div>
    )
}

export default SidePanel
