import { render, screen } from "@testing-library/vue";
import SuiCard from "@/Components/Elements/Cards/SuiCard.vue";
import { createStore } from 'vuex';
import { INIT_INTERSECTION_OBSERVER } from "@/Store/ActionTypes";
import { MOBILE_WIDTH, GENERAL_DESKTOP_WIDTH, GET_INTERSECTION_OBSERVER } from '@/Store/GetterTypes';
import LAZY_LOAD_OBSERVER from '@/Store/modules/IntersectionState';

const StoreWithObserverAndWindowSized = (width, height, observerList = { [LAZY_LOAD_OBSERVER]: new IntersectionObserver(() => { }) }) => {
  return { modules: { //? Getters must be written like actions, AS FUNCTIONS
    app: { namespaced: true, state: { window: { width, height } }, getters: { [MOBILE_WIDTH]: () => true, [GENERAL_DESKTOP_WIDTH]: () => false } },
    intersectionAPI: { //? GET_INTERSECTION_OBSERVER is a tricky one, it is written as func, returning a func that immediately GETs an intersectionObserver
      namespaced: true, state: { observers: { ...observerList } }, getters: { [GET_INTERSECTION_OBSERVER]: () => () => new IntersectionObserver(() => { }) },
      actions: { [INIT_INTERSECTION_OBSERVER]: () => new IntersectionObserver(() => { }) }
    }, //? Vuex's 4 core concepts are state, actions, getters, and mutations. ONLY State is written in singular form, so CAREFUL SPELLING!
  }};
}

describe('Semantic UI Card Component', () => {
  describe('with basic card with a basic info item', () => {
    const props = {
        infoItem: {
          title: "FooTitle",
          meta: "FooBarMeta",
          description: "BarDescription",
          img: {
            src: 'FooImgSource',
            alt: 'BarAltText'
          }
        }
    };

    it('checks the title rendered', () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      render(SuiCard, { global: { plugins: [store] }, props });
      expect(screen.getByText(props.infoItem.title)).toBeInTheDocument();
      expect(screen.getByText(props.infoItem.meta)).toBeInTheDocument();
      expect(screen.getByText(props.infoItem.description)).toBeDefined();
    })
  })
  describe('with standard slots to override appearance', () => {
    const slots = {
      image: "<img src='foo.jpg' alt='FooImg' />",
      content: "<a>FooLink</a>",
      title: "<h1 class='title'>FooTitle</h1>",
      meta: "<h3 class='meta'>BarMeta</h3>",
      description: "<p>FooBarDescription</p>",
      "attached-button": "<i class='add icon'></i> FooButton",
      footer: "BarFooter"
    }
    it('checks image slot rendered', () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { image: slots.image } });
      expect(screen.getByAltText("FooImg")).toBeInTheDocument();
      expect(screen.getByAltText("FooImg").parentElement).toHaveClass("image");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByAltText("FooImg")).not.toBeInTheDocument();
      unmountTwo();

      //* WHEN using props, THEN the infoItem prop can use its img to lazy load the img rather than immediately rendering an img tag
      render(SuiCard, { global: { plugins: [store] }, props: { infoItem: { src: "FooImg", alt: "FooImgAltText" } } });
      expect(screen.queryByAltText("FooImg")).not.toBeInTheDocument(); //* Placeholder is being rendered instead since no real img
      expect(screen.getByText("Placeholder")).toBeInTheDocument();
    })
    it("checks title slot rendered", () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { title: slots.title } });
      expect(screen.getByText("FooTitle")).toBeInTheDocument();
      expect(screen.getByText("FooTitle")).toHaveClass("title");
      expect(screen.getByText("FooTitle").parentElement).toHaveClass("header");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByText("FooTitle")).not.toBeInTheDocument();
      unmountTwo();

      //* WHEN using props, THEN the infoItem prop can use its title to imitate the title slot directly using the slot's container
      render(SuiCard, { global: { plugins: [store] }, props: { infoItem: { title: "FooTitle" } } });
      expect(screen.getByText("FooTitle")).toBeInTheDocument();
      expect(screen.getByText("FooTitle")).toHaveClass("header");
    })
    it('checks meta slot rendered', () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { meta: slots.meta } });
      expect(screen.getByText("BarMeta")).toBeInTheDocument();
      expect(screen.getByText("BarMeta")).toHaveClass("meta");
      expect(screen.getByText("BarMeta").parentElement).toHaveClass("meta");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByText("BarMeta")).not.toBeInTheDocument();
      unmountTwo();

      //* WHEN using props, THEN the infoItem prop can use its meta-text to imitate the meta slot directly using the slot's container
      render(SuiCard, { global: { plugins: [store] }, props: { infoItem: { meta: "BarMeta" } } });
      expect(screen.getByText("BarMeta")).toBeInTheDocument();
      expect(screen.getByText("BarMeta")).toHaveClass("meta");
    })
    it('checks description slot rendered', () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { description: slots.description } });
      expect(screen.getByText("FooBarDescription")).toBeInTheDocument();
      expect(screen.getByText("FooBarDescription").parentElement).toHaveClass("description");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByText("FooBarDescription")).not.toBeInTheDocument();
      unmountTwo();

      //* WHEN using props, THEN the infoItem prop can use its description to imitate the description slot directly using the slot's container
      render(SuiCard, { global: { plugins: [store] }, props: { infoItem: { description: "FooBarDescription" } } });
      expect(screen.getByText("FooBarDescription")).toBeInTheDocument();
      expect(screen.getByText("FooBarDescription")).toHaveClass("description");
    })
  })
  describe("with optional slots", () => {
    const slots = {
      content: "<a>FooLink</a>",
      "attached-button": "<i class='add icon'></i> FooButton",
      footer: "<button>BarFooter</button>"
    }
    it("using a 'content' slot to add to the main section's appearance", () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { content: slots.content } });
      expect(screen.getByText("FooLink")).toBeInTheDocument();
      unmount()

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      expect(screen.queryByText("FooLink")).not.toBeInTheDocument();
      //* WHEN no content slot used, only the header, meta and description containers remain
      expect(screen.getByTestId("card-content").childElementCount).toBe(3);
      expect(screen.getByTestId("card-content").children[0]).toHaveClass("header");
      expect(screen.getByTestId("card-content").children[1]).toHaveClass("meta");
      expect(screen.getByTestId("card-content").children[2]).toHaveClass("description");
      unmountTwo();
    })
    it("using an 'attached-button' slot to place a button under the main content", () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { "attached-button": slots["attached-button"] } });
      expect(screen.getByText("FooButton")).toBeInTheDocument();
      //* WHEN using this slot, it works very well with an icon and text, making the direct parent a div with a button class
      expect(screen.getByText("FooButton")).toHaveClass("button");
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      //* WHEN no slot is used, not even the attached-button container is rendered
      expect(screen.queryByText("FooButton")).not.toBeInTheDocument();
      expect(screen.queryByTestId("card-attached-button")).not.toBeInTheDocument();
      unmountTwo();

      render(SuiCard, { global: { plugins: [store] }, slots: { "attached-button": "<button>FooButton</button>" } });
      //* WHEN slotting a button in this slot, THEN styling might be a bit off since its parent is already styled as a button
      expect(screen.getByRole("button", { text: "FooButton" })).toBeInTheDocument();
      expect(screen.getByRole("button", { text: "FooButton" }).parentElement).toHaveClass("button");
    })
    it("using a 'footer' slot to add content to the bottom", () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { unmount } = render(SuiCard, { global: { plugins: [store] }, slots: { footer: slots.footer } });
      expect(screen.getByText("BarFooter")).toBeInTheDocument();
      expect(screen.getByText("BarFooter").parentElement).toHaveClass("extra content")
      unmount();

      const { unmount: unmountTwo } = render(SuiCard, { global: { plugins: [store] } });
      //* WHEN no slot is used, not even the footer container is rendered
      expect(screen.queryByText("BarFooter")).not.toBeInTheDocument();
      expect(screen.queryByTestId("card-footer")).not.toBeInTheDocument();
      unmountTwo();

      render(SuiCard, { global: { plugins: [store] }, slots: { footer: "FooFooter" } });
      expect(screen.getByText("FooFooter")).toBeInTheDocument();
      //* WHEN any slot is just using text, THEN its directly inserted into the container
      expect(screen.getByText("FooFooter")).toHaveClass("extra content"); //* in this case, the footer
    })
  })
  describe('with computed properties', () => {
    it('to provide fluid design', async () => {
      const props = { fluid: true, standalone: true };
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(SuiCard, { global: { plugins: [store] }, props, slots: { image: "<img src='foo.jpg' alt='FooImg' />" } });
      expect(screen.getByRole("img").parentElement.parentElement).toHaveClass("fluid");

      await rerender({ fluid: true, standalone: false });
      expect(screen.getByRole("img").parentElement.parentElement).toHaveClass("auto-width");

      await rerender({ fluid: false, standalone: true });
      expect(screen.getByRole("img").parentElement.parentElement).not.toHaveClass("fluid");
      expect(screen.getByRole("img").parentElement.parentElement).not.toHaveClass("auto-width");
      
    })
    it('to provide a horizontal design', async () => {
      const props = { horizontal: true, standalone: true }
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(SuiCard, { global: { plugins: [store] }, props, slots: { footer: "FooFooter" } });
      //* WHEN BOTH "horizontal" and "standalone" are true, THEN the card container element will have a "horizontal" css class applied
      expect(screen.getByTestId("card-footer").parentElement).toHaveClass("horizontal");

      //* WHEN either prop set to false, THEN "horizontal" class not applied
      await rerender({ horizontal: false, standalone: true }); //? Vue's rerender MUST be awaited so changes can take place
      expect(screen.getByTestId("card-footer").parentElement).not.toHaveClass("horizontal");

      await rerender({ horizontal: true, standalone: false });
      expect(screen.getByTestId("card-footer").parentElement).not.toHaveClass("horizontal");
    })
    it("to provide ratio'd sizing to the image & content containers", async () => {
      const props = { ratio: "100/100" }
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(SuiCard, { global: { plugins: [store] }, props, slots: { image: "<img src='foo.jpg' alt='FooImg' />" } });
      //* WHEN the ratio is an invalid pair of numbers (they're not less than 100), THEN BOTH containers default to "h-50" (height 50%)
      expect(screen.getByTestId("card-image")).toHaveClass("h-50");
      expect(screen.getByTestId("card-content")).toHaveClass("h-50");

      await rerender({ ratio: "abc/def", horizontal: true })
      //* WHEN the ratio is invalid AND "horizontal" is set, THEN INSTEAD the BOTH container default to "w-50" (width 50%)
      expect(screen.getByTestId("card-image")).toHaveClass("w-50");
      expect(screen.getByTestId("card-content")).toHaveClass("w-50");
      
      //* WHEN no ratio is provided, the default of "h-50" is used
      await rerender({ ratio: undefined, horizontal: undefined });
      expect(screen.getByTestId("card-image")).toHaveClass("h-50");
      expect(screen.getByTestId("card-content")).toHaveClass("h-50");
      //* WHEN no ratio is provided BUT "horizontal" is active, the default of "w-50" is used
      await rerender({ horizontal: true });
      expect(screen.getByTestId("card-image")).toHaveClass("w-50");
      expect(screen.getByTestId("card-content")).toHaveClass("w-50");

      await rerender({ ratio: "50 50", horizontal: undefined }) //? Rerenders need props from previous renders to be switched off via "undefined"
      //* WHEN the ratio is valid BUT missing a "/" separator, THEN the image applies the default "h-50"
      expect(screen.getByTestId("card-image")).toHaveClass("h-50");
      expect(screen.getByTestId("card-content")).toHaveClass("h-50");
      //* Similarly, WHEN "horizontal" active, THEN the default "w-50" is used
      await rerender({ ratio: "50 50", horizontal: true })
      expect(screen.getByTestId("card-image")).toHaveClass("w-50");
      expect(screen.getByTestId("card-content")).toHaveClass("w-50");

      await rerender({ ratio: "25/25", horizontal: undefined })
      //* WHEN the ratio is validly formatted, THEN the 1st number is taken and set to h-NN, i.e. h-25 here
      expect(screen.getByTestId("card-image")).toHaveClass("h-25")
      expect(screen.getByTestId("card-content")).toHaveClass("h-25");
      //* Similarly, WHEN "horizontal" active, THEN it becomes "w-25" is used
      await rerender({ ratio: "25/25", horizontal: true })
      expect(screen.getByTestId("card-image")).toHaveClass("w-25")
      expect(screen.getByTestId("card-content")).toHaveClass("w-25");
      //* DESPITE not being an actually valid ratio (25+25 !== 100, of course)
    })
    it("to provide detailed styling to the main card container", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(SuiCard, { global: { plugins: [store] }, slots: { image: "<img src='foo.jpg' alt='FooImg' />" } });
      //* WHEN using default props, the "standalone" prop defaults to "true", SO the following is the default style
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ height: "250px", flexDirection: "row", boxShadow: ""});

      //* WHEN "height" and "reversed" are altered, THEN the "height" changes to the given number AND flexDirection adds "-reverse"
      await rerender({ height: 150, reversed: true });
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ height: "150px", flexDirection: "row-reverse", boxShadow: ""});
      //* WHEN "standalone" is off, "horizontal" is active AND "reversed" not, THEN flexDirection is "row" again
      await rerender({ standalone: false, horizontal: true, reversed: false });
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ height: "150px", flexDirection: "row", boxShadow: ""});
      //* WHEN "standalone" is off, "horizontal" AND "reversed" is active, THEN flexDirection is "row-reverse" again
      await rerender({ horizontal: true, reversed: true });
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ flexDirection: "row-reverse", boxShadow: ""});

      //* WHEN "standalone" is off, "horizontal" and "reversed" falsy, THEN flexDirection becomes "column"
      await rerender({ horizontal: undefined, reversed: false });
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ flexDirection: "column", boxShadow: ""});
      //* WHEN "standalone" is off, "horizontal" falsy BUT "reversed" true, THEN flexDirection becomes "column-reverse"
      await rerender({ horizontal: undefined, reversed: true });
      expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ flexDirection: "column-reverse", boxShadow: ""});

      //* WHEN "borderless" becomes active, THEN boxShadow "none" is added
      await rerender({ borderless: true });
      //TODO: Not currently testable SINCE "none" is effectively "" in that CSS would just not apply any box-shadow
      //TODO: Solution: Test out "hovering" & "hoverable" props which should trigger a real boxShadow via @testing-library/user-event's hover()
      //TODO: THEN when hover is applying AND "borderless" is also applied, the boxShadow CSS should disappear
      // expect(screen.getByTestId("card-content").parentElement).toHaveStyle({ flexDirection: "column-reverse", boxShadow: "none"});
    })
  });
});