<template>
  <div>
    <header-back-button breadcrumb reverse :headerClasses="[desktop ? 'm-0-l' : 'm-sm-l']">
      Tenant Details
    </header-back-button>

    <model-display :entity="tenant" entity-name="Tenant" :side-info="SideInfo" 
      :class="[{'flexed-auto m-md-l': mobile, 'm-lg-l': desktop }]" :style="[MobileHeight]">
        Basic Information
      <template #main-info>
        <div class="m-xs-t m-md-l">
          <h3 class="border-slim-b-white">Name: </h3>
          <h3 class="m-sm-l">{{ tenant.first_name + " " + tenant.surname }}</h3>
        </div>
        <div class="m-sm-t m-md-l">
          <h3 class="border-slim-b-white">Email: </h3>
          <h3 class="m-sm-l">{{ tenant.email }}</h3>
        </div>
      </template>
    </model-display>
    
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import store from "../../Store";
import { AxiosResponse } from 'axios';
import { tenantAPI } from "../../API/TenantAPI";
import { APP_MODULE } from '../../Store/modules/AppState';
import { BEGIN_LOAD } from '../../Store/ActionTypes';
import { PreloadVue } from '../../Models/InterfaceVueViews';
import Tenant, { TenantDetailResponse } from '../../Models/TenantClass';
import cloneDeep from 'lodash/cloneDeep';
import { mapGetters } from 'vuex';
import { GENERAL_DESKTOP_WIDTH, MOBILE_WIDTH } from '../../Store/GetterTypes';

export default Vue.extend({
  data() {
    return {
      tenant: new Tenant("","","") as Tenant,
      error: null as string | null
    };
  },
  async beforeRouteEnter(to, from, next) {
    store.dispatch(`${APP_MODULE}/${BEGIN_LOAD}`, true); //* Start loading
      
    tenantAPI.GetByID(parseInt(to.params.id), (data, err) => {
      if ((data as AxiosResponse)?.status === 403) {
        next(false);
      } else {
        next((vm => (vm as PreloadVue).SetData(data, err)))
      }
    });
  },
  computed: {
    SideInfo(): object {
      const tenantClone: any = cloneDeep(this.tenant);
      delete tenantClone.first_name; delete tenantClone.surname; delete tenantClone.email;
      return tenantClone as object;
      return {};
    },
    ...mapGetters(APP_MODULE, {mobile: MOBILE_WIDTH, desktop: GENERAL_DESKTOP_WIDTH}),
    MobileHeight(): string { return this.mobile ? 'height: 200px' : '';},
  },
  methods: {
    SetData(data?: TenantDetailResponse, err?: Error) {
      if (err) this.error = err.toString();
      else if (data) {
        this.tenant = data["tenant"] as Tenant;
      }
    },
  }
});
</script>
<style lang="scss" scoped>
h3 {
  margin-top: 0em;
  margin-bottom: 0em;
  display: inline-flex
}
</style>