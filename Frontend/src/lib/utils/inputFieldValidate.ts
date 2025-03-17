/**
 * Validates a text field input by checking for:
 *  - An empty value.
 *  - A minimum length requirement (at least 5 characters).
 *  - The presence of invalid characters that could indicate SQL injection attempts.
 *
 * @param value - The input string to validate.
 * @param label - The label of the input field, used in error messages.
 * @returns An object containing:
 *   - message: A string with the error message (empty if no error).
 *   - valid: A boolean indicating whether the input is valid.
 */
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

/**
 * Checks whether the given text value contains any potentially dangerous SQL commands or syntax,
 * which may be indicative of an SQL injection attempt.
 *
 * The function tests for keywords and patterns such as SELECT, INSERT, UPDATE, DELETE, DROP,
 * and other common SQL injection markers, including comment and semicolon characters.
 *
 * @param value - The input string to check for invalid SQL patterns.
 * @returns A boolean value:
 *   - true: if any invalid SQL-related patterns are found.
 *   - false: otherwise.
 */
export function checkInvalidCharacter(value:string){
    if(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|UNION|--|;|\/\*|\*\/)\b/i.test(value)){
        return true ;
    }
    return false;
}
