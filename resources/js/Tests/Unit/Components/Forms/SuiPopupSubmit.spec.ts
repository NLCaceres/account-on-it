import SuiPopupSubmit from "@/Components/Forms/SuiPopupSubmit.vue";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import * as AuthAPI from "@/API/AuthenticationAPI";

describe("Semantic UI Popup Form Buttons", () => {
  beforeEach(() => { vi.restoreAllMocks(); });

  it("disables the form's submit button based on local state set by recaptcha or overridden by parent", async () => {
    const recaptchaCheckSpy = vi.spyOn(AuthAPI, "recaptchaVerify").mockImplementationOnce(() => Promise.resolve(0.7));
    const { rerender, unmount } = render(SuiPopupSubmit, { props: { recaptchaActionName: "" } });
    // - WHEN the buttons initially render with a failed Recaptcha, THEN the "submit" button is disabled and styled so
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("disabled");
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass("disabled");
    // - AND no loading styling
    expect(screen.getByRole("button", { name: "Submit" })).not.toHaveClass("loading");
    // - NOT the back button
    expect(screen.getByRole("button", { name: "Back" })).not.toHaveAttribute("disabled");
    expect(screen.getByRole("button", { name: "Back" })).not.toHaveClass("disabled");

    await rerender({ setLoading: true, setDisabled: false });
    // - WHEN the parent of `<sui-popup-submit>` sets `setLoading` = true & `setDisabled` = false,
    // - THEN it overrides any local state already set (`disabled` = true)
    expect(screen.getByRole("button", { name: "Submit" })).not.toHaveAttribute("disabled");
    expect(screen.getByRole("button", { name: "Submit" })).not.toHaveClass("disabled");
    // - AND `loading` = false gets overridden by `setLoading` = true
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass("loading");

    unmount();

    recaptchaCheckSpy.mockImplementationOnce(() => Promise.resolve(0.8));
    const { rerender: secondRerender } = render(SuiPopupSubmit, { props: { recaptchaActionName: "" } });
    // - WHEN the buttons initially render with a successful Recaptcha,
    // - THEN the "submit" button is NOT disabled and NOT styled so
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await waitFor(() => expect(submitButton).not.toHaveAttribute("disabled"));
    expect(screen.getByRole("button", { name: "Submit" })).not.toHaveClass("disabled");
    // - AND still not loading styled
    expect(screen.getByRole("button", { name: "Submit" })).not.toHaveClass("loading");
    // - AND the back button still is not affected in any way
    expect(screen.getByRole("button", { name: "Back" })).not.toHaveAttribute("disabled");
    expect(screen.getByRole("button", { name: "Back" })).not.toHaveClass("disabled");

    await secondRerender({ setLoading: true, setDisabled: true });
    // - WHEN the parent of `<sui-popup-submit>` sets `setLoading` = true & `setDisabled` = true,
    // - THEN it overrides any local state already set (`disabled` = false)
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("disabled");
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass("disabled");
    // - AND `loading` = false STILL gets overridden by `setLoading` = true
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass("loading");
  });
  it("fires off a recaptcha verification", () => {
    const recaptchaCheckSpy = vi.spyOn(AuthAPI, "recaptchaVerify").mockImplementation(() => Promise.resolve(0.7));
    const { unmount } = render(SuiPopupSubmit, { props: { recaptchaActionName: "" } });
    // - WHEN `<sui-popup-submit>` initially renders, THEN it calls the recaptcha check on mount
    expect(recaptchaCheckSpy).toHaveBeenCalledOnce();
    expect(recaptchaCheckSpy).toHaveBeenCalledWith("");

    unmount();

    render(SuiPopupSubmit, { props: { recaptchaActionName: "Foobar" } });
    // - WHEN `<sui-popup-submit>` renders, THEN it calls the recaptcha check using `recaptchaActionName` as its param
    expect(recaptchaCheckSpy).toHaveBeenCalledTimes(2);
    expect(recaptchaCheckSpy).toHaveBeenLastCalledWith("Foobar");
  });
  it("renders a back button that emits an event or uses the router based on prop", async () => {
    vi.spyOn(AuthAPI, "recaptchaVerify").mockImplementation(() => Promise.resolve(0.7));
    const updateEventSpy = vi.fn();
    const stubComponent = {
      render() { return h(SuiPopupSubmit, { "onUpdate:view": updateEventSpy, recaptchaActionName: "" }); }
    };
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", name: "Home", component: stubComponent }], // ?: At least the "/" path must be defined
    });
    const { rerender } = render(stubComponent, { global: { plugins: [router] }});
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Back" }));
    // - WHEN the "Back" button is clicked BUT `inSubview` == false, THEN no update event fires
    expect(updateEventSpy).not.toHaveBeenCalled();

    await rerender({ inSubview: true });
    await user.click(screen.getByRole("button", { name: "Back" }));
    // - WHEN the "Back" button is clicked AND `inSubview` == true, THEN an "update:view" event is fired
    expect(updateEventSpy).toHaveBeenCalledOnce();

    await rerender({ inSubview: false });
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(updateEventSpy).toHaveBeenCalledOnce(); // - Not called again
  });
});