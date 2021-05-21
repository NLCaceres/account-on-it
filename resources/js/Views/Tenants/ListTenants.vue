<template>
  <div class="w-100">
    <basic-header>Tenants</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'TenantNew' }"
      class="ui inverted button app-blue m-md-b m-md-l"
    >Add New Tenant?</router-link>

    <sui-pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      @update:page="ChangePage"
      :num-of-pages="totalPages"
    />

    <model-table
      :entities="tenants"
      entity-name="Tenant"
      plural-entity="Tenants"
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
import { tenantAPI } from "../../API/TenantAPI";
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { APP_MODULE } from "../../Store/modules/AppState";
import { LaravelPaginatedResponse } from '../../Models/InterfaceLaravelResponse';
import { AxiosResponse } from 'axios';
import { PreloadVue } from '../../Models/InterfaceVueViews';
import Tenant from '../../Models/TenantClass';

export default Vue.extend({
  components: {

  },
  data() {
    return {
      tenants: [] as any,
      error: null as string | null,
      currentPage: 1,
      totalPages: 1,
      tenantIdToDelete: -1,
      tenantIndexToDelete: -1
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading  
    const query = `?page=${to.query.page}` ?? '';
    
    tenantAPI.GetAll((data, err) => {
      if ((data as AxiosResponse)?.status === 403) {
        next(false);
      } else {
        next(vm => (vm as PreloadVue).SetData(data, err));
      }
    }, query);
  },
  beforeRouteUpdate(to, from, next) {
    //* Checks if query even exists in URL
    if (from.query.page && !to.query.page) this.currentPage = 1;

    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading

    tenantAPI.GetAll((tenants, err) => {
      this.SetData(tenants as LaravelPaginatedResponse<Tenant>, err);
      next();
    }, `?page=${this.currentPage}`);
  },
  methods: {
    SetData(data?: LaravelPaginatedResponse<Tenant>, err?: Error) {
      if (err) {
        this.error = err.toString();
      } else if (data) {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading
        
        this.currentPage = data.current_page;
        this.totalPages = data.last_page; //* Last page will be total num of pages
        this.tenants = data.data;
      }
    },
    async DeleteProperty() {
      const response = await tenantAPI.Delete(this.tenantIdToDelete);
      if (response) { //* If true, 204 - successful delete
        this.tenants.splice(this.tenantIndexToDelete, 1);
      } else { //* If false, 424 response, then report error message
        this.error = 'Issue while deleting. It might be an internet issue!';
        setTimeout(() => this.error=null, 4000);
      }
    },
    ChangePage(newPage: number) {
      this.currentPage = newPage;   

      if (this.currentPage === 1) {
        //* If page 1 then use base url
        this.$router.replace({
          path: this.$route.path
        });
      } else if (this.currentPage === this.totalPages) {
        //* If currentPage = total # of pages, then use base url
        this.$router.replace({
          path: this.$route.path,
          query: { page: String(this.totalPages) }
        });
      } else {
        //* If not 1st or last page, then set query to that page #
        this.$router.replace({
          path: this.$route.path,
          query: { page: String(this.currentPage) }
        });
      }
    },
    OpenModal(id: number, index: number) {
      this.tenantIdToDelete = id;
      this.tenantIndexToDelete = index;
      $("#deleteModal").modal("toggle");
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>