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
import bodyParser from 'body-parser';
import natural from 'natural';
import fs from 'fs';
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

// Symptom Checker
class SymptomChecker {
    constructor() {
        this.classifier = new natural.BayesClassifier();
        this.tokenizer = new natural.WordTokenizer();
        this.tfidf = new natural.TfIdf(); // Initialize tfidf object here

        this.trainModel();
    }

    trainModel() {
        try {
            // Read symptoms from file
            const symptoms = JSON.parse(fs.readFileSync('symptoms.json'));

            // Add symptoms to the classifier and tfidf
            symptoms.forEach(({ symptom, condition }) => {
                this.classifier.addDocument(symptom, condition);
                this.tfidf.addDocument(symptom);
            });

            // Train the classifier
            this.classifier.train();
        } catch (error) {
            console.error("Error training model:", error);
        }
    }

    checkSymptoms(symptom) {
        if (!symptom) {
            return 'Symptom not provided';
        }
        const result = this.classifier.classify(symptom);
        return result !== 'Migraine' ? result : 'Symptom not found';
    }

    tokenizeInput(text) {
        return this.tokenizer.tokenize(text).join(' ');
    }

    getHomeRemedies(condition) {
        try {
            // Read remedies from file
            const remedies = JSON.parse(fs.readFileSync('remedies.json'));

            // Get remedies for the specified condition
            return remedies[condition] || ['No home remedy found. Please consult a doctor.'];
        } catch (error) {
            console.error("Error fetching remedies:", error);
            return ['Error fetching remedies. Please consult a doctor.'];
        }
    }
}

const symptomChecker = new SymptomChecker();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/v1/symptom-checker', (req, res) => {
    const { symptom } = req.body;
    
    // If symptom is not provided, advise to consult a doctor
    if (!symptom) {
        return res.status(400).json({ error: 'Symptom not provided. Please consult a doctor.' });
    }
    
    let result = symptomChecker.checkSymptoms(symptom);
    let remedies = [];
    
    // If the symptom is not found or if it's a generic symptom like "pain", advise to consult a doctor
    if (result === 'Symptom not found' || result === 'Pain') {
        return res.status(404).json({ error: 'Symptom not found. Please consult a doctor.' });
    }
    
    // If the symptom is found, get the remedies
    remedies = symptomChecker.getHomeRemedies(result);
    
    res.json({ result, remedies });
});



app.post('/api/v1/tokenize', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    const result = symptomChecker.tokenizeInput(text);
    res.json({ result });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});


app.listen(port, async () => {
    await mongoDB();
    console.log("App is running on port " + port);
});
