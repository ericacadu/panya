<template>
  <div class="overlay" :class="toggleCart">
    <div
      class="cart col-12 col-md-4 flex-column justify-content-start"
      :class="toggleCart"
    >
      <div
        class="
          cart-header
          p-4
          d-flex
          justify-content-between
          align-items-center
        "
      >
        <small class="ls-5">購物車</small>
        <div class="close-btn" role="button" @click="closeCart"></div>
      </div>
      <div class="cart-body p-4">
        <div
          class="
            min-vh-50
            d-flex
            flex-column
            align-items-center
            justify-content-center
            text-secondary
          "
          v-if="!total"
        >
          <span class="material-icons mb-2 fs-2"> announcement </span>
          <p class="fs-7" style="letter-spacing: 2px">購物車內沒有商品</p>
          <router-link
            class="btn btn-primary py-2 px-4"
            to="/products?category=all&page=1"
            @click="closeCart"
            >挑選商品</router-link
          >
        </div>
        <ul class="list-unstyled" v-else>
          <li
            class="d-flex align-items-center mb-3"
            v-for="item in cart.carts"
            :key="item"
          >
            <div
              class="cart-img"
              :style="{ 'background-image': `url(${item.product.imageUrl})` }"
            ></div>
            <div class="cart-cont col px-3">
              <p class="m-0">{{ item.product.title }}</p>
              <span class="d-block" style="letter-spacing: 1px"
                >$ {{ item.product.price }} NTD</span
              >
              <small
                class="text-muted fs-7"
                role="button"
                @click="deleteCart(item.id)"
                >刪除商品</small
              >
            </div>
            <div class="cart-qty col-2">
              <input
                type="number"
                min="1"
                max="10"
                class="form-control"
                v-model.number="item.qty"
                @blur="updateCart(item, item.qty)"
              />
            </div>
          </li>
        </ul>
      </div>
      <div class="cart-footer" v-if="total">
        <p class="cart-count d-flex justify-content-between p-4">
          <span>總計</span>
          <span>$ {{ total }} NTD</span>
        </p>
        <p class="p-4 pt-0 text-center">
          <button
            type="button"
            class="btn col-12 btn-light p-3"
            @click="checkout"
          >
            確認結帳
          </button>
          <button
            class="btn btn-outline-secondary mx-auto mt-3 fs-7"
            type="button"
            @click="clearCart"
          >
            清空購物車
          </button>
        </p>
      </div>
    </div>
    <div class="overlay-inner" @click="closeCart"></div>
  </div>
</template>

<script>
import { apiUpdateCart, apiClearCart, apiDeleteCart } from '@/scripts/api';

export default {
  data() {
    return {
      cart: {},
      total: '',
      toggleCart: '',
    };
  },
  methods: {
    closeCart() {
      this.toggleCart = false;
    },
    checkout() {
      this.$router.push('/checkorder');
      this.toggleCart = false;
    },
    updateCart(item, qty) {
      const data = {
        product_id: item.product_id,
        qty,
      };
      if (qty <= 0) {
        this.$pushMessage(false, '商品數量不可為0');
        return;
      }
      apiUpdateCart(item.id, { data }).then((res) => {
        if (res.data.success) {
          this.$emitter.emit('get-cart');
        }
        this.$pushMessage(res);
      });
    },
    deleteCart(id) {
      apiDeleteCart(id).then((res) => {
        if (res.data.success) {
          this.$emitter.emit('get-cart');
        }
        this.$pushMessage(res);
      });
    },
    clearCart() {
      apiClearCart().then((res) => {
        if (res.data.success) {
          this.$emitter.emit('get-cart');
        }
        this.$pushMessage(res);
      });
    },
  },
  mounted() {
    this.$emitter.on('send-cart', (val) => {
      const { cart, total } = val;
      this.cart = cart;
      this.total = total;
    });
    this.$emitter.on('toggle-cart', (val) => {
      if (val) {
        this.toggleCart = 'show';
      } else {
        this.toggleCart = '';
      }
    });
  },
};
</script>
