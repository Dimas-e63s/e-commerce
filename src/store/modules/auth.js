import axios from 'axios';
import ProductService from '@/services/ProductService.js';

const API_KEY = 'AIzaSyCbyGJ0gDhioBHcX6TKls67fxXW1Z4rlEM';
const TOKEN_KEY = 'jwt-token';
const EXPIRES_KEY = 'jwt-expiresIn';
const REFRESH_KEY = 'jwt-refreshToken';

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      expiresDate: new Date(localStorage.getItem(EXPIRES_KEY)),
      refreshToken: localStorage.getItem(REFRESH_KEY),
      user: JSON.parse(localStorage.getItem('user')) ?? {}
    };
  },
  mutations: {
    SET_TOKEN(state, { refreshToken, idToken, expiresIn = 3600 }) {
      const expiresDate = new Date(
        new Date().getTime() + Number(expiresIn) * 1000
      );
      state.token = idToken;
      state.refreshToken = refreshToken;
      state.expiresDate = expiresDate;
      localStorage.setItem(TOKEN_KEY, idToken);
      localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
      localStorage.setItem(REFRESH_KEY, refreshToken);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    LOGOUT(state) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(EXPIRES_KEY);
      localStorage.removeItem('user');
      state.token = null;
      state.expiresDate = null;
      state.refreshToken = null;
      state.user = {};
    }
  },
  getters: {
    isAuthenticated: (_, getters) => !!getters.token,
    isExpired: state => new Date() >= state.expiresDate,
    refreshToken: state => state.refreshToken,
    token: state => state.token,
    isAdmin: state => state.user.role === 'admin',
    userId: state => state.user.localId
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
      try {
        const { data } = await axios.post(url, {
          ...credentials,
          returnSecureToken: true
        });
        commit('SET_TOKEN', data);
        await dispatch('getUser', data.localId);
      } catch (e) {
        console.log(e.message);
      }
    },
    async getUser({ commit }, localId) {
      try {
        const { data } = await ProductService.getUser(localId);
        console.log('User Info', data);
        commit('SET_USER', { ...data, localId });
      } catch (e) {
        console.log(e.message);
      }
    },
    async refresh({ commit, getters }) {
      const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`;
      try {
        const { data } = await axios.post(url, {
          grant_type: 'refresh_token',
          refresh_token: getters.refreshToken
        });
        commit('SET_TOKEN', {
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async register({ commit, dispatch }, { name, ...credentials }) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`;
      try {
        const { data } = await axios.post(url, {
          ...credentials,
          returnSecureToken: true
        });
        commit('SET_TOKEN', data);
        await dispatch('createUser', {
          name,
          email: data.email,
          localId: data.localId
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    async createUser({ commit }, { localId, name, email }) {
      try {
        const { data } = await ProductService.createUser(localId, {
          name,
          email,
          role: 'user'
        });
        commit('SET_USER', { ...data, localId });
      } catch (e) {
        console.log(e.message);
      }
    }
  }
};
