import { App, type Plugin } from 'vue';

export interface Transitions {
  DEFAULT_COMPONENT_TRANSITION: string,
  VALIDATION_INPUT_TRANSITION: string,
  INVALID_TRANSITION: string
}

export const DEFAULT_COMPONENT_TRANSITION = "fade";
export const VALIDATION_INPUT_TRANSITION = "slide-leave-active";
export const INVALID_TRANSITION = "slide-abs-leave-active";

const TransitionsPlugin: Plugin = (app: App, options: any) => {
  app.config.globalProperties.Transitions = {
    DEFAULT_COMPONENT_TRANSITION,
    VALIDATION_INPUT_TRANSITION,
    INVALID_TRANSITION
  };
};
export default TransitionsPlugin;