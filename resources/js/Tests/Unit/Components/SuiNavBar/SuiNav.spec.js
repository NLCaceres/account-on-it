import { render, screen } from '@testing-library/vue'
import SuiNav from '@/Components/Elements/SuiNavBar/SuiNav.vue';
import HomePage from '@/Views/Home/HomePage.vue';
import NotFound from '@/Components/GenericViews/NotFound.vue';
import BasicHeader from "@/Components/Elements/Headers/BasicHeader.vue";
import SuiButtonedLabel from "@/Components/Forms/SuiButtonedLabel.vue";
import SuiInput from "@/Components/Forms/SuiInput.vue";
import SuiLoginCheckboxes from "@/Components/Login/SuiLoginCheckboxes.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from 'vuex';

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      wide: HomePage
    }
  },
  { //? No component actually needed, the link will be rendered no problem (just not navigable)
    path: "/login",
    name: "Login",
  },
  {
    path: "/not-found",
    name: "404",
    component: NotFound
  },
  { path: "/:pathMatch(.*)", redirect: "/not-found" }
]

const Router = () => {
  return createRouter({ history: createWebHistory(), routes });
}

const StoreWithWindowSized = (width, height) => {
  return { modules: { 
    app: { namespaced: true, state: { window: { width, height } } },
    authentication: { namespaced: true, state: { authenticated: false } },
    loginPopup: { namespaced: true, state: { forgotPasswordForm: false } }
  }};
}

describe('Semantic UI Navbar Component', () => {
  it('with basic mobile rendering', () => {
    const router = Router();
    const store = createStore(StoreWithWindowSized(767, 449));
    render(SuiNav, { global: { plugins: [store, router] }, slots: { default: "Title Link" } });
    const brandLink = screen.getByText("Title Link");
    expect(brandLink.parentElement).toHaveAttribute("id", "mobile-nav");
  })
  describe('with basic desktop rendering', () => {
    it('at proper height and width', () => {
      const router = Router();
      const store = createStore(StoreWithWindowSized(770, 451));
      render(SuiNav, { slots: { default: "Title Link" }, global: {
        mocks: { Transitions: { INVALID_TRANSITION: "", VALIDATION_INPUT_TRANSITION: "" } }, plugins: [store, router],
        stubs: { BasicHeader, SuiInput, SuiLoginCheckboxes, SuiButtonedLabel } } //? Automatically converted to kebab-case from the PascalCase
      });
      expect(screen.getByText("Title Link")).toHaveAttribute("id", "desktop-brand");
    })
    it('not when too short', () => {
      const router = Router();
      const store = createStore(StoreWithWindowSized(769, 449));
      render(SuiNav, { slots: { default: "Title Link" }, global: {
        mocks: { Transitions: { INVALID_TRANSITION: "", VALIDATION_INPUT_TRANSITION: "" } }, plugins: [store, router],
        stubs: { BasicHeader, SuiInput, SuiLoginCheckboxes, SuiButtonedLabel } }
      });
      expect(screen.getByText("Title Link")).not.toHaveAttribute("id", "desktop-brand");
      expect(screen.getByText("Title Link").parentElement).toHaveAttribute("id", "mobile-nav");
    })
    it('not when too thin', () => {
      const router = Router();
      const store = createStore(StoreWithWindowSized(767, 451));
      render(SuiNav, { slots: { default: "Title Link" }, global: {
        mocks: { Transitions: { INVALID_TRANSITION: "", VALIDATION_INPUT_TRANSITION: "" } }, plugins: [store, router],
        stubs: { BasicHeader, SuiInput, SuiLoginCheckboxes, SuiButtonedLabel } }
      });
      expect(screen.getByText("Title Link")).not.toHaveAttribute("id", "desktop-brand");
      expect(screen.getByText("Title Link").parentElement).toHaveAttribute("id", "mobile-nav");
    })
  })
});