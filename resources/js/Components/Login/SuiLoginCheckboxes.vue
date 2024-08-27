<template>
  <div class="flexed">
    <div class="ui checkbox flexed-auto" :class="{ 'm-md-r checkbox-font-size': !inSubview }">
      <input type="checkbox" name="remember" :checked="value"
             @change="$emit('input', ($event.target as HTMLInputElement).checked)">
      <label class="app-white-text"> Remember Me </label>
    </div>
    <div class="ui checkbox flexed-auto" :class="{ 'm-md-r checkbox-font-size': !inSubview }">
      <input type="checkbox" name="show_pass" :checked="value"
             @change="$emit('update:showPass', ($event.target as HTMLInputElement).checked)">
      <label class="app-white-text"> Show Password </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    inSubview: {
      type: Boolean, default: false,
    },
    value: Boolean
  },
  emits: ["input", "update:showPass"]
});
</script>

<style lang="scss" scoped>
.checkbox-font-size {
  font-size: 1.2em;
}
.flexed-50 {
  flex: 1 1 50%;
}
</style>