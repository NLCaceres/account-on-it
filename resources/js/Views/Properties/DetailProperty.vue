<template>
  <div>
    <header-back-button>Property Details</header-back-button>
    <model-display :entity="property" entity-name="Landlord" />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
// import PropertiesAPI from "../../API/PropertyAPI";

export default Vue.extend({
  data() {
    return {
      property: {}
    };
  },
  async created() {
    // todo
    // try {
    //   const dataResponse = (await PropertiesAPI.find(this.$route.params.id))
    //     .data;
    //   this.property = dataResponse;
    // } catch (err) {
    //   this.error = err.response.data.message || err.message;
    // }
  }
});
</script>