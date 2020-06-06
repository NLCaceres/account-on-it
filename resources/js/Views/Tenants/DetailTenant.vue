<template>
  <div>
    <header-back-button>Landlord Details</header-back-button>
    <model-display :entity="tenant" entity-name="Tenant" />
  </div>
</template>
<script>
import TenantsAPI from "../../API/tenants";
export default {
  data() {
    return {
      tenant: {
        id: null,
        first_name: "",
        surname: "",
        email: "",
        claimed: false,
        current: false,
        user_id: 0,
        landlord_id: 0,
        property_id: 0,
        lease_id: 0
      }
    };
  },
  async created() {
    try {
      const dataResponse = (await TenantsAPI.find(this.$route.params.id)).data;
      this.tenant = dataResponse;
    } catch (err) {
      this.error = err.response.data.message || err.message;
    }
  }
};
</script>