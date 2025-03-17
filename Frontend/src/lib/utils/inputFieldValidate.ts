export function validateField(value:string,label:string):{ message: string, valid: boolean } {
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
    return {
        message: error,
        valid: error === ""
    };
}

export function checkInvalidCharacter(value:string){
    if(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|UNION|--|;|\/\*|\*\/)\b/i.test(value)){
        return true ;
    }
    return false;
}
