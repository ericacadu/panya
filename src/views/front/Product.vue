<template>
  <div class="container-fluid">
    <div class="product container d-md-flex px-3 pb-5 fade-out">
      <div class="product-photos col d-flex flex-wrap p-3 p-md-0">
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
      <div class="product-content col-md-6 text-center text-md-start" v-if="product.title">
        <small class="path d-block mb-4">
          <router-link to="/">首頁</router-link>
          &nbsp;/&nbsp;
          <router-link to="/products">手感烘焙</router-link>
          &nbsp;/&nbsp;{{ product.category }}
          </small>
        <h1>{{ product.title }}</h1>
        <p class="product-desc">{{ product.description }}</p>
        <p class="text-secondary m-0" v-if="product.content">
          重量：{{ product.content }}
        </p>
        <p class="product-price mt-4">
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
            :disabled="isDisabled === product.id"
            @click="addToCart(product, product.qty)"
          >
            加入購物車
            <Spinner :spin-item="product.id"/>
          </button>
        </div>
      </div>
    </div>
    <div class="product-info row g-0 fade-out">
      <div class="container min-vh-60 p-5">
        <h2 class="fs-5 text-primary">售後服務</h2>
      </div>
      <div class="bg-service col-5 min-vh-60" style="background-image: url('https://images.pexels.com/photos/2930966/pexels-photo-2930966.jpeg?w=1280')">
      </div>
    </div>
    <div class="container">
      <FrontSwiper
        :datas="promote"
        :is-disabled="isDisabled"
        title="相關商品"
      />
    </div>
    <div id="target" class="position-fixed vw-100 bottom-10 border border-danger"></div>
  </div>
</template>

<script>
import { apiAllProducts, apiGetProduct } from '@/scripts/api';
import FrontSwiper from '@/components/FrontSwiper.vue';

export default {
  props: ['isDisabled'],
  components: {
    FrontSwiper,
  },
  data() {
    return {
      products: [],
      product: {},
      promote: [],
      enterImage: '',
    };
  },
  methods: {
    getAllProducts() {
      apiAllProducts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        this.products = res.data.products.reverse();
        this.promote = this.products.filter((item) => item.is_promote);
        this.$emitter.emit('page-loading', false);
      });
    },
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
          // this.$emitter.emit('page-loading', false);
        });
    },
    addToCart(item, qty) {
      this.$emitter.emit('add-cart', { item, qty });
      this.$emitter.emit('toggle-spinner', { id: item.id });
    },
    fadeInEvent() {
      const all = document.querySelectorAll('.fade-out');
      const { innerHeight } = window;
      return {
        onLoad: () => {
          all[0].classList.add('fade-in');
        },
        onScroll: () => {
          const targetPos = document.getElementById('target').offsetTop;
          const windowY = window.scrollY;
          all.forEach((item) => {
            if (windowY + targetPos - item.offsetTop >= innerHeight - targetPos) {
              item.classList.add('fade-in');
            }
          });
        },
      };
    },
  },
  beforeCreate() {
    this.$emitter.emit('page-loading', true);
  },
  created() {
    this.getProduct();
    this.getAllProducts();
  },
  updated() {
    this.fadeInEvent().onLoad();
  },
  mounted() {
    window.addEventListener('scroll', this.fadeInEvent().onScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.fadeInEvent().onScroll);
  },
};
</script>

<style lang="sass" scoped>
*
  // outline: 1px solid red
</style>
