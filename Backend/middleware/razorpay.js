const Razorpay = require('razorpay');
const dotenv = require('dotenv');
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables for security
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("Razorpay instance created with key_id:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay instance created with key_secret:", process.env.RAZORPAY_KEY_SECRET);
module.exports = razorpayInstance;