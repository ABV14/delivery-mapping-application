const baseURL = "http://localhost:3546"

type RequestOptions = RequestInit;

export async function fetchAPI<T>(url: string, options: RequestOptions={}): Promise<T | undefined>{
    let urlToCall = `${baseURL}${url}`
    console.log(urlToCall);
    try{
        const response = await fetch(urlToCall, options);
        console.log(response);
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}-${errorText}`)
        }
        return response.json();
    }
    catch(error){
        console.error(`Error fetching ${url}`,error);
    }

}

export async function get<T>(url:string):Promise<T | undefined> {
    return fetchAPI<T>(url,{
        method:"GET"
    })
}

export async function post<T, U>(url:string, payload:T):Promise<U | undefined> {
    return fetchAPI<U>(url,{
        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(payload)
    })
}