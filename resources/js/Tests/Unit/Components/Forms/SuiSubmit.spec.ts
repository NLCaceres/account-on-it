import SuiSubmit from "@/Components/Forms/SuiSubmit.vue";
import { render, screen } from "@testing-library/vue";


describe("Semantic UI Save and Delete Buttons combined", () => {
  it("disabling both buttons when `saving` == true", async () => {
    const { rerender } = render(SuiSubmit);
    // - WHEN the component renders, THEN both buttons are enabled by default
    expect(screen.getByText(/save/i)).toBeInTheDocument();
    expect(screen.getByText(/save/i)).not.toBeDisabled();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).not.toBeDisabled();

    await rerender({ saving: true });
    // - WHEN `saving` == true, THEN disable BOTH buttons
    expect(screen.getByText(/save/i)).toBeInTheDocument();
    expect(screen.getByText(/save/i)).toBeDisabled();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeDisabled();
  });
  it("removing the Delete button if the entity is new and not yet saved to the database", async () => {
    const { rerender } = render(SuiSubmit);
    // - WHEN the component renders, THEN the delete button is included
    expect(screen.getByText(/delete/i)).toBeInTheDocument();

    await rerender({ newEntity: true });
    // - WHEN `newEntity` == true, THEN the delete button is NOT needed/included
    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument(); // - Since creating new entity
  });
});