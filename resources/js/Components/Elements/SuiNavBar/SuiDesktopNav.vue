<template>
  <div id="desktop-nav" class="row">
    <router-link id="desktop-brand" :to="{ name: 'Home' }" class="header item app-dark-accent border-light">
      <slot />
    </router-link>

    <slot v-if="!expanded" name="links" />

    <div class="right menu">
      <sui-login-dropdown v-if="!Authenticated" />

      <div v-else id="searchbar-logout" class="item menu p-0">
        <sui-nav-searchbar :expanded @expand="ExpandSearchbar" />

        <button v-if="!expanded" id="logout" class="ui item border-x-white app-red h-100" @click="Logout">
          Log Out?
        </button>

        <button v-else type="button" class="ui icon button app-white-text app-dark-accent"
                aria-label="Searchbar Close" @click="expanded = !expanded">
          <i class="close icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { AUTH_MODULE } from "@/Store/modules/AuthenticationState";
import { SIGN_OUT } from "@/Store/ActionTypes";
import SuiLoginDropdown from "@/Components/Login/SuiLoginDropdown.vue";
import SuiNavSearchbar from "./SuiNavSearchbar.vue";

export default defineComponent({
  components: {
    SuiLoginDropdown, SuiNavSearchbar
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    Authenticated(): boolean {
      return this.$store.state.authentication.authenticated;
    },
  },
  methods: {
    async Logout() {
      const response = await this.$store.dispatch(`${AUTH_MODULE}/${SIGN_OUT}`);
      if (response.data.message === "Logged out" && this.$route.path !== "/") {
        this.$router.push({ name: "Home" });
      }
    },
    ExpandSearchbar() {
      this.expanded = !this.expanded;
    },
  },
});
</script>

<style lang="scss">
// ?: Not scoped to let child components get the following styling

@media screen and (min-width: 768px) and (max-width: 1000px) {
  #desktop-brand {
    margin-right: 0em;
  }
  #searchbar {
    width: 90px;
  }
  .ui.menu {
    a.item {
      padding-left: 0.9em;
      padding-right: 0.9em;
    }
  }
  // - The following handles the link slot! BUT ONLY IF this style tag is not scoped to the component!
  div.row > div.flexed {
    //margin-left: 1em !important; // - 1em only works to about 900

    > a.item.text-centered {
      padding-left: 0.9em;
      padding-right: 0.9em;
    }
  }
}
@media screen and (min-width:950px) {
  div.row {
    > div.right.menu {
      margin-right: 0.75em !important;
    }
  }
}

@media screen and (min-width: 1001px) and (max-width: 1225px) {
  #desktop-brand {
    margin-right: 0.5em;
  }
  #searchbar {
    width: 155px;
  }
}

@media screen and (min-width: 1226px) {
  #desktop-brand {
    margin-right: 8em;
  }
  #searchbar {
    width: 200px;
  }
}

#searchbar-logout {
  &:hover {
    border-bottom: none;
  }
}
</style>