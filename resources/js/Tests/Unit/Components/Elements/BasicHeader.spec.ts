import BasicHeader from "@/Components/Elements/Headers/BasicHeader.vue";
import { render, screen } from "@testing-library/vue";


describe("Semantic UI styled header with underline", () => {
  it("center aligns itself in its root container via prop", async () => {
    const { rerender } = render(BasicHeader, { slots: { default: "Foo" }});
    // - WHEN the component intially renders
    expect(screen.getByRole("heading", { level: 1, name: "Foo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Foo" }).nextElementSibling).toHaveClass("ui divider");
    // - THEN the header should only have "m-0 ui header" as its CSS classes
    expect(screen.getByRole("heading", { level: 1, name: "Foo" })).toHaveClass("m-0 ui header", { exact: true });

    // - WHEN the component sets the `centered` prop to true
    await rerender({ centered: true });
    // - THEN header should add "center aligned" CSS classes
    expect(screen.getByRole("heading", { level: 1, name: "Foo" }))
      .toHaveClass("m-0 ui header center aligned", { exact: true });
  });
});