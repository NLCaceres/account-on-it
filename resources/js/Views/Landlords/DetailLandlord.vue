<template>
  <div>
    <header-back-button breadcrumb reverse :headerClasses="[mobile ? 'm-sm-l' : 'm-md-l']">
      {{IsYours}} Details
    </header-back-button>

    <model-display :entity="landlord" entity-name="Landlord" class="m-lg-b" />

    <button type="button" class="ui inverted button app-blue m-md-l"
      @click="addingTenant = !addingTenant">{{AddOrCancelTenant}}</button>

    <transition name="fade" mode="out-in">
      <div v-if="!addingTenant" id="landlord-tenant-table"
        key="landlord-tenant-table" class="m-md-t">
          <h1>{{IsYours}} Tenants</h1>
          <model-table :entities="tenants" entity-name="Tenant" plural-entity="Tenants" />
      </div>
      <div v-else id="landlord-tenant-form" key="landlord-tenant-form" class="m-sm-y">
        <h1>New Tenant</h1>
        <model-form new-entity :entity="newTenant" entity-name="Tenant"
          @edit="CallTenantAPI"/>
      </div>
    </transition>

    <button type="button" class="ui inverted button app-blue m-md-t m-md-l" 
      @click="addingProperty = !addingProperty">{{AddOrCancelProperty}}</button>

    <transition name="fade" mode="out-in">
      <div key="landlord-property-table" class="m-md-y" v-if="!addingProperty">
        <h1>{{IsYours}} Properties</h1>
        <model-table :entities="properties" entity-name="Property" plural-entity="Properties" />
      </div>
      <div key="landlord-property-form" class="m-md-y" v-else>
        <h1>New Property</h1>
        <model-form new-entity :entity="newProperty" entity-name="Tenant"
          @edit="CallPropertyAPI" />
      </div>
    </transition>
  </div>
</template>
<script lang='ts'>
import { AxiosResponse } from 'axios';
import Vue from 'vue';
import { landlordAPI } from "../../API/LandlordAPI";
import { APP_MODULE } from "../../Store/modules/AppState";
import store from "../../Store";
import { BEGIN_LOAD } from '../../Store/ActionTypes';
import Landlord, { LandlordDetailResponse } from '../../Models/LandlordClass';
import { PreloadVue } from '../../Models/InterfaceVueViews';
import Tenant from '../../Models/TenantClass';
import Property from '../../Models/PropertyClass';
import { AUTH_MODULE } from '../../Store/modules/AuthenticationState';
import { IS_ADMIN, MOBILE_WIDTH } from '../../Store/GetterTypes';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data() {
    return {
      error: null as string | null,
      saved: false,
      landlord: new Landlord("", "", "") as Landlord,
      tenants: [] as Tenant[],
      addingTenant: false,
      newTenant: new Tenant("", "", "") as Tenant,      
      addingProperty: false,
      properties: [] as Property[],
      newProperty: new Property("","","","","") as Property,
    };
  },
  computed: {
    ...mapGetters(APP_MODULE, {mobile: MOBILE_WIDTH}),
    IsYours(): string {
      return this.$store.getters[`${AUTH_MODULE}/${IS_ADMIN}`] 
        ? `${this.landlord.first_name} ${this.landlord.surname}'s` 
        : "Your"
    },
    AddOrCancelTenant(): string {
      return this.addingTenant ? "Cancel New Tenant" : "Add New Tenant";
    },
    AddOrCancelProperty(): string {
      return this.addingProperty ? "Cancel New Property" : "Add New Property";
    }
  },
  async beforeRouteEnter(to, from, next) {
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading
      
    landlordAPI.GetByID(parseInt(to.params.id), (data, err) => {
      if ((data as AxiosResponse)?.status === 403) {
        next(false);
      } else {
        next((vm => (vm as PreloadVue).SetData(data, err)))
      }
    });
  },
  methods: {
    SetData(data?: LandlordDetailResponse, err?: Error) {
      if (err) this.error = err.toString();
      else if (data) {
        this.tenants = data.tenants; 

        this.properties = data.properties;

        this.landlord = data.landlord as Landlord;

        // this.landlord = data['landlord'] as Landlord; //? Originall done this way since IDE guesses wrong
      }
    }
  }
});
</script>
