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
    <ul class="products row g-0 g-md-3 p-0 mt-5 list-unstyled">
      <Product :filter-datas="filterDatas" :is-disabled="isDisabled"/>
    </ul>
    <Pagination
      :pages="pages"
      @get-datas="filterProducts"></Pagination>
  </div>
</template>

<script>
import { apiAllProducts } from '@/scripts/api';
import { navigator } from '@/scripts/methods';
import Product from '@/components/FrontProduct.vue';

export default {
  props: ['isDisabled'],
  components: {
    Product,
  },
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
        this.$emitter.emit('page-loading', false);
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
  beforeCreate() {
    this.$emitter.emit('page-loading', true);
  },
  created() {
    this.getPath();
    this.getAllProducts();
  },
};
</script>
