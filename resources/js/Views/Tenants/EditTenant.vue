<template>
  <div class="ui segment container no-padding-b app-dark-accent-mid">
    <h1>Edit Tenant Information</h1>
    <back-button :steps-back="-1" />

    <div class="ui basic segment">
      <model-form
        entity-name="Tenant"
        :entity="tenant"
        :saving="saving"
        @edit="EditTenant"
        @submit="StoreTenant"
        :validation-errs="validationErrs"
      />
    </div>

    <sui-alert-loading />
    <sui-alert-saving :saving="saving" :saved="saved" :error="error" @saved="this.saved = false;" />
  </div>
</template>
<script>
import { BEGIN_LOAD } from "../../Store/ActionTypes";

export default {
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
};
</script>