<template>
  <div :id="messageID" class="ui message m-sm-y" :class="{'hidden': !SaveInProgress}">
    <i class="close icon" @click="CloseAlert" />
    <div class="header">{{SaveMessage}}</div>
  </div>
</template>
<script>
let idVal = 0
export default {
  props: {
    saving: Boolean,
    saved: Boolean,
    errorMsg: String,
    messageID: {
      type: String, default: function() {
        return "message" + idVal++;
      }
    }
  },
  computed: {
    SaveInProgress() {
      console.log(this.$store.state.app.saving);
      return this.$store.state.app.saving;
    },
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
      return "Sorry! Error on our end! Carry on!"
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