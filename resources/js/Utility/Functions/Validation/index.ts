import { MaxLengthCheck, MinLengthCheck, RequirementCheck } from "./length_validation";

//@params: options - selector choices
export function SelectorValidation(field: string | number, validationErrs: string[], options: string[] | number[], defaultVal?: string | number, fieldName?: string, message?: string) { 
  for (const option of options) {
    if (field === option) return true;
  }
  //* If default val is set, THEN use it. OR ELSE check if the field is a number to set a default of -1 OR ELSE if field is a string, use "default"
  const DefaultVal = defaultVal ?? ((typeof field === "number") ? -1 : "default");
  if (field === DefaultVal) { 
    (message) ? validationErrs.push(message)
      : fieldName ? validationErrs.push(`Please make a selection for ${fieldName}`)
        : validationErrs.push("Please make a selection!");
  }
  else validationErrs.push("Error! Invalid selection!");
  return false
}

//? Example of string-based Rules: "req" OR "req|max:40" (required with max 40 characters) OR "req|min:8" OR "req,min:4,max:100"
//? Alternatively, an array of these values works too: ["req"] OR ["req", "max:40", "min: 2"]
export function ValidateWithRules(field: any, validationErrs: string[], validationRules: string | string[], fieldName?: string, message?: string) {
  //* If array then take it as is, otherwise check for a delimiter
  const finalValidationRules = (Array.isArray(validationRules)) 
    ? validationRules : (validationRules.indexOf(",") >= 0) //* Typical comma delim'd so check if any ',' exist 
      ? validationRules.split(",") : validationRules.split("|"); //* Laravel style validation rule delim
  
  let finalValidationCheck: boolean | undefined = undefined;
  for (const rule of finalValidationRules) {
    if (rule.length === 0) continue; //* skip or end if empty (possibly last) index

    const ruleLowered = rule.toLowerCase(); //? To simplify checking the name and params of the arg, lowercase it!
    
    const validationCheck = (ruleLowered === 'req' || ruleLowered === 'required') ? RequirementCheck(field, validationErrs, fieldName, message)
      : ruleLowered.startsWith("max") ? MaxLengthCheck(field, validationErrs, parseInt(ruleLowered.split(":")[1]), fieldName, message)
      : ruleLowered.startsWith('min') ? MinLengthCheck(field, validationErrs, parseInt(ruleLowered.split(":")[1]), fieldName, message)
      : false; //* Unknown/unsupported validation rule so invalidate data

      if (finalValidationCheck !== false) { finalValidationCheck = validationCheck }
  }
  
  return finalValidationCheck ?? false;
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