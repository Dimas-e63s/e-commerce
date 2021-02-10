import axios from 'axios'

const API_KEY = 'AIzaSyAasHOv57O8IOhOW4gWUwNOIrI4qQESw2k'

export default {
  namespaced: true,
  state() {
    return {
      token: null
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    DELETE_TOKEN(state) {
      state.token = null
    }
  },
  getters: {
    isAuthenticated: (state) => state.token !== null
  },
  actions: {
    async authentication({ commit }, {email, password, type}) {
        console.log(process.env);
      const url = type === 'login'
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
      try {
        const { data } = await axios.post(url, {
          email,
          password,
          returnSecureToken: true
        })
        commit('SET_TOKEN', data.idToken)
      } catch (e) {
        console.log(e.message);
      }
    }
  }
}