<template>
  <div class="front container-fluid g-0 min-vh-100 text-dark">
    <Navbar :datas="datas" />
    <router-view
      class="min-height"
      :datas="datas"
      :is-disabled="isDisabled"
      @get-cart="getCart"
    />
    <div class="footer bg-dark py-4 py-md-5 text-light">
      <div class="container row g-0 mx-auto px-3 fs-7 ls-2
        text-secondary text-uppercase text-center"
        ref="footer">
        <Logo class="mb-3 mx-auto"/>
        <p>
          本網站僅供個人作品使用，不提供商業用途
          <small class="d-block mt-1">PANYA &copy; 2021 copyright</small>
        </p>
        <ul class="list-unstyled d-flex justify-content-center m-0">
          <li class="px-2 fs-6">
            <a href="https://www.facebook.com/" target="_blank">
              <i class="fab fa-lg fa-facebook-square"></i>
            </a>
          </li>
          <li class="px-2 fs-6">
            <a href="mailto:erica.du0916@gmail.com" target="_blank">
              <i class="fas fa-lg fa-envelope"></i>
            </a>
          </li>
          <li class="px-2 fs-6">
            <a href="tel:0800000000" target="_blank">
              <i class="fas fa-lg fa-phone"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div id="scrollTop" role="button" class="p-2 rounded-1 fade-out" ref="scrollTop"
      @click="scrollToTop">
      <span class="material-icons">
        arrow_drop_up
      </span>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/FrontNavbar.vue';
import { apiGetCart, apiAddCart } from '@/scripts/api';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      datas: [],
      isDisabled: '',
      code: '',
    };
  },
  methods: {
    getCart() {
      apiGetCart().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        this.datas = res.data.data;
        this.isDisabled = '';
        this.getCartum();
        this.$emitter.emit('send-cart', this.datas);
        this.$emitter.emit('toggle-spinner', false);
      });
    },
    getCartum() {
      this.datas.sum = 0;
      this.datas.carts.forEach((item) => {
        this.datas.sum += item.qty;
      });
      const num = document.getElementById('cart-num');
      num.classList.add('active');
      window.setTimeout(() => {
        num.classList.remove('active');
      }, 1000);
    },
    addCart(item, qty = 1) {
      const data = {
        product_id: item.id,
        qty,
      };
      this.isDisabled = item.id;
      apiAddCart({ data }).then((res) => {
        if (res.data.success) {
          this.getCart();
        }
        this.$pushMessage(res);
      });
    },
    scrollBtnPos() {
      const half = this.$refs.footer.offsetWidth / 2;
      this.$refs.scrollTop.style.marginRight = `-${half - 16}px`;
    },
    showScrollBtn() {
      if (window.scrollY > 100) {
        this.$refs.scrollTop.classList.add('fade-in');
      } else {
        this.$refs.scrollTop.classList.remove('fade-in');
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  created() {
    this.getCart();
  },
  mounted() {
    this.$emitter.on('add-cart', (res) => {
      const { item, qty } = res;
      this.addCart(item, qty);
    });
    this.$emitter.on('get-cart', () => {
      this.getCart();
    });
    this.scrollBtnPos();
    window.addEventListener('scroll', this.showScrollBtn);
    window.addEventListener('resize', this.scrollBtnPos);
  },
  unmounted() {
    window.removeEventListener('scroll', this.showScrollBtn);
    window.removeEventListener('resize', this.scrollBtnPos);
  },
};
</script>
<style lang="sass" scope>
@import '@/assets/css/front'
*
  // outline: 1px solid red
</style>
