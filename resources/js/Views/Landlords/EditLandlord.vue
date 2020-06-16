<template>
  <div class="ui segment container no-padding-b app-dark-accent-mid">
    <header-back-button>Edit Landlord</header-back-button>

    <form-landlord
      @edit="EditLandlord"
      @submit="UpdateLandlord"
      :saving="saving"
      :validation-errs="validationErrs"
    />

    <sui-alert-loading />
    <sui-alert-saving :saving="saving" :saved="saved" :error="error" @saved="this.saved = false;" />
  </div>
</template>
<script>
import LandlordsAPI from "../../API/LandlordAPI";
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { APP_MODULE } from "../../Store";

export default {
  data() {
    return {
      loading: false,
      saving: false,
      error: null,
      validationErrs: {
        first_name: [],
        surname: [],
        email: []
      },
      saved: false,
      landlord: {
        id: null,
        first_name: "",
        surname: "",
        email: ""
      }
    };
  },
  async created() {
    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading
    try {
      const dataReply = (await LandlordsAPI.find(this.$route.params.id)).data;
      this.landlord = dataReply[0];
    } catch (err) {
      this.error = err.response.data.message || err.message;
    }
    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading
  },
  methods: {
    setData(err, data) {
      if (err) {
        //? This check is better than (err !== null) since it actually checks all falsey vals!
        this.error = err.toString();
      } else {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false);
        this.landlord = data;
      }
    },
    EditLandlord(propName, propVal) {
      if (propName) {
        this.landlord[propName] = propVal;
      }
    },
    async UpdateLandlord() {
      this.saving = true;
      const response = await landlordsAPI.update(this.landlord.id, {
        first_name: this.landlord.first_name,
        surname: this.landlord.surname,
        email: this.landlord.email
      });
      this.saving = false;
      if (response.status === 204) {
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

<style lang="scss" scoped>
</style>
