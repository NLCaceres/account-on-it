<template>
  <div>
    <basic-header>Leases</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'LeaseNew' }"
      class="ui inverted button m-md-b m-md-l"
    >Add New Lease</router-link>

    <model-table :entities="leases" entity-name="Lease" plural-entity="Leases" @delete="OpenModal" />

    <sui-modal :size="-1">Are You Sure?</sui-modal>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import store from '../../Store';
import LeasesAPI from "../../API/LeaseAPI";
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { APP_MODULE } from "../../Store/modules/AppState";
import { LaravelPaginatedResponse } from '../../Models/InterfaceLaravelResponse';

export default defineComponent({
  data() {
    return {
      loading: false,
      error: null as string | null,
      pages: 1,
      leases: [] as any,
      leaseIdToDelete: -1,
      leaseIndexToDelete: -1
    };
  },
  //todo Update SetData and Lease Model
  beforeRouteEnter(to, from, next) {
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading  
    // LeasesAPI.all((err, leases) => {
    //   next(vm => vm.SetData(err, leases));
    // });
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Stop loading
    // LeasesAPI.all((err, leases) => {
    //   this.SetData(err, leases);
    //   next(); //? Move along router funcs
    // });
  },
  methods: {
    SetData(data?: LaravelPaginatedResponse<any>, err?: Error) {
      if (err) {
        this.error = err.toString();
      } else {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading
        this.leases = data;
      }
    },
    async DeleteLease() {
      const response = await LeasesAPI.delete(this.leaseIdToDelete);
      if (response.status === 204) {
        this.leases.splice(this.leaseIndexToDelete, 1);
      }
    },
    OpenModal(id: number, index: number) {
      this.leaseIdToDelete = id;
      this.leaseIndexToDelete = index;
      $("#deleteModal").modal("toggle");
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>