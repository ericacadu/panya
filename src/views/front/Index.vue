<template>
  <div class="front container-fluid g-0 min-vh-100 text-dark">
    <Navbar
      :datas="datas"
    />
    <router-view class="min-vh-100"
      :datas="datas"
    />
    <div class="bg-dark py-5 min-vh-25 text-light">
      <div class="container">
        <router-link class="nav-link d-inline-block" to="/login"
          >登入後台</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/FrontNavbar.vue';
import { apiGetCart, apiAddCart } from '@/scripts/api';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      datas: {
        cart: {},
        sum: '',
        total: '',
      },
    };
  },
  methods: {
    getCart() {
      apiGetCart().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        this.datas.cart = res.data.data;
        this.datas.total = this.datas.cart.final_total;
        this.getCartum();
        this.$emitter.emit('send-cart', {
          cart: this.datas.cart,
          total: this.datas.cart.final_total,
        });
        this.$emitter.emit('page-loading', false);
      });
    },
    getCartum() {
      this.datas.sum = 0;
      this.datas.cart.carts.forEach((item) => {
        this.datas.sum += item.qty;
      });
      const num = document.getElementById('cart-num');
      num.classList.add('active');
      window.setTimeout(() => {
        num.classList.remove('active');
      }, 1000);
    },
    addCart(item, qty = 1) {
      const data = {
        product_id: item.id,
        qty,
      };
      apiAddCart({ data }).then((res) => {
        if (res.data.success) {
          this.getCart();
        }
        this.$pushMessage(res);
      });
    },
  },
  created() {
    this.getCart();
  },
  mounted() {
    this.$emitter.on('add-cart', (res) => {
      const { item, qty } = res;
      this.addCart(item, qty);
    });
    this.$emitter.on('get-cart', () => {
      this.getCart();
    });
  },
};
</script>
<style scope lang="sass">
@import '@/assets/css/front'
</style>
