import SuiMessage from "@/Components/Elements/SuiMessage.vue";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";

describe("renders a Semantic UI styled Message Component", () => {
  it("relies on slots and a `message` prop to determine if the main `message` container should render", async () => {
    const { container, rerender, unmount } = render(SuiMessage);
    // - WHEN no slots or `message` filled, THEN the component is an empty `<transition>` (so nothing)
    expect(container.firstElementChild).toBeEmptyDOMElement();

    await rerender({ message: { title: "Foobar" } });
    // - WHEN `message` filled, THEN `<transition>` is filled (with the title and "close" icon in this case)
    expect(container.firstElementChild).not.toBeEmptyDOMElement();
    expect(container.firstElementChild).toContainElement(screen.getByText("Foobar").parentElement);
    expect(container.firstElementChild)
      .toContainElement(screen.getByText("Foobar").previousElementSibling as HTMLElement);

    unmount();

    const { container: nextContainer, unmount: nextUnmount } = render(SuiMessage, { slots: { title: "Foobar" } });
    // - WHEN the title slot is filled, THEN `<transition>` is filled with title and "close" icon
    expect(nextContainer.firstElementChild).not.toBeEmptyDOMElement();
    expect(nextContainer.firstElementChild).toContainElement(screen.getByText("Foobar").parentElement);
    expect(nextContainer.firstElementChild)
      .toContainElement(screen.getByText("Foobar").previousElementSibling as HTMLElement);

    nextUnmount();

    const { container: finalContainer } = render(SuiMessage, { slots: { default: "Barfoo" } });
    // - WHEN the default slot is filled, THEN the `<transition>` contains the `message` container (and "close" icon)
    expect(finalContainer.firstElementChild).not.toBeEmptyDOMElement();
    expect(finalContainer.firstElementChild).toContainElement(screen.getByText("Barfoo"));
  });
  it("passes its attributes through the `<transition>` component to the `message` container", () => {
    const { unmount } = render(SuiMessage, { slots: { default: "Barfoo" } });
    // - WHEN no attributes are passed in, THEN the only attribute is the following CSS classes
    expect(screen.getByText("Barfoo")).toHaveClass("ui message");

    unmount();

    render(SuiMessage, { slots: { default: "Barfoo" }, attrs: { class: "foo BAR", id: "message-container" } });
    // - WHEN any attributes attached to the component, THEN they are passed to the "message" container
    expect(screen.getByText("Barfoo")).toHaveClass("ui message foo BAR", { exact: true });
    expect(screen.getByText("Barfoo")).toHaveAttribute("id", "message-container");
    // - They are NOT passed to the `<transition>` component at the root
    expect(screen.getByText("Barfoo").parentElement).toHaveAttribute("name", "fade");
    expect(screen.getByText("Barfoo").parentElement).not.toHaveAttribute("id", "message-container");
    expect(screen.getByText("Barfoo").parentElement).not.toHaveClass("foo BAR");
  });
  it("uses a `message` prop to render a title and description", async () => {
    const { container, rerender } = render(SuiMessage, { props: { message: undefined } });
    // - WHEN `message` = undefined, THEN only the `<transition>` is rendered
    expect(container.firstElementChild!.firstElementChild).toBeNull();

    await rerender({ message: { title: "Foobar", description: "Barfoo" }});
    // - WHEN `message` is filled, THEN a `header` div renders the title
    expect(screen.getByText("Foobar")).toBeInTheDocument();
    expect(screen.getByText("Foobar")).toHaveClass("header");
    // - AND the main `message` div renders the description
    expect(screen.getByText("Barfoo")).toBeInTheDocument();
    expect(screen.getByText("Barfoo")).toHaveClass("ui message");

    await rerender({ message: { title: "", description: "Barfoo" } });
    // - WHEN ONLY the description is filled, THEN the description renders in the main `message` div still
    expect(screen.getByText("Barfoo")).toBeInTheDocument();
    // - AND the title header is empty
    expect(screen.getByText("Barfoo").lastElementChild).toHaveTextContent("");

    await rerender({ message: { title: "Foobar", description: "" } });
    // - WHEN ONLY the title is filled, THEN the title renders in its header div alone
    expect(screen.getByText("Foobar")).toBeInTheDocument();
    // - AND the main `message` div ONLY contains the "close" icon + the title div
    expect(screen.getByText("Foobar").parentElement!.children).toHaveLength(2);
  });
  it("has an optional `id` prop that defaults to a factory func provided unique ID", async () => {
    const user = userEvent.setup();
    const { rerender } = render(SuiMessage, { props: { message: { title: "", description: "Barfoo" } } });
    // - WHEN no `id` is set, THEN the factory func provides an "id" in a "message-#" format
    expect(screen.getByText("Barfoo")).toHaveAttribute("id", expect.stringMatching(/message-[1-9]/));
    const id = screen.getByText("Barfoo").id; // - Save for later to check it gets reused
    // - AND the close icon uses this ID under the hood to fade out the component
    expect(screen.getByText("Barfoo").firstElementChild).toHaveClass("close icon");
    // - Sanity check that no undefined or null jQuery ID issues
    await user.click(screen.getByText("Barfoo").firstElementChild!);

    await rerender({ id: "barfoo-message" });
    // - WHEN `id` is set, THEN it overrides the factory-created "id"
    expect(screen.getByText("Barfoo")).toHaveAttribute("id", "barfoo-message");
    // - AND the close icon uses this ID under the hood to fade out the component
    expect(screen.getByText("Barfoo").firstElementChild).toHaveClass("close icon");
    await user.click(screen.getByText("Barfoo").firstElementChild!);

    await rerender({ id: undefined });
    // - IF the set `id` were to be removed, THEN the factory-created "id" replaces it
    expect(screen.getByText("Barfoo")).toHaveAttribute("id", expect.stringMatching(/message-[1-9]/));
    // - AND it's the same id as earlier
    const sameID = screen.getByText("Barfoo").id;
    expect(id).toBe(sameID);
    // - AND the close icon uses this ID under the hood to fade out the component
    expect(screen.getByText("Barfoo").firstElementChild).toHaveClass("close icon");
    await user.click(screen.getByText("Barfoo").firstElementChild!);
  });
  it("uses a `close` prop to render a 'close' icon", async () => {
    const { rerender } = render(SuiMessage, { props: { message: { title: "Foobar", description: "" } } });
    // - WHEN no `closeable` prop defined, THEN it defaults to true, rendering the "close" icon
    expect(screen.getByText("Foobar").previousElementSibling).toHaveClass("close icon");

    // - WHEN `closeable` = false
    await rerender({ closeable: false });
    // - THEN no "close" icon is rendered
    expect(screen.getByText("Foobar").previousElementSibling).toBeNull();

    // - WHEN `closeable` is explicitly true
    await rerender({ closeable: true });
    // - THEN the "close" icon is rendered
    expect(screen.getByText("Foobar").previousElementSibling).toHaveClass("close icon");
  });
  it("runs a close function and an `onHide` callback prop together", async () => {
    const user = userEvent.setup();
    const onHide = vi.fn();
    const { rerender } = render(SuiMessage, { props: { message: { title: "Foobar", description: "" }, onHide } });
    const closeIcon = screen.getByText("Foobar").previousElementSibling!;
    expect(closeIcon).toHaveClass("close icon");
    await user.click(closeIcon);
    expect(onHide).toHaveBeenCalledOnce();

    await rerender({ onHide: undefined });
    await user.click(closeIcon);
    expect(onHide).toHaveBeenCalledOnce();
  });
});