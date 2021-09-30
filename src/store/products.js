import { apiAllProducts } from '@/scripts/api';

export default {
  state: {
    products: [],
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload.products.reverse();
    },
  },
  actions: {
    getAllProducts({ commit }) {
      apiAllProducts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        commit('PRODUCTS', res.data);
        commit('LOADING', false);
      }).catch((err) => {
        this.$pushMessage(err);
        commit('LOADING', false);
      });
    },
  },
  getters: {
    products: (state) => JSON.parse(JSON.stringify(state.products)),
  },
};
