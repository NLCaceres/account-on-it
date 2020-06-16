<template>
  <div>
    <header-back-button>Landlord Details</header-back-button>
    <model-display :entity="property" entity-name="Landlord" />
  </div>
</template>
<script>
import PropertiesAPI from "../../API/PropertyAPI";
export default {
  data() {
    return {
      property: {}
    };
  },
  async created() {
    try {
      const dataResponse = (await PropertiesAPI.find(this.$route.params.id))
        .data;
      this.property = dataResponse;
    } catch (err) {
      this.error = err.response.data.message || err.message;
    }
  }
};
</script>