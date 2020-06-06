<template>
  <div class="ui message" :class="{'hidden': !error}">
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