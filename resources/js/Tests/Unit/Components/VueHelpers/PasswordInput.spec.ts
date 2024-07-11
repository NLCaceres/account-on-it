import { render, screen } from "@testing-library/vue";
import { h } from "vue";
import userEvent from "@testing-library/user-event";
import PasswordInput from "@/Components/VueHelpers/PasswordInput.vue";
import SuiButtonedLabel from "@/Components/Forms/SuiButtonedLabel.vue";
import { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } from "@/Utility/Constants/Transitions";
import { createStore } from "vuex";
import { MOBILE_WIDTH } from "@/Store/GetterTypes";

const Store = (isMobile: boolean ) => {
  return createStore({ modules: {
    app: { namespaced: true, state: { window: { width: 1, height: 1 } }, getters: { [MOBILE_WIDTH]: () => isMobile } }
  }});
};

describe("Semantic UI Password Input", () => {
  it("renders a 'password' type input", async () => {
    const store = Store(true);
    const { unmount } = render(PasswordInput, {
      global: {
        plugins: [store], stubs: { SuiButtonedLabel },
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } }
      },
      props: {
        modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: [],
        disabled: true, readonly: true, required: true, placeholder: "Foo-Placeholder"
      }
    });
    const input = screen.getByRole("textbox");
    // - WHEN props are set, THEN they are passed into `<sui-input>` to set its attributes
    expect(input).toHaveAttribute("id", "Foo_Bar"); // - `modelName` + `fieldName` form `<input>` ID
    expect(input).toBeDisabled(); // - `disabled` = true, disables the `<input>`
    expect(input).toHaveAttribute("autocomplete", "On"); // - `autocomplete` defaults to "On"
    expect(input).toHaveAttribute("placeholder", "Foo-Placeholder");
    expect(input).toHaveAttribute("readonly");
    expect(input.parentElement!.parentElement).toHaveClass("password-input required");
    // - AND WHEN on mobile view, THEN the `<input>` container gets an "action" CSS class
    expect(input.parentElement).toHaveClass("action");

    unmount();

    const desktopStore = Store(false);
    render(PasswordInput, {
      global: {
        plugins: [desktopStore], stubs: { SuiButtonedLabel },
        mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } }
      },
      props: {
        modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: [],
        autocomplete: "Off", disabled: false, readonly: false, required: false, placeholder: "Foo-Placeholder"
      }
    });
    const desktopInput = screen.getByRole("textbox");
    // - WHEN props changed, THEN these changes are passed into `<sui-input>`
    expect(desktopInput).not.toBeDisabled();
    expect(desktopInput).toHaveAttribute("autocomplete", "Off");
    expect(desktopInput).not.toHaveAttribute("readonly");
    expect(desktopInput.parentElement!.parentElement).toHaveClass("field password-input", { exact: true });
    // - AND WHEN on a larger viewport, THEN the `<input>` container removes "action" CSS class
    expect(desktopInput.parentElement).not.toHaveClass("action");
  });
  describe("renders a show button", () => {
    it("when clicked, it changes input type to display password", async () => {
      const store = Store(true);
      const showPassSpy = vi.fn();
      const stubComponent = {
        render() {
          return h(PasswordInput,
            {
              onClick: showPassSpy, modelName: "Foo", fieldName: "password",
              modelValue: "", validationErrors: [], parentShowsPass: false
            },
          );
        }
      };
      const user = userEvent.setup();
      const { rerender, unmount } = render(stubComponent, {
        global: {
          plugins: [store], stubs: { SuiButtonedLabel },
          mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } }
        }
      });
      // - WHEN `parentShowsPass` = false, THEN `<input>` == "password" type
      expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
      await user.click(screen.getByRole("button"));
      // - WHEN `parentShowsPass` set + show button clicked, THEN the spy runs
      expect(showPassSpy).toHaveBeenCalledOnce();
      // - BUT UNLESS the parent updates `parentShowsPass`, THEN `<input>` remains unchanged
      expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");

      await rerender({ parentShowsPass: undefined });
      await user.click(screen.getByRole("button"));
      // - WHEN parentShowsPass == undefined, THEN clicking the show button DOESN'T call the spy
      expect(showPassSpy).toHaveBeenCalledOnce();
      // - BUT the `<password-input>` component handles its own state, updating the `<input>` to "text" type
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");

      unmount();

      const desktopStore = Store(false);
      const { rerender: secondRerender } = render(stubComponent, {
        global: {
          plugins: [desktopStore], stubs: { SuiButtonedLabel },
          mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } }
        }
      });
      // - WHEN `parentShowsPass` = false, then `<input>` is "password" type
      expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
      await user.click(screen.getByRole("button"));
      // - AND WHEN the show button is clicked, the parent handler spy is called
      expect(showPassSpy).toHaveBeenCalledTimes(2);
      // - BUT no change to the `<input>` type unless the parent called for it
      expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");

      await secondRerender({ parentShowsPass: undefined });
      // - WHEN `parentShowsPass` = undefined, THEN `<input>` is "password" type
      expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
      await user.click(screen.getByRole("button"));
      // - BUT parent handler spy is not called
      expect(showPassSpy).toHaveBeenCalledTimes(2);
      // - AND the `<password-input>` updates its own state, changing the `<input>` to "text" type
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });
    it("moves to the side on mobile", () => {
      const store = Store(true);
      const { unmount } = render(PasswordInput, {
        global: {
          plugins: [store], stubs: { SuiButtonedLabel },
          mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } }
        },
        props: {
          modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: []
        }
      });
      const input = screen.getByRole("textbox");
      // - WHEN on mobile, THEN a "Show Password" button is appended to the end
      expect(input.nextElementSibling).toHaveClass("ui animated fade compact button");

      unmount();

      const desktopStore = Store(false);
      render(PasswordInput, {
        global: {
          plugins: [desktopStore], stubs: { SuiButtonedLabel },
          mocks: { Transitions: { INVALID_TRANSITION, VALIDATION_INPUT_TRANSITION } }
        },
        props: {
          modelName: "Foo", fieldName: "Bar", modelValue: "", validationErrors: []
        }
      });
      const desktopInput = screen.getByRole("textbox");
      // - WHEN on larger viewports, THEN the `<input>` button sibling is moved next to the label
      expect(desktopInput.nextElementSibling).toBeNull();
      expect(screen.getByText("Bar")).toHaveClass("form-label");
      expect(screen.getByText("Bar").nextElementSibling).toHaveRole("button");
    });
  });
});