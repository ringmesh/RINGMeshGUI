export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    add_geomodel(state, geomodel) {
      state.data.push(geomodel)
    }
  },
  getters: {
    geomodels(state) {
      return state.data
    }
  }
}
