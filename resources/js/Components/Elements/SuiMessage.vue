<template>
  <transition name="fade">
    <div :id="messageID" class="ui message" :class="{ }" v-if="ValidMessage">

      <i v-if="closeable" class="close icon" @click="CloseAlert"></i>

      <div class="header m-sm-b">
        <slot name="header">{{ Header }}</slot>
      </div>

      <slot>{{ Description }}</slot>
    
    </div> 
  </transition>
</template>

<script lang="ts">
let messageCounter = 0;
import { defineComponent, type PropType } from "vue";

import Message from "../../Utility/Models/Message";

export default defineComponent({
  props: {
    closeable: {
      type: Boolean,
      default: true
    },
    HideFunc: {
      type: Boolean,
      default: null
    },
    message: {
      type: Object as PropType<Message>,
      default: null
    },
    //? Considered info, warning, success/positive, and error/negative props, but best to just add it to top level for coloring
    //* Usage: <sui-message class="info"></sui-message> OR <sui-message class="positive"></sui-message>
    //* There's also just the basic color options. See -> 'sass/app_colors' bottom of file
    messageID: { //* Helps easily close and specify closing target
      type: String, default: function() {
        return 'message' + messageCounter++; //* returns `message${messageCounter}` then increments!
      }
    }
  },
  computed: {
    Header() {
      return this.message?.header ?? "";
    },
    Description() {
      return this.message?.description ?? "";
    },
    ValidMessage() {
      if (this.message === null) { //? Check if message prop used 1st, since if so, slots are probably not filled
        return !!this.$slots.header && !!this.$slots.default; //? Use the "!!" to ensure a boolean is returned (not simply a truthy obj like a slot func)
      } else if (this.message !== undefined) {
        return !!this.message.header && this.message.header.length > 0  && !!this.message.description && this.message.description.length > 0;
      }
      return false;
    }
  },
  methods: {
    CloseAlert() { //* Avoid opening other messages
      $(`#${this.messageID}`).fadeOut(); 
    }
  }
})
</script>

<style lang="scss" scoped>
//* For some weird reason adding fade HERE is the ONLY way it works properly
//* Despite working everywhere else without the class in the file itself
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>