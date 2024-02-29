<template>
  <div class="ui segment container p-0-b app-dark-accent-dark">
    <h1>New Property</h1>
    <back-button :steps-back="-1" />

    <div class="ui basic segment">
      <property-form new-property :saving="saving" />
    </div>

    <sui-alert-saving
      class="m-sm-b app-yellow"
      :saving="saving"
      :saved="saved"
      :error="error"
      @saved="this.saved = false;"
    />
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import PropertyForm from './FormProperty.vue';

export default defineComponent({
  //! Local Components: 
  components: {
    'property-form': PropertyForm
  },
  data() {
    return {
      loading: false,
      saving: false,
      saved: false,
      error: null,
      property: {
        house_num: "",
        street: "",
        state: "",
        zipcode: "",
        additional_info: ""
      },
      validErrs: false,
      validationErrs: {
        house_num: [],
        street: [],
        state: [],
        zipcode: [],
        additional_info: []
      }
    };
  },
  methods: {
    // EditProperty(propName, propVal) {
    //   if (propName) {
    //     this.property[propName] = propVal;
    //   }
    // },
    // async StoreProperty() {
    //   console.log("Store Prop");
    //   this.saving = true;
    //   this.ValidProperty();
    //   if (!this.validErrs) {
    //     const response = await propertiesAPI.create(this.property);
    //     this.saving = false;
    //     if (response.status === 201) {
    //       this.saved = true;
    //       this.validationErrs = {
    //         house_num: [],
    //         street: [],
    //         state: [],
    //         zipcode: [],
    //         additional_info: []
    //       };
    //       setTimeout(() => (this.saved = false), 2000);
    //     } else if (response.status === 422) {
    //       this.error = response.data.message;
    //       this.validationErrs = response.data.errors;
    //       setTimeout(() => (this.error = null), 4000);
    //     }
    //   }
    // }
  }
});
</script>