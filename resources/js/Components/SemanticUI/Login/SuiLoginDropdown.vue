<template>
  <!--//? By placing popup in the right menu in SuiDesktopNav -->
  <!--//? Can set anchor here (#login) as trigger to open it -->
  <div>
    <a id="login" class="icon item border-x-light">
      <span class="text">Login?</span>
      <i class="dropdown icon" />
    </a>
    <sui-login-popup v-if="!loginView" @closePopup="ClosePopup" />
  </div>
</template>
<script>
export default {
  //! Lifecycle Methods
  mounted() {
    this.InitPopup();
  },
  //! Data
  data() {
    return {
      loginView: false
    };
  },
  //! Normal Methods
  methods: {
    InitPopup() {
      //? Popup must be init here since actually setting trigger here! Besides attributes for popup itself
      $("#login").popup({
        inline: true,
        on: "click",
        position: "bottom right",
        offset: -80
      });
      //* Destroy Login popup view if on login page
      this.$router.afterEach((to, from) => {
        if (to.fullPath === "/login") {
          this.loginView = true;
          $("#login").popup("destroy");
        }
      });
      //* Reactivate login view if still not logged in
      this.$router.beforeEach((to, from, next) => {
        if (from.fullPath === "/login") {
          $("#login").popup({
            inline: true,
            on: "click",
            position: "bottom right",
            offset: -80
          });
          this.loginView = false;
        }
        next();
      });
    },
    ClosePopup() {
      //? Popup behaviors must be called on the activating element! Not the popup itself!
      $("#login").popup("hide");
    }
  }
};
</script>