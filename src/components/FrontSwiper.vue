<template>
  <div class="">
    <h2 class="fs-4 text-center my-5">{{ title }}</h2>
    <swiper
      class="products p-0 mb-5 "
      ref="swiper"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
    >
      <swiper-slide class="products-item" v-for="item in datas" :key="item.id">
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
              >${{ $cash(item.price) }}&nbsp;</span
            >
            <small :class="item.price < item.origin_price ? 'del' : ''"
              >${{ $cash(item.origin_price) }} NTD</small
            >
          </p>
          <button
            type="button"
            class="btn btn-sm btn-outline-primary mx-auto fs-6"
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
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay } from 'swiper/core';

SwiperCore.use([Autoplay]);
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['datas', 'isDisabled', 'title'],
  methods: {
    addToCart(item, qty = 1) {
      this.$emitter.emit('add-cart', { item, qty });
      this.$emitter.emit('toggle-spinner', { id: item.id });
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
