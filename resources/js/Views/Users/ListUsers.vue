<template>
  <div id="users">
    <basic-header>Users</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'UserNew' }"
      class="ui inverted button app-blue m-md-b m-md-l"
    >Add New User</router-link>

    <!-- <table class="table" v-if="users">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <model-table :entities="users" />
    </table>-->

    <sui-pagination
      v-if="pages > 1"
      :currentPage="currentPage"
      @update:currentPage="ChangePage"
      :num-of-pages="pages"
    />
    <model-table :entities="users" entity-name="User" plural-entity="Users" @delete="OpenModal" />

    <sui-alert-loading :loading="loading" />

    <sui-modal :size="-1">Are You Sure?</sui-modal>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
// import UserAPI from "../../API/UserAPI";
import User from "../../Models/UserClass";

export default Vue.extend({
  data() {
    return {
      loading: false,
      error: null,
      users: [] as Array<typeof User> | null, //? Change to optional
      currentPage: 1,
      pages: 1,
      userIdToDelete: 0,
      userIndexToDelete: 0
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    //? All async functions must have return signature Promise (regardless what's in that promise)
    async fetchUsers(): Promise<void> {
      this.error = this.users = null;
      this.loading = true;
      try {
        // const response = await UserAPI.GetAll();
        // console.log(response);
        //this.users = response.data;
      } catch (err) {
        this.error = err.response.data.message || err.message;
      }
      if (this.users) this.loading = false;
    },
    ChangePage(newPage: number): void {
      this.currentPage = newPage;
      if (this.currentPage === 1) {
        this.$router.replace({
          path: "users"
        });
      } else if (this.currentPage === this.pages) {
        this.$router.replace({
          path: "users",
          query: { page: `${this.pages}` }
        });
      } else {
        this.$router.replace({
          path: "users",
          query: { page: `${this.currentPage}` } //? Forcing cast of num to str gets TS to not complain
        });
      }
    },
    OpenModal(id: number, index: number): void {
      this.userIdToDelete = id;
      this.userIndexToDelete = index;
      $(".ui.modal.mini").modal("show");
    }
  }
});
</script>