import React, { useState } from 'react';
import { AiFillStar } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { BASE_URL,token } from '../../../config';
import { toast } from 'react-toastify';
import HasLoader from "react-spinners/HashLoader.js"
const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const handleSubmitReview = async e => {
        e.preventDefault();
        setLoading(true);
    
        try {
            if (!rating || !reviewText) { // Changed from !review to !reviewText
                setLoading(false);
                return toast.error('Rating and Review Fields are required');
            }
            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ rating,  reviewText }) // Changed from review to reviewText
            });
            const result = await res.json();
    
            if (!res.ok) {
                throw new Error("error");
            }
            setLoading(false);
            toast.success(result.message);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };
    

    return (
        <form action=''>
            <div className="px-[170px]">
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
                    How would you rate the overall Experience ?
                </h3>
                <div>
                    {[...Array(5).keys()].map((index) => {
                        const starValue = index + 1;
                        return (
                            <button
                                key={starValue}
                                type='button'
                                className={`${starValue <= (rating || hover) ? "text-yellow-400" : "text-black"} bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                onClick={() => setRating(starValue)}
                                onMouseEnter={() => setHover(starValue)}
                                onMouseLeave={() => setHover(rating)}
                                onDoubleClick={() => {
                                    setHover(0);
                                    setRating(0);
                                }}>
                                <span><AiFillStar /></span>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="mt-[30px] px-[170px]">
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
                    Share yourfeedback or  suggestion
                </h3>
                <textarea className="border border-solid border-[#0066ff34] focus:outline outline-primaryColorcr rounded-md font-semibold w-full px-4 py-3" rows="5" placeholder='Write your Message'
                    onChange={e => setReviewText(e.target.value)}></textarea>

            </div>
            <div className="px-[170px]">
                <button type='submit' className="btn " onClick={handleSubmitReview}>{loading ? <HasLoader size={25} color='#fff'/>:`Submit Feedback`}</button>
            </div>
        </form>
    );
};

export default FeedbackForm;
