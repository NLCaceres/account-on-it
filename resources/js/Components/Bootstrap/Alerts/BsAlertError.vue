<template>
  <div class="alert alert-danger" role="alert" v-if="error">
    <slot></slot>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    error: String
  },
  data() {
    return {};
  }
};
</script>