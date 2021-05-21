<template>
  <div class="ui segment container p-0-b app-dark-accent-dark">
    <header-back-button>Edit Landlord</header-back-button>

    <landlord-form
      @edit="EditLandlord"
      @submit="UpdateLandlord"
      :saving="saving"
      :validation-errs="validationErrs"
    />

    <sui-alert-loading />
    <sui-alert-saving />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import LandlordsAPI from "../../API/LandlordAPI";
import LandlordForm from './FormLandlord.vue';
import { BEGIN_LOAD } from "../../Store/ActionTypes";
import { APP_MODULE } from "../../Store/modules/AppState";
import Landlord from '../../Models/LandlordClass';
import { LaravelDetailResponse } from '../../Models/InterfaceLaravelResponse';

export default Vue.extend({
  //! Local Components: 
  components: {
    'landlord-form': LandlordForm
  },
  data() {
    return {
      loading: false,
      saving: false,
      error: null as string | null,
      validationErrs: {
        first_name: [],
        surname: [],
        email: []
      },
      saved: false,
      landlord: {
        id: undefined,
        first_name: "",
        surname: "",
        email: ""
      } as Landlord
    };
  },
  async created() {
    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading
    try {
      const landlordAPI = new LandlordsAPI();
      const dataReply = await landlordAPI.GetByID(parseInt(this.$route.params.id));
      this.landlord = dataReply as Landlord;
    } catch (err) {
      this.error = err.response.data.message || err.message;
    }
    this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false); //* Stop loading
  },
  methods: {
    setData(data?: LaravelDetailResponse<Landlord>, err?: Error) {
      if (err) {
        //? This check is better than (err !== null) since it actually checks all falsey vals!
        this.error = err.toString();
      } else if (data) {
        this.$store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, false);
        this.landlord = data.data;
      }
    },
    EditLandlord(propName: string, propVal: any) {
      if (propName) {
        this.landlord[propName] = propVal ;
      }
    },
    async UpdateLandlord() {
      this.saving = true;
      const landlordAPI = new LandlordsAPI();
      if (this.landlord.id) {
        const response = await landlordAPI.Update(this.landlord.id, {
          first_name: this.landlord.first_name,
          surname: this.landlord.surname,
          email: this.landlord.email
        });
        this.saving = false;
        if (response) { //* Alternatively check if 204 status 
          this.saved = true;
          this.validationErrs = { first_name: [], surname: [], email: [] };
          //* 2 second saved notification below
          setTimeout(() => (this.saved = false), 2000); //? Oddly 'this' refers to the vue instance here! Not true elsewhere
        } else { //* Alternatively check if 422 status
          this.error = 'Sorry unable to update! It might be an internet problem!' //response.data.message;
          //this.validationErrs = response.data.errors;
          setTimeout(() => (this.error = null), 4000); //* 4 Second error display
        }
      }
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
