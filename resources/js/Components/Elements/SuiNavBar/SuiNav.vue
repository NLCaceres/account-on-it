<template>
  <div class="ui inverted huge menu app-brand-blue sticky-el m-0-b">
    <div id="full-nav" class="ui w-100 m-0-x grid">
      <sui-desktop-nav v-if="$store.state.app.window.width > 768 && $store.state.app.window.height > 450">
        <!-- - App Name -->
        <slot />
        <!-- - Desktop Navbar links -->
        <template #links>
          <slot name="links" />
        </template>
      </sui-desktop-nav>

      <sui-mobile-nav v-else>
        <!-- - App Name -->
        <slot />
        <!-- - A bit more versatile with a separate set of links to use in the mobile navbar -->
        <template #mobile-links>
          <slot name="mobile-links" />
        </template>
      </sui-mobile-nav>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import SuiDesktopNav from "./SuiDesktopNav.vue";
import SuiMobileNav from "./SuiMobileNav.vue";

// ?: Ordinarily sticky navbar is available in SUI (but it's a pain to work with)
export default defineComponent({
  components: {
    SuiDesktopNav, SuiMobileNav
  },
  data() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
@media screen and (min-width: 933px) and (max-width: 1127px) {
  .ui.container.grid {
    margin-left: 0 !important;
    margin-right: 1em !important;
    width: 100% !important;
  }
}

@media screen and (min-width: 1127px) {
  .ui.container.grid {
    margin-left: 0 !important;
    margin-right: 3em !important;
    width: 100% !important;
  }
}
</style>
