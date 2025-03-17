/**
 * Provides utility functions for making API requests.
 *
 * The module exports three main functions:
 *
 * 1. fetchAPI:
 *    - A generic function that wraps the native fetch API.
 *    - Constructs the complete URL using a base URL from environment variables.
 *    - Processes the response:
 *         * If status 200, logs success and returns the parsed JSON.
 *         * If status 400, returns the parsed JSON (for error details).
 *         * For other statuses, throws an error with details.
 *    - Catches and logs any errors during the fetch operation.
 *
 * 2. get:
 *    - A convenience function for performing GET requests.
 *    - Calls fetchAPI with the appropriate GET options.
 *
 * 3. post:
 *    - A convenience function for performing POST requests.
 *    - Serializes the payload to JSON.
 *    - Calls fetchAPI with the appropriate POST options including headers and request body.
 *
 * Usage:
 *    Import these functions to perform standardized API calls, ensuring error handling and consistent request options.
 */
const baseURL = import.meta.env.VITE_API_URL;

type RequestOptions = RequestInit;

export async function fetchAPI<T>(url: string, options: RequestOptions={}): Promise<T | undefined>{
    let urlToCall = `${baseURL}${url}`
    try{
        const response = await fetch(urlToCall, options);
        if(response.status == 200){
            console.log("Succesful call");
            return response.json();
        }
        else if(response.status == 400){
             return response.json();
        }
       else{
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}-${errorText}`)
        }
    }
    catch(error){
        console.error(`Error fetching ${url}`,error);
    }

}

/**
 * Performs a GET request.
 *
 * @param url - The endpoint path (appended to the base URL).
 * @returns The parsed JSON response or undefined if an error occurs.
 */
export async function get<T>(url:string):Promise<T | undefined> {
    return fetchAPI<T>(url,{
        method:"GET",
        mode: 'cors',

    })
}


/**
 * Performs a POST request.
 *
 * @param url - The endpoint path (appended to the base URL).
 * @param payload - The data to be sent as the request body.
 * @returns The parsed JSON response or undefined if an error occurs.
 */
export async function post<T, U>(url:string, payload:T):Promise<U | undefined> {
    return fetchAPI<U>(url,{
        method:"POST",
        mode: 'cors',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(payload)
    })
}