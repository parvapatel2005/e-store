const {Router} = require('express');
const Category = require('../model/category.js');
const router = Router();
const upload = require('../middleware/upload.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

// Replace your current router.post('/add-category'...) line with this:
router.post('/add-category', protect, isAdmin, (req, res, next) => {
    // 1. Wrap the upload middleware to catch Cloudinary errors gracefully
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error("Cloudinary Upload Error:", err);
            // This stops the crash and sends the real error to your frontend/Postman
            return res.status(500).json({ 
                success: false, 
                message: "Image upload failed. Check Cloudinary config.", 
                error: err.message || err 
            });
        }
        next(); // If successful, move to the async function below
    });
}, async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { categoryName } = req.body;

        if (!categoryName || !categoryName.trim()) {
            return res.status(400).json({ message: "Category name is required" });
        }

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "Image is required" });
        }

        const category = new Category({
            categoryName: categoryName.trim(),
            image: req.file.path
        });

        await category.save();

        res.status(201).json({
            message: "Category Added Successfully",
            category: {
                _id: category._id,
                categoryName: category.categoryName,
                image: category.image
            }
        });

    } catch (err) {
        console.error("Category Upload DB Error:", err.message);
        res.status(500).json({
            message: err.message
        });
    }
});

router.get('/list-category', async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json({ 
            success: true,
            category: categoryList,
            count: categoryList.length
        });
    } catch (err) {
        console.error("Category List Error:", err);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch categories",
            error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
        });
    }
});

router.delete('/delete-category/:id', protect, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedCategory = await Category.findByIdAndDelete(id);
        
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ 
            message: "Category Deleted Successfully",
            category: deletedCategory
        });
    } catch (err) {
        console.error("Category Delete Error:", err);
        res.status(500).json({ 
            message: "Failed to delete category",
            error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
        });
    }
});

router.put('/update-category/:id', protect, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Category ID:", id);

        const { categoryName } = req.body;
        
        if (!categoryName || !categoryName.trim()) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Only use new image if one was uploaded, otherwise keep existing
        const image = req.file ? req.file.path : existingCategory.image;

        const updatedData = {
            categoryName: categoryName.trim(),
            image: image
        };

        const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ 
            message: "Category Updated Successfully",
            category: {
                _id: updatedCategory._id,
                categoryName: updatedCategory.categoryName,
                image: updatedCategory.image
            }
        });

    } catch (err) {
        console.error("Category Update Error:", err);
        res.status(500).json({ 
            message: "Failed to update category",
            error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
        });
    }
});

router.get('/category/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        
        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: "Category not found" 
            });
        }
        
        res.status(200).json({ 
            success: true,
            categoryList: category 
        });
    } catch (err) {
        console.error("Category Fetch Error:", err);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch category",
            error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
        });
    }
});

module.exports = router;
