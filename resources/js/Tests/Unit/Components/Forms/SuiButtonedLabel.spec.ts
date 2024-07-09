import { fireEvent, render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { h } from "vue";
import SuiButtonedLabel from "@/Components/Forms/SuiButtonedLabel.vue";

describe("Semantic UI Label with Button attached", () => {
  describe("renders a label", () => {
    it("with a slot", () => {
      render(SuiButtonedLabel, { props: { modelName: "", fieldName: "" }, slots: { default: "Foobar" } });
      expect(screen.getByText("Foobar")).toBeInTheDocument();
      expect(screen.getByText("Foobar")).toHaveClass("form-label");
    });
    it("uses props to create the 'for' attribute", async () => {
      const { rerender } = render(SuiButtonedLabel, {
        props: { modelName: "", fieldName: "" }, slots: { default: "Barfoo" }
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
  it("emits a non-native click event from button", async () => {
    const buttonListenerSpy = vi.fn();
    const stubComponent = {
      render() {
        return h(SuiButtonedLabel, { onClick: buttonListenerSpy, modelName: "", fieldName: "" }, () => "Foobar");
      }
    };
    const user = userEvent.setup();
    render(stubComponent);
    // - WHEN the button is clicked
    await user.click(screen.getByRole("button"));
    // - THEN buttonListenerSpy runs
    expect(buttonListenerSpy).toHaveBeenCalledOnce();

    // - Testing-Lib's `fireEvent` still kicks off the buttonListener's custom "click" event
    await fireEvent(screen.getByRole("button"), new Event("click"));
    expect(buttonListenerSpy).toHaveBeenCalledTimes(2);

    // - WHEN other click events fire
    await fireEvent(screen.getByRole("button").parentElement!, new Event("click"));
    // - THEN they're ignored despite the button expecting a basic "click" event
    expect(buttonListenerSpy).toHaveBeenCalledTimes(2);
  });
});