<template>
  <div>
    <header-back-button>Landlord Details</header-back-button>
    <model-display :entity="lease" entity-name="Lease" />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
// import LeaseAPI from "../../API/LeaseAPI"

export default Vue.extend({
  data() {
    return {
      lease: {}
    };
  },
  async created() {
    //todo
    // try {
    //   const dataResponse = (await LeaseAPI.find(this.$route.params.id)).data;
    //   this.lease = dataResponse;
    // } catch (err) {
    //   this.error = err.response.data.message || err.message;
    // }
  }
});
</script>