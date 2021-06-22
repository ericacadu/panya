<template>
  <div class="container">
    <h1 class="py-3 fs-3 fw-normal text-center ls-3">PANYA 手感烘焙</h1>
    <ul class="category list-unstyled d-flex justify-content-center my-5">
      <li li class="btn btn-outline-primary mx-1 py-1 px-4"
        @click="filterProducts('all')">全部</li>
      <li class="btn btn-outline-primary mx-1 py-1 px-4"
        v-for="(item, i) in category" :key="i"
        @click="filterProducts(item)">{{ item }}</li>
    </ul>
    <ul class="products row g-3 p-0 mt-5">
      <li
        class="products-item col-10 col-md-4 mx-auto mx-md-0 mb-5 list-unstyled"
        v-for="item in filterDatas"
        :key="item.id"
      >
        <div
          class="products-img px-3"
          :style="{ 'background-image': `url(${item.imageUrl})` }"
          role="button"
          @click="goToProduct(item.id)"
        >
          <span class="sale" v-if="item.price < item.origin_price"
            >On Sale</span
          >
          <small>查看內容</small>
        </div>
        <div class="products-body p-3">
          <p
            class="products-title m-0"
            role="button"
            @click="goToProduct(item.id)"
          >
            {{ item.title }}
          </p>
          <p class="products-price mt-1">
            <span v-if="item.price < item.origin_price"
              >${{ item.price }}&nbsp;</span
            >
            <small :class="item.price < item.origin_price ? 'del' : ''"
              >${{ item.origin_price }} NTD</small
            >
          </p>
          <button
            type="button"
            class="btn btn-sm btn-outline-primary mx-auto"
            :disabled="isDisabled === item.id"
            @click="$emit('add-carts', item)"
          >
            加入購物車
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { apiProducts } from '@/scripts/api';

export default {
  props: ['isDisabled'],
  data() {
    return {
      products: [],
      category: [],
      filterDatas: [],
    };
  },
  methods: {
    getProducts() {
      apiProducts()
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            const arry = this.products.map((item) => item.category);
            const newSet = new Set(arry);
            this.category = [...newSet];
            this.filterProducts('all');
          } else {
            this.$emitter.emit('toast-message', {
              msg: res.data.message,
              theme: 'danger',
            });
          }
        })
        .catch((err) => {
          this.$emitter.emit('toast-message', { msg: err, theme: 'danger' });
        });
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    filterProducts(val) {
      this.filterDatas = this.products.filter(
        (item) => item.category === val || val === 'all',
      );
    },
  },
  mounted() {
    this.$emit('close-cart');
    this.getProducts();
  },
};
</script>
