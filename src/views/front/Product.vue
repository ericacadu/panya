<template>
  <div class="container-fluid">
    <div class="product container row g-0 px-md-3 mx-auto"
      v-show="filterDatas.length > 0">
      <div class="product-photos col-md-6 row g-0 align-self-start p-3 p-md-0">
        <div class="photo-lg col-12">
          <span :style="{ 'background-image': `url(${enterImage})` }"></span>
        </div>
        <div
          class="photo-sm col-4"
          role="button"
          v-for="(img, key) in product.imagesUrl"
          :key="key"
          :class="img === enterImage ? 'active' : ''"
          @mouseover="enterImage = img"
          @click="enterImage = img"
        >
          <span :style="{ 'background-image': `url(${img})` }"></span>
        </div>
      </div>
      <div
        class="product-content col-md-6 text-center text-md-start">
        <span class="path d-block mb-4 fs-7">
          <router-link to="/">首頁</router-link>
          &nbsp;/&nbsp;
          <router-link to="/products?category=all&page=1">手感烘焙</router-link>
          &nbsp;/&nbsp;
          <span class="active">{{ product.category }}</span>
        </span>
        <h1>{{ product.title }}</h1>
        <p class="product-desc">{{ product.description }}</p>
        <p class="text-secondary m-0" v-if="product.content">
          重量：{{ product.content }}
        </p>
        <p class="product-price mt-4" v-if="product.price">
          <span v-if="product.price < product.origin_price"
            >${{ $cash(product.price) }}</span
          >
          <small :class="product.price < product.origin_price ? 'del' : ''"
            >$ {{ $cash(product.origin_price) }} NTD</small
          >
          <small class="fs-7 ms-2 text-secondary">/ {{ product.unit }}</small>
        </p>
        <div class="product-btns col-md-9 d-md-flex">
          <input
            type="number"
            min="1"
            :max="maxNum"
            class="form-control panya-input text-center text-md-start"
            v-model.number="product.qty"
            inputmode="numeric"
            :disabled="isDisabled === product.id || product.is_max"
            @focus="tempNum = product"
            @blur="blurInput"
          />
          <button
            class="btn btn-primary col-12 col-md-7 ms-md-2 p-3 mt-3 mt-md-0"
            type="button"
            :disabled="isDisabled === product.id || product.is_max"
            @click="addToCart(product)"
          >
            加入購物車
            <Spinner :spin-item="product.id" />
          </button>
        </div>
        <small class="d-block text-danger mt-1" v-if="product.is_max">已達可購買最大數量</small>
      </div>
      <div
        class="product-page row g-0 justify-content-between py-4 px-3 px-md-0"
      >
        <button
          class="col-6 col-md-2 btn btn-outline-secondary fs-7"
          type="button"
          @click="goToProduct(prev_product)"
        ><i class="material-icons fs-6">west</i>{{ prev_product.title }}
        </button>
        <button
          class="col-6 col-md-2 btn btn-outline-secondary fs-7
          border-start-0 d-md-none"
          type="button"
          @click="goToProduct(next_product)"
        >{{ next_product.title }}<i class="material-icons fs-6">east</i>
        </button>
        <button
          class="col-6 col-md-2 btn btn-outline-secondary fs-7
          d-none d-md-flex"
          type="button"
          @click="goToProduct(next_product)"
        >{{ next_product.title }}<i class="material-icons fs-6">east</i>
        </button>
      </div>
    </div>
    <div class="product-info" v-show="filterDatas.length > 0">
      <div class="container row g-0 mx-auto p-3 pe-md-0 py-md-0">
        <div class="col-md-6 p-3 px-md-0 py-md-5 lh-lg">
          <h2 class="fs-5 text-primary">注意事項</h2>
          <p class="mb-4">
            PANYA
            選用在地天然食材，每日手工製作，若您無法於購買後食用完畢，請依照以下建議保存方式保存，超過建議食用期限請勿食用。
          </p>
          <ul class="list-unstyled fa-ul m-0 mt-3 ps-4">
            <li>
              <span class="fa-li">
                <i class="fas fa fa-cookie cookie"></i>
              </span>
              麵包類：常溫保存1日、冷藏保存2日、冷凍保存1週。
            </li>
            <li>
              <span class="fa-li">
                <i class="fas fa fa-cookie-bite cookie"></i>
              </span>
              蛋糕類：冷藏保存2日、冷凍保存5日。
            </li>
            <li>
              <span class="fa-li">
                <i class="fas fa fa-cookie cookie"></i>
              </span>
              舒芙蕾：請於購買後即刻食用完畢，隔餐請勿食用。
            </li>
            <li>
              <span class="fa-li">
                <i class="fas fa fa-cookie-bite cookie"></i>
              </span>
              餅乾類：常溫保存1週、冷藏保存2週、冷凍保存1個月。
            </li>
          </ul>
        </div>
        <div class="bg-notice col-6">
        <span
          style="
            background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/panya/1627476566603.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=p3Hs3ZDZOVQHup%2ByuFxmTCCzZdZ61mRuNZYlZapNzSzW8dPb0u9qNtjmZxalOUdM8sYUicXS2UQgilr3%2F8fFXBWr1nfbLKjgFuY5wQcLpPbBEnIM1BFT45LtMxWgOExwNgG2eANiTWOZfbtZCwYcOO%2F3Pz2cShtKK8F29vE%2FKarXoHLnkEvYzppZtphgRTGQeFW2aJwia%2F1tcTAoseHPALQ7lbROXdZNS6mqRs0%2FK1NT%2BA1C5EKUlzXXbbZ8ps3Lln%2FZ35d0Ni1mtQSeDGvWyEdJdd%2F%2BBiab4WfRQByqZAJGmR06IhGMLqnOkEdFJcSok7QZQ7wMnpatOkQWIFExIg%3D%3D');
          "
        ></span>
      </div>
      </div>

    </div>
    <div class="container px-3" v-show="filterDatas.length > 0">
      <FrontSwiper
        :datas="filterDatas"
        :is-disabled="isDisabled"
        title="相關商品"
      />
    </div>
    <div
      id="target"
      class="position-fixed vw-100 bottom-10"
    ></div>
  </div>
</template>

<script>
import { apiAllProducts, apiGetProduct } from '@/scripts/api';
import FrontSwiper from '@/components/FrontSwiper.vue';

export default {
  emits: ['page-loading', 'push-message', 'toggle-spinner', 'add-cart'],
  props: ['isDisabled', 'datas'],
  components: {
    FrontSwiper,
  },
  data() {
    return {
      id: '',
      category: '',
      products: [],
      product: {},
      enterImage: '',
      prev_product: {},
      next_product: {},
      filterDatas: [],
      tempNum: {},
      maxNum: 0,
    };
  },
  methods: {
    getProduct() {
      apiGetProduct(this.id)
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
            this.$router.push('/error');
          }
          this.product = res.data.product;
          this.product.qty = 1;
          this.category = this.product.category;
          const { 0: img } = this.product.imagesUrl;
          this.enterImage = img;
          document.title = `${this.product.title} - PANYA`;
          this.filterProducts();
          this.getSiblingProduct(this.products);
          this.getMaxNum();
          setTimeout(() => {
            this.$emitter.emit('page-loading', false);
          }, 1000);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    getAllProducts() {
      apiAllProducts()
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.products = res.data.products.reverse();
          this.getProduct();
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    // 取得同類別隨機商品
    filterProducts() {
      const { category, id } = this.product;
      const arrFilter = this.products.filter(
        (item) => item.category === category && item.id !== id,
      );
      const maxSize = arrFilter.length < 6 ? arrFilter.length : 6;
      const arrSet = new Set([]);
      for (let i = 0; arrSet.size < maxSize; i + 1) {
        const num = Math.floor(Math.random() * arrFilter.length);
        arrSet.add(num);
      }
      this.filterDatas = [];
      arrSet.forEach((i) => {
        this.filterDatas.push(arrFilter[i]);
      });
    },
    // 取得前後一筆商品
    getSiblingProduct(datas) {
      datas.forEach((item, idx) => {
        const { id } = item;
        if (id === this.id) {
          const prev = datas[idx - 1] || datas[datas.length - 1];
          const next = datas[idx + 1] || datas[0];
          this.prev_product = prev ? { id: prev.id, title: prev.title } : false;
          this.next_product = next ? { id: next.id, title: next.title } : false;
        }
      });
    },
    // 取得可購買數量最大值
    getMaxNum() {
      const inCart = this.datas.carts.filter(
        (item) => this.product.id === item.product_id,
      );
      if (!inCart) {
        this.maxNum = 30;
        return;
      }
      if (inCart.length > 0) {
        this.maxNum = 30 - inCart[0].qty;
      } else {
        this.maxNum = 30;
      }
      if (this.maxNum <= 0) {
        this.product.is_max = true;
      } else {
        this.product.is_max = false;
      }
    },
    blurInput() {
      this.product = this.tempNum;
      if (this.tempNum.qty < 1) {
        this.product.qty = 1;
      }
      this.tempNum = {};
    },
    addToCart(item) {
      this.$emitter.emit('add-cart', { item, qty: item.qty });
      this.$emitter.emit('toggle-spinner', { id: item.id });
    },
    goToProduct(item) {
      if (!item.id) {
        return;
      }
      this.$router.push(`./${item.id}`);
    },
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name === 'Product') {
          this.$emitter.emit('page-loading', true);
          this.id = this.$route.params.id;
          this.getProduct();
        }
      },
      deep: true,
    },
    tempNum: {
      handler(val) {
        const { qty } = val;
        const newItem = val;
        if (qty >= this.maxNum) {
          newItem.qty = this.maxNum;
        }
        if (qty < 1) {
          newItem.qty = '';
        }
      },
      deep: true,
    },
    datas() {
      this.getProduct();
    },
  },
  mounted() {
    this.$emitter.emit('page-loading', true);
    this.id = this.$route.params.id;
    this.getAllProducts();
  },
};
</script>
