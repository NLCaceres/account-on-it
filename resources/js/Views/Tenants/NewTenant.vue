<template>
  <div class="ui segment container no-padding-b app-dark-accent-mid">
    <h1>New Tenant</h1>
    <back-button :steps-back="-1" />

    <div class="ui basic segment">
      <model-form
        new-entity
        entity-name="Tenant"
        :entity="tenant"
        :saving="saving"
        @edit="EditTenant"
        @submit="StoreTenant"
        :validation-errs="validationErrs"
      />
    </div>

    <sui-alert-saving :saving="saving" :saved="saved" :error="error" @saved="saved = false;" />
  </div>
</template>
<script>
import tenantsAPI from "../../API/tenants";

export default {
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
    EditTenant(propName, propVal) {
      if (propName) {
        this.tenant[propName] = propVal;
      }
    },
    async StoreTenant() {
      this.saving = true;
      const response = await tenantsAPI.create(this.tenant);
      console.log(response);
      this.saving = false;
      if (response.status === 201) {
        this.saved = true;
        this.validationErrs = { first_name: [], surname: [], email: [] };
        setTimeout(() => (this.saved = false), 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
      } else if (response.status === 422) {
        this.error = response.data.message;
        this.validationErrs = response.data.errors;
        setTimeout(() => (this.error = null), 4000);
      }
    }
  }
};
</script>