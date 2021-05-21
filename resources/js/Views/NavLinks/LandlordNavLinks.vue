<template>
  <div :class="{flexed: flexed}">
    <router-link
      class="item text-centered"
      :class="{'border-x-light': flexed, 'border-b-light': !flexed }"
      :to="{ name: 'Home'}"
      exact
    >Home</router-link>
    <router-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      :to="{ name: 'Tenants'}"
    >My Tenants</router-link>
    <router-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      :to="{ name: 'Properties'}"
    >My Properties</router-link>
    <generic-route-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      routeName="LandlordDetail"
      :params="{ id: LandlordID }"
    >My Profile</generic-route-link>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import GenericRouteLink from './GenericRouteLink.vue';

export default Vue.extend({
  components: {
    GenericRouteLink
  },
  props: {
    flexed: Boolean
  },
  computed: {
    LandlordID(): string {
      return this.$store.state.authentication.user.landlord_id;
    }
  }
});
</script>
