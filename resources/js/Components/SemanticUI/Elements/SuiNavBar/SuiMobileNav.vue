<template>
  <div class="tablet mobile only row">
    <router-link
      class="header item app-dark-accent border-light p-xs-y"
      :to="{ name: 'Home'}"
      exact
    >
      <slot></slot>
    </router-link>

    <div class="right menu">
      <div class="ui fluid dropdown item p-xs-y">
        <a>
          <button class="ui inverted basic icon button">
            <i class="bars icon" />
          </button>
        </a>
        <div class="vertical menu app-blue" :style="{ width: NavbarWidth }">
          <slot name="mobile-links" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    $(".right.accordion.menu").accordion();
  },
  computed: {
    NavbarWidth() {
      return `${this.$store.state.app.window.width}px`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../sass/variables/colors.scss";

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