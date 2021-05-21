<template>
  <div>
    <basic-header>Create Account</basic-header>

    <user-form new-user :class="{'m-xs-b p-xs-b': inSubview}" :inSubview="Small" parentSubmitted />

    <sui-login-checkboxes class="p-md-x m-md-b" :inSubview="inSubview" />
    <sui-popup-submit class="p-sm-x" @update:view="ChangeView" recaptcha-action-name="newUserPopup" :inSubview="Small"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserForm from './FormUser.vue';
import SuiLoginSubmit from '../../Components/Login/SuiLoginSubmit.vue';

import { CHANGE_POPUP_VIEW } from '../../Store/ActionTypes';
import { LOGIN_POPUP_MODULE, GO_LOGIN_FORM } from '../../Store/modules/LoginPopupState';
import { mapGetters } from 'vuex';
import { APP_MODULE } from '../../Store/modules/AppState';
import { MOBILE_WIDTH } from '../../Store/GetterTypes';

export default Vue.extend({
  components: {
    UserForm, SuiLoginSubmit
  },
  props: {
    inSubview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPass: false,
      user: {
        remember: false,
      }
    }
  },
  computed: {
    ...mapGetters(APP_MODULE, { mobileView: MOBILE_WIDTH}),
    Small(): boolean { //* Criteria here is whether it's a mobile view or a popup view in a desktop
      if (!this.mobileView && this.$route.path === '/signup') {
        return false; //* Desktop View at '$HOME/signup'
      } else if (this.mobileView) {
        return true; //* Mobile view
      }
      return this.inSubview; //* Desktop view not at '$HOME/signup'
    },
  },
  methods: {
    ChangeView(): void {
      this.$store.dispatch(`${LOGIN_POPUP_MODULE}/${CHANGE_POPUP_VIEW}`, GO_LOGIN_FORM);
    }
  }
})
</script>