<template>
  <div class="row" id="mobile-nav">
    <router-link class="header item app-dark-accent border-light p-xs-y" :to="{ name: 'Home'}">
      <slot></slot>
    </router-link>

    <div class="right menu">
      <router-link v-if="!Authenticated" id="login" :to="{ name: 'Login' }" class="ui item border-x-white app-green">Log In?</router-link>
      <div v-else id="mobile-nav-links" class="ui fluid dropdown item p-xs-y">
        <a>
          <button type="button" class="ui inverted basic icon button">
            <i class="bars icon" />
          </button>
        </a>
        <div class="vertical menu app-blue" :style="{ width: NavbarWidth }">
          <slot name="mobile-links" :style="{ width: NavbarWidth }"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    NavbarWidth(): string {
      return `${this.$store.state.app.window.width}px`;
    },
    Authenticated(): boolean {
      return this.$store.state.authentication.authenticated;
    }
  },
  updated() {
    if (this.$store.state.authentication.authenticated) {
        console.log("Authenticated");
        $('#mobile-nav-links').dropdown();
      }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../../sass/variables/colors.scss";
// @import "~/variables/colors.scss";

//! Mobile
.tablet.mobile.only.row {
  margin-left: 0;
  margin-right: 0;
}
//? Handle Hamburger button in Mobile
.ui.basic.button:hover {
  background: $dark-accent !important;
}
.ui.basic.inverted.button:active {
  background-color: $dark-accent !important;
}

.ui.accordion.vertical.menu {
  display: none;
  background-color: $dark-accent;

  a.item {
    padding-left: 3em !important;
    border-bottom: 1px solid #fff;
  }
}
#top-link {
  border-top: 1px solid #fff;
}
</style>