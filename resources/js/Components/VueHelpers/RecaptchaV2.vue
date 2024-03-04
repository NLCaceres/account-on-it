<template>
  <div id="recaptcha-view"></div>
</template>
<script>

export default {
  methods: {
    SetupRecaptcha() {
      setTimeout(() => {
        grecaptcha.render("recaptcha-view", {
          sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
          callback: token => {
            this.$emit("recaptcha", true);
          },
          "expired-callback": () => {
            this.$emit("recaptcha", false);
          }
        });
      }, 500);
    }
  },
  mounted() {
    this.SetupRecaptcha();
  }
};
</script>