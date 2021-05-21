<template>
  <div class="ui segment container p-0-b app-dark-accent-dark">
    <header-back-button>New Landlord</header-back-button>

    <landlord-form
      new-landlord
      :saving="saving"
      :validation-errs="validationErrs"
    />

    <sui-alert-saving />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
// import LandlordsAPI from "../../API/LandlordAPI";
import LandlordForm from './FormLandlord.vue';

export default Vue.extend({
  //! Local Components: 
  components: {
    'landlord-form': LandlordForm
  },
  data() {
    return {
      loading: false,
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
    // EditLandlord(propName: string, propVal: any) {
    //   if (propName) {
    //     this.landlord[propName] = propVal;
    //   }
    // },
    // async StoreLandlord() {
    //   this.saving = true;
    //   const response = await LandlordsAPI.create(this.landlord);
    //   this.saving = false;
    //   if (response.status === 201) {
    //     this.saved = true;
    //     this.validationErrs = { first_name: [], surname: [], email: [] };
    //     setTimeout(() => (this.saved = false), 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
    //   } else if (response.status === 422) {
    //     this.error = response.data.message;
    //     this.validationErrs = response.data.errors;
    //     setTimeout(() => (this.error = null), 4000);
    //   }
    // }
  }
});
</script>