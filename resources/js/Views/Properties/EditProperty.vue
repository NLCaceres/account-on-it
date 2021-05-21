<template>
  <div class="ui segment container p-0-b app-dark-accent-dark">
    <h1>Edit Property?</h1>
    <back-button :steps-back="-1" />

    <div class="ui basic segment">
      <property-form
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
// import PropertiesAPI from "../../API/PropertyAPI";
// import { BEGIN_LOAD } from "../../Store/ActionTypes";
// import { APP_MODULE } from "../../Store/modules/AppState";

export default Vue.extend({
  //! Local Components: 
  // components: {
  //   'property-form': PropertyForm
  // },
  data() {
    return {
      loading: false,
      saved: false,
      error: false,
      property: {
        house_num: "",
        street: "",
        state: "",
        zipcode: "",
        additional_info: ""
      },
      validationErrs: {
        house_num: [],
        street: [],
        state: [],
        zipcode: [],
        additional_info: []
      }
    };
  },
  async created() {
    // this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading
    // try {
    //   const dataReply = (await PropertiesAPI.find(this.$route.params.id)).data;
    //   this.property = dataReply;
    // } catch (err) {
    //   this.error = err.response.data.message || err.message;
    // }
    // this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading
  },
  methods: {
    // EditProperty(propName, propVal) {
    //   if (propName) {
    //     this.property[propName] = propVal;
    //   }
    // },
    // async UpdateProperty() {
    //   this.saving = true;
    //   const response = await PropertiesAPI.update(this.property.id, {
    //     house_num: this.property.house_num,
    //     street: this.property.street,
    //     state: this.property.state,
    //     zipcode: this.property.zipcode,
    //     additional_info: this.property.additional_info
    //   });
    //   this.saving = false;
    //   if (response.status === 204) {
    //     this.saved = true;
    //     this.validationErrs = {
    //       house_num: [],
    //       street: [],
    //       state: [],
    //       zipcode: [],
    //       additional_info: []
    //     };
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