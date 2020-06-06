<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a href="/" class="navbar-brand btn btn-info">
      <slot></slot>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#content"
      aria-controls="content"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="content">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="btn btn-info mx-2" :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-info mx-2" :to="{ name: 'Landlords' }">Landlord List</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-info mx-2" :to="{ name: 'Tenants' }">Tenant List</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-info mx-2" :to="{ name: 'Properties' }">Property List</router-link>
        </li>
      </ul>
      <router-link class="btn btn-info" :to="{ name: 'Login'}">Login!</router-link>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>