import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  try {
    const stats = await this.aggregate([
      {
        $match: { doctor: doctorId },
      },
      {
        $group: {
          _id: "$doctor",
          numOfRating: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);
    if (stats.length > 0) {
      await Doctor.findByIdAndUpdate(doctorId, {
        totalRating: stats[0].numOfRating,
        averageRating: stats[0].avgRating,
      });
    } else {
      console.log("No reviews found for the doctor.");
    }
  } catch (error) {
    console.error("Error calculating average ratings:", error);
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctor);
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
