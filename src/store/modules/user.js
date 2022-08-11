import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    routes: [],
    buttons: [],
    resultAsyncRoutes: [],
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, data) => {
    state.avatar = data.avatar
    state.name = data.name
    state.roles = data.roles
    state.routes = data.routes
    state.buttons = data.buttons
  },
  SET_RESULTASYNCROUTES: (state, resultAsyncRoutes) => {
    state.resultAsyncRoutes = resultAsyncRoutes
  },
  SET_RESULTALLROUTES: (state, resultAllRoutes) => {
    state.resultAllRoutes = resultAllRoutes
    router.addRoutes(state.resultAsyncRoutes)
    router.addRoutes(anyRoutes)
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    if (result.code === 200 || result.code === 20000) {
      const { data } = result
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('登录失败'))
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        commit('SET_INFO', data)
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, state.routes))
        commit('SET_RESULTALLROUTES', constantRoutes.concat(state.resultAsyncRoutes, anyRoutes))
        // commit('SET_RESULTALLROUTES',state['resultAsyncRoutes'].concat(anyRoutes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

// 计算出用户拥有的权限路由
function computedAsyncRoutes(asyncRoutes, routes) {
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) !== -1) {
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

