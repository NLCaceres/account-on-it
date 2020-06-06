<template>
  <div :class="{'p-lg-x': centered}">
    <h1 class="no-margin">
      <slot></slot>
    </h1>
    <div class="ui divider m-xs-t m-md-b" />
  </div>
</template>

<script>
export default {
  props: {
    centered: {
      type: Boolean,
      default: false
    }
  }
};
</script>

