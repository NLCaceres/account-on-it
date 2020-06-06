<template>
  <div class="alert alert-warning" role="alert" v-if="loading">
    Loading!
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean
  }
};
</script>