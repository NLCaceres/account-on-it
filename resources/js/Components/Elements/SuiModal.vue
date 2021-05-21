<template>
  <div class="ui modal" :class="{ 'mini' : size === -1 }">
    <div class="header app-light-accent app-white-text">
      <slot></slot>
    </div>
    <div class="actions app-cyan">
      <div class="ui negative button">Delete</div>
      <div class="ui button">Cancel</div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  props: {
    size: Number
  },
  data() {
    return {};
  }
});
</script>
