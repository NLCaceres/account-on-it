<template>
  <div class="ui inverted huge menu app-brand-blue sticky-el m-0-b">
    <div class="ui w-100 m-0-x grid" id='full-nav'>
      <sui-desktop-nav v-if="$store.state.app.window.width > 768 && $store.state.app.window.height > 450">
        <!--//* App Name -->
        <slot></slot>
        <!--//* Desktop Navbar links -->
        <template #links>
          <slot name="links"></slot>
        </template>
      </sui-desktop-nav>

      <sui-mobile-nav v-else>
        <!--//* App Name -->
        <slot></slot>
        <!--//* A bit more versatile with a separate set of links to use in the mobile navbar -->
        <template #mobile-links>
          <slot name="mobile-links"></slot>
        </template>
      </sui-mobile-nav>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import SuiDesktopNav from './SuiDesktopNav.vue';
import SuiMobileNav from './SuiMobileNav.vue';

export default Vue.extend({
  components: {
    SuiDesktopNav, SuiMobileNav
  },
  data() {
    return {};
  }
  //? Ordinarily sticky navbar is available in SUI (but it's a pain to work with)
});
</script>

<style lang="scss" scoped>
//! Small Desktop
@media screen and (min-width: 933px) and (max-width: 1127px) {
  .ui.container.grid {
    margin-left: 0 !important;
    margin-right: 1em !important;
    width: 100% !important;
  }
}
//! Large Desktop
@media screen and (min-width: 1127px) {
  .ui.container.grid {
    margin-left: 0 !important;
    margin-right: 3em !important;
    width: 100% !important;
  }
}
//! Mobile
</style>
