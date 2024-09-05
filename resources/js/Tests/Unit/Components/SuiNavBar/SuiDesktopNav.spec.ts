import SuiDesktopNav from "@/Components/Elements/SuiNavBar/SuiDesktopNav.vue";
import NotFound from "@/Components/GenericViews/NotFound.vue";
import HomePage from "@/Views/Home/HomePage.vue";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";


const routes = [
  { path: "/", name: "Home", components: { wide: HomePage } },
  { path: "/foo", component: NotFound }
];
const router = createRouter({ history: createWebHistory(), routes });

const VuexStore = (authenticated: boolean) => {
  return createStore({ modules: {
    app: { namespaced: true, state: { window: { width: 1020 } } },
    authentication: {
      namespaced: true, state: { authenticated },
      mutations: { authenticate(state, setAuth) { state.authenticated = setAuth; }}
    },
  }});
};

describe("Semantic UI styled navbar for desktop viewports", () => {
  it("displays a dropdown menu to login if logged out or a menu with log out button if logged in", async () => {
    const store = VuexStore(false);
    const { rerender } = render(SuiDesktopNav, {
      global: { plugins: [router, store], stubs: ["SuiLoginPopup"] }, slots: { default: "Foo" }
    });
    // - WHEN a user is NOT authenticated, THEN the "Log in" button is displayed in a dropdown
    expect(screen.getByText("Foo")).toBeInTheDocument();
    expect(screen.getByText(/log in/i)).toBeInTheDocument();

    // - WHEN the user is authenticated
    store.commit("authentication/authenticate", true);
    await rerender({});
    // - THEN the "Log out" button is displayed
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });
  it("displays a full list of links if its searchbar is not expanded", async () => {
    const user = userEvent.setup();
    const store = VuexStore(true);
    render(SuiDesktopNav, {
      global: { plugins: [router, store], stubs: ["SuiLoginPopup"] }, slots: { default: "Foo", links: "Bar", }
    });
    expect(screen.getByText("Bar")).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();

    // - WHEN the searchbar is clicked
    const searchBarComponent = screen.getByRole("textbox").parentElement!.parentElement!;
    await user.click(searchBarComponent);
    // - THEN the "Log out" button and nav links are not displayed
    expect(screen.queryByText("Bar")).not.toBeInTheDocument();
    expect(screen.queryByText(/log out/i)).not.toBeInTheDocument();

    // - WHEN the user clicks the searchbar again
    await user.click(searchBarComponent);
    // - THEN the "Log out" button and nav links remain gone
    expect(screen.queryByText("Bar")).not.toBeInTheDocument();
    expect(screen.queryByText(/log out/i)).not.toBeInTheDocument();

    // - WHEN the user clicks the searchbar close button
    await user.click(screen.getByRole("button", { name: /searchbar close/i }));
    // - THEN the "Log out" button and nav links return
    expect(screen.getByText("Bar")).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });
  it("routes the user home on log out", async () => {
    const user = userEvent.setup();
    const store = VuexStore(true);
    const pushForwardSpy = vi.spyOn(router, "push");
    const dispatchSpy = vi.spyOn(store, "dispatch")
      .mockImplementationOnce(async () => { return { data: { message: "Log" } }; });
    render(SuiDesktopNav, {
      global: { plugins: [router, store], stubs: ["SuiLoginPopup"] }, slots: { default: "Foo", links: "Bar", }
    });
    // - Sanity check that `$router.push` and `$store.dispatch` have not yet been called
    expect(pushForwardSpy).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();

    // - WHEN the user clicks "Log out" from the home url ("/")
    await user.click(screen.getByText(/log out/i));
    // - THEN `$store.dispatch` is called to sign out
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenLastCalledWith("authentication/SIGN_OUT");
    // - BUT if server doesn't respond with a "Logged out" message, `$router.push` is NOT called
    expect(pushForwardSpy).not.toHaveBeenCalled();

    router.push("/foo");
    expect(pushForwardSpy).toHaveBeenCalledTimes(1); // - Sanity check, called `push` from the test

    dispatchSpy.mockImplementationOnce(async () => { return { data: { message: "Log" } }; });
    // - WHEN the user clicks "Log out" from a different URL
    await user.click(screen.getByText(/log out/i));
    // - THEN `$store.dispatch` calls sign out again
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenLastCalledWith("authentication/SIGN_OUT");
    // - BUT `push` is STILL NOT called due to the wrong server response
    expect(pushForwardSpy).toHaveBeenCalledTimes(1);

    expect(pushForwardSpy).toHaveBeenCalledTimes(1);
    dispatchSpy.mockImplementationOnce(async () => { return { data: { message: "Logged out" } }; });
    // - WHEN the user clicks "Log out" from a different URL and gets a proper server response
    await user.click(screen.getByText(/log out/i));
    // - THEN `push` is finally called to go back to the "Home" URL
    expect(pushForwardSpy).toHaveBeenCalledTimes(2);
    expect(pushForwardSpy).toHaveBeenLastCalledWith({ name: "Home" });
    // - AND `dispatch` is called as always to perform the sign out
    expect(dispatchSpy).toHaveBeenCalledTimes(3);
    expect(dispatchSpy).toHaveBeenLastCalledWith("authentication/SIGN_OUT");

    dispatchSpy.mockImplementationOnce(async () => { return { data: { message: "Logged out" } }; });
    // - WHEN the user clicks "Log out" from the home URL AND gets a proper server response
    await user.click(screen.getByText(/log out/i));
    // - THEN `push` is NOT called again since we're already at the "Home" URL
    expect(pushForwardSpy).toHaveBeenCalledTimes(2);
    expect(pushForwardSpy).toHaveBeenLastCalledWith({ name: "Home" });
    // - BUT `dispatch` is called as always to perform the sign out
    expect(dispatchSpy).toHaveBeenCalledTimes(4);
    expect(dispatchSpy).toHaveBeenLastCalledWith("authentication/SIGN_OUT");
  });
});