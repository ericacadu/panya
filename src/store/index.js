import { createStore } from 'vuex';
import productsModules from './products';

export default createStore({
  strict: true,
  state: {
    isLoading: true,
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  actions: {
    updateLoading({ commit }, status) {
      commit('LOADING', status);
    },
  },
  modules: {
    productsModules,
  },
});
