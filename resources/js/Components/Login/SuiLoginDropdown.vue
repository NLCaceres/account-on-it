<template>
  <div>
    <!-- - Placed in `<sui-desktop-nav>` to let `<a id="login">` open `<sui-login-popup>` -->
    <a id="login" class="icon item border-x-light">
      <span class="text">Login?</span>
      <i class="dropdown icon m-sm-l" />
    </a>
    <sui-login-popup v-if="!doubleView" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { CHANGE_POPUP_VIEW } from "@/Store/ActionTypes";
import { LOGIN_POPUP_MODULE, GO_LOGIN_FORM } from "@/Store/modules/LoginPopupState";
import SuiLoginPopup from "./SuiLoginPopup.vue";

export default defineComponent({
  components: {
    SuiLoginPopup
  },
  data() {
    return { // - Check if on "/login", "/forgot-password", or "/sign-up" to disable login popup window
      doubleView: false
    };
  },
  mounted() {
    this.SetupPopup();
  },
  methods: {
    SetupPopup(): void {
      // ?: Since `<a id="login">` is here, MUST call `InitPopup()` to setup `<sui-login-popup>`
      this.InitPopup();
      // - Destroy Login popup view if on login page
      this.$router.afterEach((to, _from) => {
        const doublePathCheck =
          to.fullPath === "/login" || to.fullPath === "/sign-up" || to.fullPath === "/forgot-password";
        if (doublePathCheck) {
          this.doubleView = true;
          $("#login").popup("destroy");
        }
      });
      // - Reactivate login view if still not logged in
      this.$router.beforeEach((_to, from, next) => {
        const doublePathCheck =
          from.fullPath === "/login" || from.fullPath === "/sign-up" || from.fullPath === "/forgot-password";
        if (doublePathCheck) {
          this.InitPopup();
          this.doubleView = false;
        }
        next();
      });
    },
    InitPopup(): void {
      $("#login").popup({
        inline: true,
        on: "click",
        position: "bottom right",
        offset: -80,
        onHidden: this.ResetPopup
      });
    },
    ResetPopup(): void {
      this.$store.dispatch(`${LOGIN_POPUP_MODULE}/${CHANGE_POPUP_VIEW}`, GO_LOGIN_FORM);
    }
  }
});
</script>