import axios from 'axios'
export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },

  getters: {
    authenticated (state) {
      return state.token && state.user
    },

    user (state) {
      return state.user
    }
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },

    SET_USER (state, data) {
      state.user = data
    }
  },

  actions: {
    async signIn ({ dispatch }, credentials) {
      let response = await axios.post('/users/login', credentials)

      return dispatch('attempt', response.data)
    },

    async attempt ({ commit }, data) {
      commit('SET_TOKEN', data.access_token)
      commit('SET_USER', data.user)
    },

    signOut ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  }
}
