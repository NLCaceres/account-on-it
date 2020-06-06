<template>
  <div>
    <header-back-button>Landlord Details</header-back-button>
    <model-display :entity="payment" entity-name="Payment" />
  </div>
</template>
<script>
import PaymentsAPI from "../../API/payments";
export default {
  data() {
    return {
      payment: {}
    };
  },
  async created() {
    try {
      const dataResponse = (await PaymentsAPI.find(this.$route.params.id)).data;
      this.payment = dataResponse;
    } catch (err) {
      this.error = err.response.data.message || err.message;
    }
  }
};
</script>