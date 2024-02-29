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
<script lang='ts'>
import { defineComponent } from "vue";
import store from '../../Store';
// import PaymentsAPI from "../../API/PaymentAPI";
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { APP_MODULE } from "../../Store/modules/AppState";
import { LaravelPaginatedResponse } from '../../Models/InterfaceLaravelResponse';

export default defineComponent({
  data() {
    return {
      loading: false,
      error: null as string | null,
      pages: 1,
      payments: [] as any,
      paymentIdToDelete: -1,
      paymentIndexToDelete: -1
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading  
    //todo Update SetData params and Payments Model
    // PaymentsAPI.all((data?: TypicalPaginatedResponse<any>, err?: Error) => {
    //   next(vm => vm.SetData(data, err));
    // });
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading
    // PaymentsAPI.all((data?: TypicalPaginatedResponse<any>, err?: Error) => {
    //   this.SetData(data, err);
    //   next(); //? Move along router funcs
    // });
  },
  methods: {
    SetData(data?: LaravelPaginatedResponse<any>, err?: Error) {
      if (err) {
        this.error = err.toString();
      } else if (data) {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading 
        console.log(data);
        this.pages = data.last_page; //* Last page will be total num of pages
        this.payments = data.data;
      }
    },
    async DeletePayment() {
      //todo May not allow.
      // const response = await PaymentsAPI.delete(this.paymentIdToDelete);
      // if (response.status === 204) {
      //   this.payments.splice(this.paymentIndexToDelete, 1);
      // }
    },
    OpenModal(id: number, index: number) {
      this.paymentIdToDelete = id;
      this.paymentIndexToDelete = index;
      $("#deleteModal").modal("toggle");
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../../sass/inverted_buttons.scss";
</style>