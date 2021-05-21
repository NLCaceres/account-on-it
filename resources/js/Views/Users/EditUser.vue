<template>
  <div class="ui segment container p-0-b app-dark-accent-dark">
    <header-back-button>Edit Account</header-back-button>

    <user-form
      new-user
      :saving="saving"
      :validation-errs="validationErrs"
    />

    <sui-alert-saving />
    <!-- <sui-alert-saving :saving="saving" :saved="saved" :error="error" @saved="saved = false;" /> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import UserForm from './FormUser.vue';

export default Vue.extend({
  //! Local Components: 
  components: {
    UserForm
  },
});
</script>