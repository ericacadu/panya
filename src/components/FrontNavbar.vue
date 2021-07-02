<template>
  <nav class="navbar navbar-expand-md navbar-light sticky-top"
    :class="toggleNav ? 'show' : '' ">
    <div class="container py-2 px-3 text-secondary">
      <router-link to="/">
        <Logo class="nav-brand col-3 col-md-1 me-5" role="button"></Logo>
      </router-link>
      <div class="collapse navbar-collapse"
        :class="toggleNav ? 'show' : '' ">
        <ul class="navbar-nav">
          <li class="navbar-itemd">
            <router-link class="nav-link" to="/about"
              @click="toggleNav = fale">關於panya</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/products?category=all&page=1"
              @click="toggleNav = fale">手感烘焙</router-link
            >
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/service"
              @click="toggleNav = fale">售後服務</router-link>
          </li>
        </ul>
      </div>
      <div class="nav-cart col"
        @click="$emitter.emit('toggle-cart', true),
                toggleNav = fale">
        <div role="button">
          <Cart></Cart>
          <!-- <small class="mx-1">購物車</small> -->
          <span class="badge rounded-pill fw-normal ms-1" ref="chart-num">
            {{ sum }}
          </span>
        </div>
      </div>
      <button class="navbar-toggler col-2 border-0" type="button"
        @click="toggleNav = !toggleNav">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <CartModal />
  </nav>
</template>

<script>
import CartModal from '@/components/FrontCartModal.vue';
import { apiCarts, apiAddCart } from '@/scripts/api';

export default {
  components: {
    CartModal,
  },
  data() {
    return {
      cart: {},
      sum: 0,
      toggleNav: false,
    };
  },
  methods: {
    getCarts() {
      apiCarts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        this.cart = res.data.data;
        this.getCartSum();
        this.isDisabled = '';
        this.$emitter.emit('get-cart', {
          cart: this.cart,
          total: this.cart.final_total,
        });
        this.$emitter.emit('page-loading', false);
      });
    },
    getCartSum() {
      this.sum = 0;
      this.cart.carts.forEach((item) => {
        this.sum += item.qty;
      });
      this.$refs['chart-num'].classList.add('active');
      window.setTimeout(() => {
        this.$refs['chart-num'].classList.remove('active');
      }, 1000);
    },
    addCarts(item, qty = 1) {
      const data = {
        product_id: item.id,
        qty,
      };

      apiAddCart({ data }).then((res) => {
        if (res.data.success) {
          this.getCarts();
        }
        this.$pushMessage(res);
      });
    },
  },
  mounted() {
    this.$emitter.on('add-cart', (res) => {
      const { item, qty } = res;
      this.addCarts(item, qty);
    });
    this.$emitter.on('update-cart', () => {
      this.getCarts();
    });
  },
  created() {
    this.getCarts();
  },
};
</script>
