<template>
  <div class="field m-sm-x flexed-spaced-around">
    <button type="button" @click="ChangeView"
      class="ui inverted button app-blue button-pair m-md-r" >
        Back
    </button>
    <button type="button" class="ui inverted button app-green button-pair"
      :class="{ loading: !ready, disabled: disabled }" >
        Submit
    </button>
  </div>
</template>
//! MAX WIDTH FOR BUTTONS!
<script lang="ts">
import { defineComponent } from "vue";
import loginAPI from "../../API/AuthenticationAPI";

export default defineComponent({
  props: {
    Ready: Boolean,
    Disabled: Boolean,
    recaptchaActionName: String,
    inSubview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ready: false,
      disabled: false
    }
  },
  mounted() {
    this.HandleRecaptcha();
  },
  methods: {
    async HandleRecaptcha() {
      const recaptchaScore = await loginAPI.recaptchaVerify(this.recaptchaActionName);

      if (recaptchaScore > 0.7) {
        this.ready = true;
        this.disabled = false;
      } 
    },
    ChangeView(): void {
      if (this.inSubview) {
        this.$emit(this.CustomEvents.UPDATE_VIEW);
      } else {
        this.$router.back();
      }
    }
  }
});
</script>