<template>
  <div class="container">
    <basic-header>Properties</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'PropertyNew' }"
      class="ui inverted button app-blue m-md-b m-md-l"
    >Add New Property</router-link>

    <sui-pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      @update:page="ChangePage"
      :num-of-pages="totalPages"
    />

    <model-table
      :entities="properties"
      entity-name="Property"
      plural-entity="Properties"
      @delete="OpenModal"
    />

    <sui-alert-loading />
    <sui-alert-error>{{error}}</sui-alert-error>

    <sui-modal :size="-1">Are You Sure?</sui-modal>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import store from '../../Store';
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { APP_MODULE } from '../../Store/modules/AppState';
import { LaravelPaginatedResponse } from '../../Models/InterfaceLaravelResponse'
import { propertyAPI } from '../../API/PropertyAPI';
import Property from '../../Models/PropertyClass';
import { AxiosResponse } from 'axios';
import { PreloadVue } from '../../Models/InterfaceVueViews';


export default Vue.extend({
  data() {
    return {
      error: null as string | null,
      properties: [] as any,
      currentPage: 1,
      totalPages: 1,
      propertyIdToDelete: -1,
      propertyIndexToDelete: -1
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading  
    propertyAPI.GetAll((data, err) => {
      if ((data as AxiosResponse)?.status === 403) {
        next(false);
      } else {
        next(vm => (vm as PreloadVue).SetData(data, err));
      }
    })
  },
  beforeRouteUpdate(to, from, next) {
    //* Checks if query even exists in URL
    if (from.query.page && !to.query.page) this.currentPage = 1;

    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Stop loading

    propertyAPI.GetAll((data, err) => {
      this.SetData(data as LaravelPaginatedResponse<Property>, err);
      next();
    }, `?page=${this.currentPage}`);
  },  
  methods: {
    SetData(data?: LaravelPaginatedResponse<Property>, err?: Error) {
      if (err) {
        this.error = err.toString();
      } else if (data) {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading 
        console.log(data);
        this.totalPages = data.last_page; //* Last page will be total num of pages
        this.properties = data.data;
      }
    },
    async DeleteProperty() {
      const response = await propertyAPI.Delete(this.propertyIdToDelete);
      if (response) { //* True = 204 status = Splice out Property from array;
        this.properties.splice(this.propertyIndexToDelete, 1);
      } else {
        this.error = 'Issue while deleting. It might be an internet issue!';
        setTimeout(() => this.error=null, 4000);
      }
    },
    ChangePage(newPage: number) {
      this.currentPage = newPage;   
      if (this.currentPage === 1) {
        if (this.$route.fullPath !== '/properties') {
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
      this.propertyIdToDelete = id;
      this.propertyIndexToDelete = index;
      $("#deleteModal").modal("toggle");
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>