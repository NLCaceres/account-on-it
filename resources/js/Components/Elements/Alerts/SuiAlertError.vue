<template>
  <div class="ui message" :class="{'hidden': !ErrOccurred}">
    <i class="close icon" @click="CloseAlert" />
    <div class="header">
      <slot>An error occurred! Sorry!</slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    error: String
  },
  computed: {
    ErrMsg() {
      return "";
    },
    ErrOccurred() {
      return this.$store.state.app.errMsg.length > 0 ? true : false;
    }
  },
  data() {
    return {};
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