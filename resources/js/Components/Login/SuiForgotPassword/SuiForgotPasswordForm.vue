<template>
  <div>
    <basic-header :centered="!inSubview">Password Reset</basic-header>
    <div class="ui form">
      <sui-input
        model-name="user"
        field-name="email"
        v-model="user.email"
        placeholder="Email Address or User Name"
        :validation-errors="validationErrs.email"
        class="m-lg-b">
          Email Address or Username
      </sui-input>
      <sui-popup-submit
        recaptcha-action-name="forgotPassword"
        @update:view="ChangeView"
        :inSubview="Small"
        :class="{'m-md-b': !inSubview}" />
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { mapGetters } from 'vuex';
// import loginAPI from "../../../API/AuthenticationAPI";
import { CHANGE_POPUP_VIEW } from '../../../Store/ActionTypes';
import { MOBILE_WIDTH } from '../../../Store/GetterTypes';
import { APP_MODULE } from '../../../Store/modules/AppState';
import { LOGIN_POPUP_MODULE, GO_FORGOT_PASS_FORM } from '../../../Store/modules/LoginPopupState';
import SuiPopupSubmit from '../../Forms/SuiPopupSubmit.vue';

export default Vue.extend({
  //! Component Import
  components: {
    SuiPopupSubmit, 
  },
  props: {
    inSubview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(APP_MODULE, { mobileView: MOBILE_WIDTH }),
    //? Typescript has a weird time understanding computed properties UNLESS you annotate them! So make sure you do!
    Small(): boolean { //* Criteria here is whether it's a mobile view or a popup view in a desktop
      if (!this.mobileView && this.$route.path === '/forgot-password') {
        return false; //* Desktop View at '$HOME/forgot-password'
      } else if (this.mobileView) {
        return true; //* Mobile view
      }
      return this.inSubview; //* Desktop View not at '$HOME/forgot-password'
    }
  },
  data() {
    return {
      user: {
        email: "",
      },
      validationErrs: {
        email: [],
      },
    };
  },
  methods: {
    ChangeView() {
      this.$store.dispatch(`${LOGIN_POPUP_MODULE}/${CHANGE_POPUP_VIEW}`, GO_FORGOT_PASS_FORM)
    }
  },
});
</script>