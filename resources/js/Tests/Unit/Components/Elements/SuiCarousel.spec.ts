import { render, screen } from "@testing-library/vue";
import SuiCarousel from "@/Components/Elements/SuiCarousel.vue";
import { createStore } from "vuex";
import { INIT_PAGE_VISIBILITY } from "@/Store/ActionTypes";
import { MOBILE_WIDTH, PAGE_VISIBILITY_READY } from "@/Store/GetterTypes";
import userEvent from "@testing-library/user-event";

const VuexStore = (width: number, pageVisibility: boolean, visibilityHidden: string) => {
  return createStore({ modules: {
    app: {
      namespaced: true,
      state: { window: { width }, websiteVisibility: { hidden: visibilityHidden, visibilityChange: "none" } },
      getters: { [MOBILE_WIDTH]: () => width < 481, [PAGE_VISIBILITY_READY]: () => pageVisibility },
      actions: { [INIT_PAGE_VISIBILITY]: () => { } }
    },
  }});
};

describe("Semantic UI styled Carousel Component", () => {
  it("renders an image if the `img-set` prop filled", async () => {
    const store = VuexStore(482, true, "hidden");
    const { rerender } = render(SuiCarousel, { global: { plugins: [store] }, props: { imgSet: [] } });
    // - WHEN `imgSet` is empty, no imgs are rendered by the Carousel
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    await rerender({ imgSet: [{ src: "foobar", alt: "foobar" }, { src: "barfoo", alt: "barfoo" }] });
    // - WHEN `imgSet` contains imgs, THEN a single img is rendered in the Carousel
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
  it("sets its width and height via based on Vuex's observation of the window size", async () => {
    const store = VuexStore(482, true, "hidden");
    const imgSet = [{ src: "foobar", alt: "foobar" }, { src: "barfoo", alt: "barfoo" }];
    const { unmount } = render(SuiCarousel, { global: { plugins: [store] }, props: { imgSet }});
    // - WHEN the Vuex store returns a width below 490px, THEN the exact width is used with a height of 400px
    expect(screen.getByRole("img")).toHaveAttribute("height", "400px"); // - Height/Width are `Numberish` typed
    expect(screen.getByRole("img")).toHaveAttribute("width", "482"); // - So may not have "px" appended
    // - AND the container div adds a "height" styling
    expect(screen.getByRole("img").parentElement!.parentElement).toHaveStyle({"height": "400px"});

    unmount();

    const bigStore = VuexStore(491, true, "hidden");
    render(SuiCarousel, { global: { plugins: [bigStore] }, props: { imgSet } });
    // - WHEN the Vuex store returns a width above 490px, THEN the height changes to a constant 450
    expect(screen.getByRole("img")).toHaveAttribute("height", "450px");
    expect(screen.getByRole("img").parentElement!.parentElement).toHaveStyle({"height": "450px"});
    // - AND the img's width is still exactly the Vuex Store's value
    expect(screen.getByRole("img")).toHaveAttribute("width", "491");
  });
  it("changes the image based on click", async () => {
    const user = userEvent.setup();
    const store = VuexStore(482, true, "hidden");
    const imgSet = [{ src: "foobar", alt: "foobar" }, { src: "barfoo", alt: "barfoo" }];
    render(SuiCarousel, { global: { plugins: [store] }, props: { imgSet } });
    expect(screen.getByRole("img")).toHaveAccessibleName("foobar");

    // - WHEN the Carousel is hovered and its left indicator is clicked
    await user.hover(screen.getByRole("img"));
    await user.click(screen.getByTestId("carousel-left"));
    // - THEN the 0-index revolves to the last-index of the `img-set` array
    expect(screen.getByRole("img")).toHaveAccessibleName("barfoo");

    // - WHEN the left indicator is clicked again
    await user.click(screen.getByTestId("carousel-left"));
    // - THEN the index is DECREMENTED by 1 again, in this case, to the 0-index again
    expect(screen.getByRole("img")).toHaveAccessibleName("foobar");

    // - WHEN the right indicator is clicked
    await user.click(screen.getByTestId("carousel-right"));
    // - THEN the index is INCREMENTED by 1
    expect(screen.getByRole("img")).toHaveAccessibleName("barfoo"); // - 1-index
    await user.click(screen.getByTestId("carousel-right"));
    // - AND flipped back around to the 0-index
    expect(screen.getByRole("img")).toHaveAccessibleName("foobar");

    // - WHEN the lower indicators are directly pressed
    await user.click(screen.getByTestId("indicator-1"));
    // - THEN they change to the exact index of each image
    expect(screen.getByRole("img")).toHaveAccessibleName("foobar"); // - 0-index aka image #1

    await user.click(screen.getByTestId("indicator-2"));
    expect(screen.getByRole("img")).toHaveAccessibleName("barfoo"); // - 1-index aka image #2
    // - AND even if double clicked, the image will remain the same
    await user.click(screen.getByTestId("indicator-2"));
    expect(screen.getByRole("img")).toHaveAccessibleName("barfoo");
  });
  it("changes the image based on timer", async () => {
    vi.useFakeTimers();
    const store = VuexStore(482, true, "hidden");
    const imgSet = [{ src: "foobar", alt: "foobar" }, { src: "barfoo", alt: "barfoo" }];
    const { rerender, unmount } = render(SuiCarousel, { global: { plugins: [store] }, props: { imgSet } });
    expect(screen.getByRole("img")).toHaveAccessibleName("foobar");
    // - WHEN the default interval is used, THEN every 5000 seconds the img moves by 1
    await vi.advanceTimersByTimeAsync(5000);
    // - Changing to "barfoo"
    expect(screen.getByRole("img", { name: "barfoo" })).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(5000);
    // - Then back to "foobar"
    expect(screen.getByRole("img", { name: "foobar" })).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(10000);
    // - 2 sets of 5000 ms rolls back to "foobar"
    expect(screen.getByRole("img", { name: "foobar" })).toBeInTheDocument();

    // - WHEN updating the intervalLength, THEN it does not change the timer
    await rerender({ intervalLength: 1000 });
    expect(screen.getByRole("img")).toHaveAccessibleName("foobar");
    await vi.advanceTimersByTimeAsync(1000);
    expect(screen.getByRole("img", { name: "foobar" }));
    await vi.advanceTimersByTimeAsync(4000);
    expect(screen.getByRole("img", { name: "barfoo" }));

    unmount();
    // - UNLESS the component is re-mounted
    const { unmount: secondUnmount } =
      render(SuiCarousel, { global: { plugins: [store] }, props: { imgSet, intervalLength: 100 } });
    expect(screen.getByRole("img")).toHaveAccessibleName("foobar");
    // - THEN the image will change based on the specified interval
    await vi.advanceTimersByTimeAsync(100);
    expect(screen.getByRole("img", { name: "barfoo" })).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(200);
    expect(screen.getByRole("img", { name: "barfoo" })).toBeInTheDocument();

    secondUnmount();
    // - OR if the Visibility API is unavailable
    const visApiUnavailableStore = VuexStore(482, false, "");
    render(SuiCarousel, { global: { plugins: [visApiUnavailableStore] }, props: { imgSet } });
    expect(screen.getByRole("img")).toHaveAccessibleName("foobar");
    // - THEN the carousel will not update images based on the interval
    await vi.advanceTimersByTimeAsync(5001);
    expect(screen.queryByRole("img", { name: "barfoo" })).not.toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(5001);
    expect(screen.queryByRole("img", { name: "barfoo" })).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});