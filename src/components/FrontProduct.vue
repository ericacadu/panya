<template>
  <li
    class="products-item col-10 col-md-4 mx-auto mx-md-0 mb-5 fade-out"
    v-for="item in filterDatas"
    :key="item.id"
  >
    <div
      class="products-img px-3"
      :style="{ 'background-image': `url(${item.imageUrl})` }"
      role="button"
      @click="$router.push(`/product/${item.id}`)"
    >
      <span class="sale" v-if="item.price < item.origin_price">On Sale</span>
      <small>查看內容</small>
    </div>
    <div class="products-body p-3">
      <p class="products-title m-0" role="button" @click="goToProduct(item.id)">
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
        :disabled="isDisabled === item.id || item.is_max"
        @click="addToCart(item)"
      >
        加入購物車
        <Spinner :spin-item="item.id" />
      </button>
      <small class="d-block text-danger mt-1" v-if="item.is_max">已達可購買最大數量</small>
    </div>
  </li>
</template>

<script>
export default {
  props: ['filterDatas', 'isDisabled'],
  emits: ['add-cart', 'toggle-spinner'],
  methods: {
    addToCart(item, qty = 1) {
      this.$emitter.emit('add-cart', { item, qty });
      this.$emitter.emit('toggle-spinner', { id: item.id });
    },
  },
};
</script>
