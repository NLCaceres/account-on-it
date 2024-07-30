import { render, screen } from "@testing-library/vue";
import {
  GENERAL_DESKTOP_WIDTH, LARGE_DESKTOP_WIDTH, MID_DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH
} from "@/Store/GetterTypes";
import HomePage from "@/Views/Home/HomePage.vue";
import { createStore } from "vuex";
import SuiCarousel from "@/Components/Elements/SuiCarousel.vue";
import SuiCardSet from "@/Components/Elements/Cards/SuiCardSet.vue";
import { INIT_PAGE_VISIBILITY } from "@/Store/ActionTypes";

const VuexStore = (width: number) => {
  return createStore({ modules: {
    app: {
      namespaced: true, state: { window: { width } },
      getters: {
        [MOBILE_WIDTH]: () => width < 481,
        [TABLET_WIDTH]: () => width > 576 && width < 992,
        [GENERAL_DESKTOP_WIDTH]: () => width >= 992,
        [MID_DESKTOP_WIDTH]: () => width >= 992 && width < 1440,
        [LARGE_DESKTOP_WIDTH]: () => width >= 1400
      },
      actions: { [INIT_PAGE_VISIBILITY]: () => { } }
    },
  }});
};

describe("renders the web app Home Page", () => {
  it("uses the Vuex store to check if on mobile viewport and add CSS styling", () => {
    const store = VuexStore(480);
    render(HomePage, {
      global: { plugins: [store], stubs: { "lazy-load-img": true, SuiCardSet, SuiCarousel } }
    });
    // - WHEN on mobile, THEN the title gets a "f-xl" CSS class and subtitle gets nothing
    expect(screen.getByRole("heading", { name: /welcome/i })).toHaveClass("f-xl");
    expect(screen.getByRole("heading", { name: /one stop/i })).not.toHaveClass("f-md f-sm");

    // - WHEN on mobile, THEN the "reasons" container gets a "m-0-x" CSS class
    const reasonsHeader = screen.getByRole("heading", { name: /reasons to join/i });
    expect(reasonsHeader.parentElement!).toHaveClass("m-0-x");
    // - AND the Semantic UI Card Set is NOT set to "horizontal"
    expect(reasonsHeader.nextElementSibling!).not.toHaveClass("horizontal");
    // - AND the Semantic UI Cards are all of height "400px" and flex-direction "column"
    expect(reasonsHeader.nextElementSibling!.children[0])
      .toHaveStyle({ "height": "400px", "flex-direction": "column" });
    expect(reasonsHeader.nextElementSibling!.children[1])
      .toHaveStyle({ "height": "400px", "flex-direction": "column" });

    // - WHEN on mobile, THEN the divider DOESN'T get a "m-xxl-x" CSS class
    expect(reasonsHeader.parentElement!.nextElementSibling!).not.toHaveClass("m-xxl-x");

    // - WHEN on mobile, THEN the "recommendations" header gets a "m-xs-x" CSS class
    const recommendationsHeader = screen.getByRole("heading", { name: /looking/i });
    expect(recommendationsHeader.parentElement!).toHaveClass("m-xs-x");
    // - AND the recommendation Semantic UI Cards don't get any width-related CSS classes
    expect(recommendationsHeader.nextElementSibling!.firstElementChild).not.toHaveClass("w-40 max-w-40 w-30 max-w-30");
  });
  it("uses the Vuex store to check if on tablet viewport and add CSS styling", () => {
    const tabletStore = VuexStore(780);
    render(HomePage, {
      global: { plugins: [tabletStore], stubs: { "lazy-load-img": true, SuiCardSet, SuiCarousel } }
    });
    // - WHEN on tablet or mid-sized desktop, THEN the title and subtitle get "f-lg" and "f-md" CSS classes
    expect(screen.getByRole("heading", { name: /welcome/i })).toHaveClass("f-lg");
    expect(screen.getByRole("heading", { name: /one stop/i })).toHaveClass("f-md");

    // - WHEN NOT mobile, THEN the "reasons" container gets a "m-xxl-x" CSS class
    const reasonsHeader = screen.getByRole("heading", { name: /reasons to join/i });
    expect(reasonsHeader.parentElement!).toHaveClass("m-xxl-x");
    // - AND (for tablet/desktop) the Semantic UI Card Set is set to "horizontal"
    expect(reasonsHeader.nextElementSibling!).toHaveClass("horizontal");
    // - AND the Semantic UI Cards are all of height "300px" and flex-direction "row" and "row-reverse"
    expect(reasonsHeader.nextElementSibling!.children[0])
      .toHaveStyle({ "height": "300px", "flex-direction": "row" });
    expect(reasonsHeader.nextElementSibling!.children[1])
      .toHaveStyle({ "height": "300px", "flex-direction": "row-reverse" });

    // - WHEN NOT mobile, THEN the divider gets a "m-xxl-x" CSS class
    expect(reasonsHeader.parentElement!.nextElementSibling!).toHaveClass("m-xxl-x");

    // - WHEN NOT mobile but on tablet, THEN the "recommendations" header gets a "m-xxl-x" CSS class
    const recommendationsHeader = screen.getByRole("heading", { name: /looking/i });
    expect(recommendationsHeader.parentElement!).toHaveClass("m-xxl-x");
    // - AND on tablet, the recommendation Semantic UI Cards don't get any width-related CSS classes
    expect(recommendationsHeader.nextElementSibling!.firstElementChild).not.toHaveClass("w-40 max-w-40 w-30 max-w-30");
  });
  it("uses the Vuex store to check if on mid-sized desktop viewport and add CSS styling", () => {
    const midDesktopStore = VuexStore(992);
    render(HomePage, {
      global: { plugins: [midDesktopStore], stubs: { "lazy-load-img": true, SuiCardSet, SuiCarousel } }
    });
    // - WHEN on tablet or mid-sized desktop, THEN the title and subtitle get "f-lg" and "f-md" CSS classes
    expect(screen.getByRole("heading", { name: /welcome/i })).toHaveClass("f-lg");
    expect(screen.getByRole("heading", { name: /one stop/i })).toHaveClass("f-md");

    // - WHEN NOT mobile, THEN the "reasons" container gets a "m-xxl-x" CSS class
    const reasonsHeader = screen.getByRole("heading", { name: /reasons to join/i });
    expect(reasonsHeader.parentElement!).toHaveClass("m-xxl-x");
    // - AND (for tablet and desktop) the Semantic UI Card Set is set to "horizontal"
    expect(reasonsHeader.nextElementSibling!).toHaveClass("horizontal");
    // - AND the Semantic UI Cards are all of height "300px" and flex-direction "row" and "row-reverse"
    expect(reasonsHeader.nextElementSibling!.children[0])
      .toHaveStyle({ "height": "300px", "flex-direction": "row" });
    expect(reasonsHeader.nextElementSibling!.children[1])
      .toHaveStyle({ "height": "300px", "flex-direction": "row-reverse" });

    // - WHEN NOT mobile, THEN the divider gets a "m-xxl-x" CSS class
    expect(reasonsHeader.parentElement!.nextElementSibling!).toHaveClass("m-xxl-x");

    // - WHEN NOT mobile but on mid-sized desktop, THEN the recommendation container gets a "m-xxl-x" CSS class
    const recommendationsHeader = screen.getByRole("heading", { name: /looking/i });
    expect(recommendationsHeader.parentElement!).toHaveClass("m-xxl-x");
    // - AND on mid-sized desktops, the recommendation Semantic UI Cards get "w-40 max-w-40" CSS
    expect(recommendationsHeader.nextElementSibling!.firstElementChild).toHaveClass("w-40 max-w-40");
  });
  it("uses the Vuex store to check if on large desktop viewport and add CSS styling", () => {
    const bigDesktopStore = VuexStore(1400);
    render(HomePage, {
      global: { plugins: [bigDesktopStore], stubs: { "lazy-load-img": true, SuiCardSet, SuiCarousel } }
    });
    // - WHEN on a large desktop, THEN the title and subtitle get "f-md" and "f-sm" CSS classes
    expect(screen.getByRole("heading", { name: /welcome/i })).toHaveClass("f-md");
    expect(screen.getByRole("heading", { name: /one stop/i })).toHaveClass("f-sm");

    // - WHEN NOT mobile, THEN the "reasons" container gets a "m-xxl-x" CSS class
    const reasonsHeader = screen.getByRole("heading", { name: /reasons to join/i });
    expect(reasonsHeader.parentElement!).toHaveClass("m-xxl-x");
    // - AND (for tablet and desktop) the Semantic UI Card Set is set to "horizontal"
    expect(reasonsHeader.nextElementSibling!).toHaveClass("horizontal");
    // - AND the Semantic UI Cards are all of height "300px" and flex-direction "row" and "row-reverse"
    expect(reasonsHeader.nextElementSibling!.children[0])
      .toHaveStyle({ "height": "300px", "flex-direction": "row" });
    expect(reasonsHeader.nextElementSibling!.children[1])
      .toHaveStyle({ "height": "300px", "flex-direction": "row-reverse" });

    // - WHEN NOT mobile, THEN the divider gets a "m-xxl-x" CSS class
    expect(reasonsHeader.parentElement!.nextElementSibling!).toHaveClass("m-xxl-x");

    // - WHEN NOT mobile but on large desktop, THEN the recommendation container gets a "m-xxl-x" CSS class
    const recommendationsHeader = screen.getByRole("heading", { name: /looking/i });
    expect(recommendationsHeader.parentElement!).toHaveClass("m-xxl-x");
    // - AND on large desktops, the recommendation Semantic UI Cards get "w-30 max-w-30" CSS
    expect(recommendationsHeader.nextElementSibling!.firstElementChild).toHaveClass("w-30 max-w-30");
  });
});