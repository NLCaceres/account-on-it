import LandlordAPI from '../../API/LandlordAPI';

export const LANDLORD_MODULE = 'landlords';

const LandlordsAPI = new LandlordAPI();

const state = {
  landlords: [],
};

//? It's tempting to use them like Java getters, but DO NOT. Use them to compute data based on state
//? Nested/complex state = only reason to use them like Java getters (simplifies a 'this.$store.state.module.crazy.nested.data' call)
const getters = { //? Examples include filters, counts, mapped data, etc;
  getLandlordCount(state) {
    return state.landlords.length
  }
};

//? For future reference on actions & mutations (since they are called via strings)
//? Since inside a JSobj, dynamic names work! So a constants folder would help! 
//? Ex: [actionName] : [actionName] (context) {}
//? [mutationName] : [mutationName] (state, data) {}
const actions = { //? Call from view to request data for later retrieval via getters!
  async allLandlords(context) {
    context.commit('landlords', await LandlordsAPI.all().data) //? Commit handles mutations
  }
};

const mutations = {
  landlords(state, data) {
    return state.landlords = data
  }
};

//? One way to handle modules! Check tenants.js for a slightly different approach
export default {
  namespaced: true, //? Keeps it out of global scope, making it more reusable
  state,
  getters,
  actions,
  mutations
}