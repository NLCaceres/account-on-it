import SuiMobileNav from "@/Components/Elements/SuiNavBar/SuiMobileNav.vue";
import NotFound from "@/Components/GenericViews/NotFound.vue";
import { render, screen } from "@testing-library/vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";


const routes = [
  {
    path: "/", name: "Home",
    components: { wide: NotFound }
  },
  {
    path: "/login", name: "Login",
    component: NotFound,
  }
];
const VuexStore = (width: number, authenticated: boolean = false) => {
  return createStore({ modules: {
    app: {
      namespaced: true, state: { window: { width } },
      mutations: { updateWidth(state, newWidth) { state.window.width = newWidth; }}
    },
    authentication: { namespaced: true, state: { authenticated } },
  }});
};

describe("Semantic UI styled navbar for mobile viewports", () => {
  it("displays the login if unauthenticated or nav links if authenticated", async () => {
    const router = createRouter({ history: createWebHistory(), routes });
    const store = VuexStore(550);
    const { unmount } = render(SuiMobileNav, {
      global: { plugins: [router, store] }, slots: { default: "Foo", "mobile-links": "<h1>Bar</h1>" }
    });
    // - WHEN the user is NOT authenticated, THEN a "Log In" link is displayed
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.queryByText("Bar")).not.toBeInTheDocument(); // - NOT the nav links
    unmount();

    const authenticatedStore = VuexStore(550, true);
    render(SuiMobileNav, {
      global: { plugins: [router, authenticatedStore] }, slots: { default: "Foo", "mobile-links": "<h1>Bar</h1>" }
    });
    // - WHEN the user is authenticated, THEN nav links are displayed
    expect(screen.getByText("Bar")).toBeInTheDocument();
    expect(screen.queryByText(/log in/i)).not.toBeInTheDocument(); // - NOT the "Log In" link
  });
  it("uses the Vuex Store to set the width of the nav links", async () => {
    const router = createRouter({ history: createWebHistory(), routes });
    const store = VuexStore(550, true);
    const { rerender } = render(SuiMobileNav, {
      global: { plugins: [router, store] }, slots: { default: "Foo", "mobile-links": "<div>Bar</div>" }
    });
    // - WHEN the window width is 550, THEN the navbar links' container width will be 550
    expect(screen.getByText("Bar").parentElement).toHaveStyle("width: 550px;");

    // - WHEN the window width changes, THEN the navbar links' container will update to match
    store.commit("app/updateWidth", 320);
    // ?: An alternative to unmounting with a new VuexStore is creating and calling a mutation then rerendering()
    await rerender({});
    // - NOTE that at least in unit tests, the "mobile-links" slot itself WON'T match the width
    expect(screen.getByText("Bar").parentElement).toHaveStyle("width: 320px;");
  });
  it("re-runs the Semantic UI dropdown setup every re-render", async () => {
    const dropdownSpy = vi.spyOn($.fn, "dropdown").mockImplementation((_a) => { return {} as JQuery<HTMLElement>; });
    const router = createRouter({ history: createWebHistory(), routes });
    const store = VuexStore(550, true);
    const { rerender, unmount } = render(SuiMobileNav, {
      global: { plugins: [router, store] }, slots: { default: "Foo", "mobile-links": "<div>Bar</div>" }
    });
    // - WHEN the component first renders the mobile-links (authenticated)
    expect(screen.getByText("Bar")).toBeInTheDocument();
    // - THEN the dropdown setup function is NOT run
    expect(dropdownSpy).not.toHaveBeenCalled();

    // - WHEN the component is updated in any way
    store.commit("app/updateWidth", 320);
    await rerender({});
    // - THEN the dropdown setup function runs
    expect(dropdownSpy).toHaveBeenCalledTimes(1);

    // - WHEN the component updates BUT DOESN'T need to rerender (state is identical)
    store.commit("app/updateWidth", 320);
    await rerender({});
    // - THEN the dropdown setup function DOESN'T run
    expect(dropdownSpy).toHaveBeenCalledTimes(1);

    // - WHEN the component updates
    store.commit("app/updateWidth", 550);
    await rerender({});
    // - THEN the dropdown setup function runs again
    expect(dropdownSpy).toHaveBeenCalledTimes(2);

    unmount();

    const unauthStore = VuexStore(550, false);
    render(SuiMobileNav, {
      global: { plugins: [router, unauthStore] }, slots: { default: "Foo", "mobile-links": "<div>Bar</div>" }
    });
    expect(dropdownSpy).toHaveBeenCalledTimes(2);
    // - WHEN the user is NOT authenticated
    store.commit("app/updateWidth", 550);
    await rerender({});
    // - THEN the dropdown will not be setup, even if the component updates
    expect(dropdownSpy).toHaveBeenCalledTimes(2);
  });
});