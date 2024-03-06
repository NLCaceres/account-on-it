import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import SuiInput from "@/Components/Forms/SuiInput.vue";
import { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } from "@/Utility/Constants/Transitions";
import SuiButtonedLabel from "@/Components/Forms/SuiButtonedLabel.vue";

describe("Semantic UI Input Field", () => {
  it("renders a basic <input> element, only requiring its model name, field name, and its starting value", () => {
    render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "abc" }, global: {
      mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
      stubs: { SuiButtonedLabel }
    }});

    //* The main <input> element has several defaults and important computed props
    expect(screen.getByRole("textbox", { name: "Bar" })).toBeInTheDocument(); //* Its label takes from the fieldName prop, capitalizing its first letter
    expect(screen.getByRole("textbox")).toHaveValue("abc"); //* An empty string or number is also acceptable for the default <input> value
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "foo_bar"); //* Its ID is the snake_case combination of the modelName and fieldName
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text"); //* Its type defaults to "text"
    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", ""); //* The placeholder is empty by default
    expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "On");
    //* It DOESN'T include a button in its direct container for performing an action by default, like a search bar might
    expect(screen.getByRole("textbox").parentElement).not.toHaveClass("actionable");
    expect(screen.getByRole("textbox").parentElement).toHaveClass("fluid"); //? Takes up the entire width of its container by default
    //* With simple CSS defaults for the "field" container div as well!
    expect(screen.getByRole("textbox").parentElement!.parentElement).not.toHaveClass("required");
    expect(screen.getByRole("textbox").parentElement!.parentElement).not.toHaveClass("wide");
  })
  describe("controlling the root 'field' container via", () => {
    it("a 'require' prop to style the <input>'s parent 'field' <div> with an asterisk", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "abc", required: true }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN the 'require' prop is set to true, THEN the <SuiInput>'s top-level container will have "field required" as its CSS classes
      expect(screen.getByRole("textbox").parentElement!.parentElement).toHaveClass("field required", { exact: true });

      await rerender({ required: false });
      //* WHEN the 'require' prop is false or undefined, THEN the top-level container will only have "field"
      expect(screen.getByRole("textbox").parentElement!.parentElement).not.toHaveClass("required");
      expect(screen.getByRole("textbox").parentElement!.parentElement).toHaveClass("field", { exact: true });
    })
    it("a 'width' prop to size the <input>'s parent 'field' <div>", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "abc", width: 5 }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN the 'width' is set to a number, THEN it is converted into its text equivalent along with a "wide" CSS class
      expect(screen.getByText("Bar").parentElement).toHaveClass("field five wide", { exact: true });

      await rerender({ width: -1 });
      //* WHEN the 'width' is set to a negative, THEN, similar to the default 0, no "wide" class is included
      expect(screen.getByText("Bar").parentElement).toHaveClass("field", { exact: true });

      await rerender({ width: 1 });
      //* The minimum acceptable value is 1, which creates a "one wide" CSS class
      expect(screen.getByText("Bar").parentElement).toHaveClass("field one wide", { exact: true });

      await rerender({ width: 12 });
      //* The maximum acceptable value is 12, which creates a "twelve wide" CSS class
      expect(screen.getByText("Bar").parentElement).toHaveClass("field twelve wide", { exact: true });

      await rerender({ width: 13 });
      //* WHEN the maximum value is exceeded, THEN, similar to a negative number, no "wide" class is applied
      expect(screen.getByText("Bar").parentElement).toHaveClass("field", { exact: true });
    })
  })
  describe("controlling the <input> label via", () => {
    it("a 'labelWithButton' prop to render a field visibility button, like for passwords", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "abc", labelWithButton: true }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN the 'labelWithButton' prop is set to true, THEN a <button> containing the word "Show" will be rendered next to the <label>
      expect(screen.getByText("Bar")).toBeInTheDocument();
      expect(screen.getByText("Bar").nextElementSibling).toHaveRole("button");
      expect(screen.getByText("Bar").nextElementSibling).toHaveTextContent("Show");

      await rerender({ labelWithButton: false });
      //* WHEN the prop is false or undefined, THEN only a <label> will be rendered
      expect(screen.getByText("Bar")).toBeInTheDocument();
      expect(screen.getByText("Bar").nextElementSibling).not.toHaveRole("button");
      expect(screen.getByText("Bar").nextElementSibling!.firstElementChild).toHaveRole("textbox");
    })
    it("a computed prop to set the label's 'for' attribute", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "fizz", fieldName: "buzz", modelValue: "abc" }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* The <label>'s for is simply the 'modelName' connected to the 'fieldName' via "_"
      expect(screen.getByText("Buzz")).toHaveAttribute("for", "fizz_buzz");

      await rerender({ modelName: "buzz" });
      expect(screen.getByText("Buzz")).toHaveAttribute("for", "buzz_buzz");

      //* WHEN 'modelName' is more complex, it is left as is and still simply connected via "_"
      await rerender({ modelName: "fizzBuzz" });
      expect(screen.getByText("Buzz")).toHaveAttribute("for", "fizzBuzz_buzz");

      await rerender({ modelName: "buzz", fieldName: "fizz" });
      expect(screen.getByText("Fizz")).toHaveAttribute("for", "buzz_fizz");

      await rerender({ fieldName: "fizzBuzz" });
      //* WHEN the 'fieldName' is more complex, THEN the <label>'s 'for' may remain simple concatenation BUT the text ("fizzBuzz" to "FizzBuzz") won't be
      expect(screen.getByText("FizzBuzz")).toHaveAttribute("for", "buzz_fizzBuzz");
    })
    it("a computed prop on the 'fieldName' to capitalize the label", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "color", modelValue: "abc" }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN the 'fieldName' is simple, THEN it is simply capitalized
      expect(screen.getByText("Color")).toBeInTheDocument();

      await rerender({ fieldName: "cool_color" });
      //* WHEN the 'fieldName' has an underscore, THEN it is split, then capitalized on the word breaks
      expect(screen.getByText("Cool Color")).toBeInTheDocument();

      await rerender({ fieldName: "id" })
      //* WHEN the 'fieldName' is "id" or "_id", THEN "ID" is returned immediately
      expect(screen.getByText("ID")).toBeInTheDocument();
      await rerender({ fieldName: "_id" })
      expect(screen.getByText("ID")).toBeInTheDocument();
      await rerender({ fieldName: "iD" }) //* This is true even if the fieldName is awkwardly cased
      expect(screen.getByText("ID")).toBeInTheDocument();
    })
    it("a default slot to override the 'fieldName' prop", () => {
      render(SuiInput, { props: { modelName: "foo", fieldName: "color", modelValue: "abc" }, 
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }}, stubs: { SuiButtonedLabel } },
        slots: { default: "<h2>some_Slot</h2>" }
      });

      //* WHEN the the default slot is set, THEN any 'fieldName' will be overridden WITHOUT ANY FORMATTING
      expect(screen.getByText("some_Slot")).toBeInTheDocument();
      expect(screen.getByText("some_Slot")).toHaveRole("heading");
      expect(screen.getByText("some_Slot").parentElement).toHaveClass("form-label");
    })
  })
  describe("controlling the <input>'s direct parent via", () => {
    it("an 'actionable' prop to style the <input>'s direct container like a searchbar with a button on the side", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "abc", actionable: true }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN 'actionable' prop set to true, THEN the <input>'s container has the following CSS classes
      expect(screen.getByRole("textbox").parentElement).toHaveClass("ui input action fluid", { exact: true });

      await rerender({ actionable: false });
      //* WHEN the 'actionable' prop is false or undefined, THEN the container will not have "action", just "ui input"
      expect(screen.getByRole("textbox").parentElement).not.toHaveClass("action");
      expect(screen.getByRole("textbox").parentElement).toHaveClass("ui input");
    })
    it("an 'fluid' prop to make the <input> fill the full width of its container", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "abc", fluid: true }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN 'fluid' prop set to true, THEN the <input>'s container has the following CSS classes
      expect(screen.getByRole("textbox").parentElement).toHaveClass("ui input fluid", { exact: true });

      await rerender({ fluid: false });
      //* WHEN the 'fluid' prop is false or undefined, THEN the container will not have "fluid", just "ui input"
      expect(screen.getByRole("textbox").parentElement).not.toHaveClass("fluid");
      expect(screen.getByRole("textbox").parentElement).toHaveClass("ui input");
    })
  })
  describe("controlling the <input> via", () => {
    it("a 'placeholder' prop to fill the <input>'s placeholder attribute if desired", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "abc", placeholder: "Foobar" }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN the 'placeholder' prop is set, THEN a 'placeholder' attribute will be applied to the <input>
      expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Foobar");

      await rerender({ placeholder: undefined });
      //* WHEN no 'placeholder' prop is set, THEN the 'placeholder' attribute will be empty
      expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "");
    })
    it("a 'disabled' prop to prevent user input from entering text into the <input>", async () => {
      const user = userEvent.setup();
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "", disabled: true }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN the 'disabled' prop is set to true, THEN a 'disabled' attribute will be applied to the <input>
      expect(screen.getByRole("textbox")).toBeDisabled();
      expect(screen.getByRole("textbox")).toHaveAttribute("disabled"); //? Identical to the above `toBeDisabled()` call
      await user.type(screen.getByRole("textbox"), "Abc"); //* AND no text should be able to be input
      expect(screen.getByRole("textbox")).not.toHaveValue("Abc");
      expect(screen.getByRole("textbox")).toHaveValue(""); //* Leaving the input blank

      await rerender({ disabled: false });
      //* WHEN the 'disabled' prop is set to false, THEN no 'disabled' attribute should be present on the input
      expect(screen.getByRole("textbox")).not.toBeDisabled();
      await user.type(screen.getByRole("textbox"), "Abc"); //* AND text should be able to be input
      expect(screen.getByRole("textbox")).toHaveValue("Abc"); //* A simple ABC should be the input's value
      expect(screen.getByRole("textbox")).not.toHaveValue(""); //* No longer an empty <input>
      expect(screen.getByRole("textbox")).not.toHaveValue("AbcAbc"); //* Or two sets of "Abc"
    })
    it("a 'readonly' prop to prevent the user from changing the input's value", async () => {
      const user = userEvent.setup();
      const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "bar", modelValue: "fizz-", readonly: true }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN the 'readonly' prop is set to true, THEN a 'readonly' attribute will be applied to the <input>
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
      await user.type(screen.getByRole("textbox"), "buzz"); //* AND no text should be able to be input
      expect(screen.getByRole("textbox")).not.toHaveValue("fizz-buzz");
      expect(screen.getByRole("textbox")).toHaveValue("fizz-"); //* Leaving the value as is "fizz-"

      await rerender({ readonly: false });
      //* WHEN the 'readonly' prop is set to false, THEN no 'readonly' attribute should be present on the input
      expect(screen.getByRole("textbox")).not.toHaveAttribute("readonly");
      await user.type(screen.getByRole("textbox"), "buzz"); //* AND text should be able to be input
      expect(screen.getByRole("textbox")).toHaveValue("fizz-buzz"); //* Forming "fizz-buzz"
      expect(screen.getByRole("textbox")).not.toHaveValue(""); //* No longer an empty <input>
    })
    it("a computed prop to set the <input>'s 'type' attribute", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "fizz", fieldName: "password", modelValue: "abc" }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* WHEN the 'fieldName' is 'password', THEN the input type will be set to 'password'
      expect(screen.getByTestId("fizz_password")).toHaveAttribute("type", "password"); //? Input's with 'password' type AREN'T findable via "textbox" role

      await rerender({ showPass: true })
      //* WHEN the 'showPass' attribute is set, THEN any 'password' type is overridden to a normal 'text' type input
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");

      //* WHEN the word 'password' is anywhere in the 'fieldName', THEN the 'password' type is used for the input
      await rerender({ showPass: false, fieldName: "PASSWORD" })
      expect(screen.getByTestId("fizz_PASSWORD")).toHaveAttribute("type", "password");
      await rerender({ showPass: false, fieldName: "PASSWORD_FOO" })
      expect(screen.getByTestId("fizz_PASSWORD_FOO")).toHaveAttribute("type", "password");
      await rerender({ showPass: false, fieldName: "FOO_PASSWORD" })
      expect(screen.getByTestId("fizz_FOO_PASSWORD")).toHaveAttribute("type", "password");

      await rerender({ fieldName: "def" });
      //* Any other 'fieldName' is considered to be a 'text' type input
      expect(screen.getByTestId("fizz_def")).toHaveAttribute("type", "text");
    })
    it("a computed prop to set the <input>'s 'id' attribute", async () => {
      const { rerender } = render(SuiInput, { props: { modelName: "fizz", fieldName: "buzz", modelValue: "abc" }, global: {
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }},
        stubs: { SuiButtonedLabel }
      }});

      //* The <label>'s 'for' is simply the 'modelName' connected to the 'fieldName' via "_"
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "fizz_buzz");

      await rerender({ modelName: "buzz" });
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "buzz_buzz");

      //* WHEN 'modelName' is more complex, it is left as is and still simply connected via "_"
      await rerender({ modelName: "fizzBuzz" });
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "fizzBuzz_buzz");

      await rerender({ modelName: "buzz", fieldName: "fizz" });
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "buzz_fizz");

      await rerender({ fieldName: "fizzBuzz" });
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "buzz_fizzBuzz");
    })
    it("an 'input-attachment' slot to add extra components to the <input>", () => {
      const { unmount } = render(SuiInput, { props: { modelName: "foo", fieldName: "color", modelValue: "abc" }, 
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }}, stubs: { SuiButtonedLabel } },
        slots: { "input-attachment": "<h2>some_Slot</h2>" }
      });

      //* WHEN the "input-attachment" slot is set, THEN it is placed next to the <input>
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByRole("textbox").nextElementSibling).toHaveRole("heading");
      unmount();

      render(SuiInput, { props: { modelName: "foo", fieldName: "color", modelValue: "abc" }, 
        global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }}, stubs: { SuiButtonedLabel } },
        slots: { "input-attachment": "<button>some_Slot</button>" }
      });

      //* Typically this slot is used to attach a button or icon to the textbox
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByRole("textbox").nextElementSibling).toHaveRole("button");
    })
  })
  it("accepts a validation errors array of strings to render messages to the user to correct their input", async () => {
    const { rerender } = render(SuiInput, { props: { modelName: "foo", fieldName: "color", modelValue: "abc", validationErrors: ["fizz", "buzz"] }, 
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION }}, stubs: { SuiButtonedLabel } },
    });

    //* WHEN two strings are in the 'validationErrors' array, then two list items will be rendered prefixed by "-"
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("- fizz")).toHaveClass("item form-validation-err", { exact: true });
    //* AND nested in a div-based list with the following CSS classes
    expect(screen.getByText("- fizz").parentElement).toHaveClass("ui divided list", { exact: true });

    await rerender({ validationErrors: [] });
    expect(screen.getByRole("textbox").parentElement!.nextElementSibling).toHaveClass("ui divided list")
    //? jest-dom considers whitespace different than `toBeEmptyDOMElement()`, otherwise would have used empty instead
    expect(screen.getByRole("textbox").parentElement!.nextElementSibling).toHaveTextContent("")
    expect(screen.getByRole("textbox").parentElement!.nextElementSibling!.childElementCount).toBe(0);
  })
})