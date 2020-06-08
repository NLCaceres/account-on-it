<template>
  <div class="container">
    <basic-header>Properties</basic-header>

    <router-link
      id="new-route"
      :to="{ name: 'PropertyNew' }"
      class="ui inverted button app-blue m-md-b m-md-l"
    >Add New Property</router-link>

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
<script>
import PropertiesAPI from "../../API/properties";
import { BEGIN_LOAD } from "../../Store/action_types";

export default {
  data() {
    return {
      loading: false,
      error: null,
      properties: [],
      propertyIdToDelete: -1,
      propertyIndexToDelete: -1
    };
  },
  beforeRouteEnter(to, from, next) {
    PropertiesAPI.all((err, properties) => {
      next(vm => vm.SetData(err, properties));
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (from.query.page && !to.query.page) this.currentPage = 1;
    this.$store.dispatch(BEGIN_LOAD, true); //* Stop loading
    PropertiesAPI.all((err, properties) => {
      this.SetData(err, properties);
      next();
    });
  },
  async created() {
    this.$store.dispatch(BEGIN_LOAD, true); //* Start loading
    try {
      const dataReply = (await landlordsAPI.find(this.$route.params.id)).data;
      this.landlord = dataReply[0];
    } catch (err) {
      this.error = err.response.data.message || err.message;
    }
    this.$store.dispatch(BEGIN_LOAD, false); //* Stop loading
  },
  methods: {
    SetData(err, data) {
      if (err) {
        this.error = err.toString();
      } else {
        this.$store.dispatch(BEGIN_LOAD, false); //* Stop loading
        this.properties = data;
      }
    },
    async DeleteProperty() {
      const response = await PropertiesAPI.delete(this.propertyIdToDelete);
      if (response.status === 204) {
        this.properties.splice(this.propertyIndexToDelete, 1);
      }
    },
    OpenModal(id, index) {
      this.propertyIdToDelete = id;
      this.propertyIndexToDelete = index;
      $("#deleteModal").modal("toggle");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>