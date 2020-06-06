<template>
  <transition>
    <div
      class="alert fade show"
      :class="{ 'alert-info': saving, 'alert-success': saved, 'alert-danger': error }"
      role="alert"
      v-if="saving || saved || error"
    >
      {{SaveMessage}}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @Click="Dismiss"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </transition>
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
    Dismiss() {
      this.$emit("saved");
    }
  }
};
</script>