import User from "../models/UserSchema.js";
import Booking  from "../models/BookingSchema.js"
import Doctor from "../models/DoctorSchema.js"
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
        console.error(err);
        res.status(404).json({ success: false, message: "Failed to delete" });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");
        res.status(200).json({ success: true, message: "User found", data: user });
    } catch (err) {
        console.error(err);
        res.status(404).json({ success: false, message: "No user found" });
    }
};

export const allUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, message: "Users found", data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
};

export const getUserProfile = async (req,res)=>{
    const userId = req.userId
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        const {password , ...rest} = user._doc ;
        return res.status(200).json({success: true, message:'user  found' , data:{...rest}});
    } catch (error) {
        return res.status(500).json({success: false, message:'Something went wrong cannot get'});
    }
}

export const getMyAppointment = async (req,res)=>{
try {
    // step - 1 retrieve appointment from booking for specific user
    const booking = await Booking.find({user:req.userId});

    //step-2 extract doctor using doctor ids
    const doctorIds =  booking.map(el=>el.doctor.id)

    //step 3 retrieve doctors using doctor ids
    const doctors = await Doctor.find({_id:{$in:doctorIds}}).select('-password')
    return res.status(200).json({success: true,  message:'Appointment are getting ' , data:doctors});
} catch (error) {
    return res.status(500).json({success: false, message:'Something went wrong cannot get'});
}    
}