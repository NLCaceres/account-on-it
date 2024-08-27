<template>
  <div>
    <basic-header :centered="!inSubview">Password Reset</basic-header>
    <div class="ui form">
      <sui-input v-model="user.email" model-name="user" field-name="email"
                 placeholder="Email Address or User Name" class="m-lg-b"
                 :validation-errors="validationErrs.email">
        Email Address or Username
      </sui-input>
      <sui-popup-submit recaptcha-action-name="forgotPassword" :in-subview="Small"
                        :class="{ 'm-md-b': !inSubview }" @update:view="ChangeView" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { CHANGE_POPUP_VIEW } from "@/Store/ActionTypes";
import { MOBILE_WIDTH } from "@/Store/GetterTypes";
import { APP_MODULE } from "@/Store/modules/AppState";
import { LOGIN_POPUP_MODULE, GO_FORGOT_PASS_FORM } from "@/Store/modules/LoginPopupState";
import SuiPopupSubmit from "@/Components/Forms/SuiPopupSubmit.vue";

export default defineComponent({
  components: {
    SuiPopupSubmit,
  },
  props: {
    inSubview: {
      type: Boolean,
      default: false
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
  computed: {
    ...mapGetters(APP_MODULE, { mobileView: MOBILE_WIDTH }),
    // ?: Typescript has a weird time understanding computed properties UNLESS you annotate them!
    Small(): boolean { // - Criteria here is whether it's a mobile view or a popup view in a desktop
      if (!this.mobileView && this.$route.path === "/forgot-password") {
        return false; // - Desktop View at '$HOME/forgot-password'
      } else if (this.mobileView) {
        return true; // - Mobile view
      }
      return this.inSubview; // - Desktop View not at '$HOME/forgot-password'
    }
  },
  methods: {
    ChangeView() {
      this.$store.dispatch(`${LOGIN_POPUP_MODULE}/${CHANGE_POPUP_VIEW}`, GO_FORGOT_PASS_FORM);
    }
  },
});
</script>