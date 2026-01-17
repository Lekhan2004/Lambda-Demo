const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const products = [
    {
        name: "Quantum Sphere",
        description: "A mysterious device that manipulates local reality. Not for use near pets.",
        price: 1299.99,
        category: "Gadgets",
        stock: 5,
    },
    {
        name: "Nebula Projector",
        description: "Transforms any room into a breathtaking galactic vista with high-fidelity visuals.",
        price: 450.00,
        category: "Decor",
        stock: 12,
    },
    {
        name: "Infinity Watch",
        description: "A timeless piece that somehow shows you the time in three different dimensions.",
        price: 8990.00,
        category: "Accessories",
        stock: 2,
    },
    {
        name: "Aero Hoverboard",
        description: "Zero-friction travel through city streets. Requires level 3 stability license.",
        price: 2400.00,
        category: "Transport",
        stock: 10,
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany({});
        console.log('Cleared existing products.');

        await Product.insertMany(products);
        console.log('Sample products seeded successfully!');

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
