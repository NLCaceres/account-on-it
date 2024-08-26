import BackButton from "@/Components/VueHelpers/BackButton.vue";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { h } from "vue";
import { createRouter, createWebHistory } from "vue-router";


describe("An App-themed Back Button with left-facing arrow", () => {
  beforeEach(() => { vi.restoreAllMocks(); });

  it("emits a `change-sort` event", async () => {
    const user = userEvent.setup();
    const backNavigationEventSpy = vi.fn();
    const stubComponent = {
      render() { return h(BackButton, { "onGoBack": backNavigationEventSpy }); }
    };
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", name: "Home", component: stubComponent }], // ?: At least the "/" path must be defined
    });
    const goBackSpy = vi.spyOn(router, "go");
    const pushForwardSpy = vi.spyOn(router, "push");
    const { rerender } = render(stubComponent, { global: { plugins: [router] } });
    expect(screen.getByText("Back")).toBeInTheDocument();
    // - WHEN the user clicks the "Back button"
    await user.click(screen.getByText("Back"));
    // - THEN the backNavigationEventSpy is fired from the "go-back" event
    expect(backNavigationEventSpy).toHaveBeenCalled();
    // - BUT no other router methods are called
    expect(goBackSpy).not.toHaveBeenCalled(); // - $router.go() is not called
    expect(pushForwardSpy).not.toHaveBeenCalled(); // - $router.push() is not called

    // - WHEN the user clicks again
    await user.click(screen.getByText("Back"));
    // - THEN the backNavigationEventSpy is called again
    expect(backNavigationEventSpy).toHaveBeenCalledTimes(2);
    // - AND no other router methods are called still
    expect(goBackSpy).not.toHaveBeenCalled();
    expect(pushForwardSpy).not.toHaveBeenCalled();

    await rerender({ stepsBack: -1 });
    // - WHEN the user clicks again BUT `stepsBack` has been set
    await user.click(screen.getByText("Back"));
    // - THEN the backNavigationEventSpy HASN'T been called again
    expect(backNavigationEventSpy).toHaveBeenCalledTimes(2);
    // - BUT the `router.push()` spy was called instead
    expect(goBackSpy).not.toHaveBeenCalled();
    expect(pushForwardSpy).toHaveBeenCalled();
  });
  it("calls the Vue-Router if the `stepsBack` prop is used", async () => {
    const user = userEvent.setup();
    const backNavigationSpy = vi.fn();
    const stubComponent = {
      render() { return h(BackButton, { "onGoBack": backNavigationSpy, stepsBack: -1 }); }
    };
    const router = createRouter({
      history: createWebHistory(),
      routes: [ // ?: At least the "/" path must be defined
        { path: "/", name: "Home", component: stubComponent },
        { path: "/foo", component: stubComponent },
        { path: "/bar", component: stubComponent }
      ],
    });
    const goBackSpy = vi.spyOn(router, "go");
    const pushForwardSpy = vi.spyOn(router, "push");
    render(stubComponent, { global: { plugins: [router] }});
    expect(screen.getByText("Back")).toBeInTheDocument();
    // - WHEN the user clicks the "Back" button
    await user.click(screen.getByText("Back"));
    // - THEN `router.push()` goes to the "/" route, triggering the push spy
    expect(pushForwardSpy).toHaveBeenCalled();
    expect(pushForwardSpy).toHaveBeenCalledWith("/");
    // - No other spy is called
    expect(backNavigationSpy).not.toHaveBeenCalled();
    expect(goBackSpy).not.toHaveBeenCalled(); // - `router.go()` is not called

    // - WHEN the user clicks again
    await user.click(screen.getByText("Back"));
    // - THEN the pushForwardSpy is called again
    expect(pushForwardSpy).toHaveBeenCalledTimes(2);
    expect(pushForwardSpy).toHaveBeenLastCalledWith("/");
    // - No other spy is called still
    expect(backNavigationSpy).not.toHaveBeenCalled();
    expect(goBackSpy).not.toHaveBeenCalled();

    router.push("/foo");
    router.push("/bar");
    // - WHEN the router has a tracked history
    await user.click(screen.getByText("Back"));
    // - THEN `router.go()` uses the `stepsBack` prop as a param, triggering the `goBackSpy`
    expect(goBackSpy).toHaveBeenCalled();
    expect(goBackSpy).toHaveBeenCalledWith(-1);
    // - BUT I called push outside of the component so its spy is still called
    expect(pushForwardSpy).toHaveBeenCalledTimes(4); // - 2 more times
    expect(pushForwardSpy).toHaveBeenLastCalledWith("/bar"); // - BUT with the "/bar" URL
  });
  it("can use a `breadcrumb` prop to add matching CSS styling", async () => {
    const { rerender } = render(BackButton, { props: { breadcrumb: true } });
    expect(screen.getByText("Back")).toBeInTheDocument();
    // - WHEN `breadcrumb` == true, THEN CSS classes are added to style the button as a "breadcrumb"
    expect(screen.getByText("Back")).toHaveClass(
      "tertiary border-slim-b-white app-brand-blue rounded-x ui inverted button app-blue", { exact: true }
    );

    await rerender({ breadcrumb: false });
    // - WHEN `breadcrumb` == false or undefined, THEN the only CSS left is "ui inverted button app-blue"
    expect(screen.getByText("Back")).toHaveClass("ui inverted button app-blue", { exact: true });

    await rerender({ breadcrumb: undefined });
    expect(screen.getByText("Back")).toHaveClass("ui inverted button app-blue", { exact: true });
  });
});