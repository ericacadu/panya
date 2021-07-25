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
                @click="closeNav"
                >關於panya</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                class="nav-link"
                to="/products?category=all&page=1"
                @click="closeNav"
                >手感烘焙</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                class="nav-link"
                to="/service"
                @click="closeNav"
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
              @click="isFocus = true"/>
            <input type="text" class="form-control" placeholder="商品名稱"
              v-model.trim.number="searchInput"
              ref="searchInput"
              @keyup.up="key--"
              @keyup.down="key++"
            >
            <i class="material-icons fs-5" role="button"
              @click="isFocus = false,
                searchInput = ''">clear</i>
            <div class="search-list shadow rounded-1" v-if="filterDatas.length > 0">
              <ul class="list-unstyled m-0">
                <li class="p-2" role="button"
                  v-for="(item, index) in filterDatas" :key="item.id"
                  @click="toggleList(index)">
                  {{ item.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="nav-icons position-relative me-2" role="button"
          @click="openCart"
        >
          <Cart></Cart>
          <span class="badge rounded-pill fw-normal" id="cart-num" v-show="datas.sum > 0">
            {{ datas.sum }}
          </span>
        </div>
        <button
          class="navbar-toggler border-0"
          type="button"
          @click="openNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <CartModal />
    </nav>
    <div class="overlay" :class="toggleNav ? 'show' : ''">
      <div class="overlay-inner" @click="closeNav"></div>
    </div>
  </div>
</template>

<script>
import { apiAllProducts } from '@/scripts/api';
import CartModal from '@/components/FrontCartModal.vue';
import Cart from '@/components/IconBag.vue';
import Search from '@/components/IconSearch.vue';

export default {
  props: ['datas'],
  components: {
    CartModal,
    Cart,
    Search,
  },
  emits: ['toggle-cart', 'page-loading', 'toggle-overlay'],
  data() {
    return {
      toggleNav: false,
      products: [],
      filterDatas: [],
      searchInput: '',
      key: -1,
      oldKey: 0,
      pos: 0,
      isFocus: false,
      scroll: {},
    };
  },
  methods: {
    getAllProducts() {
      apiAllProducts()
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.products = res.data.products.reverse();
        })
        .catch((err) => {
          this.$pushMessage(err);
          this.$emitter.emit('page-loading', false);
        });
    },
    filterProducts() {
      const keyword = this.searchInput;
      this.key = -1;
      if (!keyword) {
        this.filterDatas = '';
        return;
      }
      const result = this.products.filter((item) => item.title.match(keyword));
      if (result) {
        this.filterDatas = result;
      } else {
        this.filterDatas = '';
      }
    },
    toggleList(index) {
      if (index >= 0) {
        this.key = index;
      }
      const list = document.querySelectorAll('.search-list li');
      const option = this.filterDatas.filter(
        (item) => item.title === list[this.key].textContent,
      );

      if (option.length > 0) {
        const { id } = option[0];
        this.$router.push(`/product/${id}`);
        this.searchInput = '';
        this.filterDatas = [];
        this.key = -1;
        this.isFocus = false;
      } else {
        this.$pushMessage(false, '查無商品名稱，或尚未選擇商品');
      }
    },
    selectOption() {
      const list = document.querySelectorAll('.search-list li');
      list.forEach((item, idx) => {
        const newItem = item;
        item.classList.remove('curr');
        this.pos = item.offsetHeight;
        if (idx === this.key) {
          newItem.classList.add('curr');
        }
      });
    },
    scrollList() {
      const wrap = document.querySelector('.search-list');
      const num = this.key;
      if (num < 0 || this.oldKey < 0) {
        this.key = 0;
        return;
      }
      if (num >= this.filterDatas.length - 1) {
        this.key = this.filterDatas.length - 1;
        return;
      }
      if (num % 4 === 0 || this.oldKey > num) {
        wrap.scrollTop = this.pos * this.key;
      }
    },
    openNav() {
      this.toggleNav = !this.toggleNav;
      if (this.toggleNav) {
        this.toggleNav = true;
        this.$emitter.emit('toggle-overlay', true);
      } else {
        this.closeNav();
      }
    },
    closeNav() {
      this.toggleNav = false;
      this.$emitter.emit('toggle-overlay', false);
    },
    openCart() {
      this.$emitter.emit('toggle-cart', true);
      this.toggleNav = false;
    },
  },
  watch: {
    searchInput() {
      this.filterProducts();
    },
    key(val, oldVal) {
      this.selectOption();
      this.oldKey = oldVal;
      this.scroll = this.scrollList(val);
    },
  },
  mounted() {
    this.getAllProducts();
    window.addEventListener('scroll', this.scrollList);
    this.$refs.searchInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.toggleList();
        window.removeEventListener('scroll', this.scroll);
      }
    });
  },
};
</script>
