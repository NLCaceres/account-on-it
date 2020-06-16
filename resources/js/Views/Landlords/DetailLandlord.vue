<template>
  <div>
    <header-back-button>Landlord Details</header-back-button>
    <model-display :entity="landlord" entity-name="Landlord" class="m-lg-b" />

    <button
      class="ui inverted button app-blue m-md-l"
      @click="addingTenant = !addingTenant"
    >{{AddOrCancelTenant}}</button>
    <transition name="fade" mode="out-in">
      <div
        v-if="!addingTenant"
        id="landlord-tenant-table"
        key="landlord-tenant-table"
        class="m-md-t"
      >
        <h1>{{IsYours}} Tenants</h1>
        <model-table :entities="tenants" entity-name="Tenant" plural-entity="Tenants" />
      </div>
      <div v-else id="landlord-tenant-form" key="landlord-tenant-form" class="m-sm-y">
        <h1>New Tenant</h1>
        <model-form
          new-entity
          :entity="newTenant"
          entity-name="Tenant"
          @edit="CallTenantAPI"
          :validation-errors="tenantValidationErrs"
        />
      </div>
    </transition>

    <button
      class="ui inverted button app-blue m-md-t m-md-l"
      @click="addingProperty = !addingProperty"
    >{{AddOrCancelProperty}}</button>
    <transition name="fade" mode="out-in">
      <div key="landlord-property-table" class="m-md-y" v-if="!addingProperty">
        <h1>{{IsYours}} Properties</h1>
        <model-table :entities="properties" entity-name="Property" plural-entity="Properties" />
      </div>
      <div key="landlord-property-form" class="m-md-y" v-else>
        <h1>New Property</h1>
        <model-form
          new-entity
          :entity="newProperty"
          entity-name="Tenant"
          @edit="CallPropertyAPI"
          :validation-errors="propertyValidationErrs"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import LandlordsAPI from "../../API/LandlordAPI";

export default {
  data() {
    return {
      loggedIn: false,
      loading: false,
      saving: false,
      error: null,
      saved: false,
      landlord: {
        id: null,
        first_name: "",
        surname: "",
        email: ""
      },
      tenants: [],
      addingTenant: false,
      newTenant: {
        first_name: "",
        surname: "",
        email: ""
      },
      tenantValidationErrs: {
        first_name: [],
        surname: [],
        email: []
      },
      addingProperty: false,
      properties: [],
      newProperty: {
        house_number: 0,
        street: "",
        state: "",
        zipcode: 0,
        additional_info: 0
      },
      propertyValidationErrs: {
        house_number: [],
        street: [],
        state: [],
        zipcode: [],
        additional_info: []
      }
    };
  },
  computed: {
    IsYours() {
      return this.loggedIn
        ? "Your"
        : `${this.landlord.first_name} ${this.landlord.surname}'s`;
    },
    AddOrCancelTenant() {
      return this.addingTenant ? "Cancel New Tenant" : "Add New Tenant";
    },
    AddOrCancelProperty() {
      return this.addingProperty ? "Cancel New Property" : "Add New Property";
    }
  },
  async created() {
    try {
      const dataResponse = (await LandlordsAPI.find(this.$route.params.id))
        .data;

      this.tenants = dataResponse.tenants;
      delete dataResponse.tenants;
      this.properties = dataResponse.properties;
      delete dataResponse.properties;
      this.landlord = dataResponse;
    } catch (err) {
      this.error = err.response.data.message || err.message;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
