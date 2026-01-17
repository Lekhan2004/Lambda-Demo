const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

// @desc Get all products
// @route GET /api/products
router.get('/', protect, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc Create a product (for seeding/testing)
// @route POST /api/products
router.post('/', protect, async (req, res) => {
    const { name, description, price, category, image, stock } = req.body;

    try {
        const product = new Product({
            name,
            description,
            price,
            category,
            image,
            stock
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
