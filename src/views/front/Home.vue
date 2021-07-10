<template>
  <div class="container-fluid">
    <div class="bg-cover banner min-vh-65">
      <div class="container row g-2">
        <h1
          class="col-12 fs-5 fs-md-3 ls-md-5 fw-normal text-white text-center"
        >
          用天然食材，做出溫暖人心的麵包
        </h1>
        <router-link to="/products?category=all&page=1"
          class="col-2 btn btn-outline-light px-5 mx-auto mt-3"
          >探索美味</router-link
        >
      </div>
    </div>
    <div class="container px-3">
      <h2 class="fs-4 text-center p-5">只有用心，才能暖心</h2>
      <div class="row g-3 mb-5 fade-out">
        <div class="col-12 col-md-6">
          <img
            class="img-fluid"
            src="https://images.pexels.com/photos/6489624/pexels-photo-6489624.jpeg?w=1280"
            alt=""
          />
        </div>
        <div
          class="
            col-12 col-md-6
            p-3 p-md-5
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
      <div class="row g-3 mb-5 flex-md-row-reverse fade-out">
        <div class="col-12 col-md-6">
          <img
            class="img-fluid"
            src="https://images.pexels.com/photos/5545923/pexels-photo-5545923.jpeg?h=500"
            alt=""
          />
        </div>
        <div
          class="
            col-12 col-md-6
            p-3 p-md-5
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center
            lh-lg
          "
        >
          <h4 class="fs-5 text-primary">沒有負擔的美味</h4>
          使用低卡奶油，嚴格把關麵包熱量
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
      <FrontSwiper
        class="fade-out"
        :datas="promote"
        :is-disabled="isDisabled"
        title="熱銷商品"
      />
    </div>
    <div class="bg-cover booking min-vh-50 text-light flex-column">
      <h3 class="fs-5 ls-2 fw-normal mb-4">訂閱最新消息</h3>
        <Form class="container row g-2 g-md-0 px-5 w-md-50
          d-md-flex justify-content-md-center"
          :class="show ? '' : 'd-none d-md-none'"
          v-slot="{ errors }" @submit="onSubmit" id="subscribe">
          <span class="col-12 col-md-8 col-lg-7 m-0 me-md-2">
            <Field type="email" id="email" name="Email"
            class="form-control ls-2"
            :class="{ 'is-invalid': errors['Email'] }"
            :disabled="idDisabled"
            placeholder="customer@panya.io"
            rules="email|required"
            inputmode="email"
            v-model="email"></Field>
          <ErrorMessage name="Email" class="invalid-feedback position-md-absolute">
          </ErrorMessage>
          </span>
          <button type="submit" class="btn btn-primary col-12 col-md-3"
          :disabled="idDisabled"
          @submit="onSubmit">
          訂閱
          <Spinner :spin-item="email" />
        </button>
      </Form>
      <p class="text-warning ls-2 fade" v-if="email" ref="done">
        {{ email }} 已訂閱電子報 <i class="far fa-check-circle"></i>
      </p>
    </div>
    <div
      id="target"
      class="position-fixed vw-100 bottom-50"
    ></div>
  </div>
</template>

<script>
import { apiAllProducts } from '@/scripts/api';
import FrontSwiper from '@/components/FrontSwiper.vue';
import fadeInMix from '@/mixins/fadeInMix.vue';

export default {
  props: ['isDisabled', 'allProducts'],
  components: {
    FrontSwiper,
  },
  data() {
    return {
      products: [],
      promote: [],
      email: '',
      idDisabled: false,
      show: true,
    };
  },
  mixins: [fadeInMix],
  methods: {
    getAllProducts() {
      apiAllProducts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        this.products = res.data.products.reverse();
        this.promote = this.products.filter((item) => item.is_promote);
        setTimeout(() => {
          this.$emitter.emit('page-loading', false);
          this.fadeInOnLoad();
        }, 1000);
      });
    },
    onSubmit() {
      this.idDisabled = true;
      this.$emitter.emit('toggle-spinner', this.email);
      setTimeout(() => {
        this.idDisabled = false;
        this.$emitter.emit('toggle-spinner', false);
        this.$refs.done.classList.add('show');
        this.show = false;
      }, 1500);
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
