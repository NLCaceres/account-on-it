import SuiNavSearchbar from "@/Components/Elements/SuiNavBar/SuiNavSearchbar.vue";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { h } from "vue";
import { createStore } from "vuex";

const VuexStore = (width: number) => {
  return createStore({ modules: { app: { namespaced: true, state: { window: { width } } } } });
};

describe("Semantic UI styled Search feature in a Navbar", () => {
  it("styles the searchbar differently on expansion", async () => {
    const store = VuexStore(950);
    const { rerender } = render(SuiNavSearchbar, { global: { plugins: [store] } });
    // - WHEN the searchbar is not expanded
    const searchBar = screen.getByRole("textbox");
    expect(searchBar).toBeInTheDocument();
    // - THEN the component root container will be styled as a normal size searchbar
    expect(searchBar.parentElement!.parentElement).toHaveClass("ui search item", { exact: true });

    // - WHEN the searchbar is expanded
    await rerender({ expanded: true });
    const rootContainer = screen.getByRole("textbox").parentElement!.parentElement;
    // - THEN the root container gains a bottom border
    expect(rootContainer).toHaveClass("ui search item border-b-white", { exact: true });
    // - AND styling to expand across the navbar
    expect(rootContainer).toHaveStyle({
      position: "absolute", right: "-0px",
      "padding-right": "0px", "padding-left": "50px",
      "background-color": "rgba(0,0,0,0)"
    });
  });
  it("emits an 'expand' event on click only if not expanded", async () => {
    const user = userEvent.setup();
    const onExpandSpy = vi.fn();
    const store = VuexStore(950);
    const stubComponent = {
      render() {
        return h(SuiNavSearchbar, { onExpand: onExpandSpy });
      }
    };
    const { rerender } = render(stubComponent, { global: { plugins: [store] } });
    const rootContainer = screen.getByRole("textbox").parentElement!.parentElement!;
    expect(rootContainer).toHaveClass("ui search item", { exact: true });
    // - WHEN the searchbar is not expanded and clicked
    await user.click(rootContainer);
    // - THEN the `onExpand` spy is called due to "expand" event
    expect(onExpandSpy).toHaveBeenCalledOnce();

    // - WHEN the searchbar is expanded and clicked
    await rerender({ expanded: true });
    expect(rootContainer).toHaveClass("ui search item border-b-white", { exact: true });
    await user.click(rootContainer);
    // - THEN the `onExpand` spy is NOT called since no "expand" event is emitted
    expect(onExpandSpy).toHaveBeenCalledOnce();
  });
});