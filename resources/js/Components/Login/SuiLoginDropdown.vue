<template>
  <!--//? By placing popup in the right menu in SuiDesktopNav -->
  <!--//? Can set anchor here (#login) as trigger to open it -->
  <div>
    <a id="login" class="icon item border-x-light">
      <span class="text">Login?</span>
      <i class="dropdown icon m-sm-l" />
    </a>
    <sui-login-popup v-if="!doubleView" />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { CHANGE_POPUP_VIEW } from '../../Store/ActionTypes';
import { LOGIN_POPUP_MODULE, GO_LOGIN_FORM } from '../../Store/modules/LoginPopupState';
import SuiLoginPopup from './SuiLoginPopup.vue';

export default Vue.extend({
  //! Component Imports
  components: {
    SuiLoginPopup
  },
  //! Lifecycle Methods
  mounted() {
    this.SetupPopup();
  },
  //! Data
  data() {
    return {
      //* Checks if '/login', '/forgot-password' or '/sign-up' so the popup doesn't render
      //* Avoids a double form id issue.
      doubleView: false 
    };
  },
  //! Normal Methods
  methods: {
    SetupPopup(): void {
      //? Popup must be init here since actually setting trigger here! Besides attributes for popup itself
      this.InitPopup();
      //* Destroy Login popup view if on login page
      this.$router.afterEach((to, from) => {
        const doublePathCheck = to.fullPath === '/login' || to.fullPath === '/sign-up' || to.fullPath === '/forgot-password'
        if (doublePathCheck) {
          this.doubleView = true;
          $("#login").popup("destroy");
        }
      });
      //* Reactivate login view if still not logged in
      this.$router.beforeEach((to, from, next) => {
        const doublePathCheck = from.fullPath === '/login' || from.fullPath === '/sign-up' || from.fullPath === '/forgot-password'
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