import HeaderBackButton from "@/Components/Elements/Headers/HeaderBackButton.vue";
import NotFound from "@/Components/GenericViews/NotFound.vue";
import BackButton from "@/Components/VueHelpers/BackButton.vue";
import { MID_DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH } from "@/Store/GetterTypes";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";


const VuexStore = (isMobile: boolean, isTablet: boolean, isDesktop: boolean) => {
  return createStore({ modules: {
    app: {
      namespaced: true,
      getters: {
        [MOBILE_WIDTH]() { return isMobile; },
        [TABLET_WIDTH]() { return isTablet; },
        [MID_DESKTOP_WIDTH]() { return isDesktop; }
      }
    }
  } });
};

describe("A Header with divider and back button", () => {
  it("places the back button in front of the header via prop", async () => {
    const store = VuexStore(true, false, false);
    const { rerender, container } = render(HeaderBackButton, {
      slots: { default: "Foobar" }, global: { plugins: [store], stubs: { BackButton } }
    });
    // - WHEN `reverse` == undefined
    const componentRoot = container.firstElementChild!;
    // - THEN `reverse` defaults to false and the root container gets a "flexed-column" CSS class
    expect(componentRoot).toHaveClass("flexed-column");

    // - WHEN `reverse` == true
    await rerender({ reverse: true });
    // - THEN the root container gets a "flexed-column-reverse" CSS class
    expect(componentRoot).toHaveClass("flexed-column-reverse");
  });
  it("inserts CSS classes onto the heading container via prop", async () => {
    const store = VuexStore(true, false, false);
    const { rerender } = render(HeaderBackButton, {
      slots: { default: "Foobar" }, global: { plugins: [store], stubs: { BackButton } }
    });
    expect(screen.getByRole("heading", { level: 1, name: "Foobar" })).toBeInTheDocument();
    // - WHEN `headerClasses` == undefined, THEN the header container gets NO CSS classes
    expect(screen.getByRole("heading", { level: 1, name: "Foobar" }).parentElement)
      .toHaveClass("", { exact: true });

    // - WHEN `headerClasses` is set
    await rerender({ headerClasses: "fizz bar" });
    // - THEN the header container gets ALL CSS classes
    expect(screen.getByRole("heading", { level: 1, name: "Foobar" }).parentElement)
      .toHaveClass("fizz bar", { exact: true });
  });
  it("applies a different margin CSS class based on `reverse` prop and viewport width", async () => {
    const store = VuexStore(false, false, false);
    const { rerender, unmount } = render(HeaderBackButton, {
      slots: { default: "Foobar" }, global: { plugins: [store], stubs: { BackButton } }
    });
    // - WHEN `reverse` == undefined, THEN it defaults to to false and no CSS is applied to the Back Button
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i }).parentElement).not.toHaveClass();

    // - WHEN `reverse` == true
    await rerender({ reverse: true });
    // - THEN a "m-sm-y" CSS class is applied to the Back Button
    expect(screen.getByRole("button", { name: /back/i }).parentElement).toHaveClass("m-sm-y");
    unmount();

    const mobileStore = VuexStore(true, false, false);
    const { rerender: rerenderMobile, unmount: unmountMobile } = render(HeaderBackButton, {
      slots: { default: "Foobar" }, global: { plugins: [mobileStore], stubs: { BackButton } }
    });
    // - WHEN `reverse` == undefined and the Vuex store determines the viewport is a mobile device
    // - THEN no CSS class is applied to the Back Button
    expect(screen.getByRole("button", { name: /back/i }).parentElement).not.toHaveClass();

    // - WHEN `reverse` == true and on a mobile viewport
    await rerenderMobile({ reverse: true });
    // - THEN "m-sm-y" and "nega-m-sm-l" CSS is applied to the Back Button
    expect(screen.getByRole("button", { name: /back/i }).parentElement).toHaveClass("m-sm-y nega-m-sm-l");
    unmountMobile();

    const tabletStore = VuexStore(false, true, false);
    const { rerender: rerenderTablet, unmount: unmountTablet } = render(HeaderBackButton, {
      slots: { default: "Foobar" }, global: { plugins: [tabletStore], stubs: { BackButton } }
    });
    // - WHEN `reverse` == undefined and the Vuex store determines the viewport is a tablet device
    // - THEN no CSS class is applied to the Back Button
    expect(screen.getByRole("button", { name: /back/i }).parentElement).not.toHaveClass();

    // - WHEN `reverse` == true and on a tablet viewport
    await rerenderTablet({ reverse: true });
    // - THEN "m-sm-y" and "nega-m-lg-l" CSS is applied to the Back Button
    expect(screen.getByRole("button", { name: /back/i }).parentElement).toHaveClass("m-sm-y nega-m-lg-l");
    unmountTablet();

    const desktopStore = VuexStore(false, false, true);
    const { rerender: rerenderDesktop, unmount: unmountDesktop } = render(HeaderBackButton, {
      slots: { default: "Foobar" }, global: { plugins: [desktopStore], stubs: { BackButton } }
    });
    // - WHEN `reverse` == undefined and the Vuex store determines the viewport is a desktop device
    // - THEN no CSS class is applied to the Back Button
    expect(screen.getByRole("button", { name: /back/i }).parentElement).not.toHaveClass();

    // - WHEN `reverse` == true and on a desktop viewport
    await rerenderDesktop({ reverse: true });
    // - THEN "m-sm-y" and "nega-m-xl-l" CSS is applied to the Back Button
    expect(screen.getByRole("button", { name: /back/i }).parentElement).toHaveClass("m-sm-y nega-m-xl-l");
    unmountDesktop();
  });
  it("passes `breadcrumb` as a prop to the `BackButton` component", async () => {
    const store = VuexStore(false, false, false);
    const { rerender } = render(HeaderBackButton, {
      slots: { default: "Foobar" }, global: { plugins: [store], stubs: { BackButton } }, props: { breadcrumb: true }
    });
    // - WHEN `breadcrumb` == true, THEN `BackButton` receives it and applies the expected CSS classes
    expect(screen.getByRole("button", { name: /back/i }))
      .toHaveClass("tertiary border-slim-b-white app-brand-blue rounded-x");

    // - WHEN `breadcrumb` == false/undefined
    await rerender({ breadcrumb: false });
    // - THEN `BackButton` WON'T applied any expected CSS classes
    expect(screen.getByRole("button", { name: /back/i }))
      .not.toHaveClass("tertiary border-slim-b-white app-brand-blue rounded-x");
  });
  it("passes `stepsBack` to the `BackButton` component", async () => {;
    const user = userEvent.setup();
    const routes = [{ path: "/", component: NotFound }, { path: "/foo", component: NotFound }];
    const router = createRouter({ history: createWebHistory(), routes });
    const goSpy = vi.spyOn(router, "go");
    const pushSpy = vi.spyOn(router, "push");
    const store = VuexStore(false, false, false);
    const { rerender } = render(HeaderBackButton, {
      slots: { default: "Foobar" }, global: { plugins: [store, router], stubs: { BackButton } }, props: { stepsBack: 1 }
    });
    // - Sanity check that spies haven't been called yet
    expect(goSpy).toHaveBeenCalledTimes(0);
    expect(pushSpy).toHaveBeenCalledTimes(0);
    // - Setup the location history to be 2
    router.push("/foo");
    await router.isReady(); // ?: Ensure the router finishes updating its history
    router.push("/");

    // - WHEN the Back Button is clicked
    await user.click(screen.getByRole("button",{ name: /back/i }));
    // - THEN `$router.go` should have been called (not `push` since history length > 1)
    expect(goSpy).toHaveBeenCalledTimes(1);
    expect(goSpy).toHaveBeenLastCalledWith(1); // - AND `stepsBack` has been passed down for `go` to use
    expect(pushSpy).toHaveBeenNthCalledWith(2, "/"); // - AND `push` WASN'T called again

    // - WHEN `stepsBack` is updated and Back Button clicked
    await rerender({ stepsBack: 10 });
    await user.click(screen.getByRole("button",{ name: /back/i }));
    // - THEN `$router.go` is called again BUT now with the new `stepsBack` value of 10
    expect(goSpy).toHaveBeenCalledTimes(2);
    expect(goSpy).toHaveBeenLastCalledWith(10);
    expect(pushSpy).toHaveBeenNthCalledWith(2, "/"); // - AND `push` STILL NOT called

    // - WHEN `stepsBack` is undefined and Back Button is clicked
    await rerender({ stepsBack: undefined });
    await user.click(screen.getByRole("button",{ name: /back/i }));
    // - THEN `$router.go` is called with a default `stepsBack` value of -1
    expect(goSpy).toHaveBeenNthCalledWith(3, -1);
    expect(pushSpy).toHaveBeenCalledTimes(2); // - AND `push` STILL not called
  });
  it("lets the parent handle routing by emitting a 'goBack' event", async () => {
    const user = userEvent.setup();
    const routes = [{ path: "/", component: NotFound }, { path: "/foo", component: NotFound }];
    const router = createRouter({ history: createWebHistory(), routes });
    const goBackEventSpy = vi.fn();
    const goSpy = vi.spyOn(router, "go");
    const pushSpy = vi.spyOn(router, "push");
    const stubComponent = {
      render() {
        return h(HeaderBackButton, { onGoBack: goBackEventSpy, stepsBack: 1, parentHandledBackButton: true });
      }
    };
    const store = VuexStore(false, false, false);
    const { rerender } = render(stubComponent, {
      slots: { default: "Foobar" }, global: { plugins: [store, router], stubs: { BackButton } }
    });
    // - Sanity check that spies haven't been setup
    expect(goBackEventSpy).toHaveBeenCalledTimes(0);
    expect(goSpy).toHaveBeenCalledTimes(0);
    expect(pushSpy).toHaveBeenCalledTimes(0);
    // - Setup history length to 2
    router.push("/foo");
    await router.isReady(); // ?: Helps ensure history correctly setup
    router.push("/");
    expect(pushSpy).toHaveBeenNthCalledWith(2, "/");

    // - WHEN `parentHandledBackButton` == true and the Back Button is clicked
    await user.click(screen.getByRole("button",{ name: /back/i }));
    // - THEN a "go-back" event is emitted from BOTH `HeaderBackButton` and `BackButton`
    expect(goBackEventSpy).toHaveBeenCalledTimes(1);
    // - AND `$router.go` and `$router.push` are NOT called
    expect(goSpy).toHaveBeenCalledTimes(0);
    expect(pushSpy).toHaveBeenCalledTimes(2);

    // - WHEN `parentHandledBackButton` == false AND `stepsBack` == 0, and the Back Button is clicked
    await rerender({ stepsBack: 0, parentHandledBackButton: false });
    await user.click(screen.getByRole("button",{ name: /back/i }));
    // - THEN a "go-back" event is NOT emitted
    expect(goBackEventSpy).toHaveBeenCalledTimes(1);
    // - BUT `$router.go` and `$router.push` STILL NOT called
    expect(goSpy).toHaveBeenCalledTimes(0);
    expect(pushSpy).toHaveBeenCalledTimes(2);
    // - The implication here is the event is NOT propagated, so maybe the HeaderBackButton should handle it?
  });
});