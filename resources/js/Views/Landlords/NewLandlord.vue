<template>
  <div class="ui segment container no-padding-b app-dark-accent-mid">
    <header-back-button>New Landlord</header-back-button>

    <form-landlord
      new-landlord
      :saving="saving"
      @edit="EditLandlord"
      @submit="StoreLandlord"
      :validation-errs="validationErrs"
    />

    <sui-alert-saving :saving="saving" :saved="saved" :error="error" @saved="saved = false;" />
  </div>
</template>
<script>
import LandlordsAPI from "../../API/LandlordAPI";

export default {
  data() {
    return {
      loading: false,
      saving: false,
      error: null,
      saved: false,
      landlord: {
        first_name: "",
        surname: "",
        email: ""
      },
      validationErrs: {
        first_name: [],
        surname: [],
        email: []
      }
    };
  },
  methods: {
    EditLandlord(propName, propVal) {
      if (propName) {
        this.landlord[propName] = propVal;
      }
    },
    async StoreLandlord() {
      this.saving = true;
      const response = await LandlordsAPI.create(this.landlord);
      this.saving = false;
      if (response.status === 201) {
        this.saved = true;
        this.validationErrs = { first_name: [], surname: [], email: [] };
        setTimeout(() => (this.saved = false), 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
      } else if (response.status === 422) {
        this.error = response.data.message;
        this.validationErrs = response.data.errors;
        setTimeout(() => (this.error = null), 4000);
      }
    }
  }
};
</script>