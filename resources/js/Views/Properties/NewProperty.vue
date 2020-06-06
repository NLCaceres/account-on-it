<template>
  <div class="ui segment container no-padding-b app-dark-accent-mid">
    <h1>New Property</h1>
    <back-button :steps-back="-1" />

    <div class="ui basic segment">
      <property-form new-property :saving="saving" @edit="EditProperty" @submit="StoreProperty" />
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
<script>
export default {
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
    EditProperty(propName, propVal) {
      if (propName) {
        this.property[propName] = propVal;
      }
    },
    async StoreProperty() {
      console.log("Store Prop");
      this.saving = true;
      this.ValidProperty();
      if (!this.validErrs) {
        const response = await propertiesAPI.create(this.property);
        this.saving = false;
        if (response.status === 201) {
          this.saved = true;
          this.validationErrs = {
            house_num: [],
            street: [],
            state: [],
            zipcode: [],
            additional_info: []
          };
          setTimeout(() => (this.saved = false), 2000);
        } else if (response.status === 422) {
          this.error = response.data.message;
          this.validationErrs = response.data.errors;
          setTimeout(() => (this.error = null), 4000);
        }
      }
    }
  }
};
</script>