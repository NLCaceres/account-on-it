<template>
  <div>
    <basic-header>Password Reset</basic-header>
    <div class="ui form">
      <sui-input
        model-name="user"
        field-name="email"
        v-model="user.email"
        placeholder="Email Address or User Name"
        :validation-errors="validationErrs.email"
        :validation-transition="validationTransitions.email"
      >Email Address or Username</sui-input>
      <div class="field m-lg-t m-sm-x flexed-spaced-around">
        <button
          class="ui inverted button app-blue button-pair m-md-r"
          @click="$emit('update:view')"
        >Back</button>
        <button
          class="ui inverted button app-green button-pair"
          :class="{ 'loading': !forgotPasswordReady, 'disabled': forgotPasswordDisabled }"
        >Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
import loginAPI from "../../../API/authentication";
export default {
  data() {
    return {
      forgotPasswordReady: false,
      forgotPasswordDisabled: true,
      user: {
        email: ""
      },
      validationErrs: {
        email: []
      },
      validationTransitions: {
        email: this.DEFAULT_VALIDATION_ERR_TRANSITION
      }
    };
  },
  mounted() {
    this.HandleRecaptcha();
  },
  methods: {
    async HandleRecaptcha(actionName = "forgotPassword") {
      const recaptchaScore = await loginAPI.recaptchaVerify(actionName);
      if (recaptchaScore > 0.7) {
        this.forgotPasswordReady = true;
        this.forgotPasswordDisabled = false;
      }
    }
  }
};
</script>