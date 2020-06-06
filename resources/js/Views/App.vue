<template>
  <div>
    <sui-nav>
      Account On It!
      <template v-slot:links v-if="Authenticated">
        <admin-nav-links flexed v-if="Admin" />
        <landlord-nav-links flexed v-if="Landlord" />
        <tenant-nav-links flexed v-if="Tenant" />
      </template>
      <template v-slot:mobile-links v-if="Authenticated">
        <admin-nav-links v-if="Admin" />
        <landlord-nav-links v-if="Landlord" />
        <tenant-nav-links v-if="Tenant" />
      </template>
    </sui-nav>

    <div id="main-struct">
      <div class="ui container">
        <transition :name="transitionName" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { DEFAULT_COMPONENT_TRANSITION } from "../Utility/Constants/transitions";
import { AUTHENTICATION_CHECK, RESIZE_WINDOW } from "../Store/action_types";
import { AUTH_MODULE, APP_MODULE } from "../Store";
import { CHECK_AUTHENTICATION } from "../Store/modules/authentication";

export default {
  data() {
    return {
      transitionName: DEFAULT_COMPONENT_TRANSITION
    };
  },
  //! Declaring constants outside of component export can risk an unused var crash
  //? One place to set constants - BeforeCreate, Created or Mounted hooks.
  //? If needed ASAP (e.g. data()), use BeforeCreated or if there's a lot use ES6 imports
  created() {
    this.$store.dispatch(`${AUTH_MODULE}/${AUTHENTICATION_CHECK}`);

    window.addEventListener(
      "resize",
      this.$store.dispatch(`${APP_MODULE}/${RESIZE_WINDOW}`)
    );

    this.$router.beforeEach((to, from, next) => {
      //? Global version of Router checking for updates
      this.UpdateTransitionEffect(to, from);
      this.UpdateTitle(to, from);
      next();
    });
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      this.$store.dispatch(`${APP_MODULE}/${RESIZE_WINDOW}`)
    );
  },
  computed: {
    Authenticated() {
      return this.$store.getters[`${AUTH_MODULE}/${CHECK_AUTHENTICATION}`];
    },
    Admin() {
      return this.$store.state.authentication.user.role === 1;
    },
    Landlord() {
      return (
        this.$store.state.authentication.user.role === 0 && //* Normal User
        this.$store.state.authentication.user.account_type === 0 //* Landlord
      );
    },
    Tenant() {
      return (
        this.$store.state.authentication.user.role === 0 && //* Normal User
        this.$store.state.authentication.user.account_type === 1 //* Tenant
      );
    }
  },
  methods: {
    UpdateTransitionEffect(to, from) {
      //* All routes have a meta key for transitionNames which will trigger various transitions
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      //* W/ > 6 transitions, switch would probably be best
      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length; //? Split at delimiter into array (/landlords -> [white-space,landlords])
        const fromDepth = from.path.split("/").length; //? '/' home route still makes 2 indices, both are just whitespace!
        transitionName =
          toDepth < fromDepth || to.path === "/" ? "slide-right" : "slide-left";
      }

      //* Select a transition from VueRoutes or our default 'fade' transition
      this.transitionName = transitionName || DEFAULT_COMPONENT_TRANSITION;
    },
    UpdateTitle(to, from) {
      //* Handles Title based on VueRouter meta title val
      const nearestWithTitle = to.matched
        .slice() //? Returns arr copy
        .reverse() //? Why reverse? We get deepest part of url first! Setting up find to quickly grab
        .find(r => r.meta && r.meta.title); //* Match end of url 'deeply/nested/url'. Grab's url section's title
      document.title = nearestWithTitle
        ? nearestWithTitle.meta.title
        : process.env.MIX_APP_NAME;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
//! App wide styling
@import "../../sass/transitions.scss";
@import "../../sass/inverted_buttons.scss";
@import "../../sass/app.scss";
</style>
