import express from 'express';
import { calculateDistanceBetweenAddresses } from '../controllers/distanceController.js';

const router = express.Router();


/*
DistanceRoute calls the distanceController for performing operations related
 to /distance API route like distance calculations
*/


router.post('/', async (req, res) => {
    try {
        // Call the function and save the result
        const result = await calculateDistanceBetweenAddresses(req.body);
        console.log("Distance calculated between two points",result);

        if(!result.success){
            // returning 400 bad request, if the address is not found
            res.status(400).json({ success: result.success, message: result.message });
        }
        else if(result.error){
            // Returning a internal server error if faced any issue during distance calculation
            res.status(500).json({ success: false, message: error.message });
        }
        else{
        // Send the result to the client upon successful calculation
        res.status(200).json({ success: result.success, data: result.distance });
    }
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong and the calculation failed" });
    }
});

export default router;