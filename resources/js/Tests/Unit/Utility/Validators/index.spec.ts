import { vi } from "vitest";
import FinalValidationCheck, { SelectorValidation, ValidateWithRules } from "@/Utility/Functions/Validation";
import * as LengthValidators from "@/Utility/Functions/Validation/length_validation";

describe("Common Validators", () => {
  describe("for checking the validity of options of <select> elements", () => {
    it("checking that the selected field matches one of the <select> element's options", () => {
      const testField = "foo";
      const testOptions = ['bar', 'foo', 'foobar'];
      //* WHEN the selected field matches an element in the list of options, THEN a valid choice was made
      const valid = SelectorValidation(testField, [], testOptions);
      expect(valid).toBe(true);

      //* WHEN the selected field doesn't match any element in the list, THEN an INVALID choice was unexpectedly made
      const invalid = SelectorValidation('barfoo', [], testOptions);
      expect(invalid).toBe(false);

      const testNum = 123;
      const numOptions = [1, 2, 3];
      //* The method can accept a number of different types to match against BUT they must be equal types
      expect(SelectorValidation(testNum, [], numOptions)).toBe(false);

      const validNumOptions = [213, 123, 323]
      expect(SelectorValidation(testNum, [], validNumOptions)).toBe(true);
    })
    it("adding validation errors to an array input depending on a default value, custom message, and field name", () => {
      const testField = "foo";
      const testOptions = ["bar", "foobar"];
      const validationErrsWithoutDefault: string[] = [];
      expect(SelectorValidation(testField, validationErrsWithoutDefault, ["bar", "foobar", "foo"])).toBe(true);
      //* WHEN the field is found in the list of options, THEN no validation errors are added to the array
      expect(validationErrsWithoutDefault).toHaveLength(0);

      //* WHEN SelectorValidation is run without a default value AND validation fails
      SelectorValidation(testField, validationErrsWithoutDefault, testOptions);
      //* THEN the validation errors will always be set to a simple "Error" message
      expect(validationErrsWithoutDefault[0]).toBe("Error! Invalid selection!");

      //* WHEN the same validation errors array is used BUT the option is found
      expect(SelectorValidation(testField, validationErrsWithoutDefault, ["bar", "foobar", "foo"])).toBe(true);
      //* THEN the validation errors array remains filled! //DEBATE: This case may suggest to return a tuple rather than accept the array
      expect(validationErrsWithoutDefault).toHaveLength(1); //* Since a single validation err string is returned that can be used
      //* in the View and added to the View's running list of validation errors for a given field

      const validationErrsWithDefault: string[] = [];
      //* WHEN a default value is set, THEN the validationErrs array is filled with specifically "Please make a selection!"
      SelectorValidation(testField, validationErrsWithDefault, testOptions, "foo");
      expect(validationErrsWithDefault[0]).toBe("Please make a selection!")

      const validationErrsWithDefaultAndFieldName: string[] = [];
      //* WHEN a default value and field name set, THEN the validationErrs array is filled with specifically "Please make a selection for {fieldName}"
      SelectorValidation(testField, validationErrsWithDefaultAndFieldName, testOptions, "foo", "Barfoo");
      expect(validationErrsWithDefaultAndFieldName[0]).toBe("Please make a selection for Barfoo")

      const validationErrsWithDefaultAndCustomMessage: string[] = [];
      //* WHEN a default value and a custom message set, THEN the validationErrs array is filled with that exact custom message
      SelectorValidation(testField, validationErrsWithDefaultAndCustomMessage, testOptions, "foo", undefined, "FOOBAR!");
      expect(validationErrsWithDefaultAndCustomMessage[0]).toBe("FOOBAR!");

      const validationErrsWithOverridingCustomMessage: string[] = [];
      //* WHEN a default value, field name and custom message set, THEN the validationErrs array still is filled with that exact custom message
      SelectorValidation(testField, validationErrsWithOverridingCustomMessage, testOptions, "foo", "Barfoo", "BARFOO!");
      expect(validationErrsWithOverridingCustomMessage[0]).toBe("BARFOO!");
    })
  })
  describe("used via a simple syntax to run a set of available validation rules", () => {
    it("using a simple '|' or comma-delimited string or string array of rule names and values", () => {
      //* WHEN no rules are specified, THEN it considers the rules INVALID returning FALSE
      expect(ValidateWithRules("foo", [], "")).toBe(false);

      //* WHEN rules pass, THEN the rules are considered validated returning TRUE
      expect(ValidateWithRules("foo", [], "req")).toBe(true);

      //* WHEN any rules fail, THEN the rules are considered INVALID returning FALSE
      expect(ValidateWithRules("foo", [], "req|min:4")).toBe(false);
      expect(ValidateWithRules("foo", [], "req|min:3")).toBe(true);
      //* Rules can be split with "|" or "," -- BOTH work exactly the same
      expect(ValidateWithRules("foo", [], "req,min:4")).toBe(false);
      expect(ValidateWithRules("foo", [], "req,min:3")).toBe(true);
      //* Rules can similarly be laid out in an array and work identically
      expect(ValidateWithRules("foo", [], ["req", "min:4"])).toBe(false);
      expect(ValidateWithRules("foo", [], ["req", "min:3"])).toBe(true);

      //* Older edge case: If a rule failed BUT a later rule passed, THEN it would incorrectly suggest everything is valid
      expect(ValidateWithRules("foo", [], "min:4|req")).toBe(false); //* Field is only 3 chars BUT it used to return TRUE

      //* WHEN improperly formatted resulting in empty rule strings "", THEN the rest of the rules are still interpreted
      expect(ValidateWithRules("foo", [], "|req|min:4")).toBe(false); //* Those empty rule strings are ignored
      expect(ValidateWithRules("foo", [], "|req|min:3")).toBe(true);
      expect(ValidateWithRules("foo", [], "req,min:4,")).toBe(false);
      expect(ValidateWithRules("foo", [], "req,min:3,")).toBe(true);
      expect(ValidateWithRules("foo", [], ["req", "", "min:4"])).toBe(false);
      expect(ValidateWithRules("foo", [], ["req", "", "min:3"])).toBe(true);

      //* WHEN an unexpected rule is used, THEN it defaults to false which invalidates the whole field
      expect(ValidateWithRules("foo", [], "req|foo")).toBe(false);
      //* Similar to the edge case at line 82, an unknown rule should mark this field as invalid RETURNING FALSE
      //* BUT BEFORE an unknown rule placed before a rule that passed caused true to be incorrectly returned
      expect(ValidateWithRules("foo", [], "foo|req")).toBe(false);
    })
    it("calling helpers to run the validations", () => {
      const maxLengthSpy = vi.spyOn(LengthValidators, "MaxLengthCheck");
      const requirementSpy = vi.spyOn(LengthValidators, "RequirementCheck");
      const minLengthSpy = vi.spyOn(LengthValidators, "MinLengthCheck");
      ValidateWithRules("foo", [], "");
      //* WHEN no rules are being used, THEN no known validators will be called
      expect(maxLengthSpy).not.toHaveBeenCalled();
      expect(requirementSpy).not.toHaveBeenCalled();
      expect(minLengthSpy).not.toHaveBeenCalled();

      ValidateWithRules("foo", [], "max:40");
      //* WHEN the max length rule is used, THEN ONLY MaxLengthCheck() will be called
      expect(maxLengthSpy).toHaveBeenCalledOnce();
      expect(requirementSpy).not.toHaveBeenCalled();
      expect(minLengthSpy).not.toHaveBeenCalled();

      ValidateWithRules("foo", [], "req|max:40");
      //* WHEN the max length rule AND requirement rule is used, THEN BOTH MaxLengthCheck() and RequirementCheck() will be called
      expect(maxLengthSpy).toHaveBeenCalledTimes(2);
      expect(requirementSpy).toHaveBeenCalledOnce();
      expect(minLengthSpy).not.toHaveBeenCalled();

      ValidateWithRules("foo", [], "req|max:40|min:2");
      //* WHEN the min length rule is added, THEN it'll ALSO be called with the rest of the rules
      expect(maxLengthSpy).toHaveBeenCalledTimes(3);
      expect(requirementSpy).toHaveBeenCalledTimes(2);
      expect(minLengthSpy).toHaveBeenCalledOnce();

      ValidateWithRules("foo", [], "required|min:2");
      //* WHEN the max length rule is removed, THEN it will not be called again, just the other remaining rules
      expect(maxLengthSpy).toHaveBeenCalledTimes(3); //* Leaving the num of times called at 3
      expect(requirementSpy).toHaveBeenCalledTimes(3); //* While requirement goes from 2 to 3
      expect(minLengthSpy).toHaveBeenCalledTimes(2); //* AND minLength goes from ONCE to 2
    })
  })
  it("used with a final check on all fields for validation errors to ensure form validity", () => {
    expect(FinalValidationCheck({})).toBe(true); //* WHEN an empty obj is passed, THEN all fields must be valid

    //* WHEN the obj prop (so form field) contains a list BUT it's empty, THEN the fields must have no errors
    expect(FinalValidationCheck({ foo: [] })).toBe(true);
    expect(FinalValidationCheck({ bar: [], fizz: [] })).toBe(true);

    //* WHEN an obj form field contains a list of strings, THEN the fields must have some kind of error
    expect(FinalValidationCheck({ foo: ["a"] })).toBe(false);
    expect(FinalValidationCheck({ bar: [], fizz: ["b"] })).toBe(false);
  })
})