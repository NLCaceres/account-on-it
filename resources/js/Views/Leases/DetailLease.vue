<template>
  <div>
    <header-back-button>Landlord Details</header-back-button>
    <model-display :entity="lease" entity-name="Lease" />
  </div>
</template>
<script>
import LeaseAPI from "../../API/leases";
export default {
  data() {
    return {
      lease: {}
    };
  },
  async created() {
    try {
      const dataResponse = (await LeaseAPI.find(this.$route.params.id)).data;
      this.lease = dataResponse;
    } catch (err) {
      this.error = err.response.data.message || err.message;
    }
  }
};
</script>