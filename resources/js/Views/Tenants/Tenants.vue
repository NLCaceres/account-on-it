<template>
  <div class="w-100">
    <basic-header>Tenants</basic-header>

    <router-link
      id="new-route"
      class="ui inverted button app-blue m-md-b m-md-l"
      :to="{name: 'TenantNew'}"
    >Add New Tenant?</router-link>

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
<script>
import TenantsAPI from "../../API/tenants";
import { BEGIN_LOAD } from "../../Store/action_types";

export default {
  data() {
    return {
      tenants: [],
      loading: false,
      error: null,
      tenantIdToDelete: -1,
      tenantIndexToDelete: -1
    };
  },
  beforeRouteEnter(to, from, next) {
    TenantsAPI.all((err, tenants) => {
      next(vm => vm.SetData(err, tenants));
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (from.query.page && !to.query.page) this.currentPage = 1;
    this.$store.dispatch(BEGIN_LOAD, true); //* Start loading
    TenantsAPI.all((err, tenants) => {
      this.SetData(err, tenants);
      next();
    });
  },
  methods: {
    SetData(err, data) {
      if (err) {
        this.error = err.toString();
      } else {
        this.$store.dispatch(BEGIN_LOAD, false); //* Stop loading
        this.tenants = data;
      }
    },
    async DeleteProperty() {
      const response = await TenantsAPI.delete(this.tenantIdToDelete);
      if (response.status === 204) {
        this.tenants.splice(this.tenantIndexToDelete, 1);
      }
    },
    OpenModal(id, index) {
      this.tenantIdToDelete = id;
      this.tenantIndexToDelete = index;
      $("#deleteModal").modal("toggle");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>