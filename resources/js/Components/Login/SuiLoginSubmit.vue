<template>
  <div class="field flexed-column">

      <!-- //* Pass up the values to parent to handle -->
      <sui-login-checkboxes class="m-md-b" :inSubview="inSubview"
        @input="$emit('input', $event)" @update:showPass="$emit(CustomEvents.SHOW_PASS, $event)" />

      <button type="submit" class="ui inverted button app-green flexed-auto" 
        @click="$emit('submit')" :disabled="loggingIn">
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
  }
})
</script>