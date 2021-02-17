import axios from 'axios'
import ProductService from '@/services/ProductService.js'

const API_KEY = 'AIzaSyCbyGJ0gDhioBHcX6TKls67fxXW1Z4rlEM'

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
    // async authentication({ commit }, {email, password, type}) {
    //     console.log(process.env);
    //   const url = type === 'login'
    //     ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    //     : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    //   try {
    //     const { data } = await axios.post(url, {
    //       email,
    //       password,
    //       returnSecureToken: true
    //     })
    //     commit('SET_TOKEN', data.idToken)
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // },
    async login({ commit }, credentials) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      try {
        const { data } = await axios.post(url, credentials)
        const {data: userInfo} = await ProductService.getUser(data.localId)
        // commit('SET_TOKEN', data.idToken)
      } catch (e) {
        console.log(e.message);
      }
    },
    async register({ commit }, {name, ...credentials}) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
      try {
        const { data } = await axios.post(url, credentials)
        debugger
        const response = await ProductService.createUser(data.localId, {
          name,
          role: 'user'
        })
        console.log(response);
        // commit('SET_TOKEN', data.idToken)
      } catch (e) {
        console.log(e.message);
      }
    }
  }
}