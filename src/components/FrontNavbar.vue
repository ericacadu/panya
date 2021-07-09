<template>
  <div class="container-fluid sticky-top"
    :class="toggleNav ? 'position-fixed vh-100 overflow-hidden' : ''">
    <nav
      class="navbar navbar-expand-md navbar-light sticky-top"
      :class="toggleNav ? 'show' : ''"
    >
      <div class="container py-2 px-3 text-secondary d-flex justify-content-end">
        <router-link to="/" class="me-auto">
          <Logo class="nav-brand me-5" role="button"></Logo>
        </router-link>
        <div class="collapse navbar-collapse" :class="toggleNav ? 'show' : ''">
          <ul class="navbar-nav">
            <li class="navbar-itemd">
              <router-link
                class="nav-link"
                to="/about"
                @click="toggleNav = fale"
                >關於panya</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                class="nav-link"
                to="/products?category=all&page=1"
                @click="toggleNav = fale"
                >手感烘焙</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                class="nav-link"
                to="/service"
                @click="toggleNav = fale"
                >常見問題</router-link
              >
            </li>
          </ul>
        </div>
        <div
          class="nav-icons me-2 d-none d-md-block"
        >
          <div class="nav-search rounded-pill"
            :class="isFocus ? 'expand' : ''">
            <Search :role="isFocus ? '' : 'button'"
              @click="isFocus = true"></Search>
            <input type="text" class="form-control" placeholder="商品名稱"
              v-model.number="searchInput"
              ref="searchInput"
              @focus="isFocus = true"
              @keyup.up="key--"
              @keyup.down="key++"
            >
            <!-- @keypup.enter="toggleProduct(key)" -->
            <i class="material-icons fs-5" role="button"
              @click="isFocus = false,
                searchInput = ''">clear</i>
            <div class="search-list shadow rounded-1">
              <ul class="list-unstyled m-0">
                <li class="p-2" role="button"
                  v-for="(item, idx) in filterDatas" :key="item.id"
                  @click="toggleProduct(idx + 1)">
                  {{ item.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="nav-icons" role="button"
          @click="$emitter.emit('toggle-cart', true), (toggleNav = fale)"
        >
          <Cart></Cart>
          <span class="badge rounded-pill fw-normal ms-1" id="cart-num">
            {{ datas.sum }}
          </span>
        </div>
        <button
          class="navbar-toggler border-0"
          type="button"
          @click="toggleNav = !toggleNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <CartModal />
    </nav>
    <div class="overlay" :class="toggleNav ? 'show' : ''">
      <div class="overlay-inner" @click="toggleNav = fale"></div>
    </div>
  </div>
</template>

<script>
import CartModal from '@/components/FrontCartModal.vue';

export default {
  props: ['allProducts', 'datas'],
  components: {
    CartModal,
  },
  data() {
    return {
      toggleNav: false,
      products: [],
      filterDatas: [],
      searchInput: '',
      key: 0,
      pos: 0,
      isFocus: false,
    };
  },
  methods: {
    filterProducts() {
      this.key = 0;
      const keyword = this.searchInput;
      if (!keyword) {
        this.filterDatas = '';
        return;
      }
      const result = this.products.filter((item) => item.title.match(keyword));
      if (this.isFocus && result) {
        this.filterDatas = result;
      } else {
        this.filterDatas = '';
      }
    },
    toggleProduct(key) {
      const item = this.filterDatas[key - 1];
      if (!item) {
        this.$pushMessage(false, '查無商品名稱，或尚未選擇商品');
      } else {
        this.searchInput = item.title;
        this.$router.push(`/product/${item.id}`);
        this.isFocus = false;
        this.searchInput = '';
        this.$refs.searchInput.blur();
      }
    },
    selectOption() {
      const list = document.querySelectorAll('.search-list li');
      list.forEach((item, idx) => {
        const newItem = item;
        item.classList.remove('curr');
        this.pos = item.offsetHeight;
        if (idx + 1 === this.key) {
          newItem.classList.add('curr');
        }
      });
    },
    scrollList(val, oldVal) {
      const wrap = document.querySelector('.search-list');
      if (val <= 0) {
        this.key = 1;
        return;
      } if (val >= this.filterDatas.length) {
        this.key = this.filterDatas.length;
      }
      if (((val - 1) % 4 === 0 && val > oldVal) || (val < oldVal)) {
        wrap.scrollTop = this.pos * (this.key - 1);
      }
    },
  },
  watch: {
    allProducts() {
      this.products = this.allProducts;
    },
    searchInput() {
      this.filterProducts();
    },
    key(val, oldVal) {
      this.selectOption();
      window.addEventListener('scroll', this.scrollList(val, oldVal));
    },
  },
  created() {
    this.$emit('get-products');
  },
};
</script>
