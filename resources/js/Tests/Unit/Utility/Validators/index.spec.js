import expect from "expect";
import sinon from "sinon";
import { SelectorValidation } from "../../../../Utility/Functions/Validation";

describe("Common Validators", () => {
  describe("Select Component Validator", () => {
    it("checks that the selected field matchs one of the select component options", () => {
      const testField = "foo";
      const testOptions = ['bar', 'foo', 'foobar'];
      const valid = SelectorValidation(testField, [], testOptions);
      expect(valid).toBe(true);

      const invalid = SelectorValidation('barfoo', [], testOptions);
      expect(invalid).toBe(false);
    })
  })
})