import SortableTableHeader from "@/Components/VueHelpers/SortableTableHeader.vue";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { h } from "vue";


describe("A Table Header with a Sort Arrow", () => {
  it("changes the sort arrow direction based on `shouldSortByThis` prop and click", async () => {
    const user = userEvent.setup();
    const { rerender } = render(SortableTableHeader, { props: { }, slots: { default: "Foobar" } });
    expect(screen.getByText("Foobar")).toBeInTheDocument();
    // - WHEN is initially rendered, THEN the sorting icon is a normal arrow
    expect(screen.getByText("Foobar").firstElementChild).toHaveClass("sort icon", { exact: true });

    await rerender({ shouldSortByThis: true });
    expect(screen.getByText("Foobar")).toBeInTheDocument();
    // - WHEN is rendered with `shouldSortByThis` == true, THEN the sorting icon is still normal arrow
    expect(screen.getByText("Foobar").firstElementChild).toHaveClass("sort icon", { exact: true });

    // - WHEN the `<th>` is clicked
    await user.click(screen.getByText("Foobar"));
    // - THEN the sorting icon is oriented upward
    expect(screen.getByText("Foobar").firstElementChild).toHaveClass("sort icon up", { exact: true });

    // - WHEN the `<th>` is clicked another time
    await user.click(screen.getByText("Foobar"));
    // - THEN the sorting icon is oriented downward
    expect(screen.getByText("Foobar").firstElementChild).toHaveClass("sort icon down", { exact: true });

    // - WHEN `shouldSortByThis` == false
    await rerender({ shouldSortByThis: false });
    expect(screen.getByText("Foobar")).toBeInTheDocument();
    // - THEN the sorting icon returns to normal
    expect(screen.getByText("Foobar").firstElementChild).toHaveClass("sort icon", { exact: true });

    // - AND no matter how many clicks, THEN the sorting icon remains normally oriented
    await user.click(screen.getByText("Foobar"));
    expect(screen.getByText("Foobar").firstElementChild).toHaveClass("sort icon", { exact: true });

    await user.click(screen.getByText("Foobar"));
    expect(screen.getByText("Foobar").firstElementChild).toHaveClass("sort icon", { exact: true });
  });
  it("emits a `change-sort` event", async () => {
    const user = userEvent.setup();
    const changeSortSpy = vi.fn();
    const stubComponent = {
      render() { return h(SortableTableHeader, { "onChangeSort": changeSortSpy }, () => "Foobar"); }
    };
    render(stubComponent);
    expect(screen.getByText("Foobar")).toBeInTheDocument();
    // - WHEN the user clicks the `<th>` element
    await user.click(screen.getByText("Foobar"));
    // - THEN the changeSortSpy is fired
    expect(changeSortSpy).toHaveBeenCalled();

    // - WHEN the user clicks again
    await user.click(screen.getByText("Foobar"));
    // - THEN the changeSortSpy is called again
    expect(changeSortSpy).toHaveBeenCalledTimes(2);
  });
});