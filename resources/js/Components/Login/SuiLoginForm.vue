<template>
  <div>
    <basic-header :centered="!inSubview">Let's Login</basic-header>

    <form class="ui form" :class="{ 'p-xl-x': Desktop && !inSubview, 'p-xs-x': inSubview }" @submit.prevent="Login">
      <sui-input v-model="user.email" required model-name="user" field-name="email"
                 placeholder="Email Address or User Name" :validation-errors="validationErrs.email" />

      <sui-input v-model="user.password" required model-name="user" field-name="password"
                 :show-pass autocomplete="current-password"
                 placeholder="Password for registered email addresses or users"
                 :validation-errors="validationErrs.password" />

      <div :class="{ 'p-sm-b': !inSubview }">
        <sui-login-submit v-model="user.remember" :in-subview="!Desktop" recaptcha-action-name="login"
                          @update:show-pass="showPass = $event" @update:view="ChangeView(undefined)" />
        <sui-login-links :in-subview="!Desktop" @update:view="ChangeView" />
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { CHANGE_POPUP_VIEW, SIGN_IN } from "@/Store/ActionTypes";
import { mapActions } from "vuex";
import { APP_MODULE } from "@/Store/modules/AppState";
import {
  LOGIN_POPUP_MODULE, GO_FORGOT_PASS_FORM, GO_LOGIN_FORM, GO_NEW_USER_FORM
} from "@/Store/modules/LoginPopupState";
import { MOBILE_WIDTH } from "@/Store/GetterTypes";
import SuiLoginSubmit from "./SuiLoginSubmit.vue";
import SuiLoginLinks from "./SuiLoginLinks.vue";

export default defineComponent({
  components: {
    SuiLoginSubmit, SuiLoginLinks
  },
  props: {
    inSubview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        remember: false, // ?: The server WILL generate a `remember` token UNLESS set to null or undefined
      },
      validationErrs: {
        email: [],
        password: [],
      },
      loggingIn: false,
      showPass: false
    };
  },
  computed: {
    Desktop(): boolean { // - Sole purpose - Desktop user at '/login' url
      // - Pass this down to children components that need it (as inSubview prop)
      return !this.$store.getters[`${APP_MODULE}/${MOBILE_WIDTH}`] && this.$route.path === "/login";
    }
  },
  methods: {
    ...mapActions("authentication", {
      signIn: SIGN_IN,
    }),
    async Login() {
      const response = !this.user.remember
        ? await this.signIn({
          email: this.user.email,
          password: this.user.password,
        })
        : await this.signIn(this.user);
      if (response.status === 200) {
        this.$parent?.$emit(this.CustomEvents.CLOSE_POPUP);
        this.user.email = "";
        if (this.$route.path === "/login") this.$router.push("/");
        else this.$router.go(0);
      }
      this.user.password = "";
    },
    ChangeView(nextPage: number | undefined) {
      if (nextPage === 0) {
        this.$store.dispatch(`${LOGIN_POPUP_MODULE}/${CHANGE_POPUP_VIEW}`, GO_FORGOT_PASS_FORM);
      } else if (nextPage === 1) {
        this.$store.dispatch(`${LOGIN_POPUP_MODULE}/${CHANGE_POPUP_VIEW}`, GO_NEW_USER_FORM);
      } else { // - Sent here if null - effectively resetting popup on login submit.
        this.$store.dispatch(`${LOGIN_POPUP_MODULE}/${CHANGE_POPUP_VIEW}`, GO_LOGIN_FORM);
      }
    }
  },
});
</script>