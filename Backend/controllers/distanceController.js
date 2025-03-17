import { getCoodinatesOfAddress, calculateDistanceUsingCoordinates } from '../services/geoCodeService.js';
import { insertQuery } from '../models/query.js';


/*Main function which handles fetching coordinates of addresses
 and calculates distance based on coordinates */
export const calculateDistanceBetweenAddresses = async (requestBody) => {
  try {
    console.log('Request Body:', requestBody);
    const { source, destination } = requestBody;

    if (!source || !destination) {
      /* If either of source or destination is empty fields, 
       returning this error to stop internal crashes */
      return { message: 'Source and Destination are required', success: false };
    }
    else{
    
    //Source coordinates are calculated
    const sourceCoordinates = await getCoodinatesOfAddress(source);
    console.log('Source Coordinates:', sourceCoordinates);
    
    //Destination coordinates are calculated
    const destinationCoordinates = await getCoodinatesOfAddress(destination);
    console.log('Destination Coordinates:', destinationCoordinates);
    
    //Calculating Distances between source and destination coordinates
    const distance = calculateDistanceUsingCoordinates(sourceCoordinates, destinationCoordinates);
    console.log('Distance Calculated:', distance);


    //Inserting the calculated distance of respective source and destination into database
    const insertionSuccessful = await insertQuery(source, destination, distance.distance_in_Kms, distance.distance_in_Miles);
    console.log('Insertion Successful:', insertionSuccessful);
    
    /* Upon Successful insertion of query into database 
      returning the following to ensure successful end-to-end flow of operation
    */
    if(insertionSuccessful){
    return {
      distance:distance,
      message:"Distance calculated successfully",
      success:true
    };
  }
  else{
    //If the 3rd party nominatim API fails to calculate distance, sending a operation failure status to the route serving this controller
    return { message: 'Something went wrong and the calculation failed', success: false, error:true };
  }
    }
}
   catch (error) {
      //Any internal crash is treated as internal server erroor sending an internal server error to the route serving this controller
    console.log('Error calculating distance', error);
    return { message: 'Sorry, Internal Server Error', success: false, error:true };
  }
}
