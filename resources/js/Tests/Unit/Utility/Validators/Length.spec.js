import { MaxLengthCheck, MinLengthCheck, RequirementCheck } from "@/Utility/Functions/Validation/length_validation";

describe("Checks if a value is valid based on its length or presence", () => {
  describe("ensuring strings and arrays have a maximum length", () => {
    it("of 40 characters by default OR specifically set value", () => {
      //* WHEN no maxLength specified, THEN the default max is 40 characters
      expect(MaxLengthCheck("foo", [])).toBe(true); //* Returning TRUE when under the max length
      expect(MaxLengthCheck("Smith".repeat(9), [])).toBe(false); //* Returning FALSE when over the max
      expect(MaxLengthCheck("Smith".repeat(8), [])).toBe(true); //* Returning TRUE when equal to the max

      //* WHEN maxLength is set, THEN that number is the max (even if 0 OR negative)
      expect(MaxLengthCheck("foo", [], 3)).toBe(true);
      expect(MaxLengthCheck("foo", [], 2)).toBe(false);
      expect(MaxLengthCheck("foo", [], 0)).toBe(false);
      expect(MaxLengthCheck("", [], 0)).toBe(true); //* Empty string is valid still at max of 0
      expect(MaxLengthCheck("", [], -1)).toBe(false) //* No longer valid if negative value
    })
    it("adding a validation error message to the input validation error list, varying based on string vs array, as well as field name", () => {
      const validationErrs = [];
      MaxLengthCheck("foobar", validationErrs, 5);
      //* WHEN maxLength exceeded, THEN the validationErrs array passed in will contain a default message
      expect(validationErrs[0]).toBe("Sorry! Please enter 5 or less characters"); //* Ending with "characters" for strings
      const arrayValidationErrs = [];
      MaxLengthCheck(["foo"], arrayValidationErrs, 0);
      expect(arrayValidationErrs[0]).toBe("Sorry! Please enter 0 or less entries"); //* Ending with "entries" for arrays

      const fieldName = "foo";
      MaxLengthCheck("foobar", validationErrs, 5, fieldName);
      //* WHEN a field name is set, THEN the validationErrs array will contain the default message, ending with the field's input name
      //* NOTE: If reusing a specific array, THEN clearing it is required OR else an extra/duplicate validation error messages may appear
      expect(validationErrs[1]).toBe(`Sorry! Please enter 5 or less characters for ${fieldName}`); //* hence why index 1 is used here
      MaxLengthCheck(["foo"], arrayValidationErrs, 0, fieldName);
      expect(arrayValidationErrs[1]).toBe("Sorry! Please enter 0 or less entries for foo"); //* Specifically "foo"

      MaxLengthCheck("foobar", validationErrs, 5, fieldName, "BARFOO!");
      //* WHEN a custom message is set, THEN regardless of field name given or field type, that message will be used instead
      expect(validationErrs[2]).toBe("BARFOO!");
    })
  })
  describe("ensuring strings and arrays have a minimum length", () => {
    it("of 1 character by default or specifically set value", () => {
      //* WHEN no minLength is set, THEN the default min is 1 character
      expect(MinLengthCheck("", [])).toBe(false); //* Empty string is NOT valid
      expect(MinLengthCheck("foo", [])).toBe(true);
      expect(MinLengthCheck("a", [])).toBe(true); //* Any single char will be valid

      //* WHEN minLength is set, THEN that number is the minimum (even if 0 or negative)
      expect(MinLengthCheck("foo", [], 2)).toBe(true);
      expect(MinLengthCheck("foo", [], 3)).toBe(true); //* WHEN equal to the min, THEN the string is valid, returning true
      expect(MinLengthCheck("f", [], 2)).toBe(false); //* If length < the input min, THEN the string is not valid, returning false
      expect(MinLengthCheck("foo", [], 4)).toBe(false);
      expect(MinLengthCheck("", [], 0)).toBe(true);
      expect(MinLengthCheck("", [], -1)).toBe(true); //* WHEN setting the min to a negative num, THEN empty strings are valid
    })
    it("adding a validation error message to the input validation error list, varying based on string vs array, as well as field name", () => {
      const validationErrs = [];
      MinLengthCheck("foo", validationErrs, 4);
      //* WHEN length < expected minimum length, THEN the validationErrs array passed in will contain a default message
      expect(validationErrs[0]).toBe("Sorry! Please enter 4 or more characters"); //* Ending with "characters" for strings
      const arrayValidationErrs = [];
      MinLengthCheck(["foo"], arrayValidationErrs, 2);
      expect(arrayValidationErrs[0]).toBe("Sorry! Please enter 2 or more entries"); //* Ending with "entries" for arrays

      const validationErrWithFieldName = [];
      const fieldName = "foo";
      MinLengthCheck("foo", validationErrWithFieldName, 5, fieldName);
      //* WHEN a field name is set, THEN the validationErrs array will contain the default message, ending with the field's input name 
      expect(validationErrWithFieldName[0]).toBe(`Sorry! Please enter 5 or more characters for ${fieldName}`);
      const arrayValidationErrWithFieldName = [];
      MinLengthCheck(["foo"], arrayValidationErrWithFieldName, 2, fieldName);
      expect(arrayValidationErrWithFieldName[0]).toBe("Sorry! Please enter 2 or more entries for foo"); //* Specifically here "foo"

      const validationErrWithCustomMessage = [];
      MinLengthCheck("foo", validationErrWithCustomMessage, 4, fieldName, "BARFOO!");
      //* WHEN a custom message is set, THEN regardless of field name given or field type, that message will be used instead
      expect(validationErrWithCustomMessage[0]).toBe("BARFOO!");
      const arrayValidationErrWithCustomMessage = [];
      MinLengthCheck(["foo"], arrayValidationErrWithCustomMessage, 2, fieldName, "FIZZBUZZ");
      expect(arrayValidationErrWithCustomMessage[0]).toBe("FIZZBUZZ");
    })
  })
  describe("ensuring values are NOT undefined, null, or empty", () => {
    it("returning 'false' if so", () => {
      //* WHEN an undefined or null value is input, THEN false is returned
      const someUndefinedValue = undefined;
      expect(RequirementCheck(someUndefinedValue, [])).toBe(false);
      const someNullValue = null;
      expect(RequirementCheck(someNullValue, [])).toBe(false);

      //* WHEN a field is a string, THEN empty strings return false, all other strings return true
      expect(RequirementCheck("", [])).toBe(false);
      expect(RequirementCheck("a", [])).toBe(true);
      expect(RequirementCheck("foo", [])).toBe(true);
    })
    it("adding a validation error message to the input validation error list, varying based on field name", () => {
      const validationErr = [];
      RequirementCheck(null, validationErr);
      //* WHEN the field value is not present, THEN a default message stating the field is required will be added to the validation array
      expect(validationErr[0]).toBe("This field is required");

      const validationErrWithFieldName = [];
      const fieldName = "foo";
      RequirementCheck(null, validationErrWithFieldName, fieldName);
      //* WHEN the field name is set, THEN the validation error message becomes "Missing {fieldName}"
      expect(validationErrWithFieldName[0]).toBe("Missing foo");

      const validationErrWithCustomMessage = [];
      RequirementCheck(null, validationErrWithCustomMessage, fieldName, "BARFOO!");
      //* WHEN a custom message is input, THEN it will be used instead of any other validation error message
      expect(validationErrWithCustomMessage[0]).toBe("BARFOO!");
    })
  })
})