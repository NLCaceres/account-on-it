export { }

declare global {
    interface Window {
        $: JQuery;
        jQuery: JQuery;
        Transitions: object,
        CustomEvents: object
    }
    interface Document {
        [index: string]: boolean
    }
}