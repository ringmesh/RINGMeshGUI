export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    add(state, geomodel) {
      state.data.push(geomodel)
    }
  },
  getters: {
    geomodels(state) {
      return state.data
    }
  }
}
