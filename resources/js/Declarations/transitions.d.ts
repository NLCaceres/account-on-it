import Vue from "vue";

import { Transitions as _Transitions } from "../Utility/Constants/Transitions";

declare module 'vue/types/vue' {
    interface Vue {
        Transitions: _Transitions
    }
  }