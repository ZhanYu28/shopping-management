import mockRequest from '@/utils/mock-request'
const state = {
  homeData: {}
}

const mutations = {
  GETDATA(state, data) {
    state.homeData = data
  }
}

const actions = {
  async getData({ commit }) {
    const result = await mockRequest({ url: '/vue-admin-template/home', method: 'get' })

    if (result.code == 20000) {
      commit('GETDATA', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取home数据失败'))
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
