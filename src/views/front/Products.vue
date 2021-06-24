<template>
  <div class="container">
    <h1 class="py-3 fs-3 fw-normal text-center ls-3">PANYA 手感烘焙</h1>
    <ul class="category list-unstyled d-flex justify-content-center mt-4">
      <li
        li
        class="btn btn-outline-primary p-0"
        :class="isActive === 'all' ? 'active' : ''"
        @click="filterProducts(1, 'all'), (isActive = 'all')"
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
      v-if="pages.total_pages > 1"
      :pages="pages"
      @get-products="filterProducts"></Pagination>
  </div>
</template>

<script>
import { apiAllProducts } from '@/scripts/api';
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
      tempDatas: [],
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
        scrollTop();
      });
    },
    getPath() {
      this.path.category = this.$route.query.category;
      this.path.page = this.$route.query.page;
      this.isActive = this.path.category;
    },
    getPages(page) {
      const per = 9;
      this.filterDatas = [];
      this.pages = {
        total_pages: Math.ceil(this.tempDatas.length / per),
        current_page: Number(page),
        has_pre: false,
        has_next: false,
        maxData: page * per,
        minData: (page - 1) * per + 1,
      };
      this.tempDatas.forEach((item, idx) => {
        if (idx + 1 >= this.pages.minData
            && idx + 1 <= this.pages.maxData) {
          this.filterDatas.push(item);
        }
      });
      if (page > 1) {
        this.pages.has_pre = true;
      }
      if (page < this.pages.total_pages) {
        this.pages.has_next = true;
      }
    },
    filterProducts(page) {
      this.getPath();
      if (this.path.category === 'all') {
        this.tempDatas = this.products;
      } else {
        this.tempDatas = this.products.filter(
          (item) => item.category === this.path.category,
        );
      }
      this.getPages(page);
      this.$router.push(
        `./products?category=${this.path.category}&page=${page}`,
      );
      scrollTop();
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  watch: {
    $route(val) {
      this.filterProducts(val.query.page);
    },
  },
  mounted() {
    this.$emit('close-cart');
  },
  created() {
    this.getPath();
    this.getAllProducts();
  },
};
</script>
