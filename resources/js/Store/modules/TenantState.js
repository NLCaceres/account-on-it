import tenantsAPI from '../../API/TenantAPI';
import { ADD_ENTITY as PushTenant, ADD_ENTITIES as InitTenants } from '../MutationTypes';
import { ADD_ENTITY as AddTenant, ALL_ENTITIES as AllTenants } from '../ActionTypes';

const store = { namespaced: true }

store.state = {
  tenants: [],
}

store.getters = {

}

store.mutations = {
  [PushTenant](state, data) {
    state.tenants.push(data);
  },
  [InitTenants](state, data) {
    state.tenants = data;
  },
  // [ERROR](state) {
  //   state.error = true;
  //   state.success = false;
  // },
  // [NOT + ERROR](state) { //? ES6 accepts expressions for dynamic keys too!
  //   state.error = false;
  // },
  // [LOADING](state, data) {
  //   state.loading = data;
  // }
}

store.actions = {
  async [AddTenant](context, newTenant) {
    console.log("Adding new Landlord");
    const response = await tenantsAPI.create(newTenant);
    response.status ? context.commit(PushTenant, newTenant) :
      context.commit(ERROR);
    context.commit(PushTenant, newTenant);
  },
  //? Alternatively if you just need commit from the context param, ES6 obj destructuring will do the trick
  //? What else is in context? State and getters
  async [AllTenants]({ commit }) {
    console.log("Fetching All Tenants");
    commit(InitTenants, await tenantsAPI.all());
  }
}

//? Slightly different approach but most useful part is
//? the use of Constants to keep things consistant
export default store