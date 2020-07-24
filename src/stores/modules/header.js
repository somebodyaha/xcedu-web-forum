const state = {
  plateList: null,
  noticeNum: 0,
  adminState: false,
  flushFlag: 0
}
const getters = {
  value: state => state.value,
  noticeNum: state => state.noticeNum
}
const mutations = {
  getAdminState (state, newVal) {
    state.adminState = newVal
  },
  getPlateList (state, newVal) {
    state.plateList = newVal
  },
  getNoticeNum (state, newVal) {
    state.noticeNum = newVal
  },
  getFlushFlag (state, newVal) {
    state.flushFlag = newVal
  }
}
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
