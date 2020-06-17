<template>
  <div class="ui segment container no-padding-b app-dark-accent-mid">
    <header-back-button>Edit Account</header-back-button>

    <form-user
      new-user
      :saving="saving"
      @edit="EditLandlord"
      @submit="StoreLandlord"
      :validation-errs="validationErrs"
    />

    <sui-alert-saving />
    <!-- <sui-alert-saving :saving="saving" :saved="saved" :error="error" @saved="saved = false;" /> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>