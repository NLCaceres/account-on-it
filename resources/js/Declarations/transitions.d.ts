export { }

import { Transitions as _Transitions } from "../Utility/Constants/Transitions";

declare module 'vue' {
  interface ComponentCustomProperties {
    Transitions: _Transitions
  }
}