<template>
  <div class="container">
    <basic-header>Landlords</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'LandlordNew' }"
      class="ui inverted button app-blue m-md-b m-md-l"
    >Add New Landlord</router-link>

    <sui-pagination
      v-if="pages > 1"
      :currentPage="currentPage"
      @update:currentPage="ChangePage"
      :num-of-pages="pages"
    />
    <model-table
      :entities="landlords"
      entity-name="Landlord"
      plural-entity="Landlords"
      @delete="OpenModal"
    />

    <sui-alert-loading :loading="loading" />
    <sui-alert-error>{{error}}</sui-alert-error>

    <sui-modal :size="-1">Are You Sure?</sui-modal>
  </div>
</template>
<script>
import LandlordsAPI from "../../API/landlords";
export default {
  data() {
    return {
      loading: false,
      error: null,
      currentPage: 1,
      pages: 1,
      landlords: [],
      landlordIdToDelete: -1,
      landlordIndexToDelete: -1
    };
  },
  //? Following vue-router lifecycle methods are good alternatives working w/ pagination, etc. compared to normal lifecycle like created()
  beforeRouteEnter(to, from, next) {
    //? Fires when about to load 1st time
    LandlordsAPI.all((err, landlords) => {
      next(vm => vm.SetData(err, landlords));
    });
  },
  beforeRouteUpdate(to, from, next) {
    //todo maybe set up a different pathway for pagination updates
    if (from.query.page && !to.query.page) this.currentPage = 1;
    //? Fires when this route is about to change - like w/ pagination (route?page=1) or inner links (route#link)
    this.loading = true;
    LandlordsAPI.all((err, landlords) => {
      this.SetData(err, landlords);
      next(); //? Move along router funcs
    });
  },
  methods: {
    SetData(err, data) {
      if (err) {
        this.error = err.toString();
      } else {
        this.loading = false;
        this.landlords = data;
      }
    },
    async DeleteLandlord() {
      const response = await landlordsAPI.delete(this.landlordIdToDelete);
      if (response.status === 204) {
        this.landlords.splice(this.landlordIndexToDelete, 1);
      }
    },
    ChangePage(newPage) {
      this.currentPage = newPage;
      if (this.currentPage === 1) {
        this.$router.replace({
          path: "landlords"
        });
      } else if (this.currentPage === this.pages) {
        this.$router.replace({
          path: "landlords",
          query: { page: this.pages }
        });
      } else {
        this.$router.replace({
          path: "landlords",
          query: { page: this.currentPage }
        });
      }
    },
    OpenModal(id, index) {
      this.landlordIdToDelete = id;
      this.landlordIndexToDelete = index;
      $(".ui.modal.mini").modal("show");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>