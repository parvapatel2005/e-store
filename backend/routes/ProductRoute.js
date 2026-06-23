const {Router} = require('express');
const Product = require('../model/product.js');
const router = Router();
const upload = require('../middleware/upload.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');


router.post('/add-product', protect, isAdmin, upload.single('image'), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const { productName, description, price, categories } = req.body;
        const image = req.file ? req.file.path : null;

        const product = new Product({
            productName,
            description,
            price,
            image,
            categories
        });

        await product.save();
        res.status(200).json({ message: "Product Added Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/list-product', async (req, res) => {
    try {
        const productList = await Product.find().populate("categories");
        res.status(200).json({ products: productList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/delete-product/:id', protect, isAdmin, async (req, res) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/update-product/:id', protect, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const {id} = req.params;
        console.log("Product ID:", id);

        const { productName, description, price, categories } = req.body;
        const image = req.file ? req.file.path : null;
        
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedData = {
            productName: productName,
            description: description,
            price: price,
            image: image || existingProduct.image,
            categories: categories
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        console.log(req.body);
        console.log(req.file);

        res.status(200).json({ message: "Product Updated Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ productList: product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
