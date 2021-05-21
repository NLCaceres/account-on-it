import { MaxLengthCheck, MinLengthCheck, RequirementCheck } from "./length_validation";

//@params: options - selector choices
export function SelectorValidation(field: string | number, validationErrs: string[], options: string[] | number[], defaultVal?: string | number, fieldName?: string, message?: string) { 
  for (const option of options) {
    if (field === option) return true;
  }
  //* If user sets a default val, use it, 
  //* Else if field is string, compare against simple expected default string on select component
  //* Else compare against expected default number
  const DefaultVal = (defaultVal) ? defaultVal : (typeof field === 'string') ? 'default' : -1
  console.log(DefaultVal);
  if (field === DefaultVal) { 
    (message) ? validationErrs.push(message)
      : fieldName ? validationErrs.push(`Please make a selection for ${fieldName}`)
        : validationErrs.push("Please make a selection!");
  }
  else validationErrs.push("Error! Invalid selection!");
  return false
}

export function ValidateWithRules(field: any, validationErrs: string[], validationRules: string | string[], fieldName?: string, message?: string) {
  //* If array then take it as is, otherwise check for a delimiter
  const finalValidationRules = (Array.isArray(validationRules)) 
    ? validationRules : (validationRules.indexOf(",") >= 0) //* Typical comma delim'd so check if any ',' exist 
      ? validationRules.split(",") : validationRules.split("|"); //* Laravel style validation rule delim
  
  let finalValidationCheck = false;
  for (const rule of finalValidationRules) {
    if (rule.length === 0) continue; //* skip or end if empty (possibly last) index

    const ruleLowered = rule.toLowerCase();
    
    finalValidationCheck = (ruleLowered === 'req' || ruleLowered === 'required') ? RequirementCheck(field, validationErrs, fieldName, message)
      : ruleLowered.startsWith("max") ? MaxLengthCheck(field, validationErrs, parseInt(ruleLowered.split(":")[1]), fieldName, message)
      : ruleLowered.startsWith('min') ? MinLengthCheck(field, validationErrs, parseInt(ruleLowered.split(":")[1]), fieldName, message)
      : false; //* Unknown/unsupported validation rule so invalidate data
  }
  
  return finalValidationCheck;
}

export interface ValidationErrObj {
  [key: string]: string[]
}

export default function FinalValidationCheck(validationErrs: ValidationErrObj) {
  for (const field in validationErrs) {
    //* If any field has err msgs, break loop, return false - INVALID
    if (validationErrs[field].length > 0) return false;
  }
  return true; //* Made it through loop, return true - VALID
}