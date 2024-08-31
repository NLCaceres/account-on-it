import { render, screen } from "@testing-library/vue";
import SuiNav from "@/Components/Elements/SuiNavBar/SuiNav.vue";
import HomePage from "@/Views/Home/HomePage.vue";
import NotFound from "@/Components/GenericViews/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

const routes = [
  {
    path: "/", name: "Home",
    components: { wide: HomePage }
  },
  { // ?: Link renders fine as long as `component` value exists
    path: "/login", name: "Login",
    component: NotFound,
  },
  {
    path: "/not-found", name: "404",
    component: NotFound
  },
  { path: "/:pathMatch(.*)", redirect: "/not-found" }
];

const VuexStore = (width: number, height: number) => {
  return { modules: {
    app: { namespaced: true, state: { window: { width, height } } },
    authentication: { namespaced: true, state: { authenticated: false } },
  }};
};

describe("Semantic UI Navbar Component", () => {
  it("renders a specific mobile nav at smaller viewports", () => {
    const router = createRouter({ history: createWebHistory(), routes });
    const store = createStore(VuexStore(767, 449));
    // - WHEN the viewport has a width less than 769 and height less than 451
    render(SuiNav, { global: { plugins: [store, router] }, slots: { default: "Title Link" } });
    const brandLink = screen.getByText("Title Link");
    // - THEN a mobile-sized navbar is rendered
    expect(brandLink.parentElement).toHaveAttribute("id", "mobile-nav");
  });
  it("renders a specific desktop navbar at taller and wider viewports", async () => {
    const router = createRouter({ history: createWebHistory(), routes });
    const store = createStore(VuexStore(770, 451));
    const { unmount } = render(SuiNav, {
      slots: { default: "Title Link" },
      global: {
        plugins: [store, router],
        stubs: ["SuiLoginDropdown"] // ?: `stubs` auto-converts PascalCase to kebab-case just like normal
      }
    });
    // - WHEN the viewport has a width greater than 768 and height greater than 450
    // - THEN a desktop-sized navbar is rendered
    expect(screen.getByText("Title Link")).toHaveAttribute("id", "desktop-brand");
    unmount();

    const thinStore = createStore(VuexStore(768, 451));
    // - WHEN the viewport width is 768 or smaller, THEN the mobile navbar is rendered
    const { unmount: thinNavUnmount } = render(SuiNav, {
      slots: { default: "Title Link" }, global: { plugins: [thinStore, router], stubs: ["SuiLoginDropdown"] }
    });
    expect(screen.getByText("Title Link").parentElement).toHaveAttribute("id", "mobile-nav");
    thinNavUnmount();

    const shortStore = createStore(VuexStore(770, 450));
    // - WHEN the viewport height is 450 or shorter, THEN the mobile navbar is rendered
    render(SuiNav, {
      slots: { default: "Title Link" }, global: { plugins: [shortStore, router], stubs: ["SuiLoginDropdown"] }
    });
    expect(screen.getByText("Title Link").parentElement).toHaveAttribute("id", "mobile-nav");
  });
});