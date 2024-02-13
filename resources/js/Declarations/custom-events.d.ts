export { }

import { CustomEventsConstants } from "../Utility/Constants/CustomEvents";

declare module 'vue' {
  interface ComponentCustomProperties {
    CustomEvents: CustomEventsConstants
  }
}