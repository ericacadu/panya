import { createStore } from 'vuex';
import { apiAllProducts } from '@/scripts/api';

export default createStore({
  strict: true,
  state: {
    isLoading: true,
    products: [],
  },
  actions: {
    updateLoading({ commit }, status) {
      commit('LOADING', status);
    },
    getAllProducts({ commit }) {
      apiAllProducts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        commit('PRODUCTS', res);
        commit('LOADING', false);
      }).catch((err) => {
        this.$pushMessage(err);
        commit('LOADING', false);
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload.data.products.reverse();
    },
  },
});
