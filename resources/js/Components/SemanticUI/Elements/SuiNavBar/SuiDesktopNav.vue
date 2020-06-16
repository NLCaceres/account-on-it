<template>
  <div class="computer only row">
    <router-link
      id="desktop-brand"
      class="header item app-dark-accent border-light"
      :to="{ name: 'Home'}"
      exact
    >
      <slot></slot>
    </router-link>

    <slot name="links"></slot>

    <div class="right menu">
      <!--//? Menu   -->
      <sui-login-dropdown v-if="!Authenticated" />
      <a v-else id="logout" class="ui item border-x-white app-red" @click="Logout">Log Out?</a>
    </div>
  </div>
</template>

<script>
import { AUTH_MODULE, APP_MODULE } from "../../../../Store"; //? Auto grabs file named index.js in this dir
import { SIGN_OUT } from "../../../../Store/ActionTypes";

export default {
  //! Lifecycle Hooks
  mounted() {},
  //! Data
  data() {
    return {};
  },
  //! Methods
  methods: {
    async Logout() {
      const response = await this.$store.dispatch(`${AUTH_MODULE}/${SIGN_OUT}`);
      console.log(response);
    }
  },
  computed: {
    Authenticated() {
      return this.$store.state.authentication.authenticated;
    }
  }
};
</script>

<style lang="scss" scoped>
//! Small Desktop
@media screen and (min-width: 933px) and (max-width: 1127px) {
  #desktop-brand {
    margin-right: 4em;
  }
}
//! Large Desktop
@media screen and (min-width: 1127px) {
  #desktop-brand {
    margin-right: 8em;
  }
}
</style>