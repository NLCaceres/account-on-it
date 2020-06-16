<template>
  <div>
    <basic-header :centered="!small">Let's Login</basic-header>

    <form class="ui form" :class="{'p-xxl-x': !small}" @submit.prevent="Login">
      <sui-input
        required
        model-name="user"
        field-name="email"
        v-model="user.email"
        placeholder="Email Address or User Name"
        :validation-errors="validationErrs.email"
        :validation-transition="validationTransitions.email"
      />

      <sui-input
        required
        model-name="user"
        field-name="password"
        v-model="user.password"
        autocomplete="current-password"
        placeholder="Password for registered email addresses or users"
        :validation-errors="validationErrs.password"
        :validation-transition="validationTransitions.password"
      />

      <sui-login-buttons
        :loggingIn="loggingIn"
        v-model="user.remember"
        @update:view="$emit('update:view')"
      />
    </form>
  </div>
</template>
<script>
import { SIGN_IN } from "../../../Store/ActionTypes";
import { mapActions } from "vuex";
import loginApi from "../../../API/AuthenticationAPI";
export default {
  props: {
    small: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        remember: false //? WILL get generated anyway! so must use null, delete or not send!
      },
      validationErrs: {
        email: [],
        password: []
      },
      validationTransitions: {
        email: this.DEFAULT_VALIDATION_ERR_TRANSITION,
        password: this.DEFAULT_VALIDATION_ERR_TRANSITION
      },
      loggingIn: false
    };
  },
  methods: {
    ...mapActions("authentication", {
      signIn: SIGN_IN
    }),
    async Login() {
      const response = !this.user.remember
        ? await this.signIn({
            email: this.user.email,
            password: this.user.password
          })
        : await this.signIn(this.user);
      if (response.status === 200) {
        this.$emit("closePopup");
        this.user.email = "";
      }
      this.user.password = "";
    }
  }
};
</script>