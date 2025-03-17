export function validateField(value:string,label:string):{ message: string, valid: boolean } {
    console.log(value);
    let error:string=""
    if(value === ""){
        error=`${label} is required`;
    }
    else if(value.length < 5){
        error=`${label} must be at least 5 characters long`;
    }
    else if(checkInvalidCharacter(value)){
        error=`${label} Input contains invalid characters.`;
        
    }
    console.log(error)
    return {
        message: error,
        valid: error === ""
    };
}

export function checkInvalidCharacter(value:string){
    if(/[<>'"();]/.test(value)){
        return true ;
    }
    return false;
}
