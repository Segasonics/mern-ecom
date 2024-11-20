import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { getAnalyticsData, getDailySalesData } from '../controllers/analytics.controller.js';
const router = express.Router();

router.get('/',protectRoute,adminRoute,async(req,res)=>{
    try {
        const analyticsData = await getAnalyticsData();

        const endDate= new Date();//current date
        const startDate =new Date(endDate.getTime() - 7*24*60*60*1000);//This calculates a new date that is 7 days before endDate.
        //startDate is the date exactly 7 days before endDate
        
        const dailySalesData = await getDailySalesData(startDate,endDate);

        res.json({
            analyticsData,
            dailySalesData
        })
    } catch (error) {
        console.log("Error in analytics route",error.message);
        res.status(500).json({message:"Server error",error:error.message});
    }
})

export default router