<template>
  <div class="ui segment container p-0-b app-dark-accent-dark">
    <header-back-button>New Tenant</header-back-button>

    <div class="ui basic segment">
      <model-form
        new-entity
        entity-name="Tenant"
        :entity="tenant"
        :saving="saving"
        :validation-errs="validationErrs"
      />
    </div>

    <sui-alert-saving />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
// import tenantsAPI from "../../API/TenantAPI";

export default Vue.extend({
  data() {
    return {
      loading: false,
      saving: false,
      error: null,
      saved: false,
      tenant: {
        first_name: "",
        surname: "",
        email: "",
        landlord_id: -1,
        property_id: -1,
        lease_id: -1
      },
      validationErrs: {
        first_name: [],
        surname: [],
        email: []
      }
    };
  },
  methods: {
    // EditTenant(propName, propVal) {
    //   if (propName) {
    //     this.tenant[propName] = propVal;
    //   }
    // },
    // async StoreTenant() {
    //   this.saving = true;
    //   const response = await tenantsAPI.create(this.tenant);
    //   console.log(response);
    //   this.saving = false;
    //   if (response.status === 201) {
    //     this.saved = true;
    //     this.validationErrs = { first_name: [], surname: [], email: [] };
    //     setTimeout(() => (this.saved = false), 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
    //   } else if (response.status === 422) {
    //     this.error = response.data.message;
    //     this.validationErrs = response.data.errors;
    //     setTimeout(() => (this.error = null), 4000);
    //   }
    // }
  }
});
</script>