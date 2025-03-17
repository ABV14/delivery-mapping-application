import { fetchPreviousQueries} from '../controllers/historyController.js';
import express from 'express';
const router = express.Router();


/*
historyRoute calls the historyController for performing operations related
 to /history API route which includes fetching history of previous queries
*/


router.get('/', async (req, res) => {
    try {
        // Fetching the history of previous queries
        const result = await fetchPreviousQueries();
        console.log("List of Previous Queries",result);


        if(!result.success && result.error){
            // Sending an internal server response to the client upon any failure in fetching the results
            res.status(500).json({ success: false, message: "Something Went Wrong, Unable to fetch results" });

        }
        else{
            // Sending the final result to the client upon successful fetching
            res.status(200).json({ success: result.success, data: result.data });
    }
    } catch (error) {
        //If backend crashes, sending an internal server error to the client
        res.status(500).json({ success: false, message: error.message });
    }


}
);
export default router;