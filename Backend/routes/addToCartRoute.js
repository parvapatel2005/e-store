const {Router} = require('express');
const Category = require('../model/category.js');
const router = Router();
const upload = require('../middleware/upload.js');
const { protect } = require('../middleware/authMiddleware.js');
const AddToCart = require("../model/addToCart.js");


router.post('/add-to-cart', protect, async (req, res) => {
    try {
        console.log(req.body);

        const { productId, quantity } = req.body;
        const user = req.user._id;

        let cart = await AddToCart.findOne({userId : user})
        console.log(cart);

        if(!cart){
            cart = await AddToCart.create({
                userId: user,
                items:[
                    {
                        product: productId,
                        quantity: quantity
                    }
                ]
            })
        }else{
            const itemIndex = cart.items.findIndex((item)=>item.product && item.product.toString() === productId)

            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity
            }else{
                cart.items.push({
                    product:productId,
                    quantity
                })
            }
        }
        
        await cart.save();


        res.status(200).json({ message: "Product is Added to cart" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/get-cart', protect, async (req, res) => {
    try{
        const user = req.user._id;
        const cart = await AddToCart.findOne({ userId: user })
            .populate({
                path: "items.product",
                populate: {
                    path: "categories"
                }
            });
        console.log(cart)

        if(!cart){
            res.status(404).json({message: "Cart not found"})
        }

        res.status(200).json({cartItem: cart.items})
    }catch(err){
        res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
});

router.put('/update-quantity', protect, async (req, res) => {
    try{
        const {productId,quantity} = req.body;
        const user = req.user._id;
        
        let cart = await AddToCart.findOne({userId: user});
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        const itemIndex = cart.items.findIndex((item) => item.product && item.product.toString() === productId);

        if(itemIndex > -1){
            cart.items[itemIndex].quantity = quantity;
            cart.save();
        }

        return res.status(200).json({message: "Product quantity updated succesfully"});
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message})
    }
});

router.delete('/remove-item/:itemId', protect, async (req, res) => {
    try{
        const {itemId} = req.params;
        const user = req.user._id;

        let cart = await AddToCart.findOne({userId: user});
        if(!cart){
            return res.status(404).json({message: "Cart not found"})
        }

        const itemIndex = cart.items.findIndex((item)=> item._id.toString() === itemId);

        if(itemIndex > -1){
            cart.items.splice(itemIndex,1);
            await cart.save();
        }

        return res.status(200).json({message: "Product removed succesfully"});
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message})
    }
});

router.delete('/clear-cart', protect, async (req, res) => {
    try{
        const user = req.user._id;
        const cart = await AddToCart.findOne({userId: user});

        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        cart.items = [];
        await cart.save();

        return res.status(200).json({message: "Cart cleared succesfully"});
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message})
    }
});

module.exports = router;
