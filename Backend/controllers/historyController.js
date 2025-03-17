import { getHistoryOfQueries } from '../models/query.js';


/*Main function which handles fetching history of previous queries */

export const fetchPreviousQueries = async () => {
  try {
    
    /*Internal function which fetches history of previous queries from database */
    const history = await getHistoryOfQueries();
    console.log('History of queries is:', history);

    //Return after successful fetching of the queries from database
    return {
      success:true,
      data:history
    }
} catch (error) {
  // Returning if any internal crash happend in fetching the queries
    console.error('Error fetching history', error);
    return { message: 'Sorry, Internal Server Error', success: false, error:true };
  }
}

