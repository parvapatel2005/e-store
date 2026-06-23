const Order = require("../model/order.js");
const { protect } = require("../middleware/authMiddleware.js");
const { Router } = require("express");
const razorpayInstance = require("../middleware/razorpay");
const AddToCart = require("../model/addToCart.js");
const crypto = require("crypto");

const router = Router();

// Create Razorpay Order
router.post("/create-order", protect, async (req, res) => {
    const { amount, currency = "INR" } = req.body;

    try {
        const options = {
            amount: amount * 100,
            currency,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        await Order.create({
            userId: req.user._id,
            amount,
            currency,
            status: "pending",
            orderId: razorpayOrder.id,
        });

        res.status(200).json(razorpayOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating Razorpay order",
        });
    }
});

// Verify Payment
router.post("/verify-order", protect, async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        cartItems,
    } = req.body;

    try {
        // Verify Signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        // Update existing order
        const order = await Order.findOneAndUpdate(
            {
                orderId: razorpay_order_id,
                userId: req.user._id,
            },
            {
                status: "paid",
                paymentId: razorpay_payment_id,
                items: cartItems,
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Clear user's cart
        await AddToCart.findOneAndUpdate(
            { userId: req.user._id },
            { $set: { items: [] } }
        );

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            order,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error verifying payment",
        });
    }
});

module.exports = router;