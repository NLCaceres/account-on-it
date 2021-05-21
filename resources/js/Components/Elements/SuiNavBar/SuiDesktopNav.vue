<template>
  <div class="row" id="desktop-nav">
    <router-link id="desktop-brand" :to="{ name: 'Home'}" exact
      class="header item app-dark-accent border-light">
        <slot></slot>
    </router-link>

    <slot name="links" v-if="!expanded"></slot>

    <div class="right menu">
      <!--//! Menu   -->
      <sui-login-dropdown v-if="!Authenticated" />
      
      <!--//! Login   -->
      <div v-else class="item menu p-0" id="searchbar-logout">
        <sui-nav-searchbar @expand="HandleSearchBarExpansion" :expanded="expanded" />

        <a v-if="!expanded" id="logout" class="ui item border-x-white app-red h-100"
          @click="Logout">Log Out?</a>

        <button type="button" v-else class="ui icon button app-white-text app-dark-accent" @click="expanded = !expanded">
          <i class="close icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { AUTH_MODULE } from '../../../Store/modules/AuthenticationState';
import { SIGN_OUT } from "../../../Store/ActionTypes";
import SuiLoginDropdown from '../../Login/SuiLoginDropdown.vue';
import SuiNavSearchbar from './SuiNavSearchbar.vue';

export default Vue.extend({
  //! Components
  components: {
    SuiLoginDropdown, SuiNavSearchbar
  },
  //! Lifecycle Hooks
  mounted() {},
  //! Data
  data() {
    return {
      expanded: false,
    };
  },
  //! Methods
  methods: {
    async Logout() {
      const response = await this.$store.dispatch(`${AUTH_MODULE}/${SIGN_OUT}`);
      if (response.data.message === "Logged out" && this.$route.path !== "/") this.$router.push({ name: "Home" });
    },
    HandleSearchBarExpansion() {
      this.expanded = !this.expanded;
    },
  },
  computed: {
    Authenticated(): boolean {
      return this.$store.state.authentication.authenticated;
    },
  },
});
</script>

<style lang="scss">
//! NOT SCOPED 
//? Reason is scoped prevents child components from getting styled by parents

//! Small Desktop
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
  //* The following handles the link slot! BUT ONLY IF this style tag is not scoped to the component!
  div.row > div.flexed {
    //margin-left: 1em !important; //* 1em only works to about 900

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
//! Medium Desktop
@media screen and (min-width: 1001px) and (max-width: 1225px) {
  #desktop-brand {
    margin-right: 0.5em;
  }
  #searchbar {
    width: 155px;
  }
}
//! Large Desktop
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