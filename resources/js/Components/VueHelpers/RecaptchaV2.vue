<template>
  <div id="recaptcha-view" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["recaptcha"],
  mounted() {
    this.SetupRecaptcha();
  },
  methods: {
    SetupRecaptcha() {
      setTimeout(() => { // ?: For better typing, `DefinitelyTyped` has a `grecaptcha` set of types!
        grecaptcha.render("recaptcha-view", {
          sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
          callback: (_token: string) => {
            this.$emit("recaptcha", true);
          },
          "expired-callback": () => {
            this.$emit("recaptcha", false);
          }
        });
      }, 500);
    }
  }
});
</script>