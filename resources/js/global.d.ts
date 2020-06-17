export { }

declare global {
    interface Window {
        $: JQuery;
        jQuery: JQuery;
    }
}