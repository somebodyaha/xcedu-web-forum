const state = {
  plateList: null
}
const getters = {
  value: state => state.value
}
const mutations = {
  getPlateList (state, newVal) {
    state.plateList = newVal
  }
}
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
