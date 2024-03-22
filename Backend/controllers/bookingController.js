import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from 'stripe';

export const getCheckoutSession = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.userId);
        const stripe = new Stripe(process.env.STRIPE_API_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `http://localhost:5000/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor._id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        unit_amount: doctor.ticketPrice * 100,

                        product_data: {
                            name: doctor.name,
                            description: doctor.bio,
                            images: [doctor.photo || 'https://example.com/default-image.jpg']
                        }
                    },
                    quantity: 1
                }
            ],
            shipping_address_collection: {
                allowed_countries: ['IN'], // Specify the allowed countries for shipping
                phone: user.phoneNumber, // Provide the customer's phone number
            },
            customer_email: user.email, // Provide the customer's email
            customer_name: user.fullName, 
        });

        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id
        });
        await booking.save();

        res.status(200).json({ success: true, message: 'Successfully initiated checkout', session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
}
