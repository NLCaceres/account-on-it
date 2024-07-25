import { vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import SuiCardSet from "@/Components/Elements/Cards/SuiCardSet.vue";
import { createStore } from "vuex";
import { INIT_INTERSECTION_OBSERVER } from "@/Store/ActionTypes";
import { MOBILE_WIDTH, GENERAL_DESKTOP_WIDTH, GET_INTERSECTION_OBSERVER } from "@/Store/GetterTypes";
import { LAZY_LOAD_OBSERVER } from "@/Store/modules/IntersectionState";

// ?: Good examples in this file of how to use Jest-Dom with Vue and how Vue works under the hood as well
// ?: Such as Jest-Dom `toHaveStyle()` passing tests even if only one style asserted is correct,
// ?: For Vue, CSS Class/Style props take strings, arrays or objs THAT CAN BE COMPLETELY INVALID

const StoreWithObserverAndWindowSized =
  (width: number, height: number, observerList = { [LAZY_LOAD_OBSERVER]: new IntersectionObserver(() => { }) }) => {
    return { modules: { // ?: Getters must be written like actions, AS FUNCTIONS
      app: {
        namespaced: true, state: { window: { width, height } },
        getters: { [MOBILE_WIDTH]: () => true, [GENERAL_DESKTOP_WIDTH]: () => false }
      },
      intersectionAPI: { // ?: GET_INTERSECTION_OBSERVER is a Higher Order Func, returning a getter func to the observer
        namespaced: true, state: { observers: { ...observerList } },
        getters: { [GET_INTERSECTION_OBSERVER]: () => () => new IntersectionObserver(() => { }) },
        actions: { [INIT_INTERSECTION_OBSERVER]: () => new IntersectionObserver(() => { }) }
      }, // ?: Vuex relies on 4 concepts: State, Actions, Getters & Mutations. State is the only singular-spelled word
    }};
  };
const infoItem = (index: number) => {
  return {
    title: `Title ${index}`, meta: `Meta ${index}`, description: `Description ${index}`,
    img: { src: `Img ${index}`, alt: `Alt ${index}` }
  };
};

describe("Semantic UI Card Set Component", () => {
  it("rendering information in cards based on an array of InfoItems", async () => {
    const store = createStore(StoreWithObserverAndWindowSized(767, 449));
    const { rerender } =
      render(SuiCardSet, { global: { plugins: [store] }, props: { cardSet: [infoItem(0), infoItem(1)] } });
    expect(screen.getAllByTestId("card-content")).toHaveLength(2);

    await rerender({ cardSet: [infoItem(2), infoItem(3), infoItem(4)] });
    expect(screen.getAllByTestId("card-content")).toHaveLength(3);

    await rerender({ cardSet: [infoItem(5)] });
    expect(screen.getAllByTestId("card-content")).toHaveLength(1);
    expect(screen.getByText("Title 5")).toBeInTheDocument();
    expect(screen.getByText("Meta 5")).toBeInTheDocument();
    expect(screen.getByText("Description 5")).toBeInTheDocument();
    expect(screen.getByText("Placeholder")); // - LazyLoadImg loads a placeholder, not a fake img
  });
  describe("with properties to pass into the card children for styling", () => {
    it("by directly setting the card container's class and styles", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(SuiCardSet, {
        global: { plugins: [store] },
        props: { cardSet: [infoItem(0), infoItem(1)], cardClasses: "foo", cardStyles: "foo" }
      });
      // - WHEN "cardClasses" passed in as a string
      const cards = screen.getAllByTestId("card-content");
      // - THEN any classes in the string appended to the card container classes
      for (const card of cards) { expect(card.parentElement).toHaveClass("app-cyan card foo"); }

      await rerender({ cardClasses: { bar: true, foo: false }, cardStyles: "foo: " });
      // -  WHEN "cardClasses" passed in as a string
      const cardsTwo = screen.getAllByTestId("card-content");
      // - THEN any classes in the string appended to the card container classes
      for (const card of cardsTwo) { expect(card.parentElement).toHaveClass("app-cyan card bar", { exact: true }); }

      await rerender({ cardClasses: ["foo", "bar"], cardStyles: "foo: 'duh'" });
      // - WHEN "cardClasses" passed in as an array
      const cardsThree = screen.getAllByTestId("card-content");
      // - THEN any classes in the string appended to the card container classes
      for (const card of cardsThree) {
        expect(card.parentElement).toHaveClass("app-cyan card foo bar", { exact: true });
      }
    });
    it("by directly setting the card component's root element style", async () => {
      // ?: CSS Style Props get merged like CSS Class props EXCEPT Vue TRIES to only merge valid styles
      // ?: BUT it ISN'T perfect and will miss errors for some styles and their values
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(SuiCardSet, {
        global: { plugins: [store] }, props: { cardSet: [infoItem(0), infoItem(1)], cardStyles: "foo" }
      });
      // - WHEN "cardStyles" passed in as a string BUT not a valid style
      const cards = screen.getAllByTestId("card-content");
      // - THEN it will not be added
      for (const card of cards) { expect(card.parentElement!.style.cssText).not.toContain("foo: duh"); }

      await rerender({ cardStyles: "foo: bar" });
      // - WHEN "cardStyles" passed in as a string BUT not a valid style
      const cardsTwo = screen.getAllByTestId("card-content");
      // - THEN it will not be added
      for (const card of cardsTwo) { expect(card.parentElement!.style.cssText).not.toContain("foo: bar"); }

      await rerender({ cardStyles: "display: foo" });
      // - WHEN "cardStyles" passed in as a string BUT isn't a valid value
      const cardsThree = screen.getAllByTestId("card-content");
      // - THEN it MIGHT STILL BE ADDED
      for (const card of cardsThree) { expect(card.parentElement).toHaveStyle("display: foo"); }

      // !: Using objects
      await rerender({ cardStyles: { foo: "bar" } });
      // - WHEN "cardStyles" passed in as an object BUT doesn't have any valid styles
      const cardsFour = screen.getAllByTestId("card-content");
      // - THEN it won't be added
      for (const card of cardsFour) { expect(card.parentElement!.style.cssText).not.toContain("foo: bar"); }

      await rerender({ cardStyles: { display: "foo", bar: "fizz" } });
      // - WHEN "cardStyles" passed in as an object
      const cardsFive = screen.getAllByTestId("card-content");
      // - THEN valid styling will be applied even if it doesn't logically work
      for (const card of cardsFive) {
        expect(card.parentElement).toHaveStyle("display: foo"); // - Not technically valid BUT display accepts it
        expect(card.parentElement!.style.cssText).not.toContain("bar: fizz"); // - Not at all valid, so not applied
      }

      // !: Using arrays
      await rerender({ cardStyles: ["position: relative", "display: foo", "color: bar"] });
      // - WHEN "cardStyles" passed in as an array of string styles
      const cardsSix = screen.getAllByTestId("card-content");
      // - THEN valid styles will be applied
      for (const card of cardsSix) {
        expect(card.parentElement!.style.cssText).toContain("position: relative"); // - Perfectly valid
        expect(card.parentElement!.style.cssText).toContain("display: foo"); // - Unexpectedly valid but inserted anyway
        expect(card.parentElement!.style.cssText).not.toContain("color: bar"); // - Invalid value so not applied
      }

      await rerender({ cardStyles: [{ foo: "bar", position: "relative" }, { color: "fizz" }, { display: "buzz" }] });
      // - WHEN "cardStyles" passed in as an array of style objects
      const cardsSeven = screen.getAllByTestId("card-content");
      // - THEN it will be added just like before, some invalid values may slip through!
      for (const card of cardsSeven) {
        expect(card.parentElement).toHaveStyle({ display: "buzz" });
        expect(card.parentElement).toHaveStyle({ position: "relative" });
        expect(card.parentElement!.style.cssText).not.toContain("color: fizz");
        expect(card.parentElement!.style.cssText).not.toContain("foo: bar");
      }
    });
    describe("to center cards it renders", () => {
      it("completely with a single 'fullyCentered'", async () => {
        const store = createStore(StoreWithObserverAndWindowSized(767, 449));
        const { rerender } = render(SuiCardSet, {
          global: { plugins: [store] }, props: { cardSet: [infoItem(0), infoItem(1)], fullyCentered: true },
          slots: { footer: "" }
        });
        const cards = screen.getAllByTestId("card-content");
        for (const card of cards) {
          expect(card).toHaveClass("center aligned flexed-column-center");
          expect(card.children[0]).toHaveClass("header center aligned");
          expect(card.children[1]).toHaveClass("meta center aligned");
          expect(card.children[2]).toHaveClass("description center aligned");
        }
        for (const footer of screen.getAllByTestId("card-footer")) {
          expect(footer).toHaveClass("extra content center aligned flexed-column-center");
        }

        await rerender({ fullyCentered: false });
        const uncenteredCards = screen.getAllByTestId("card-content");
        for (const card of uncenteredCards) {
          expect(card).not.toHaveClass("center aligned flexed-column-center");
          expect(card.children[0]).not.toHaveClass("header center aligned");
          expect(card.children[1]).not.toHaveClass("meta center aligned");
          expect(card.children[2]).not.toHaveClass("description center aligned");
        }
        for (const footer of screen.getAllByTestId("card-footer")) {
          expect(footer).not.toHaveClass("extra content center aligned flexed-column-center");
        }
      });
      it("with individual props for each section of the card", async () => {
        const store = createStore(StoreWithObserverAndWindowSized(767, 449));
        const { rerender } = render(SuiCardSet, {
          global: { plugins: [store] }, props: { cardSet: [infoItem(0), infoItem(1)], centeredContent: true },
          slots: { footer: "" }
        });
        // - WHEN using the "centeredContent" prop
        const centeredContentCard = screen.getAllByTestId("card-content");
        // - THEN ONLY the "content" div is given the "center aligned" CSS class
        for (const card of centeredContentCard) {
          expect(card).toHaveClass("center aligned");
          expect(card.children[0]).not.toHaveClass("header center aligned");
          expect(card.children[1]).not.toHaveClass("meta center aligned");
          expect(card.children[2]).not.toHaveClass("description center aligned");
        }
        for (const footer of screen.getAllByTestId("card-footer")) {
          expect(footer).not.toHaveClass("extra content center aligned flexed-column-center");
        }

        await rerender({ centeredContent: false, verticalCentered: true });
        // - WHEN using the "verticalCentered" prop
        const verticallyCenteredCard = screen.getAllByTestId("card-content");
        // - THEN the "content" and "footer" divs are given a "flexed-column-center" CSS class
        for (const card of verticallyCenteredCard) {
          expect(card).not.toHaveClass("center aligned");
          expect(card).toHaveClass("flexed-column-center");
          expect(card.children[0]).not.toHaveClass("header center aligned");
          expect(card.children[1]).not.toHaveClass("meta center aligned");
          expect(card.children[2]).not.toHaveClass("description center aligned");
        }
        for (const footer of screen.getAllByTestId("card-footer")) {
          expect(footer).not.toHaveClass("center aligned");
          expect(footer).toHaveClass("extra content flexed-column-center");
        }

        await rerender({ verticalCentered: false, centeredExtraContent: true });
        // - WHEN using the "centeredExtraContent" prop
        const centeredFooterCard = screen.getAllByTestId("card-content");
        // - THEN ONLY the "footer" div is given the "center aligned" CSS class
        for (const card of centeredFooterCard) {
          expect(card).not.toHaveClass("center aligned flexed-column-center");
          expect(card.children[0]).not.toHaveClass("header center aligned");
          expect(card.children[1]).not.toHaveClass("meta center aligned");
          expect(card.children[2]).not.toHaveClass("description center aligned");
        }
        for (const footer of screen.getAllByTestId("card-footer")) {
          expect(footer).toHaveClass("extra content center aligned");
          expect(footer).not.toHaveClass("flexed-column-center");
        }

        await rerender({ centeredExtraContent: false, centeredTitle: true });
        // - WHEN using the "centeredTitle" prop
        const centeredTitleCard = screen.getAllByTestId("card-content");
        // - THEN ONLY the "header" div is given the "center aligned" CSS class
        for (const card of centeredTitleCard) {
          expect(card).not.toHaveClass("center aligned flexed-column-center");
          expect(card.children[0]).toHaveClass("header center aligned");
          expect(card.children[1]).not.toHaveClass("meta center aligned");
          expect(card.children[2]).not.toHaveClass("description center aligned");
        }
        for (const footer of screen.getAllByTestId("card-footer")) {
          expect(footer).not.toHaveClass("extra content center aligned flexed-column-center");
        }

        await rerender({ centeredTitle: false, centeredMeta: true });
        // - WHEN using the "centeredMeta" prop
        const centeredMetaCard = screen.getAllByTestId("card-content");
        // - THEN ONLY the "meta" div is given the "center aligned" CSS class
        for (const card of centeredMetaCard) {
          expect(card).not.toHaveClass("center aligned flexed-column-center");
          expect(card.children[0]).not.toHaveClass("header center aligned");
          expect(card.children[1]).toHaveClass("meta center aligned");
          expect(card.children[2]).not.toHaveClass("description center aligned");
        }
        for (const footer of screen.getAllByTestId("card-footer")) {
          expect(footer).not.toHaveClass("extra content center aligned flexed-column-center");
        }

        await rerender({ centeredMeta: false, centeredDescription: true });
        // - WHEN using the "centeredDescription" prop
        const centeredDescriptionCard = screen.getAllByTestId("card-content");
        // - THEN ONLY the "centeredDescription" div is given the "center aligned" CSS class
        for (const card of centeredDescriptionCard) {
          expect(card).not.toHaveClass("center aligned flexed-column-center");
          expect(card.children[0]).not.toHaveClass("header center aligned");
          expect(card.children[1]).not.toHaveClass("meta center aligned");
          expect(card.children[2]).toHaveClass("description center aligned");
        }
        for (const footer of screen.getAllByTestId("card-footer")) {
          expect(footer).not.toHaveClass("extra content center aligned flexed-column-center");
        }
      });
    });

    it("with a 'checkered' prop to layout cards in a checkerboard pattern", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } =
        render(SuiCardSet, { global: { plugins: [store] }, props: { cardSet: [infoItem(0), infoItem(1)] } });
      // - WHEN "checkered" prop set to false (its default)
      const cards = screen.getAllByTestId("card-content");
      // - THEN the flex-direction of all cards is set in "normal" order
      expect(cards).toHaveLength(2);
      expect(cards[0].parentElement).toHaveStyle({ flexDirection: "column" });
      expect(cards[1].parentElement).toHaveStyle({ flexDirection: "column" });

      await rerender({ checkered: true });
      // - WHEN "checkered" prop set to true
      const checkeredCards = screen.getAllByTestId("card-content");
      // - THEN the flex-direction of even cards is "normal" BUT odd cards is "reverse"
      expect(checkeredCards).toHaveLength(2);
      expect(checkeredCards[0].parentElement).toHaveStyle({ flexDirection: "column" });
      expect(checkeredCards[1].parentElement).toHaveStyle({ flexDirection: "column-reverse" });
    });

    it("with a 'patternLogic' function using card indices to override 'checkered' card layout", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const patternLogic = vi.fn().mockReturnValue(true);
      const { rerender } = render(
        SuiCardSet, { global: { plugins: [store] }, props: { patternLogic, cardSet: [infoItem(0), infoItem(1)] } }
      );
      // - WHEN "patternLogic" set
      const reversedCards = screen.getAllByTestId("card-content");
      // - THEN it dictates the flexDirection of all cards
      expect(reversedCards).toHaveLength(2); // - `true` for all cards sets their flex in reverse
      expect(reversedCards[0].parentElement).toHaveStyle({ flexDirection: "column-reverse" });
      expect(reversedCards[1].parentElement).toHaveStyle({ flexDirection: "column-reverse" });

      await rerender({ checkered: true });
      // - WHEN "patternLogic" set and "checkered" set to true
      const stillReversedCards = screen.getAllByTestId("card-content");
      // - THEN "patternLogic" takes priority
      expect(stillReversedCards).toHaveLength(2);
      expect(stillReversedCards[0].parentElement).toHaveStyle({ flexDirection: "column-reverse" });
      expect(stillReversedCards[1].parentElement).toHaveStyle({ flexDirection: "column-reverse" });

      await rerender({ patternLogic: undefined });
      // - WHEN "patternLogic" removed BUT "checkered" prop still set to true
      const checkeredCards = screen.getAllByTestId("card-content");
      // - THEN cards have a "checkerboard" pattern again
      expect(checkeredCards).toHaveLength(2);
      expect(checkeredCards[0].parentElement).toHaveStyle({ flexDirection: "column" });
      expect(checkeredCards[1].parentElement).toHaveStyle({ flexDirection: "column-reverse" });
    });

    it("with a 'closeCards' prop to make cards marginless", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { container, rerender } = render(SuiCardSet, { global: { plugins: [store] } });
      expect(container.firstChild).toHaveClass("ui cards", { exact: true });

      await rerender({ closeCards: true });
      expect(container.firstChild).toHaveClass("ui cards close-card-set", { exact: true });

      await rerender({ closeCards: false });
      expect(container.firstChild).toHaveClass("ui cards", { exact: true });
    });

    // ?: Tough to unit test "Borderless" prop since "boxShadow: none" can't be seen by `jest-dom`, so E2E tests needed
    // ?: "Hoverable" has a similar issue EXCEPT "testing-library/user-event" may be able to help
    // it("with a 'borderless' prop that styles child cards", async () => {
    //   const store = createStore(StoreWithObserverAndWindowSized(767, 449))
    // const { rerender } = render(
    //   SuiCardSet, { global: { plugins: [store] }, props: { cardSet: [infoItem(0), infoItem(1)] } }
    // );
    //   const cards = screen.getAllByTestId("card-content");
    //   for (const card of cards) { expect(card.parentElement.style.cssText).not.toContain("box-shadow"); }
    // })

    it("with a 'fluid' prop to make cards stretch from end to end", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(
        SuiCardSet, { global: { plugins: [store] },  props: { cardSet: [infoItem(0), infoItem(1)] } }
      );
      // - WHEN "fluid" prop is not set (defaults to false)
      const cards = screen.getAllByTestId("card-content");
      // - THEN cards will not have a "fluid" CSS Class
      for (const card of cards) {
        expect(card.parentElement).not.toHaveClass("fluid");
        expect(card.parentElement).not.toHaveClass("auto-width");
      }

      await rerender({ fluid: true });
      // - WHEN "fluid" prop is set
      const stretchedCards = screen.getAllByTestId("card-content");
      // - THEN due to "standalone" prop being false, cards will have a "auto-width" for stretching design
      for (const card of stretchedCards) {
        expect(card.parentElement).not.toHaveClass("fluid");
        expect(card.parentElement).toHaveClass("auto-width");
      }
    });

    it("with a 'horizontal' prop that styles card set and child cards", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { container, rerender } = render(SuiCardSet, { global: { plugins: [store] } });
      // - WHEN using the default props
      // - THEN no "horizontal" class is applied to the Card-Set component
      expect(container.firstChild).toHaveClass("ui cards", { exact: true });

      // - WHEN setting "horizontal" to true
      await rerender({ horizontal: true });
      // - THEN a "horizontal" class is applied to the Card-Set component
      expect(container.firstChild).toHaveClass("ui cards horizontal", { exact: true });

      // - WHEN setting "horizontal" to false
      await rerender({ horizontal: false });
      // - THEN no "horizontal" class is applied to the Card-Set component
      expect(container.firstChild).toHaveClass("ui cards", { exact: true });

      // - WHEN using "horizontal"
      await rerender({ horizontal: true, cardSet: [infoItem(0), infoItem(1), infoItem(2)] });
      const cards = screen.getAllByTestId("card-content");
      // - THEN the cards will NOT be horizontal since SuiCardSet insists the cards are not standalone
      for (const card of cards) { expect(card.parentElement).not.toHaveClass("horizontal"); }
      // - BUT it's still important to pass the "horizontal" prop to all cards due to other styling choices
    });

    it("with a 'ratio' prop to evenly distribute space in cards", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(
        SuiCardSet, { global: { plugins: [store] },  props: { cardSet: [infoItem(0), infoItem(1)] } }
      );
      // - WHEN "ratio" is not set
      // - THEN its default of "50/50" is used which makes all cards and their images share 50% of the height
      for (const cardImg of screen.getAllByTestId("card-image")) { expect(cardImg).toHaveClass("h-50"); }
      for (const card of screen.getAllByTestId("card-content")) { expect(card).toHaveClass("h-50"); }

      // - WHEN "ratio" is set
      await rerender({ ratio: "25/75" });
      // - THEN the "ratio" is split as expected and applied to card-image and card-content, respectively
      for (const cardImg of screen.getAllByTestId("card-image")) { expect(cardImg).toHaveClass("h-25"); }
      for (const card of screen.getAllByTestId("card-content")) { expect(card).toHaveClass("h-75"); }
    });

    it("with a 'height' prop to size each card", async () => {
      const store = createStore(StoreWithObserverAndWindowSized(767, 449));
      const { rerender } = render(
        SuiCardSet, { global: { plugins: [store] },  props: { cardSet: [infoItem(0), infoItem(1)] } }
      );
      // - WHEN the cardHeight is not set
      // - THEN the normal card container default height of 250 is overridden for a new default of 200 by SuiCardSet
      for (const card of screen.getAllByTestId("card-content")) {
        expect(card.parentElement).toHaveStyle("height: 200px");
      }

      // - WHEN the cardHeight is set
      await rerender({ cardHeight: 400 });
      // - THEN the card CONTAINER height is set to the input NUMBER value
      for (const card of screen.getAllByTestId("card-content")) {
        expect(card.parentElement).toHaveStyle("height: 400px");
      }
    });
  });
});