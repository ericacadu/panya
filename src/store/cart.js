import { apiGetCart } from '@/scripts/api';

export default {
  state: {
    carts: [],
  },
  mutations: {
    CART(state, payload) {
      state.carts = payload.products.reverse();
    },
  },
  actions: {
    getCart({ commit }) {
      apiGetCart().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        commit('CART', res.data);
      }).catch((err) => {
        this.$pushMessage(err);
      });
    },
  },
  getters: {
    carts: (state) => JSON.parse(JSON.stringify(state.carts)),
  },
};
