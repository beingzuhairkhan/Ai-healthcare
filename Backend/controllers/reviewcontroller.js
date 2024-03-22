import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const getAllReview = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, message: 'Successful', data: reviews });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Not Found' });
    }
};

export const createReview = async (req, res) => {
    try {
        // Create a new review instance
        const newReview = new Review({
            user: req.userId,
            doctor: req.params.doctorId,
            ...req.body  // Include other review fields from the request body
        });

        // Save the new review
        const savedReview = await newReview.save();

        // Update the doctor's reviews array with the new review ID
        await Doctor.findByIdAndUpdate(req.params.doctorId, {
            $push: { reviews: savedReview._id }
        });

        // Respond with success message and the saved review data
        res.status(200).json({ success: true, message: 'Review created successfully', data: savedReview });
    } catch (error) {
        // If an error occurs, respond with an error message
        res.status(500).json({ success: false, message: 'Failed to create review', error: error.message });
    }
};
