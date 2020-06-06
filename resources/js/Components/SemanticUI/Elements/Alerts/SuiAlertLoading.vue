<template>
  <div class="ui message" :class="{'hidden':!loading}">
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