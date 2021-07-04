<template>
  <div class="container-fluid">
    <div class="bg-cover banner min-vh-65">
      <div class="container row g-2">
        <h1
          class="col-12 fs-5 fs-md-3 ls-md-5 fw-normal text-white text-center"
        >
          用天然食材，做出溫暖人心的麵包
        </h1>
        <a href="#" class="col-2 btn btn-outline-light px-5 mx-auto mt-3"
          >探索美味</a
        >
      </div>
    </div>
    <div class="container px-3">
      <h2 class="fs-4 text-center p-5">只有用心，才能暖心</h2>
      <div class="row g-3 mb-5">
        <div class="col-12
            col-md-6">
          <img
            class="img-fluid"
            src="https://images.pexels.com/photos/6489624/pexels-photo-6489624.jpeg?h=500"
            alt=""
          />
        </div>
        <div
          class="
            col-12
            col-md-6
            p-3
            p-md-5
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center
            lh-lg
          "
        >
          <h4 class="fs-5 text-primary">堅持天然食材</h4>
          我們堅持使用在地小農種植的天然食材
          <br />
          選用當季新鮮水果及優質麵粉
          <br />
          不使用人工香料及膨鬆劑等添加物
          <p class="mt-3">
            <i class="fas fa-lg fa-cookie cookie"></i>
            <i class="fas fa-lg fa-cookie-bite cookie mx-3"></i>
            <i class="fas fa-lg fa-cookie-bite cookie"></i>
          </p>
        </div>
      </div>
      <div class="row g-3 mb-5 flex-md-row-reverse">
        <div class="col-12
            col-md-6">
          <img
            class="img-fluid"
            src="https://images.pexels.com/photos/5545923/pexels-photo-5545923.jpeg?h=500"
            alt=""
          />
        </div>
        <div class="
            col-12
            col-md-6
            p-3
            p-md-5
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center
            lh-lg">
          <h4 class="fs-5 text-primary">沒有負擔的美味</h4>
          選用低卡奶油，嚴格把關麵包熱量
          <br />
          尋找健康食材替代高熱量原料
          <br />
          好吃不怕胖，美味也可以零負擔
          <p class="mt-3">
            <i class="fas fa-lg fa-cookie-bite cookie"></i>
            <i class="fas fa-lg fa-cookie cookie mx-3"></i>
            <i class="fas fa-lg fa-cookie-bite cookie"></i>
          </p>
        </div>
      </div>
      <h2 class="fs-4 text-center p-5">熱銷商品</h2>
      <FrontSwiper :datas="promote" :is-disabled="isDisabled" />
    </div>
    <div class="bg-cover booking min-vh-50 text-light flex-column">
      <h3 class="fs-5 ls-2 fw-normal mb-4">訂閱最新消息</h3>
      <div class="container row g-2 g-md-0 px-5 w-md-50 d-md-flex justify-content-md-center">
        <span class="col-12 col-md-8 col-lg-7 m-0 me-md-2">
          <input
            type="email"
            class="form-control ls-2"
            placeholder="customer@panya.io"
          />
        </span>
        <button type="button" class="btn btn-primary col-12 col-md-3">
          訂閱
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAllProducts } from '@/scripts/api';
import FrontSwiper from '@/components/FrontSwiper.vue';

export default {
  props: ['isDisabled'],
  components: {
    FrontSwiper,
  },
  data() {
    return {
      products: [],
      promote: [],
    };
  },
  methods: {
    getAllProducts() {
      apiAllProducts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        this.products = res.data.products.reverse();
        this.promote = this.products.filter((item) => item.is_promote);
        this.$emitter.emit('page-loading', false);
      });
    },
  },
  created() {
    this.getAllProducts();
  },
  beforeMount() {
    this.$emitter.emit('page-loading', true);
  },
};
</script>

<style lang="sass" scoped>
*
  // outline: 1px solid red
</style>
