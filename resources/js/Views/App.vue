<template>
  <div>
    <sui-nav>
      Account On It!
        <template #links v-if="CHECK_AUTHENTICATION">
            <admin-nav-link flexed v-if="IS_ADMIN" />
            <landlord-nav-link flexed v-if="IS_LANDLORD" />
            <tenant-nav-link flexed v-if="IS_TENANT" />
        </template>
        <template #mobile-links v-if="CHECK_AUTHENTICATION">
            <admin-nav-link v-if="IS_ADMIN" />
            <landlord-nav-link v-if="IS_LANDLORD" />
            <tenant-nav-link v-if="IS_TENANT" />
        </template>
    </sui-nav>

    <div id="main-struct">
      <transition :name="transitionName" mode="out-in">
        <!--//* Specifically for the homepage or components with full width -->
        <router-view v-if="$route.path === '/'" name="wide" key="wide-router"></router-view>
        <div v-else class="ui container m-sm-t" key='container'>
          <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </transition>

      <!-- //* Use fixed-h-center-above to float above some buttons and recaptcha icon -->
      <div class='floating fixed-h-center-above'>
        <sui-message :message="$store.state.app.appMsg" class='app-brand-blue-dark app-white-text'/>
          
        <sui-message v-if="CookieAlertRequired" messageID="cookie-message" class='app-brand-blue-dark app-white-text'>
          <template #header>Accept All Cookies?</template>

          <p> By accepting below, you agree to allow us to use cookies that help us analyze and improve your web experience.
          To learn more, please read the privacy policy and the terms of use pages. Thank you! </p>

          <button type="button" class="ui button m-sm-t" @click="UpdateCookie">Accept Cookies?</button>
        </sui-message>
      </div>
      
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import SuiMessage from "../Components/Elements/SuiMessage.vue";
import AdminNavLinks from "./NavLinks/AdminNavLinks.vue";
import LandlordNavLinks from "./NavLinks/LandlordNavLinks.vue";
import TenantNavLinks from "./NavLinks/TenantNavLinks.vue";

import GetCookie, { AddCookie } from "../Utility/Functions/cookies";

import { mapActions, mapGetters } from 'vuex';
import { AUTHENTICATION_CHECK, RESIZE_WINDOW } from "../Store/ActionTypes";
import { APP_MODULE } from '../Store/modules/AppState';
import { AUTH_MODULE } from "../Store/modules/AuthenticationState";
import { CHECK_AUTHENTICATION, GET_NEW_MESSAGE, IS_ADMIN, IS_LANDLORD, IS_TENANT } from '../Store/GetterTypes';

import { Route } from 'vue-router';

export default Vue.extend({
  //! Local Components: 
  components: {
    AdminNavLinks, LandlordNavLinks, TenantNavLinks, SuiMessage
  },
  data() {
    return {
      transitionName: this.Transitions.DEFAULT_COMPONENT_TRANSITION,
    };
  },
  //? Declaring constants outside of component export can risk an unused var crash
  //? One place to set constants - BeforeCreate, Created or Mounted hooks.
  //? If needed ASAP (e.g. data()), use BeforeCreated or if there's a lot use ES6 imports
  created() { //? Methods only available here. Not init'd in BeforeCreated
    this.$store.dispatch(`${AUTH_MODULE}/${AUTHENTICATION_CHECK}`); //* Check if Logged in
    
    this.HandleWindowDimensions(); 

    this.$router.beforeEach((to, from, next) => { //? Global version of Router checking for updates
      this.UpdateTitle(to, from); //* Update Page title on url change
      this.UpdateTransitionEffect(to, from); //* Page transitions vary depending on intended effect 
      next(); //? Can't forget next or page will not update. Can lead to potentially difficult debugs.
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.UpdateWindowDimensions); //* Stop Window Dimension updates
  },
  computed: {
    //? This mapGetters works well because the underlying strings match the constant names
    //? Seems Vue inserts the import var as regular strings even if VSCode still thinks they're import vars
    ...mapGetters(AUTH_MODULE,[CHECK_AUTHENTICATION, IS_ADMIN, IS_LANDLORD, IS_TENANT]),
    ...mapGetters(APP_MODULE, { getNewMessage: GET_NEW_MESSAGE }),
    CookieAlertRequired(): boolean {
      return !(GetCookie('cookie_preference') === 'true') //* If user recently previously okay'd cookies, then no message needed
    } 
  },
  methods: {
    ...mapActions(APP_MODULE, { UpdateWindowDimensions: RESIZE_WINDOW }),
    HandleWindowDimensions(): void {
      this.UpdateWindowDimensions(); //* Init Window dimensions
      window.addEventListener("resize", this.UpdateWindowDimensions);
    },
    UpdateTransitionEffect(to: Route, from: Route): void {
      //* All routes have a meta key for transitionNames which will trigger various transitions
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      //* W/ > 6 transitions, switch would probably be best
      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length; //? Split at delimiter into array (/landlords -> [white-space,landlords])
        const fromDepth = from.path.split("/").length; //? '/' home route still makes 2 indices, both are just whitespace!
        transitionName = toDepth < fromDepth || to.path === "/" ? "slide-right" : "slide-left";
      }

      //* Select a transition from VueRoutes or our default 'fade' transition
      this.transitionName = transitionName || this.Transitions.DEFAULT_COMPONENT_TRANSITION;
    },
    UpdateTitle(to: Route, from: Route): void {
      //* Handles Window Title based on VueRouter meta title val
      const nearestWithTitle = to.matched.slice() //? Returns arr copy
        .reverse() //? Why reverse? We get deepest part of url first! Setting up find to quickly grab
        .find(r => r.meta && r.meta.title); //* Match end of url 'deeply/nested/url'. Grab's url section's title
      document.title = nearestWithTitle ? nearestWithTitle.meta.title : process.env.MIX_APP_NAME;
    },
    UpdateCookie() {
      $('#cookie-message').fadeOut();
      AddCookie(31, 'cookie_preference', 'true');
    }
  }
});
</script>

<style lang="scss">
//! App wide styling
@import "../../sass/transitions.scss";
@import "../../sass/inverted_buttons.scss";
@import "../../sass/app.scss";

//* Goal here is to expand Semantic UI's container system
//? SuI uses margin auto + a defined width to center the container 
//? This can lead to massive gutters on bigger screens
@media screen and (min-width: 1400px) and (max-width: 1699px) {
  div.ui.container { 
    width: 1355px !important; //* 22.5px gutters each side looks nice on big screens!
  }
}
@media screen and (min-width: 1700px) {
  div.ui.container { 
    width: 1600px !important; 
  }
}
</style>

<style lang="scss" scoped>
.fixed-h-center-above { //* Tack on specific stylings to this class for message
  bottom: 40px;
  width: 45% !important;

  @media screen and (max-width: 1400px) and (min-width: 1025px) {
    bottom: 40px;
    width: 60% !important;
  }

  @media screen and (max-width: 1024px) and (min-width: 576px) {
    bottom: 15px;
    width: 75% !important;
  }

  @media screen and (max-width: 575px) {
    bottom: 0;
    width: 100% !important;
  }
}
</style>
