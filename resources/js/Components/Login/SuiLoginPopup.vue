<template>
  <div id="sui-login-popup" class="ui popup hidden app-dark-accent">
    <sui-forgot-password-form v-if="$store.state.loginPopup.forgotPasswordForm" in-subview />
    <new-user-popup v-else-if="$store.state.loginPopup.newUserForm" in-subview />
    <sui-login-form v-else in-subview />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import SuiForgotPasswordForm from "./SuiForgotPassword/SuiForgotPasswordForm.vue";
import NewUserPopup from "@/Views/Users/NewUserPopup.vue";
import SuiLoginForm from "./SuiLoginForm.vue";

export default defineComponent({
  components: {
    SuiForgotPasswordForm, NewUserPopup, SuiLoginForm
  },
  data() {
    return { };
  },
  methods: {
    // ChangeView() {
    // if (pageToChange === 0) { //* Explicitly check for 0 for ForgotPass Form
    //   this.forgotPasswordView = !this.forgotPasswordView;
    // } else if (pageToChange === 1) { //* New User Form
    //   this.createUserView = !this.createUserView;
    // } else {
    //   this.forgotPasswordView = false;
    //   this.createUserView = false;
    // }
    // }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../sass/variables/colors.scss";
// @import "~/variables/colors.scss";

// ?: Login Popup
.ui.bottom.popup {
  max-width: 400px;
  width: 350px;
  &::before {
    background: $dark-accent;
  }
}

</style>