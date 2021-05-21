export default function StringCheck(stringToCheck: string | null): boolean {
  //* Handles both null, empty & whitespaced strings "" / "   "!
  //? Best not to use strict '!==' check here in case of undefined
  return stringToCheck != null && stringToCheck.trim().length > 0;
  //? Alternatively optional chaining works too!
  // return this.src?.trim().length > 0;
}