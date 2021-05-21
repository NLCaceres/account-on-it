<template>
  <div class="ui segment container p-0-b app-dark-accent-dark">
    <h1>Edit Tenant Information</h1>
    <back-button :steps-back="-1" />

    <div class="ui basic segment">
      <model-form
        entity-name="Tenant"
        :entity="tenant"
        :saving="saving"
        :validation-errs="validationErrs"
      />
    </div>

    <sui-alert-loading />
    <sui-alert-saving />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
// import { BEGIN_LOAD } from "../../Store/ActionTypes";

export default Vue.extend({
  data() {
    return {
      loading: false,
      error: null,
      tenant: {
        id: null,
        first_name: null,
        surname: null
      }
    };
  },
  created() {},
  methods: {}
});
</script>