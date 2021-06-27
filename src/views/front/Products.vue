<template>
  <div class="container px-3">
    <h1 class="py-3 fs-3 fw-normal text-center ls-3">PANYA 手感烘焙</h1>
    <ul class="category list-unstyled d-flex justify-content-center mt-4">
      <li
        class="btn btn-outline-primary p-0"
        :class="isActive === 'all' ? 'active' : ''"
        @click="filterProducts(1, 'all'), (isActive = 'all')"
        v-if="products.length > 0"
      >
        <router-link
          class="px-4 py-1"
          :to="{ query: { category: 'all', page: 1 } }"
        >
          全部
        </router-link>
      </li>
      <li
        class="btn btn-outline-primary p-0 ms-1"
        v-for="(item, i) in category"
        :key="i"
        :class="isActive === item ? 'active' : ''"
        @click="filterProducts(1, item), (isActive = item)"
      >
        <router-link
          class="px-4 py-1"
          :to="{ query: { category: item, page: 1 } }"
        >
          {{ item }}
        </router-link>
      </li>
    </ul>
    <ul class="products row g-0 g-md-3 p-0 mt-5">
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
    <Pagination
      :pages="pages"
      @get-datas="filterProducts"></Pagination>
  </div>
</template>

<script>
import { apiAllProducts } from '@/scripts/api';
import { navigator } from '@/scripts/methods';

export default {
  props: ['isDisabled'],
  data() {
    return {
      products: [],
      pages: [],
      category: [],
      filterDatas: [],
      tempArry: [],
      isActive: 'all',
      path: {
        category: '',
        page: '',
      },
    };
  },
  methods: {
    getAllProducts() {
      apiAllProducts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        this.products = res.data.products.reverse();
        const arry = this.products.map((item) => item.category);
        const newSet = new Set(arry);
        this.category = [...newSet];
        this.filterProducts(this.path.page, this.path.category);
        this.$emitter.emit('change-status', false);
      });
    },
    getPath() {
      this.path.category = this.$route.query.category;
      this.path.page = this.$route.query.page;
      this.isActive = this.path.category;
    },
    filterProducts(page) {
      this.getPath();
      if (this.path.category === 'all') {
        this.tempArry = this.products;
      } else {
        this.tempArry = this.products.filter(
          (item) => item.category === this.path.category,
        );
      }
      const newNavigator = navigator(page, this.tempArry);
      this.pages = newNavigator.pages;
      this.filterDatas = newNavigator.newArray;
      this.$router.push(
        `./products?category=${this.path.category}&page=${page}`,
      );
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name === 'Products') {
          this.filterProducts(val.query.page, val.query.category);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$emit('close-cart');
  },
  beforeCreate() {
    this.$emitter.emit('change-status', true);
  },
  created() {
    this.getPath();
    this.getAllProducts();
  },
};
</script>
