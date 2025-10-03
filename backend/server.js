import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import couponRoutes from './routes/coupon.route.js'
import paymentRoutes from './routes/payment.route.js'
import analyticRoutes from './routes/analytic.route.js'
import path from "path"

dotenv.config();

const app = express();
const PORT =process.env.PORT || 5000;

const __dirname = path.resolve()


app.use(express.json({limit:'10mb'})); //allows you to parse the body of the request
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/coupons',couponRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/analytics',analyticRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/frontend/dist')));
}

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})
app.listen(PORT,()=>{
    console.log("Server is running on port :" ,PORT)
    connectDB()
})

//u5y8hGlqg3qMzwbR