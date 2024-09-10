import SuiPagination from "@/Components/Elements/SuiPagination.vue";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { h } from "vue";


describe("Semantic UI styled set of buttons for cycling across pages", () => {
  it("displays 1, 3 or 5 buttons depending on the number of pages and current page", async () => {
    const { rerender } = render(SuiPagination, { props: { currentPage: 1, numOfPages: 1 } });
    // - WHEN there's only 1 page, THEN only 1 page button is displayed
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: "Next Page" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Previous Page" })).not.toBeInTheDocument();

    // - WHEN there's 2+ pages and `currentPage` == 1
    await rerender({ numOfPages: 2 });
    // - THEN Page 1, Page 2 and Next Page buttons are displayed
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Next Page" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Previous Page" })).not.toBeInTheDocument();

    await rerender({ numOfPages: 3 });
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Next Page" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Previous Page" })).not.toBeInTheDocument();

    // - WHEN 2+ pages and `currentPage` is NOT the 1st or last page
    await rerender({ currentPage: 2 });
    // - THEN 3 page number buttons and the Previous + Next page buttons are displayed
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(screen.getByRole("button", { name: "Next Page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous Page" })).toBeInTheDocument();
    // - WHEN 2+ pages and `currentPage` is the last page
    await rerender({ currentPage: 3 });
    // - THEN similar to the 1st page, two page buttons and a Previous Page button is displayed
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryByRole("button", { name: "Next Page" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous Page" })).toBeInTheDocument();

    // - WHEN 2+ pages and `currentPage` not 1st or last page
    await rerender({ numOfPages: 4 });
    // - THEN 3 page number buttons and the Previous + Next page buttons are displayed
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    // - WHEN 2+ pages and `currentPage` is last page
    await rerender({ currentPage: 4 });
    // - THEN two page buttons and a Previous Page button is displayed
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryByRole("button", { name: "Next Page" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous Page" })).toBeInTheDocument();

    // - WHEN the `currentPage` exceeds the number of pages
    await rerender({ currentPage: 5 });
    // - THEN 3 page number buttons and the Previous + Next page buttons render as if normal!
    expect(screen.getAllByRole("listitem")).toHaveLength(5); // TODO: Maybe a prop validator would help?
  });
  it("emits an 'update:page' event with different values based on left and right arrow button clicks", async () => {
    const user = userEvent.setup();
    const updatePageSpy = vi.fn();
    const stubComponent = {
      render() {
        return h(SuiPagination, { "onUpdate:page": updatePageSpy, currentPage: 1, numOfPages: 3 });
      }
    };
    const { rerender } = render(stubComponent);
    expect(updatePageSpy).not.toHaveBeenCalled(); // - Sanity check that spy not yet called

    // - WHEN the Next Page button is clicked
    await user.click(screen.getByRole("button", { name: "Next Page" }));
    // - THEN the `updatePageSpy` is called due to "update:page" event
    expect(updatePageSpy).toHaveBeenCalledTimes(1);
    expect(updatePageSpy).toHaveBeenCalledWith(2); // - Called with `currentPage` + 1
    await user.click(screen.getByRole("button", { name: "Next Page" }));
    expect(updatePageSpy).toHaveBeenCalledTimes(2);
    // - Since `currentPage` not actually updated, later calls still emit `2`
    expect(updatePageSpy).toHaveBeenCalledWith(2);

    // - WHEN the Previous Page button is clicked
    await rerender({ currentPage: 2 });
    await user.click(screen.getByRole("button", { name: "Previous Page" }));
    // - THEN the `updatePageSpy` is called due to "update:page" event still used
    expect(updatePageSpy).toHaveBeenCalledTimes(3);
    expect(updatePageSpy).toHaveBeenCalledWith(1); // - BUT now using `currentPage` - 1 = 1
    await user.click(screen.getByRole("button", { name: "Next Page" }));
    // - AND clicking Next Page button changes the emitted page to be `currentPage` + 1 = 3
    expect(updatePageSpy).toHaveBeenCalledTimes(4);
    expect(updatePageSpy).toHaveBeenCalledWith(3);

    // - WHEN the Previous Page button is clicked
    await rerender({ currentPage: 3 });
    await user.click(screen.getByRole("button", { name: "Previous Page" }));
    // - THEN `updatePageSpy` is called due to "update:page" event still used
    expect(updatePageSpy).toHaveBeenCalledTimes(5);
    expect(updatePageSpy).toHaveBeenCalledWith(2); // - BUT now `currentPage` == 3, so event emits `2`
  });
  it("adds a style variable based on index/placement of each list item", async () => {
    const { rerender } = render(SuiPagination, { props: { currentPage: 1, numOfPages: 3 } });
    // - WHEN component renders, THEN the `<ul>` container has a style var called `total` == 5, ALWAYS
    expect(screen.getAllByRole("listitem")[0].parentElement).toHaveStyle("--total: 5");
    await rerender({ numOfPages: 5 }); // - EVEN if the `numOfPages` changes, `total` remains 5
    expect(screen.getAllByRole("listitem")[0].parentElement).toHaveStyle("--total: 5");
    // - AND the 1st page button ALWAYS has a style var of `--i` == 1, regardless the actual page number
    expect(screen.getByRole("button", { name: "1" }).parentElement).toHaveStyle("--i: 1");
    // - AND the 2nd page button ALWAYS has a style var of `--i` == 2, regardless the actual page number
    expect(screen.getByRole("button", { name: "2" }).parentElement).toHaveStyle("--i: 2");
    // - AND "Next Page" button is always `--i` == 4
    expect(screen.getByRole("button", { name: "Next Page" }).parentElement).toHaveStyle("--i: 4");

    // - WHEN `currentPage` moves past 1
    await rerender({ currentPage: 2 });
    // - THEN the 1st, 2nd, and 3rd page buttons `--i` == 1, 2, and 3 respectively
    expect(screen.getByRole("button", { name: "1" }).parentElement).toHaveStyle("--i: 1");
    expect(screen.getByRole("button", { name: "2" }).parentElement).toHaveStyle("--i: 2");
    expect(screen.getByRole("button", { name: "3" }).parentElement).toHaveStyle("--i: 3");
    // - AND "Previous Page" + "Next Page" button are now BOTH displayed with `--i` == 0, 4 respectively
    expect(screen.getByRole("button", { name: "Previous Page" }).parentElement).toHaveStyle("--i: 0");
    expect(screen.getByRole("button", { name: "Next Page" }).parentElement).toHaveStyle("--i: 4");

    // - WHEN `currentPage` moves past 1
    await rerender({ currentPage: 3 });
    // - THEN the 1st, 2nd, and 3rd page buttons `--i` == 1, 2, and 3 respectively IN SPITE OF THEIR NUMBERS
    expect(screen.getByRole("button", { name: "2" }).parentElement).toHaveStyle("--i: 1");
    expect(screen.getByRole("button", { name: "3" }).parentElement).toHaveStyle("--i: 2");
    expect(screen.getByRole("button", { name: "4" }).parentElement).toHaveStyle("--i: 3");
    // - AND "Previous Page" + "Next Page" button are now BOTH displayed with `--i` == 0, 4 respectively
    expect(screen.getByRole("button", { name: "Previous Page" }).parentElement).toHaveStyle("--i: 0");
    expect(screen.getByRole("button", { name: "Next Page" }).parentElement).toHaveStyle("--i: 4");

    // - WHEN `currentPage` reaches last page
    await rerender({ currentPage: 5 });
    // - THEN only last 2 pages displayed with `--i` == 1 and 2 respectively
    expect(screen.getByRole("button", { name: "4" }).parentElement).toHaveStyle("--i: 1");
    expect(screen.getByRole("button", { name: "5" }).parentElement).toHaveStyle("--i: 2");
    // - AND "Previous Page" button is still displayed with `--i` == 0
    expect(screen.getByRole("button", { name: "Previous Page" }).parentElement).toHaveStyle("--i: 0");
  });
  it("adds CSS classes to each page number button based on index/placement/currentPage", async () => {
    const { rerender } = render(SuiPagination, { props: { currentPage: 1, numOfPages: 3 } });
    // - WHEN `currentPage` == 1, THEN Page 1 button is "active" with side-borders and rounded left side
    expect(screen.getByRole("button", { name: "1" })).toHaveClass("active border-x rounded-l");
    // - AND the Page 2 button has no rounded edges
    expect(screen.getByRole("button", { name: "2" })).toHaveClass("rounded-none");

    // - WHEN `currentPage` == 2 (and 3 page buttons displayed)
    await rerender({ currentPage: 2 });
    // - THEN Page 1 has no rounded edges AND loses the "active border-x" CSS
    expect(screen.getByRole("button", { name: "1" })).toHaveClass("rounded-none");
    expect(screen.getByRole("button", { name: "1" })).not.toHaveClass("active border-x");
    // - AND Page 2 becomes active with the side-borders BUT no rounding
    expect(screen.getByRole("button", { name: "2" })).toHaveClass("active border-x rounded-none");
    // - AND Page 3 appears with no rounding
    expect(screen.getByRole("button", { name: "3" })).toHaveClass("rounded-none");

    // - WHEN `currentPage` == 3 (and last page with 2 page buttons displayed)
    await rerender({ currentPage: 3 });
    // - THEN Page 2 loses "active border-x" BUT keeps "rounded-none"
    expect(screen.getByRole("button", { name: "2" })).toHaveClass("rounded-none");
    expect(screen.getByRole("button", { name: "2" })).not.toHaveClass("active border-x");
    // - AND Page 3 loses "rounded-none" BUT gains "active border-x" with a rounded right side
    expect(screen.getByRole("button", { name: "3" })).toHaveClass("active border-x rounded-r");
    expect(screen.getByRole("button", { name: "3" })).not.toHaveClass("rounded-none");
  });
});