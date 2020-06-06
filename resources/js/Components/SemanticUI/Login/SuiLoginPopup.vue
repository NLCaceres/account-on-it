<template>
  <div id="sui-login-popup" class="ui popup hidden app-dark-accent">
    <sui-login-form
      small
      v-if="!forgotPasswordView"
      @update:view="forgotPasswordView = !forgotPasswordView"
      @closePopup="$emit('closePopup')"
    />
    <sui-forgot-password-form
      v-else
      @update:view="forgotPasswordView = !forgotPasswordView"
      @closePopup="$emit('closePopup')"
    />
  </div>
</template>
<script>
import { DEFAULT_VALIDATION_ERR_TRANSITION } from "../../../Utility/Constants/transitions";
export default {
  data() {
    return {
      loggingIn: false,
      forgotPasswordView: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../sass/variables/colors.scss";

//? Login Popup
.ui.bottom.popup {
  max-width: 400px;
  width: 350px;
  &::before {
    background: $dark-accent;
  }
}
</style>