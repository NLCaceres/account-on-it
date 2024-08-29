import SuiSearch from "@/Components/Forms/SuiSearch.vue";
import { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } from "@/Utility/Constants/Transitions";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { h } from "vue";


describe("Semantic UI Search", () => {
  // !: Input ID + Label Text
  it("uses `modelName` and `fieldName` to set ID and `for` label", async () => {
    const { rerender } = render(SuiSearch, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: { modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: [] }
    });
    // - WHEN BOTH `modelName` and `fieldName` are set to actual strings
    const searchBar = screen.getByRole("textbox");
    expect(searchBar).toBeInTheDocument();
    // - THEN the searchBar "id" is set to their values combined by an underscore
    expect(searchBar).toHaveAttribute("id", "Foo_Bar");
    // - AND the searchBar container "id" appends their values with a "_search" suffix
    expect(searchBar.parentElement!.parentElement).toHaveAttribute("id", "Foo_Bar_search");
    // - AND the searchBar label "for" is identical to the searchBar "id" value
    expect(screen.getByText("Bar")).toHaveAttribute("for", "Foo_Bar");

    // - WHEN either `modelName` or `fieldName` is an empty string
    await rerender({ modelName: "", fieldName: "Bar" });
    const searchBarWithOnlyFieldName = screen.getByRole("textbox");
    // - THEN the searchBar and searchBar container "id" is an empty string
    expect(searchBarWithOnlyFieldName).toHaveAttribute("id", "");
    expect(searchBarWithOnlyFieldName.parentElement!.parentElement).toHaveAttribute("id", "");
    // - AND the label "for" attribute is a matching empty string
    expect(screen.getByText("Bar")).toHaveAttribute("for", "");

    await rerender({ modelName: "Foo", fieldName: "" });
    const searchBarWithOnlyModelName = screen.getByRole("textbox");
    // - THEN the searchBar and searchBar container "id" is an empty string
    expect(searchBarWithOnlyModelName).toHaveAttribute("id", "");
    expect(searchBarWithOnlyModelName.parentElement!.parentElement).toHaveAttribute("id", "");
    // - AND the label "for" is a matching empty string (AND the label is empty)
    expect(searchBarWithOnlyModelName.parentElement!.parentElement!.previousElementSibling).toHaveAttribute("for", "");
    expect(searchBarWithOnlyModelName.parentElement!.parentElement!.previousElementSibling).toHaveTextContent("");
  });
  it("sets the label's text content via `fieldName` with 'Title Casing'", async () => {
    const { rerender } = render(SuiSearch, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: { modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: [] }
    });
    // - WHEN the `fieldName` is a simple value, THEN it is capitalized in the label
    expect(screen.getByText("Bar")).toBeInTheDocument();

    // - WHEN the `fieldName` == "id" or "_id"
    await rerender({ fieldName: "id" });
    // - THEN the label value is directly set to "ID"
    expect(screen.getByText("ID")).toBeInTheDocument();
    await rerender({ fieldName: "_id" });
    expect(screen.getByText("ID")).toBeInTheDocument();

    // - WHEN the `fieldName` is a snake_cased value
    await rerender({ fieldName: "bar_foo" });
    // - THEN the underscores are replaced with whitespace and 'Title Casing'
    expect(screen.getByText("Bar Foo")).toBeInTheDocument();
    // - AND surrounding white space is trimmed
    await rerender({ fieldName: " bar_foo   " });
    expect(screen.getByText("Bar Foo")).toBeInTheDocument();
    // - AND any values separated by whitespace is also added into the 'Title Case Value' result
    await rerender({ fieldName: " bar_foo  Fizz" });
    expect(screen.getByText("Bar Foo Fizz")).toBeInTheDocument();
    await rerender({ fieldName: " bar_foo   Fizz  " });
    expect(screen.getByText("Bar Foo Fizz")).toBeInTheDocument();
  });
  // !: Searchbar functionality
  it("sets a searchbar 'placeholder' attribute via prop", async () => {
    const { rerender } = render(SuiSearch, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: { modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: [], placeholder: "Fizz" }
    });
    // - WHEN `placeholder` is set, then the searchbar gets a "placeholder" in its input
    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Fizz");

    // - WHEN `placeholder` is an empty string or undefined, THEN the placeholder attribute is not used
    await rerender({ placeholder: "" });
    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "");
    await rerender({ placeholder: undefined });
    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "");
  });
  it("emits an 'input' event with the `modelValue` prop for `v-model` compatibility", async () => {
    const user = userEvent.setup();
    const modelValueSpy = vi.fn();
    const stubComponent = {
      render() {
        return h(SuiSearch, {
          "onUpdate:modelValue": modelValueSpy, modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: []
        });
      }
    };
    render(stubComponent, { global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } } });
    // - WHEN component initially rendered, THEN the `onUpdate:modelValue` event has not been fired yet
    expect(modelValueSpy).not.toHaveBeenCalled(); // - AND spy has not been triggered
    expect(screen.getByRole("textbox")).toHaveValue(""); // - AND the searchbar value is empty

    // - WHEN the user types in text, THEN the event fires, triggering the spy for each letter typed
    await user.type(screen.getByRole("textbox"), "Hello");
    expect(modelValueSpy).toHaveBeenCalled();
    expect(modelValueSpy).toHaveBeenCalledTimes(5); // - "H", "e", "l", "l", "o" each emit an event
    expect(modelValueSpy).toBeCalledWith("Hello"); // - The 5th event emits the full value
    expect(screen.getByRole("textbox")).toHaveValue("Hello"); // - AND the searchbar gets the full value

    // - WHEN more text is typed in, THEN the event fires for each letter still
    await user.type(screen.getByRole("textbox"), " World!");
    expect(modelValueSpy).toHaveBeenCalledTimes(12); // - Now, called 7 more times
    expect(modelValueSpy).toBeCalledWith("Hello World!"); // - AND with full text from before and this latest typing
    expect(screen.getByRole("textbox")).toHaveValue("Hello World!"); // - AND the searchbar has the full text value

    // - WHEN the text is completely cleared from the searchbar, THEN only a single event is emitted
    await user.clear(screen.getByRole("textbox"));
    expect(modelValueSpy).toHaveBeenCalledTimes(13);
    expect(modelValueSpy).toBeCalledWith(""); // - AND the value emitted is an empty string
    expect(screen.getByRole("textbox")).toHaveValue(""); // - AND the searchbar now has an empty string for the value
  });
  it("displays validation errors when provided", async () => {
    const { rerender } = render(SuiSearch, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: { modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: ["Fizz", "Buzz"] }
    });
    // - WHEN `validationErrors` is set, THEN a `<li>` is rendered for every error
    expect(screen.getByText("- Fizz")).toBeInTheDocument(); // - as `- theError`
    expect(screen.getByText("- Buzz")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    // - WHEN only 1 `validationError`, THEN only 1 `<li>` is rendered
    await rerender({ validationErrors: ["Fizz Buzz"] });
    expect(screen.getByText("- Fizz Buzz")).toBeInTheDocument(); // - With whitespace left as is
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    // - WHEN empty, THEN no `<li>` are rendered
    await rerender({ validationErrors: [] });
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
  // !: CSS styling props
  it("sets the root container width via `width`", async () => {
    const { rerender } = render(SuiSearch, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: { modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: [] }
    });
    // - WHEN the `width` prop is not set, THEN the root container only has a "field" CSS class
    expect(screen.getByText("Bar").parentElement).toHaveClass("field", { exact: true });

    // - WHEN the `width` prop is set to a valid number
    await rerender({ width: 10 });
    // - THEN the root container has a text number + "wide"
    expect(screen.getByText("Bar").parentElement).toHaveClass("field ten wide", { exact: true });
    // - WHEN the `width` is less than 1
    await rerender({ width: 0 });
    // - THEN the root container ONLY gets its normal "field" class
    expect(screen.getByText("Bar").parentElement).toHaveClass("field", { exact: true });
    // - WHEN the `width` is greater than 12
    await rerender({ width: 13 });
    // - THEN the root container ONLY gets its normal "field" class
    expect(screen.getByText("Bar").parentElement).toHaveClass("field", { exact: true });

    // - Sanity check, WHEN `width` == undefined, THEN only expect "field" CSS class
    await rerender({ width: undefined });
    expect(screen.getByText("Bar").parentElement).toHaveClass("field", { exact: true });
  });
  it("sets the root container as 'required' via prop", async () => {
    const { rerender } = render(SuiSearch, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: { modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: [] }
    });
    // - WHEN `required` is not set, THEN the root container will not be styled as "required"
    expect(screen.getByText("Bar").parentElement).toHaveClass("field", { exact: true });

    // - WHEN `required` == true, THEN the root container IS STYLED as "required"
    await rerender({ required: true });
    expect(screen.getByText("Bar").parentElement).toHaveClass("field required", { exact: true });

    // - Sanity check, WHEN `required` unset, THEN the root container is not styled as "required"
    await rerender({ required: undefined });
    expect(screen.getByText("Bar").parentElement).toHaveClass("field", { exact: true });
  });
  it("sets the searchbar container as 'fluid' via prop", async () => {
    const { rerender } = render(SuiSearch, {
      global: { mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } } },
      props: { modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: [] }
    });
    // - WHEN `fluid` is not set, THEN the searchbar's container by default adds a "fluid" CSS class
    expect(screen.getByRole("textbox").parentElement!.parentElement).toHaveClass("ui search fluid", { exact: true });

    // - WHEN `fluid` == false, THEN the searchbar's container removes the "fluid" CSS class
    await rerender({ fluid: false });
    expect(screen.getByRole("textbox").parentElement!.parentElement).toHaveClass("ui search", { exact: true });

    // - WHEN `fluid` == true, THEN the searchbar's container adds a "fluid" CSS class
    await rerender({ fluid: true });
    expect(screen.getByRole("textbox").parentElement!.parentElement).toHaveClass("ui search fluid", { exact: true });

    // - Sanity check, WHEN `fluid` is unset, THEN the searchbar's container includes "ui search fluid" CSS
    await rerender({ fluid: undefined });
    expect(screen.getByRole("textbox").parentElement!.parentElement).toHaveClass("ui search fluid", { exact: true });
  });
});