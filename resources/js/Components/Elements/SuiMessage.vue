<template>
  <transition name="fade">
    <div v-if="ValidMessage" :id class="ui message" v-bind="$attrs">
      <!-- ?: `v-bind=$attrs` + `inheritAttrs: false` moves where fallthrough attributes are applied/placed -->
      <!-- ?: AND since "id" is declared by the component as a prop, it won't be added/overwritten by $attrs -->
      <!-- ?: SINCE it won't be there, ONLY the CSS "class" attribute seems to be there (for now) -->
      <i v-if="closeable" class="close icon" @click="CloseAlert" />

      <div class="header m-sm-b">
        <slot name="title">{{ Title }}</slot>
      </div>

      <slot>{{ Description }}</slot>
    </div>
  </transition>
</template>

<script lang="ts">
let messageCounter = 0; // - CURRENTLY best solution in Vue for unique IDs BUT useID() coming in Vue 3.5
import { defineComponent, type PropType } from "vue";
import type Message from "@/Utility/Models/Message";

export default defineComponent({
  inheritAttrs: false,
  props: {
    message: {
      type: Object as PropType<Message>,
      default: undefined
    },
    // ?: Considered a specific color prop limited to "info", "warning", etc BUT just let the parent handle styling
    // - Probably via 'sass/app_colors' and the colors it lists at the bottom of it
    id: { // - Use this ID as a target for easy opening and closing
      type: String,
      required: false,
      default() {
        return "message-" + messageCounter++; // - Return THEN increment the counter
      }
    },
    closeable: {
      type: Boolean,
      default: true
    },
    onHide: {
      type: Function as PropType<() => void>,
      required: false,
      default: undefined
    },
  },
  computed: {
    Title(): string {
      return this.message?.title ?? "";
    },
    Description(): string {
      return this.message?.description ?? "";
    },
    ValidMessage(): boolean {
      if (this.message) { // - Can't have empty an undefined message obj OR empty string title/description
        return this.message.title.length > 0 || this.message.description.length > 0;
      }
      else { // - OTHERWISE, MUST be sure the title and description slots are filled
        return !!this.$slots.title || !!this.$slots.default; // ?: Use "!!" to force boolean conversion
      }
    }
  },
  methods: {
    CloseAlert() { // - Avoid opening other messages
      if (this.onHide) { this.onHide(); }
      $(`#${this.id}`).fadeOut();
    }
  }
});
</script>

<style lang="scss" scoped>
// - For some weird reason adding fade HERE is the ONLY way it works properly
// - Despite working everywhere else without the class in the file itself
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>