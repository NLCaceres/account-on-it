<template>
  <div class="ui segment app-dark-accent-dark" :class="{'container p-0-b': !mobile, 'p-sm-b': mobile }">
    <!-- //* Allow mobile users to use their own back button whether android or iOS bottom bar -->
    <basic-header v-if="mobile">Create Account</basic-header>
    <header-back-button v-else breadcrumb>Create Account</header-back-button>

    <user-form new-user :class="{'m-xs-b': mobile}"/>

    <!-- <sui-popup-submit v-if="mobile" recaptcha-action-name="newUserNormal" @update:view="$emit(CustomEvents.UPDATE_VIEW)" /> -->

  </div>
</template>
<script lang='ts'>
import Vue from "vue";
import { mapGetters } from "vuex";
import { MOBILE_WIDTH } from "../../Store/GetterTypes";
import { APP_MODULE } from "../../Store/modules/AppState";
import UserForm from "./FormUser.vue";

export default Vue.extend({
  //! Local Components
  components: {
    UserForm
  },
  //! Computed
  computed: {
    ...mapGetters(APP_MODULE, { mobile: MOBILE_WIDTH })
  },
  //! Data
  data() {
    return {

    }
  },
  //! Hooks  

  //! Methods
  methods: {
    GoBack() {
      if (this.mobile) {
        this.$emit(this.CustomEvents.CLOSE_POPUP);
        return;
      }
    }
  }
});
</script>