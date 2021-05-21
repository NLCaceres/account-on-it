//* Field name will give generic computed validation message. 
//* Otherwise a fully custom message can be passed in and used on invalid data

//* Goal: Make all validators return false by default! 
//* Carve out conditional path that guarantees only valid data gets through

export function RequirementCheck(field: any, validationErrs: Array<any>, fieldName?: string, message?: string) {
  if (field !== null && field !== undefined && (field.length !== 0)) {
    return true; //* True means valid
  }

  (message) ? validationErrs.push(message) 
    : (fieldName) ? validationErrs.push(`Missing ${fieldName}`)
      : validationErrs.push('This field is required');
  
  console.log("end");
  return false; //* Return invalid by default!
}

export function MinLengthCheck(field: string | Array<any>, validationErrs: Array<any>, minLength: number = 1, fieldName?: string, message?: string) {
  let finalMessage;
  
  //* First check if field is string or array with hasOwnProperty method (since only they'd have length prop)
  //* (THOUGH maybe that's all that should be accepted here?)
  if (field.length >= minLength) return true;

  finalMessage = message ? message
  //* In the event of no fieldName or message passed, you get the following concat'd string
      : (typeof 'string') ? `Sorry! Please enter ${minLength} or more characters`
      : `Sorry! Please enter ${minLength} or more entries`      
  //* Otherwise you either get the custom message or the following that specifies field name
  if (!message && fieldName) finalMessage += ` for ${fieldName}`;
    
  validationErrs.push(finalMessage);

  return false; //* False means invalid!
}

export function MaxLengthCheck(field: string | Array<any>, validationErrs: Array<any>, maxLength: number = 40, fieldName?: string, message?: string) {
  let finalMessage;

  if (field.length <= maxLength) return true;

  finalMessage = message ? message 
    : (typeof 'string') ? `Sorry! Please enter ${maxLength} or less characters`
    : `Sorry! Please enter ${maxLength} or less entries`;
  //? Careful! Using '!!' in conditionals causes the opposite to happen! 
  //? '!!' is ONLY useful for casting undefined. NOT conditional statements
  if (!message && fieldName) finalMessage += ` for ${fieldName}`
  //* The above is just like in minLength
  
  validationErrs.push(finalMessage);
  return false;
}