<template>
  <div>
    <header-back-button>Landlord Details</header-back-button>
    <model-display :entity="payment" entity-name="Payment" />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
// import PaymentsAPI from "../../API/PaymentAPI";

export default Vue.extend({
  data() {
    return {
      payment: {}
    };
  },
  async created() {
    //todo
    // try {
    //   const dataResponse = (await PaymentsAPI.find(this.$route.params.id)).data;
    //   this.payment = dataResponse;
    // } catch (err) {
    //   this.error = err.response.data.message || err.message;
    // }
  }
});
</script>