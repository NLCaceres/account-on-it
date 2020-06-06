<template>
  <div id="users">
    <h1>Users</h1>
    <load-warning :loading="loading" :err="error" />
    <table class="table" v-if="users">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <model-table :entities="users" />
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      error: null,
      users: null
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.error = this.users = null;
      this.loading = true;
      try {
        const response = await axios.get("/api/users");
        console.log(response);
        this.users = response.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
      if (this.users) this.loading = false;
    }
  }
};
</script>