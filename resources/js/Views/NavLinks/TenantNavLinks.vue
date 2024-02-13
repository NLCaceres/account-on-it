<template>
  <div :class="{flexed: flexed}">
    <!-- TODO: Split into currently renting tenants links and seeking tenancy tenants -->
    <!-- TODO: Currently renting links should be dynamic in that they get HOME, LandlordDetail, PropertyDetail, Profile (not Tenants) -->
    <!-- TODO: Seeking Tenancy maybe just get Available Properties search page -->
    <router-link
      class="item text-centered"
      :class="{'border-x-light': flexed, 'border-b-light': !flexed }"
      :to="{ name: 'Home'}"
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
import { defineComponent } from 'vue';

export default defineComponent({
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
