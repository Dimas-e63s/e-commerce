import { format } from '@/utils/formatter.js';
import ProductService from '@/services/ProductService';
export default {
  namespaced: true,
  state: {
    categories: []
  },
  getters: {
    categories: state => state.categories,
    getCategoryIdxById: state => id =>
      state.categories.findIndex(cat => cat.id == id)
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_CATEGORY(state, category) {
      state.categories.push(category);
    },
    DELETE_CATEGORY(state, idx) {
      state.categories.splice(idx, 1);
    }
  },
  actions: {
    async loadCategories({ commit }) {
      try {
        const { data } = await ProductService.getCategories();
        commit('SET_CATEGORIES', format(data));
      } catch (e) {
        console.log(e.message);
      }
    },
    async addCategory({ commit }, category) {
      try {
        const { data } = await ProductService.createCategory(category);
        commit('SET_CATEGORY', format(data));
      } catch (e) {
        console.log(e.message);
      }
    },
    async deleteCategory({ commit, getters }, id) {
      try {
        await ProductService.deleteCategory(id);
        const idx = getters.getCategoryIdxById(id);
        commit('DELETE_CATEGORY', idx);
      } catch (e) {
        console.log(e.message);
      }
    }
  }
};
