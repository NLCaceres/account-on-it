<template>
  <div id="users">
    <basic-header>Users</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'SignUp' }"
      class="ui inverted button app-blue m-md-b m-md-l"
    >Add New User</router-link>

    <sui-pagination
      v-if="pages > 1"
      :currentPage="currentPage"
      @update:currentPage="ChangePage"
      :num-of-pages="pages"
    />
    
    <model-table :entities="users" entity-name="User" plural-entity="Users" @delete="OpenModal" />

    <sui-alert-loading />

    <sui-modal :size="-1">Are You Sure?</sui-modal>
  </div>
</template>

<script lang='ts'>
import Vue, { VueConstructor } from "vue";
// import Component from "vue-class-component";
import User from "../../Models/UserClass";
import { LaravelPaginatedResponse, TypicalPaginatedResponse } from '../../Models/InterfaceLaravelResponse';
import UserAPI from "../../API/UserAPI";
import { APP_MODULE } from '../../Store/modules/AppState';
import store from "../../Store";
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { AxiosResponse } from 'axios';
import { PreloadVue } from "../../Models/InterfaceVueViews";

// @Component
//todo Vue 3 improvements needed
export default /* class UserList extends */ (Vue as VueConstructor<PreloadVue>).extend({
  data() {
    return {
      users: [] as User[],
      currentPage: 1,
      pages: 1,
      UserIdToDelete: 0,
      UserIndexToDelete: 0,
      UserAPI: new UserAPI(),
    }
  },

  //! Hooks
  beforeRouteEnter(to, from, next): void {
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true);
    
    const starterUserAPI = new UserAPI(); //* The singleton above isn't available yet so make a temp one!
    starterUserAPI.GetAll((data?: TypicalPaginatedResponse<User>, err?: Error) => {
      if ((data as AxiosResponse)?.status === 403) {
        next(false);
      } else {
        next(vm => vm.SetData(data as LaravelPaginatedResponse<User>, err));
      }
    });
  },  

  //! Component Methods
  methods: {
    SetData(data?: LaravelPaginatedResponse<User>, err?: Error): void {
      if (err) {
        err.toString();
      } else if (data) {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading

        this.pages = data.last_page; //* Last page will be total num of pages
        
        this.users = data.data;
      }
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
      this.UserIdToDelete = id;
      this.UserIndexToDelete = index;
      $(".ui.modal.mini").modal("show");
    }
  }
});
</script>