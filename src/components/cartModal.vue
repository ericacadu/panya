<template>
  <div
    class="cart col-12 col-md-4 flex-column justify-content-start"
    ref="cartModal"
    :class="toggleCart ? 'show' : ''"
  >
    <div
      class="cart-header p-4 d-flex justify-content-between align-items-center"
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
        v-if="!totalPrice"
      >
        <span class="material-icons mb-2 fs-2"> announcement </span>
        <p class="fs-7" style="letter-spacing: 2px">購物車內沒有商品</p>
        <router-link
          class="btn btn-primary py-2 px-4"
          to="/products?category=all&page=1"
          @click="$emit('close-cart')"
          >挑選商品</router-link
        >
      </div>
      <ul class="list-unstyled" v-else>
        <li
          class="d-flex align-items-center mb-3"
          v-for="item in cart.carts"
          :key="item"
        >
          <div class="cart-img">
            <img :src="item.product.imageUrl" />
          </div>
          <div class="cart-cont col px-3">
            <p class="m-0">{{ item.product.title }}</p>
            <span class="d-block" style="letter-spacing: 1px"
              >$ {{ item.product.price }} NTD</span
            >
            <small
              class="text-muted fs-7"
              role="button"
              @click="$emit('delete-cart', item.id)"
              >刪除商品</small
            >
          </div>
          <div class="cart-qty col-2">
            <input
              type="number"
              min="0"
              class="form-control"
              v-model.number="item.qty"
              @blur="$emit('update-carts', item, item.qty)"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-footer" v-if="totalPrice">
      <p class="cart-count d-flex justify-content-between p-4">
        <span>總計</span>
        <span>$ {{ totalPrice }} NTD</span>
      </p>
      <p class="p-4 pt-0 text-center">
        <button type="button" class="btn col-12 btn-light p-3"
        @click="checkout">確認結帳</button>
        <button
          class="btn btn-outline-secondary mx-auto mt-3 fs-7 "
          type="button"
          @click="$emit('clear-carts')"
        >
          清空購物車
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['toggleCart', 'cartData', 'totalPrice', 'isDisabled'],
  data() {
    return {
      cart: {},
    };
  },
  methods: {
    closeCart() {
      this.$refs.cartModal.classList.remove('show');
      this.$emit('close-cart');
    },
    checkout() {
      this.$router.push('/checkorder');
      this.$emit('close-cart');
    },
  },
  watch: {
    cartData() {
      this.cart = this.cartData;
      this.cart.carts.reverse();
    },
  },
  mounted() {
    this.cart = this.cartData;
  },
};
</script>
