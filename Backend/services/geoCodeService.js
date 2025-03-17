import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/*
This module handles services that provides following functionalities
    1. To get coordinatees of Addresses, getCoordinatesOfAddress is used
    2. To calculate the angular distance between 2 locations, calculateDistanceUsingCoordinates is used

*/


// getCoordinatesOfAddress uses nominatim API to fetch coordinates of the address
export const getCoodinatesOfAddress = async (address) => {
    try{
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
            q: address,
            format: 'json',
            limit: 1
        }
    });
    
    //if the API is unable to fetch the coordinates of the address, we throw error "Address not found"
    if(response.data.length === 0){
        throw new Error('Address not found');
    }
    
    //if the address is found, we return the latitude and longitude in float format
        return {
            lat: parseFloat(response.data[0].lat),
            lon: parseFloat(response.data[0].lon)
        };

    } catch (error) {

        //Any internal failure is logged as error.
        console.error(`Error fetching coordinates for address: ${address}`, error);
        throw new Error('Failed to get coordinates');
    }
};

export function toRadian(value) {
    return value * (Math.PI / 180);
}

/*
calculateDistanceUsingCoordinates calculates the angular distance 
between 2 locations using haversine formula.
*/ 
export const calculateDistanceUsingCoordinates = (sourceCoordinates, destinationCoordinates) => {
    const radius_of_earth_in_kms = 6371; // Radius of the Earth in kilometers
    const radius_of_earth_in_miles = 3958.8; // Radius of the Earth in miles

    //Converting degrees to Radians of source and destination latitutde coordinates
    const sourceLatitude = toRadian(sourceCoordinates.lat);
    const destinationLatitude = toRadian(destinationCoordinates.lat);

    //Converting degrees to Radians of source and destination longitude coordinates
    const sourceLongitude = toRadian(sourceCoordinates.lon);
    const destinationLongitude = toRadian(destinationCoordinates.lon);

    //Finding the difference of values in langitude and longitude in terms of radians
    const distanceInLatitudeInRadians = destinationLatitude - sourceLatitude;
    const distanceInLongitudeInRadians = destinationLongitude - sourceLongitude;

    console.log('sourceLatitude:', sourceLatitude);
    console.log('destinationLatitude:', destinationLatitude);
    console.log('sourceLongitude:', sourceLongitude);
    console.log('destinationLongitude:', destinationLongitude);
    console.log('distanceInLatitudeInRadians:', distanceInLatitudeInRadians);
    console.log('distanceInLongitudeInRadians:', distanceInLongitudeInRadians);

    // Formula for calculating half_chord_length
    let half_chord_length =
        (Math.sin(distanceInLatitudeInRadians / 2) ** 2) +
        (Math.cos(sourceLatitude) * Math.cos(destinationLatitude) *
        (Math.sin(distanceInLongitudeInRadians / 2) ** 2));


    half_chord_length = Math.min(1, Math.max(0, half_chord_length));
    console.log('half_chord_length ', half_chord_length);

    // Formula for finding angular distance 
    const angularDistance = 2 * Math.atan2(Math.sqrt(half_chord_length), Math.sqrt(1 - half_chord_length));
    console.log('angularDistance:', angularDistance);

    // Calculating distance in terms of kilometers and miles
    const distance_in_Kms = radius_of_earth_in_kms * angularDistance;
    const distance_in_Miles = radius_of_earth_in_miles * angularDistance;
    console.log('distance_in_Kms:', distance_in_Kms);
    console.log('distance_in_Miles:', distance_in_Miles);

    //Returning the valuees of distance in kms and distance in miles
    return { 
        distance_in_Kms: Number(distance_in_Kms) || 0, 
        distance_in_Miles: Number(distance_in_Miles) || 0
    };;
}

