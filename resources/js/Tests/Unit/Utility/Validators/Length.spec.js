import expect from 'expect';
import { MaxLengthCheck, MinLengthCheck } from "../../../../Utility/Functions/Validation/length_validation";

describe("Checks validators regarding field length and n", () => {
  describe("checks field is shorter than maximum expected length", () => {
    describe("return true, indicating valid field", () => {
      it("when under x number of characters", () => {
        const testField = "foo"; const validationErrs = []; const x = 20;
        const valid = MaxLengthCheck(testField, validationErrs, x);
        expect(valid).toBe(true);
      })
      it("when under 40 characters by default", () => {
        expect(MaxLengthCheck("foo", [])).toBe(true);
      })
      it("allows empty strings unless max is negative", () => {
        const validationErrs = []; const x = 0;
        const valid = MaxLengthCheck("", validationErrs, x);
        expect(valid).toBe(true);
        const y = -1;
        const invalid = MaxLengthCheck("", validationErrs, y);
        expect(invalid).toBe(false);
      })
    })
    describe("returns false, indicating field not valid", () => {
      const testField = "a".repeat(41);
      it("when over x number of characters", () => {
        const validationErrs = [];
        const invalid = MaxLengthCheck(testField, validationErrs, 40);

        expect(invalid).toBe(false);
      })
      it("when over 40 characters by default", () => {
        expect(MaxLengthCheck(testField, [])).toBe(false);
      })
    })
    describe("adds a validation error message to field's list of errors", () => {
      let validationErrs;
      const testField = "a".repeat(41);
      beforeEach(() => {
        validationErrs = [];
      })
      it("has a default error message", () => {
        MaxLengthCheck(testField, validationErrs);
        expect(validationErrs[0]).toBe(`Sorry! Please enter 40 or less characters`);
      })
      it("can specify the fieldName in the default message", () => {
        const fieldName = 'fieldName';
        MaxLengthCheck(testField, validationErrs, 40, fieldName);
        expect(validationErrs[0]).toBe(`Sorry! Please enter 40 or less characters for ${fieldName}`);
      })
      it("can use an entirely custom message", () => {
        const customMessage = "Custom Message"
        MaxLengthCheck(testField, validationErrs, 40, undefined, customMessage);
        expect(validationErrs[0]).toBe(customMessage);
      })
    })
  })
  describe("checks field is longer than minimum expected length", () => {
    describe("returns false, indicating field not valid", () => {
      it("when over 40 characters", () => {
        const testField = "a"
        const validationErrs = [];
        const invalid = MinLengthCheck(testField, validationErrs, 40);

        expect(invalid).toBe(false);
      })
      it("by default", () => {
        expect(MinLengthCheck("", [])).toBe(false);
      })
    })
    it("", () => {
      
    })
  })
})