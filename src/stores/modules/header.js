const state = {
  plateList: null,
  noticeNum: 0
}
const getters = {
  value: state => state.value,
  noticeNum: state => state.noticeNum
}
const mutations = {
  getPlateList (state, newVal) {
    state.plateList = newVal
  },
  getNoticeNum (state, newVal) {
    state.noticeNum = newVal
  }
}
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
