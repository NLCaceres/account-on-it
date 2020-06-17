<template>
  <div>
    <basic-header>Payments</basic-header>

    <router-link
      :to="{ name: 'PaymentNew' }"
      class="ui inverted button app-blue m-md-b m-md-l"
    >Add New Payment</router-link>

    <app-loading />
    <app-error>{{error}}</app-error>

    <bootstrap-pagination v-if="pages > 1" :size="-1" :num-of-pages="pages" />
    <model-table
      :entities="payments"
      entity-name="Payment"
      plural-entity="Payments"
      @delete="OpenModal"
    />

    <semantic-modal :size="-1">Are You Sure?</semantic-modal>
  </div>
</template>
<script>
import store from '../../Store';
import PaymentsAPI from "../../API/PaymentAPI";
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { APP_MODULE } from "../../Store";

export default {
  data() {
    return {
      loading: false,
      error: null,
      pages: 1,
      payments: [],
      paymentIdToDelete: -1,
      paymentIndexToDelete: -1
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading  
    PaymentsAPI.all((err, payments) => {
      next(vm => vm.SetData(err, payments));
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading
    PaymentsAPI.all((err, payments) => {
      this.SetData(err, payments);
      next(); //? Move along router funcs
    });
  },
  methods: {
    SetData(err, data) {
      if (err) {
        this.error = err.toString();
      } else {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading
        this.payments = data;
      }
    },
    async DeletePayment() {
      //todo May not allow.
      const response = await PaymentsAPI.delete(this.paymentIdToDelete);
      if (response.status === 204) {
        this.payments.splice(this.paymentIndexToDelete, 1);
      }
    },
    OpenModal(id, index) {
      this.paymentIdToDelete = id;
      this.paymentIndexToDelete = index;
      $("#deleteModal").modal("toggle");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>