<template>
  <div class="ui inverted huge menu app-brand-blue sticky-el">
    <div class="ui container grid">
      <sui-desktop-nav>
        <!--//* App Name -->
        <slot />
        <!--//* Desktop Navbar links -->
        <template v-slot:links>
          <slot name="links" />
        </template>
      </sui-desktop-nav>

      <sui-mobile-nav>
        <!--//* App Name -->
        <slot />
        <!--//* A bit more versatile with a separate set of links to use in the mobile navbar -->
        <template v-slot:mobile-links>
          <slot name="mobile-links" />
        </template>
      </sui-mobile-nav>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
  //? Ordinarily sticky navbar is available in SUI (but it's a pain to work with)
};
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
