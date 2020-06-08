<template>
  <div>
    <basic-header>Leases</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'LeaseNew' }"
      class="ui inverted button m-md-b m-md-l"
    >Add New Lease</router-link>

    <app-loading />
    <app-error>{{error}}</app-error>

    <bootstrap-pagination v-if="pages > 1" :size="-1" :num-of-pages="pages" />
    <model-table :entities="leases" entity-name="Lease" plural-entity="Leases" @delete="OpenModal" />

    <semantic-modal :size="-1">Are You Sure?</semantic-modal>
  </div>
</template>
<script>
import LeasesAPI from "../../API/leases";
export default {
  data() {
    return {
      loading: false,
      error: null,
      pages: 1,
      leases: [],
      leaseIdToDelete: -1,
      leaseIndexToDelete: -1
    };
  },
  beforeRouteEnter(to, from, next) {
    LeasesAPI.all((err, leases) => {
      next(vm => vm.SetData(err, leases));
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(BEGIN_LOAD, true); //* Stop loading
    LeasesAPI.all((err, leases) => {
      this.SetData(err, leases);
      next(); //? Move along router funcs
    });
  },
  methods: {
    SetData(err, data) {
      if (err) {
        this.error = err.toString();
      } else {
        this.$store.dispatch(BEGIN_LOAD, false); //* Stop loading
        this.leases = data;
      }
    },
    async DeleteLease() {
      const response = await LeasesAPI.delete(this.leaseIdToDelete);
      if (response.status === 204) {
        this.leases.splice(this.leaseIndexToDelete, 1);
      }
    },
    OpenModal(id, index) {
      this.leaseIdToDelete = id;
      this.leaseIndexToDelete = index;
      $("#deleteModal").modal("toggle");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>