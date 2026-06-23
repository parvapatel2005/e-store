const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
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
    ]
});

const AddToCart = mongoose.model('AddToCart',addToCartSchema);

module.exports = AddToCart;