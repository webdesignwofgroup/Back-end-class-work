import dotenv from 'dotenv';
import express from 'express';
import { mongoose } from 'mongoose';
import userRouter from './Route/User.js';
import productRouter from './Route/Product.js';

dotenv.config();

const app = express();
app.use(express.json());

console.log('my name is Emma');

// Test route
app.get('/', (req, res) => {
    res.send('Hello Queen');
});

// Mount routes BEFORE listen()
app.use('/api/users', userRouter);
app.use('/api/product', productRouter);
console.log("Product route mounted at /api/product");   // <-- Add this

// Connect to MongoDB
mongoose.connect(process.env.MONOGODB_URL)
    .then(() => {
        console.log("connected to my database Emma");
    })
    .catch(() => {
        console.log('Fail to connect to database');
    });

// Start the server LAST
app.listen(3000, () => {
    console.log("backend is running on port 3000");
});
