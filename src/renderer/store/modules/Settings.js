export default {
  namespaced: true,
  state: {
    ringmeshPath: ""
  },
  mutations: {
    set_ringmesh_path(state, path) {
      state.ringmeshPath = path
    }
  },
  getters: {
    ringmeshPath(state) {
      return state.ringmeshPath
    }
  }
}
