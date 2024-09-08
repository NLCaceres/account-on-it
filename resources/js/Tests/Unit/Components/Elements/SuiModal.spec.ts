import SuiModal from "@/Components/Elements/SuiModal.vue";
import { render, screen } from "@testing-library/vue";


describe("Semantic UI styled Modal", () => {
  it("uses a `size` prop to shrink the modal", async () => {
    const { rerender } = render(SuiModal, { slots: { default: "Foo" } });
    // - WHEN `size` is NOT used, THEN it defaults to 1 and the CSS is simply "ui modal"
    expect(screen.getByText("Foo")).toBeInTheDocument();
    expect(screen.getByText("Foo").parentElement).toHaveClass("ui modal", { exact: true });

    // - WHEN `size` is set specifically to -1
    await rerender({ size: -1 });
    // - THEN a "mini" CSS class is added to shrink the modal
    expect(screen.getByText("Foo").parentElement).toHaveClass("ui modal mini", { exact: true });
  });
});