<template>
  <div :class="{flexed: flexed}">
    <router-link
      class="item text-centered"
      :class="{'border-x-light': flexed, 'border-b-light': !flexed }"
      :to="{ name: 'Home'}"
    >Home</router-link>
    <router-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      :to="{ name: 'Users' }"
    >User List</router-link>
    <router-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      :to="{ name: 'Landlords' }"
    >Landlord List</router-link>
    <router-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      :to="{ name: 'Tenants'}"
    >Tenant List</router-link>
    <router-link
      class="item text-centered"
      :class="{ 'border-r-light': flexed, 'border-b-light': !flexed}"
      :to="{ name: 'Properties'}"
    >Property List</router-link>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    flexed: Boolean
  }
});
</script>