<template>
  <div class="container">
    <basic-header>Landlords</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'LandlordNew' }"
      class="ui inverted button app-blue m-md-b m-md-l"
    >Add New Landlord</router-link>

    <sui-pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      @update:page="ChangePage"
      :num-of-pages="totalPages"
    />
    <model-table
      :entities="landlords"
      entity-name="Landlord"
      plural-entity="Landlords"
      @delete="OpenModal"
    />

    <sui-alert-loading />
    <sui-alert-error>{{error}}</sui-alert-error>

    <sui-modal :size="-1">Are You Sure?</sui-modal>
  </div>
</template>
<script lang='ts'>
import Vue, { VueConstructor } from 'vue';
import store from '../../Store';
import { landlordAPI } from "../../API/LandlordAPI";
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { APP_MODULE } from "../../Store/modules/AppState";
import Landlord from '../../Models/LandlordClass';
import { LaravelPaginatedResponse } from '../../Models/InterfaceLaravelResponse';
import { AxiosResponse } from 'axios';
import { PreloadVue } from '../../Models/InterfaceVueViews';

//? The below would work to incorporate mixins but with Composition API, mixins are old news!
export default (Vue as VueConstructor<PreloadVue /* & InstanceType<typeof ChangePageMixin> */>).extend({
  data() {
    return {
      loading: false,
      error: null as string | null,
      currentPage: 1,
      totalPages: 1,
      landlords: [] as Landlord[],
      landlordIdToDelete: -1,
      landlordIndexToDelete: -1
    };
  },
  //! Vue Router Navigation Guards
  //? Following vue-router lifecycle methods are good alternatives working w/ pagination, etc. compared to normal lifecycle like created()
  beforeRouteEnter(to, from, next) {
    //? Fires when about to load 1st time 
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading

    landlordAPI.GetAll((data, err) => {
      if ((data as AxiosResponse)?.status === 403) {
        next(false);
      } else {
        next(vm => vm.SetData(data, err));
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    //* Checks if query even exists in URL
    if (from.query.page && !to.query.page) this.currentPage = 1;
    
    //? Fires when this route is about to change - like w/ pagination (route?page=1) or inner links (route#link)
    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading

    landlordAPI.GetAll((landlords, err) => {
      this.SetData(landlords as LaravelPaginatedResponse<Landlord>, err);
      next(); //? Move along router funcs
    }, `?page=${this.currentPage}`);
  },
  methods: {
    SetData(data?: LaravelPaginatedResponse<Landlord>, err?: Error) {
      if (err) {
        this.error = err.toString();
        console.log(err);
      } else if (data) {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading 
        this.totalPages = data.last_page; //* Last page will be total num of pages
        this.landlords = data.data;
      }
    },
    async DeleteLandlord() {
      const response = await landlordAPI.Delete(this.landlordIdToDelete);
      if (response) { //* If true, 204 status, then splice out the landlord that got deleted
        this.landlords.splice(this.landlordIndexToDelete, 1);
      } else { //* If false, 424 response, then report error message
        this.error = 'Issue while deleting. It might be an internet issue!';
        setTimeout(() => this.error=null, 4000);
      }
    },
    ChangePage(newPage: number) {
      this.currentPage = newPage;   
      if (this.currentPage === 1) {
        if (this.$route.fullPath !== '/landlords') {
          //* If page 1 then use base url
          this.$router.replace({
            path: this.$route.path
          });
        }
      } else if (this.currentPage === this.totalPages) {
        if (this.$route.fullPath !== `${this.$route.path}?page=${String(this.totalPages)}`) {
          //* If currentPage = total # of pages, then use base url
          this.$router.replace({
            path: this.$route.path,
            query: { page: String(this.totalPages) }
          });
        }
      } else {
        if (this.$route.fullPath !== `${this.$route.path}?page=${String(this.currentPage)}`) {
          //* If not 1st or last page, then set query to that page #
          this.$router.replace({
            path: this.$route.path,
            query: { page: String(this.currentPage) }
          });
        }
      }
    },
    OpenModal(id: number, index: number) {
      this.landlordIdToDelete = id;
      this.landlordIndexToDelete = index;
      $(".ui.modal.mini").modal("show");
    }
  }
});

</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>