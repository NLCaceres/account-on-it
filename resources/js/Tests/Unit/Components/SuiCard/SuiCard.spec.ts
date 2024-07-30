import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import SuiCard from "@/Components/Elements/Cards/SuiCard.vue";
import { createStore } from "vuex";
import { INIT_INTERSECTION_OBSERVER } from "@/Store/ActionTypes";
import { MOBILE_WIDTH, GENERAL_DESKTOP_WIDTH, GET_INTERSECTION_OBSERVER } from "@/Store/GetterTypes";
import { LAZY_LOAD_OBSERVER } from "@/Store/modules/IntersectionState";

const VuexStore =
  (width: number = 480, observerList = { [LAZY_LOAD_OBSERVER]: new IntersectionObserver(() => { }) }) => {
    // ?: Vuex relies on 4 concepts: state, actions, getters & mutations. ONLY "state" is singular, so note SPELLING
    return createStore({ modules: { // ?: Getters must be written like actions, AS FUNCTIONS
      app: {
        namespaced: true, state: { window: { width } },
        getters: { [MOBILE_WIDTH]: () => width < 481, [GENERAL_DESKTOP_WIDTH]: () => width >= 992 }
      },
      // ?: GET_INTERSECTION_OBSERVER is a tricky mock since it's a HOC func, returning a func to GET the observer
      intersectionAPI: {
        namespaced: true, state: { observers: { ...observerList } },
        getters: { [GET_INTERSECTION_OBSERVER]: () => () => new IntersectionObserver(() => { }) },
        actions: { [INIT_INTERSECTION_OBSERVER]: () => new IntersectionObserver(() => { }) }
      },
    }});
  };

describe("Semantic UI Card Component", () => {
  it("rendering a basic info item", () => {
    const infoItem = {
      title: "FooTitle",
      meta: "FooBarMeta",
      description: "BarDescription",
      img: { src: "FooImgSource", alt: "BarAltText" }
    };
    const store = VuexStore();
    render(SuiCard, { global: { plugins: [store] }, props: { infoItem } });
    expect(screen.getByText(infoItem.title)).toBeInTheDocument();
    expect(screen.getByText(infoItem.meta)).toBeInTheDocument();
    expect(screen.getByText(infoItem.description)).toBeDefined();
  });
  it("renders with a default info item if none provided", () => {
    const store = VuexStore();
    render(SuiCard, { global: { plugins: [store] } });
    const cardContent = screen.getByTestId("card-content");
    // - WHEN the default item prop is rendered, THEN it renders the 3 main content sections
    expect(cardContent.childElementCount).toBe(3);
    // - AND all 3 are still empty (since the default infoItem ONLY sets the non-optional title prop via empty string)
    expect(cardContent.children[0]).toHaveClass("header");
    expect(cardContent.children[0]).toHaveTextContent(""); // - Empty title string
    expect(cardContent.children[1]).toHaveClass("meta");
    expect(cardContent.children[1]).toHaveTextContent("");
    expect(cardContent.children[2]).toHaveClass("description");
    expect(cardContent.children[2]).toHaveTextContent("");
  });
  describe("with standard slots to override appearance", () => {
    const slots = { // ?: Easy to render in slots option of `render()`
      image: "<img src='foo.jpg' alt='FooImg' />",
      content: "<a>FooLink</a>",
      title: "<h1 class='title'>FooTitle</h1>",
      meta: "<h3 class='meta'>BarMeta</h3>",
      description: "<p>FooBarDescription</p>",
      "attached-button": "<i class='add icon'></i> FooButton",
      footer: "BarFooter"
    };
    it("checks image slot rendered", () => {
      const store = VuexStore();
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { image: slots.image } });
      expect(screen.getByAltText("FooImg")).toBeInTheDocument();
      expect(screen.getByAltText("FooImg").parentElement).toHaveClass("image");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByAltText("FooImg")).not.toBeInTheDocument();
      unmountTwo();

      // - WHEN using props, THEN `infoItem` can lazy-load the img, not immediately rendering `<img>`
      render(SuiCard, {
        global: { plugins: [store] }, props: { infoItem: { title: "", img: { src: "FooImg", alt: "FooImgAltText" } } }
      });
      expect(screen.queryByAltText("FooImg")).not.toBeInTheDocument(); // - Placeholder rendered since no real img
      expect(screen.getByText("Placeholder")).toBeInTheDocument();
    });
    it("checks title slot rendered", () => {
      const store = VuexStore();
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { title: slots.title } });
      expect(screen.getByText("FooTitle")).toBeInTheDocument();
      expect(screen.getByText("FooTitle")).toHaveClass("title");
      expect(screen.getByText("FooTitle").parentElement).toHaveClass("header");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByText("FooTitle")).not.toBeInTheDocument();
      unmountTwo();

      // - WHEN using props, THEN `infoItem` can use its title value as a default for the title slot
      render(SuiCard, { global: { plugins: [store] }, props: { infoItem: { title: "FooTitle" } } });
      expect(screen.getByText("FooTitle")).toBeInTheDocument();
      expect(screen.getByText("FooTitle")).toHaveClass("header");
    });
    it("checks meta slot rendered", () => {
      const store = VuexStore();
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { meta: slots.meta } });
      expect(screen.getByText("BarMeta")).toBeInTheDocument();
      expect(screen.getByText("BarMeta")).toHaveClass("meta");
      expect(screen.getByText("BarMeta").parentElement).toHaveClass("meta");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByText("BarMeta")).not.toBeInTheDocument();
      unmountTwo();

      // - WHEN using props, THEN `infoItem` can use its meta-text value as a default for the meta slot
      render(SuiCard, { global: { plugins: [store] }, props: { infoItem: { title: "", meta: "BarMeta" } } });
      expect(screen.getByText("BarMeta")).toBeInTheDocument();
      expect(screen.getByText("BarMeta")).toHaveClass("meta");
    });
    it("checks description slot rendered", () => {
      const store = VuexStore();
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { description: slots.description } });
      expect(screen.getByText("FooBarDescription")).toBeInTheDocument();
      expect(screen.getByText("FooBarDescription").parentElement).toHaveClass("description");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByText("FooBarDescription")).not.toBeInTheDocument();
      unmountTwo();

      // - WHEN using props, THEN `infoItem` can use its description value as a default for the description slot
      render(SuiCard, {
        global: { plugins: [store] }, props: { infoItem: { title: "", description: "FooBarDescription" } }
      });
      expect(screen.getByText("FooBarDescription")).toBeInTheDocument();
      expect(screen.getByText("FooBarDescription")).toHaveClass("description");
    });
  });
  describe("with optional slots", () => {
    const slots = {
      content: "<a>FooLink</a>",
      "attached-button": "<i class='add icon'></i> FooButton",
      footer: "<button>BarFooter</button>"
    };
    it("using a 'content' slot to add to the main section's appearance", () => {
      const store = VuexStore();
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { content: slots.content } });
      expect(screen.getByText("FooLink")).toBeInTheDocument();
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByText("FooLink")).not.toBeInTheDocument();
      // - WHEN no content slot used, THEN only the header, meta and description containers remain
      expect(screen.getByTestId("card-content").childElementCount).toBe(3);
      expect(screen.getByTestId("card-content").children[0]).toHaveClass("header");
      expect(screen.getByTestId("card-content").children[1]).toHaveClass("meta");
      expect(screen.getByTestId("card-content").children[2]).toHaveClass("description");
      unmountTwo();
    });
    it("using an 'attached-button' slot to place a button under the main content", () => {
      const store = VuexStore();
      const { unmount } =
        render(SuiCard, { global: { plugins: [store] }, slots: { "attached-button": slots["attached-button"] } });
      expect(screen.getByText("FooButton")).toBeInTheDocument();
      // - WHEN using this slot, THEN a div with a "button" CSS class is the parent for the slot's content
      expect(screen.getByText("FooButton")).toHaveClass("button"); // - Best to fill this slot with an icon + text
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      // - WHEN no slot is used, THEN not even the attached-button container is rendered
      expect(screen.queryByText("FooButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("card-attached-button")).not.toBeInTheDocument();
      unmountTwo();

      render(SuiCard, { global: { plugins: [store] }, slots: { "attached-button": "<button>FooButton</button>" } });
      // - WHEN slotting a button in this slot, THEN styling may be weird since the slot's container is a `<div>` button
      expect(screen.getByRole("button", { name: "FooButton" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "FooButton" }).parentElement).toHaveClass("button");
    });
    it("using a 'footer' slot to add content to the bottom", () => {
      const store = VuexStore();
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { footer: slots.footer } });
      expect(screen.getByText("BarFooter")).toBeInTheDocument();
      expect(screen.getByText("BarFooter").parentElement).toHaveClass("extra content");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      // - WHEN no slot is used, THEN not even the footer container is rendered
      expect(screen.queryByText("BarFooter")).not.toBeInTheDocument();
      expect(screen.queryByTestId("card-footer")).not.toBeInTheDocument();
      unmountTwo();

      render(SuiCard, { global: { plugins: [store] }, slots: { footer: "FooFooter" } });
      expect(screen.getByText("FooFooter")).toBeInTheDocument();
      // - WHEN any slot is just using text, THEN its directly inserted into the container
      expect(screen.getByText("FooFooter")).toHaveClass("extra content"); // - in this case, the footer
    });
  });
  describe("with computed properties", () => {
    it("to provide fluid design", async () => {
      const props = { fluid: true, standalone: true };
      const store = VuexStore();
      const { rerender } = render(SuiCard, {
        global: { plugins: [store] }, props, slots: { image: "<img src='foo.jpg' alt='FooImg' />" }
      });
      // - WHEN `fluid` & `standalone` = true, THEN add a "fluid" CSS class to the root
      expect(screen.getByRole("img").parentElement!.parentElement).toHaveClass("fluid");

      await rerender({ fluid: true, standalone: false });
      // - WHEN `fluid` = true BUT `standalone` = false, THEN "auto-width" is added to the root
      expect(screen.getByRole("img").parentElement!.parentElement).toHaveClass("auto-width");

      await rerender({ fluid: false, standalone: true });
      // - WHEN `fluid` = false BUT `standalone` = true, THEN no CSS is added to the root
      expect(screen.getByRole("img").parentElement!.parentElement).not.toHaveClass("fluid");
      expect(screen.getByRole("img").parentElement!.parentElement).not.toHaveClass("auto-width");
    });
    it("to provide a horizontal design", async () => {
      const props = { horizontal: true, standalone: true };
      const store = VuexStore();
      const { rerender } = render(SuiCard, { global: { plugins: [store] }, props, slots: { footer: "FooFooter" } });
      // - WHEN BOTH "horizontal" and "standalone" = true, THEN the root gets a "horizontal" CSS class applied
      expect(screen.getByTestId("card-footer").parentElement).toHaveClass("horizontal");

      // - WHEN either prop set to false, THEN "horizontal" class not applied
      await rerender({ horizontal: false, standalone: true }); // ?: MUST "await" rerender's changes w/ Vue
      expect(screen.getByTestId("card-footer").parentElement).not.toHaveClass("horizontal");

      await rerender({ horizontal: true, standalone: false });
      expect(screen.getByTestId("card-footer").parentElement).not.toHaveClass("horizontal");
    });
    it("to provide ratio'd sizing to the image & content containers", async () => {
      const props = { ratio: "100/100" };
      const store = VuexStore();
      const { rerender } = render(SuiCard, {
        global: { plugins: [store] }, props, slots: { image: "<img src='foo.jpg' alt='FooImg' />" }
      });
      // - WHEN the ratio is INVALID (the nums add up to over 100), THEN BOTH containers default to "h-50"
      expect(screen.getByTestId("card-image")).toHaveClass("h-50");
      expect(screen.getByTestId("card-content")).toHaveClass("h-50");

      await rerender({ ratio: "abc/def", horizontal: true });
      // - WHEN the ratio is INVALID and "horizontal", THEN INSTEAD, BOTH containers default to "w-50"
      expect(screen.getByTestId("card-image")).toHaveClass("w-50");
      expect(screen.getByTestId("card-content")).toHaveClass("w-50");

      // - WHEN no ratio is provided, the default of "h-50" is used
      await rerender({ ratio: undefined, horizontal: undefined });
      expect(screen.getByTestId("card-image")).toHaveClass("h-50");
      expect(screen.getByTestId("card-content")).toHaveClass("h-50");
      // - WHEN no ratio is provided BUT "horizontal" is active, the default of "w-50" is used
      await rerender({ horizontal: true });
      expect(screen.getByTestId("card-image")).toHaveClass("w-50");
      expect(screen.getByTestId("card-content")).toHaveClass("w-50");

      // ?: `rerender()` maintains the values of all props from previous renders
      await rerender({ ratio: "50 50", horizontal: undefined }); // ?: SO "undefined" switches those props off
      // - WHEN the ratio is valid BUT missing a "/" separator, THEN the image applies the default "h-50"
      expect(screen.getByTestId("card-image")).toHaveClass("h-50");
      expect(screen.getByTestId("card-content")).toHaveClass("h-50");
      // - Similarly, WHEN "horizontal" active, THEN the default "w-50" is used
      await rerender({ ratio: "50 50", horizontal: true });
      expect(screen.getByTestId("card-image")).toHaveClass("w-50");
      expect(screen.getByTestId("card-content")).toHaveClass("w-50");

      await rerender({ ratio: "25/25", horizontal: undefined });
      // - WHEN the ratio is validly formatted, THEN the 1st number is taken and set to h-NN, i.e. h-25 here
      expect(screen.getByTestId("card-image")).toHaveClass("h-25");
      expect(screen.getByTestId("card-content")).toHaveClass("h-25");
      // - Similarly, WHEN "horizontal" active, THEN it becomes "w-25" is used
      await rerender({ ratio: "25/25", horizontal: true });
      expect(screen.getByTestId("card-image")).toHaveClass("w-25");
      expect(screen.getByTestId("card-content")).toHaveClass("w-25");
      // - DESPITE not being an actually valid ratio (25+25 !== 100, of course)
    });
    it("to provide detailed styling to the main card container", async () => {
      const user = userEvent.setup();
      const store = VuexStore();
      const { rerender } = render(SuiCard, {
        global: { plugins: [store] }, slots: { image: "<img src='foo.jpg' alt='FooImg' />" }
      });
      // - WHEN using default props, the "standalone" prop defaults to "true", SO the following is the default style
      expect(screen.getByTestId("card-content").parentElement)
        .toHaveStyle({ height: "250px", flexDirection: "row", boxShadow: ""});

      // - WHEN "height" & "reversed" change, THEN "height" becomes the new number AND flexDirection adds "-reverse"
      await rerender({ height: 150, reversed: true });
      expect(screen.getByTestId("card-content").parentElement)
        .toHaveStyle({ height: "150px", flexDirection: "row-reverse", boxShadow: ""});

      // - WHEN "standalone" is off, "horizontal" is active AND "reversed" not, THEN flexDirection is "row" again
      await rerender({ standalone: false, horizontal: true, reversed: false });
      expect(screen.getByTestId("card-content").parentElement)
        .toHaveStyle({ height: "150px", flexDirection: "row", boxShadow: ""});
      // - WHEN "standalone" is off, AND "horizontal" AND "reversed" = true, THEN flexDirection is "row-reverse" again
      await rerender({ horizontal: true, reversed: true });
      expect(screen.getByTestId("card-content").parentElement)
        .toHaveStyle({ flexDirection: "row-reverse", boxShadow: ""});

      // - WHEN "standalone" is off, AND "horizontal" and "reversed" falsy, THEN flexDirection becomes "column"
      await rerender({ horizontal: undefined, reversed: false });
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ flexDirection: "column", boxShadow: ""});
      // - WHEN "standalone" is off, "horizontal" falsy BUT "reversed" true, THEN flexDirection becomes "column-reverse"
      await rerender({ horizontal: undefined, reversed: true });
      expect(screen.getByTestId("card-content").parentElement)
        .toHaveStyle({ flexDirection: "column-reverse", boxShadow: ""});

      // - WHEN "hoverable" is active, THEN a "box-shadow" is applied when the card is hovered over
      await rerender({ hoverable: true });
      await user.hover(screen.getByTestId("card-content").parentElement!);
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ boxShadow: "0px 1px 3px 3px #bc8b3d" });

      // - WHEN the user stops hovering, THEN the "box-shadow" is removed
      await user.unhover(screen.getByTestId("card-content").parentElement!);
      expect(screen.getByTestId("card-content").parentElement)
        .not.toHaveStyle({ boxShadow: "0px 1px 3px 3px #bc8b3d" });

      // - WHEN "borderless" becomes active, THEN "box-shadow" "none" is added ONLY WHEN NOT HOVERING
      await rerender({ borderless: true });
      await user.hover(screen.getByTestId("card-content").parentElement!);
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ boxShadow: "0px 1px 3px 3px #bc8b3d" });

      // - WHEN "borderless" is active and the card is unhovered, THEN the "box-shadow" is removed
      await user.unhover(screen.getByTestId("card-content").parentElement!);
      // ?: The one problem with testing `borderless` still is that even though `box-shadow: "none"` is being applied,
      // ?: removing the boxShadow, it ultimately just becomes `box-shadow: ""` which is effectively the same as "none"
      expect(screen.getByTestId("card-content").parentElement)
        .not.toHaveStyle({ boxShadow: "0px 1px 3px 3px #bc8b3d" });
    });
  });
  it("adjusts each section's font size based on viewport width", () => {
    const infoItem = {
      title: "FooTitle",
      meta: "FooBarMeta",
      description: "BarDescription"
    };
    const store = VuexStore(480); // - Defaults to 480, the expected Mobile width breakpoint
    const { unmount } = render(SuiCard, {
      global: { plugins: [store] }, props: { infoItem },
      slots: { image: "<img src='foo.jpg' alt='FooImg' />", footer: "FooFooter" },
    });
    // - WHEN on a mobile-sized viewport, THEN the title gets a "f-lg" CSS class
    expect(screen.getByText("FooTitle")).toBeInTheDocument();
    expect(screen.getByText("FooTitle")).toHaveClass("f-lg");

    // - AND the meta, description and footer get a "f-md" CSS class
    expect(screen.getByText("FooBarMeta")).toBeInTheDocument();
    expect(screen.getByText("FooBarMeta")).toHaveClass("f-md");

    expect(screen.getByText("BarDescription")).toBeInTheDocument();
    expect(screen.getByText("BarDescription")).toHaveClass("f-md");

    expect(screen.getByText("FooFooter")).toBeInTheDocument();
    expect(screen.getByText("FooFooter")).toHaveClass("f-md");

    unmount();

    const bigStore = VuexStore(992);
    render(SuiCard, {
      global: { plugins: [bigStore] }, props: { infoItem },
      slots: { image: "<img src='foo.jpg' alt='FooImg' />", footer: "FooFooter" },
    });
    // - WHEN on a desktop-sized viewport, THEN the title gets a "f-sm" CSS class
    expect(screen.getByText("FooTitle")).toBeInTheDocument();
    expect(screen.getByText("FooTitle")).toHaveClass("f-sm");

    // - AND the meta, description and footer get a "f-xs" CSS class
    expect(screen.getByText("FooBarMeta")).toBeInTheDocument();
    expect(screen.getByText("FooBarMeta")).toHaveClass("f-xs");

    expect(screen.getByText("BarDescription")).toBeInTheDocument();
    expect(screen.getByText("BarDescription")).toHaveClass("f-xs");

    expect(screen.getByText("FooFooter")).toBeInTheDocument();
    expect(screen.getByText("FooFooter")).toHaveClass("f-xs");
  });
});