<template>
  <div class="container-fluid">
    <div class="product container d-md-flex px-3 pb-5">
      <div class="product-photos col-md-5 d-flex flex-wrap p-3 p-md-0">
        <div class="photo-lg col-12">
          <span :style="{ 'background-image': `url(${enterImage})` }"></span>
        </div>
        <div
          class="photo-sm col-4"
          role="button"
          v-for="(img, key) in product.imagesUrl"
          :key="key"
          :class="img === enterImage ? 'active' : ''"
          @mouseover="enterImage = img"
          @click="enterImage = img"
        >
          <span :style="{ 'background-image': `url(${img})` }"></span>
        </div>
      </div>
      <div class="product-content col text-center text-md-start" v-if="product.title">
        <small class="path d-block mb-4">首頁 / 手感烘焙 / {{ product.category }}</small>
        <h1>{{ product.title }}</h1>
        <p class="product-desc mb-5">{{ product.description }}</p>
        <p class="product-price">
            <span v-if="product.price < product.origin_price"
              >${{ product.price }}</span
            >
            <small :class="product.price < product.origin_price ? 'del' : ''"
              >$&nbsp;{{ product.origin_price }}&nbsp;NTD</small
            >
            <small class="fs-7 ms-2 text-secondary">/ {{ product.unit }}</small>
          </p>
        <div class="product-btns col-md-9 d-md-flex">
          <input
            type="number"
            min="1"
            class="form-control panya-input text-center text-md-start"
            v-model.number="product.qty"
          />
          <button
            class="btn btn-primary col-12 col-md-7 ms-md-2 p-3 mt-3 mt-md-0"
            type="button"
            @click="$emit('add-carts', product, product.qty)"
            :disabled="isDisabled === product.id"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <div class="product-info bg-light">
      <div class="container p-3 p-md-5">
        <h2 class="fs-4">常見問題</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetProduct } from '@/scripts/api';

export default {
  props: ['isDisabled'],
  data() {
    return {
      product: {},
      enterImage: '',
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      apiGetProduct(id)
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.product = res.data.product;
          this.product.qty = 1;
          const { 0: img } = this.product.imagesUrl;
          this.enterImage = img;
          document.title = `${this.product.title} - PANYA`;
          this.$emitter.emit('change-status', false);
        });
    },
  },
  beforeCreate() {
    this.$emitter.emit('change-status', true);
  },
  created() {
    this.getProduct();
  },
  mounted() {
    this.$emit('close-cart');
  },
};
</script>
