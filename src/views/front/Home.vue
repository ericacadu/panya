<template>
  <div class="front container-fluid g-0 min-vh-100 text-dark">
    <nav
      class="navbar navbar-expand-md navbar-light py-md-4 sticky-top"
      :class="toggleNav ? 'show' : ''"
    >
      <div class="container py-2 px-3">
        <Logo
          class="nav-brand col-3 col-md-1 me-5"
          role="button"
          @click="backHome"
        ></Logo>
        <div class="collapse navbar-collapse" :class="toggleNav ? 'show' : ''">
          <ul class="navbar-nav">
            <li class="navbar-itemdisabled">
              <router-link class="nav-link disabled" to="/"
              >關於panya</router-link>
            </li>
            <li class="navbar-item">
              <router-link class="nav-link" to="/products"
              >手感烘焙</router-link>
            </li>
            <li class="navbar-itemdisabled">
              <router-link class="nav-link disabled" to="/"
                >售後服務</router-link
              >
            </li>
          </ul>
        </div>
        <div class="nav-cart col">
          <div role="button" @click="toggleCart = !toggleCart">
            <Cart></Cart>
            <!-- <small class="mx-1">購物車</small> -->
            <span class="badge rounded-pill fw-normal ms-1" ref="chart-num">
              {{ sum }}
            </span>
          </div>
        </div>
        <button
          class="navbar-toggler col-2 border-0"
          type="button"
          @click="toggleNav = !toggleNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <CartModal
      :toggle-cart="toggleCart"
      :cart-data="cart"
      :total-price="totalPrice"
      :is-disabled="isDisabled"
      @update-carts="updateCarts"
      @delete-cart="deleteCart"
      @clear-carts="clearCarts"
      @close-cart="closeCart"
    >
    </CartModal>
    <router-view
      :is-disabled="isDisabled"
      :cart-data="cart"
      :total-price="totalPrice"
      @close-cart="closeCart"
      @open-cart="openCart"
      @add-carts="addCarts"
      @get-carts="getCarts"
    ></router-view>
    <div class="bg-dark py-5 min-vh-25 text-light">
      <div class="container">
        <router-link class="nav-link d-inline-block" to="/login">登入後台</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiCarts, apiUpdateCarts, apiAddCart, apiClearCarts, apiDeleteCart,
} from '@/scripts/api';
import CartModal from '@/components/cartModal.vue';

export default {
  components: {
    CartModal,
  },
  data() {
    return {
      toggleNav: false,
      toggleCart: false,
      cart: {},
      sum: 0,
      totalPrice: '',
      isDisabled: '',
    };
  },
  watch: {
    toggleCart() {
      if (this.toggleCart === true) {
        this.toggleNav = false;
      }
    },
  },
  methods: {
    backHome() {
      this.$router.push('/');
    },
    closeCart() {
      this.toggleCart = false;
      this.toggleNav = false;
    },
    openCart() {
      this.toggleCart = true;
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
    getCarts() {
      apiCarts()
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.cart = res.data.data;
          this.totalPrice = this.cart.final_total;
          this.getCartSum();
          this.isDisabled = '';
        });
    },
    addCarts(item, qty = 1) {
      const data = {
        product_id: item.id,
        qty,
      };
      this.isDisabled = item.id;
      apiAddCart({ data })
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
          }
          this.$pushMessage(res);
        });
    },
    updateCarts(item, qty) {
      const data = {
        product_id: item.product_id,
        qty,
      };
      if (qty <= 0) {
        this.deleteCart(item.id);
        return;
      }
      apiUpdateCarts(item.id, { data })
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
          }
          this.$pushMessage(res);
        });
    },
    deleteCart(id) {
      this.isDisabled = id;
      apiDeleteCart(id)
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
          }
          this.$pushMessage(res);
        });
    },
    clearCarts() {
      apiClearCarts()
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
          }
          this.$pushMessage(res);
        });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
<style scope lang="sass">
@import '@/assets/css/front.sass'
</style>
