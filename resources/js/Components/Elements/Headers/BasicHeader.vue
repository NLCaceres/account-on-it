<template>
  <div>
    <h1 class="m-0 ui header" :class="{'center aligned': centered}">
      <slot></slot>
    </h1>
    <div class="ui divider m-xs-t m-md-b" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  props: {
    centered: {
      type: Boolean,
      default: false
    }
  }
});
</script>

