<template>
  <div class="ui message" :class="{'hidden': !saving}">
    <i class="close icon" @click="CloseAlert" />
    <div class="header">{{SaveMessage}}</div>
  </div>
</template>
<script>
export default {
  props: {
    saving: Boolean,
    saved: Boolean,
    errorMsg: String
  },
  computed: {
    SaveMessage() {
      if (this.saving) {
        return "Saving in Progress";
      }
      if (this.saved) {
        return "Saved Successful!";
      }
      if (this.errorMsg === "The given data was invalid.") {
        return "Sorry! There were a few typos in your info. Make some changes and we'll take care of the rest!";
      }
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