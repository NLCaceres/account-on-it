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
      :to="{ name: 'Landlords' }"
    >My Landlord's Info</router-link>
    <router-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      :to="{ name: 'Properties'}"
    >My Rental's Info</router-link>
    <router-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      :to="{ name: 'Tenants'}"
    >My Profile</router-link>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  props: {
    flexed: Boolean
  },
  computed: {
    LandlordID(): string {
      return this.$store.state.authentication.user.landlord_id;
    },
    PropertyID(): string {
      return this.$store.state.authentication.user.property_id;
    },
    TenantID(): string {
      return this.$store.state.authentication.user.tenant_id;
    }
  }
});
</script>
