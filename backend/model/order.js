const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items: [
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "pending",
        enum: ["pending","paid","cancelled"]
    }
});

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;