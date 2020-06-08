<template>
  <div class="ui message" :class="{'hidden':!Loading}">
    <i class="close icon" @click="CloseAlert" />
    <div class="header">
      <slot>Loading!</slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean
  },
  computed: {
    Loading() {
      return this.$store.state.app.loading;
    }
  },
  methods: {
    CloseAlert() {
      $(".message .close").on("click", function() {
        $(this)
          .closest(".message")
          .transition("fade");
      });
    }
  }
};
</script>