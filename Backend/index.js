import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import doctorRoute from './routes/doctor.js'
import reviewRoute from "./routes/review.js"
import bookingRoute from './routes/booking.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOption = {
    origin: true
};

app.get('/', (req, res) => {
    res.send("API is working");
});

// Database connection
mongoose.set('strictQuery', false);
const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
            //  useNewUrlParser: true,
            //  useUnifiedTopology: true,
            console.log("DB connected");
        // });
        // mongoose.connect('mongodb://127.0.0.1:27017/test');
        // console.log("DB connected");
    } catch (error) {
        console.error("MongoDB database connection failed", error);
        
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use('/api/v1/auth' , authRoute);
app.use('/api/v1/users' , userRoute);
app.use('/api/v1/doctors' , doctorRoute);
app.use('/api/v1/reviews' , reviewRoute);
app.use('/api/v1/bookings' , bookingRoute);

app.listen(port, async () => {
    await mongoDB();
    console.log("App is running on port " + port);
});
