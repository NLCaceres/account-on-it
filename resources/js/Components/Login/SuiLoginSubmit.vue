<template>
  <div class="field flexed-column">
    <!-- - Pass up the checked/unchecked values to parent to handle -->
    <sui-login-checkboxes class="m-md-b" :in-subview @input="$emit('input', $event)"
                          @update:show-pass="$emit('update:showPass', $event)" />

    <button type="submit" class="ui inverted button app-green flexed-auto"
            :disabled="loggingIn" @click="$emit('submit')">
      <slot>Login?</slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    inSubview: {
      type: Boolean,
      default: false
    },
    loggingIn: Boolean,
    value: Boolean
  },
  emits: ["input", "submit", "update:showPass"]
});
</script>