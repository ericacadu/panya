<template>
  <div class="container">
    <h1 class="py-3 fs-3 fw-normal text-center ls-3">PANYA 手感烘焙</h1>
    <ul class="category list-unstyled d-flex justify-content-center mt-4">
      <li
        li
        class="btn btn-outline-primary py-1 px-4"
        :class="isActive === 'all' ? 'active' : ''"
        @click="getProducts(1), (isActive = 'all')"
      >
        全部
      </li>
      <li
        class="btn btn-outline-primary py-1 ms-1 px-4"
        v-for="(item, i) in category"
        :key="i"
        :class="isActive === item ? 'active' : ''"
        @click="filterProducts(item), (isActive = item)"
      >
        {{ item }}
      </li>
    </ul>
    <ul class="products row g-0 g-md-3 p-0 mt-5">
      <li
        class="
          products-item
          col-10 col-md-4
          mx-auto mx-md-0
          mb-5
          list-unstyled
        "
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
    <Pagination
      v-if="filterDatas === products"
      :pages="pages"
      @get-products="getProducts"
    ></Pagination>
  </div>
</template>

<script>
import { apiProducts, apiAllProducts } from '@/scripts/api';
import { scrollTop } from '@/scripts/methods';

export default {
  props: ['isDisabled'],
  data() {
    return {
      all: [],
      products: [],
      pages: [],
      category: [],
      filterDatas: [],
      isActive: 'all',
    };
  },
  methods: {
    getAllProducts() {
      apiAllProducts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        this.all = res.data.products;
        const arry = this.all.map((item) => item.category);
        const newSet = new Set(arry);
        this.category = [...newSet].reverse();
      });
    },
    getProducts(page) {
      apiProducts(page).then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        scrollTop();
        this.products = res.data.products;
        this.filterDatas = this.products;
        this.pages = res.data.pagination;
      });
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    filterProducts(val) {
      this.filterDatas = this.all.filter((item) => item.category === val);
      this.filterDatas.reverse();
    },
  },
  mounted() {
    this.$emit('close-cart');
  },
  created() {
    this.getAllProducts();
    this.getProducts();
  },
};
</script>
