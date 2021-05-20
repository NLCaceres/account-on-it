import _Vue from 'vue';

export interface Transitions {
  DEFAULT_COMPONENT_TRANSITION: string,
  VALIDATION_INPUT_TRANSITION: string,
  INVALID_ERR_TRANSITION: string
}

export const VALID_INPUT_TRANSITION = "slide-leave-active";
export const INVALID_ERR_TRANSITION = "slide-abs-leave-active";

export default function TransitionsPlugin(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.Transitions = {
    DEFAULT_COMPONENT_TRANSITION: 'fade',
    VALIDATION_INPUT_TRANSITION: VALID_INPUT_TRANSITION,
    INVALID_TRANSITION: INVALID_ERR_TRANSITION,
  }
}