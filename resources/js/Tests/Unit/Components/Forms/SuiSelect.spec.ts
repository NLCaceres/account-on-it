import { fireEvent, render, screen } from "@testing-library/vue";
import { h } from "vue";
import SuiSelect from "@/Components/Forms/SuiSelect.vue";
import { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } from "@/Utility/Constants/Transitions";

describe("Semantic UI Select/Dropdown element with label", () => {
  it("renders a root-level 'field' container using props to add CSS classes", async () => {
    const { rerender } = render(SuiSelect, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: {
        modelName: "", fieldName: "", modelValue: "", options: [], validationErrors: [], required: true, width: 1
      },
      slots: { default: "Foobar" }
    });
    // - WHEN `required` = true, THEN a "required" CSS class is added
    // - AND `wide` = a num > 0, THEN its text name + "wide" CSS classes are added
    expect(screen.getByRole("combobox").parentElement).toHaveClass("required one wide");

    // - WHEN `required` = false + `wide` = a num > 12, THEN no "required" & no text num + "wide" CSS classes applied
    await rerender({ required: false, width: 15 });
    expect(screen.getByRole("combobox").parentElement).toHaveClass("field", { exact: true });

    // - WHEN `width` between 0 & 13, THEN text num + "wide" CSS applied
    await rerender({ width: 12 });
    expect(screen.getByRole("combobox").parentElement).toHaveClass("twelve wide");

    await rerender({ width: 0 });
    // - WHEN `required` = false + `width` = 0 or lower, THEN their respective CSS is removed
    expect(screen.getByRole("combobox").parentElement).toHaveClass("field", { exact: true });
  });
  describe("renders a label", () => {
    it("with a slot", () => {
      render(SuiSelect, {
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
        props: { modelName: "", fieldName: "", modelValue: "", options: [], validationErrors: [] },
        slots: { default: "Foobar" }
      });
      expect(screen.getByText("Foobar")).toBeInTheDocument();
      expect(screen.getByText("Foobar")).toHaveClass("form-label");
    });
    it("uses props to create the 'for' attribute", async () => {
      const { rerender } = render(SuiSelect, {
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
        props: { modelName: "", fieldName: "", modelValue: "", options: [], validationErrors: [] },
        slots: { default: "Barfoo" }
      });
      // - WHEN "modelName" and "fieldName" are empty strings, THEN the label's "for" attribute is empty
      expect(screen.getByText("Barfoo")).toHaveAttribute("for", "");

      await rerender({ modelName: "foo", fieldName: "bar" });
      // - WHEN the fields are filled, THEN they are combined via "_" to form the "for" attribute of a sibling <input>
      expect(screen.getByText("Barfoo")).toHaveAttribute("for", "foo_bar");

      // - EVEN if one or the other is an empty string
      await rerender({ modelName: "", fieldName: "bar" });
      expect(screen.getByText("Barfoo")).toHaveAttribute("for", "_bar");
      await rerender({ modelName: "foo", fieldName: "" });
      expect(screen.getByText("Barfoo")).toHaveAttribute("for", "foo_");
    });
  });
  describe("renders a select element", () => {
    it("with a slot to describe the options list", () => {
      render(SuiSelect, {
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
        props: { modelName: "", fieldName: "", modelValue: "", options: [], validationErrors: [] },
        slots: { default: "Foobar", "default-option": "This is a list of foobars" }
      });
      // - WHEN the "default-option" slot is used, THEN a description of the select is inserted
      expect(screen.getByText("This is a list of foobars")).toBeInTheDocument();
      // - BUT it is a disabled option AND it has no value
      expect(screen.getByText("This is a list of foobars")).toBeDisabled();
      expect(screen.getByText("This is a list of foobars")).toHaveValue("");
    });
    it("lists all options supplied in the dropdown", async () => {
      const { rerender } = render(SuiSelect, {
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
        props: { modelName: "", fieldName: "", modelValue: "", options: ["Foo", "Bar", "Fizz"], validationErrors: [] },
        slots: { default: "Barfoo", "default-option": "This is a list of foobars" }
      });
      // - WHEN options have been passed in, THEN they are inserted into the `<select>`
      expect(screen.getByText("Foo")).toBeInTheDocument();
      expect(screen.getByText("Foo")).toHaveValue("Foo"); // - AND with values matching their content
      expect(screen.getByText("Bar")).toBeInTheDocument();
      expect(screen.getByText("Bar")).toHaveValue("Bar");
      expect(screen.getByText("Fizz")).toBeInTheDocument();
      expect(screen.getByText("Fizz")).toHaveValue("Fizz");
      // - AND with the default description option
      expect(screen.getByText("This is a list of foobars")).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(4);

      await rerender({ modelName: "", fieldName: "", modelValue: "", options: [], validationErrors: [] });
      // - WHEN no options have been passed in, THEN only one option exists, the default description option
      expect(screen.getAllByRole("option")).toHaveLength(1);
      expect(screen.getByText("This is a list of foobars")).toBeInTheDocument();
    });
    it("lists all options supplied in the dropdown with number values if enumerated prop is true", async () => {
      const { rerender } = render(SuiSelect, {
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
        props: {
          enumerated: true, modelName: "", fieldName: "", modelValue: "", options: ["Foo", "Bar"], validationErrors: []
        },
        slots: { default: "Barfoo", "default-option": "This is a list of foobars" }
      });
      // - WHEN enumerated = true
      expect(screen.getByText("Foo")).toBeInTheDocument();
      // - THEN their values match their index/placement
      expect(screen.getByText("Foo")).toHaveValue("0");
      expect(screen.getByText("Bar")).toBeInTheDocument();
      expect(screen.getByText("Bar")).toHaveValue("1");

      await rerender({
        modelName: "", fieldName: "", modelValue: "", options: [0, 1, 3], validationErrors: [], enumerated: true
      });
      // - EVEN WHEN numbers are used for options, THEN the underlying values are still based on their index
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("0")).toHaveValue("0");
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText("3")).toHaveValue("2");
      expect(screen.getByText("This is a list of foobars")).toBeInTheDocument();
      expect(screen.getByText("This is a list of foobars")).toHaveValue("");

      await rerender({
        modelName: "", fieldName: "", modelValue: "", options: [0, 1, 3], validationErrors: [], enumerated: false
      });
      // - BUT WHEN enumerated = false, THEN the underlying values are based on the option's content
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("0")).toHaveValue("0");
      expect(screen.getByText("3")).toBeInTheDocument(); // - SO a number 3 gets a text value of "3"
      expect(screen.getByText("3")).toHaveValue("3");
      expect(screen.getByText("This is a list of foobars")).toBeInTheDocument();
      expect(screen.getByText("This is a list of foobars")).toHaveValue("");
    });
    it("emits a non-native click event to handle v-model's expected event 'update:modelValue'", async () => {
      const updateEventSpy = vi.fn().mockImplementation(() => console.log("Running"));
      const stubComponent = {
        render() {
          return h(SuiSelect, {
            "onUpdate:modelValue": updateEventSpy,
            modelName: "foo", fieldName: "bar", modelValue: "", options: ["Foo", "Bar"], validationErrors: []
          }, { default: () => "Foobar", "default-option": () => "Barfoo" });
        }
      };
      render(stubComponent, {
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } }
      });
      const selector = screen.getByLabelText("Foobar");
      // - WHEN selecting from the `<select>` options
      await fireEvent.update(selector, "Bar");
      // - THEN the "updateEventSpy" listener will fire
      expect(updateEventSpy).toHaveBeenCalledOnce();
      expect(selector).toHaveValue("Bar"); // - AND `<select>` value will be updated

      await fireEvent.update(screen.getByRole("option", { name: "Foo" }));
      expect(updateEventSpy).toHaveBeenCalledTimes(2);
      expect(selector).toHaveValue("Foo");
    });
    it("uses props to add CSS classes", async () => {
      const { rerender } = render(SuiSelect, {
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
        props: {
          modelName: "", fieldName: "", modelValue: "", options: [], validationErrors: [], fluid: true, searchBar: true
        },
        slots: { default: "Foobar" }
      });
      // - WHEN `fluid` + `searchBar` = true, THEN "fluid" and "searchBar" CSS classes are added
      expect(screen.getByRole("combobox")).toHaveClass("fluid search");

      await rerender({ fluid: false, searchBar: false });
      // - WHEN `fluid` + `searchBar` = false, THEN "fluid" and "searchBar" CSS classes are removed
      expect(screen.getByRole("combobox")).toHaveClass("dropdown", { exact: true });
    });
  });
  it("renders a list of validation errors when provided", async () => {
    const { rerender } = render(SuiSelect, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: { modelName: "", fieldName: "", modelValue: "", options: [], validationErrors: ["Foo", "Bar", "Fizz"] },
      slots: { default: "Barfoo", "default-option": "This is a list of foobars" }
    });
    // - WHEN validation errors are passed in, THEN they are inserted into `<li>` tags
    expect(screen.getByText("- Foo")).toBeInTheDocument();
    expect(screen.getByText("- Bar")).toBeInTheDocument();
    expect(screen.getByText("- Fizz")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    for (const listItem of screen.getAllByRole("listitem")) {
      expect(listItem).toHaveClass("item form-validation-err"); // - AND have the correct CSS
    }

    await rerender({ modelName: "", fieldName: "", modelValue: "", options: [], validationErrors: [] });
    // - WHEN no validation errors are passed in, THEN no list items are rendered
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
