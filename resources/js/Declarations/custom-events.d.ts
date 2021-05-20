import Vue from "vue";

import { CustomEventsConstants } from "../Utility/Constants/CustomEvents";

declare module 'vue/types/vue' {
    interface Vue {
        CustomEvents: CustomEventsConstants
    }
    //? If a global prop/method is wanted instead of above instance prop
    // interface VueConstructor {
    //   GlobalProp: string
    // }
}