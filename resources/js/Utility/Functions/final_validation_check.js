import { DEFAULT_VALIDATION_ERR_TRANSITION } from '../Constants/transitions';

export default function FinalValidationCheck(validationErrs, validationTransitions) {
  let valid = true;
  for (const field in validationErrs) {
    const validErrsExist = validationErrs[field].length > 0;
    validationTransitions[field] = validErrsExist
      ? "slide-abs-leave-active"
      : DEFAULT_VALIDATION_ERR_TRANSITION;

    //* Once not valid, keep it that way so short circuit used
    //* If so far no validationErrs and still valid, check if this loop found errs, and if so then false! Not valid!
    if (valid && validErrsExist) valid = false;
  }
  return valid;
}