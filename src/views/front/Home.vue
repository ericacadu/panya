<template>
  <div class="container-fluid">
    <div class="banner">
      <div
        class="
          container
          min-vh-65
          d-flex
          align-items-center
          justify-content-center
          flex-column
        "
      >
        <h1 class="fs-3 fw-normal ls-5 text-light">
          用天然食材，做出溫暖人心的麵包
        </h1>
        <a href="#" class="btn btn-outline-light px-5 mt-3">探索美味</a>
      </div>
    </div>
    <div class="container px-3">
      <h2 class="fs-4 text-center p-5">只有用心，才能暖心</h2>
      <div class="row g-0 bg-white">
        <div class="col p-5">
          <h3 class="fs-5">堅持天然食材</h3>
          我們堅持使用在地小農種植的天然食材
          <br />
          選用當季新鮮水果及優質麵粉
          <br />
          不使用人工香料及膨鬆劑等添加物
        </div>
        <div class="col p-5 ms-auto">
          <h3 class="fs-5">沒有負擔的美味</h3>
          選用低卡奶油，嚴格把關麵包熱量
          <br />
          尋找健康食材替代高熱量原料
          <br />
          好吃不怕胖，美味也可以零負擔
        </div>
        <div class="col p-5">
          <h3 class="fs-5">美食與美感</h3>
          我們重視美食，也重視美感
          <br />
          經過不斷嘗試與實驗，追求味蕾與視覺融合
          <br />
          用心帶給消費者加倍的幸福感
        </div>
      </div>
      <h2 class="fs-4 text-center p-5">熱銷商品</h2>
      <swiper
      class="products p-0 mb-5 fade show"
      :breakpoints='{
        "640": {
          "slidesPerView": 1,
          "spaceBetween": 0
        },
        "768": {
          "slidesPerView": 2,
          "spaceBetween": 30
        },
        "1024": {
          "slidesPerView": 3,
          "spaceBetween": 30
        }}'
        :loop="true"
        :autoplay='{
          "delay": 3000,
          "disableOnInteraction": false
        }'
      >
        <swiper-slide
          class="
            products-item
          "
          v-for="(item) in promote"
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
              @click="addToCart(item)"
            >
              加入購物車
              <Spinner :spin-item="item.id" />
            </button>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { apiAllProducts } from '@/scripts/api';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay } from 'swiper/core';

SwiperCore.use([Autoplay]);
export default {
  props: ['isDisabled'],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      products: [],
      promote: [],
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
  },
  created() {
    this.getAllProducts();
  },
  beforeMount() {
    this.$emitter.emit('page-loading', true);
  },
};
</script>

<style lang="sass" scoped>
*
  // outline: 1px solid red
</style>
