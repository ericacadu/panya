<template>
  <div class="container">
    <div class="row g-0 p-3" v-if="datas.total">
      <ul class="steps row g-0 list-unstyled mb-4">
        <li class="col-4 active">
          <small class="ls-3">STEP1</small>
          <span>確認訂單</span>
        </li>
        <li class="col-4">
          <small class="ls-3">STEP2</small>
          <span>建立訂單</span>
        </li>
        <li class="col-4">
          <small class="ls-3">STEP3</small>
          <span>完成訂單</span>
        </li>
      </ul>
    </div>
    <div
      class="
        min-vh-50
        d-flex
        flex-column
        align-items-center
        justify-content-center
        text-secondary
      "
      v-if="!datas.total"
    >
      <span class="material-icons mb-2 fs-2"> announcement </span>
      <p class="fs-7" style="letter-spacing: 2px">購物車內沒有商品</p>
      <router-link
        class="btn btn-primary py-2 px-4"
        to="/products?category=all&page=1"
        >挑選商品</router-link
      >
    </div>
    <div class="row g-0 justify-content-between" v-else>
      <div class="col-md-6 col-lg-5 px-3 m-0">
        <h2 class="fs-4 d-flex mb-5">
          確認訂單內容
          <button class="btn btn-sm btn-outline-primary ms-2"
            type="button"
            @click="$emitter.emit('toggle-cart', true)"
          >修改內容</button>
        </h2>
        <ul class="list-unstyled">
          <li
            class="d-flex align-items-center mb-4"
            v-for="item in datas.carts"
            :key="item"
          >
            <div
              class="cart-img"
              :style="{ 'background-image': `url(${item.product.imageUrl})` }"
            ></div>
            <div class="cart-cont col px-3 d-flex">
              <div class="col-7 pe-2">
                <p class="m-0">{{ item.product.title }}</p>
                <small>數量：{{ item.qty }}</small>
              </div>
              <div class="col-5 ls-1 text-end">$ {{ $cash(item.product.price) }} NTD</div>
            </div>
          </li>
        </ul>
        <div class="input-group mb-4">
          <input type="text" class="form-control panya-input p-2"
          placeholder="已套用優惠券" disabled
          v-if="isDiscount">
          <input type="text" class="form-control panya-input p-2"
          placeholder="輸入優惠碼"
          v-model="code"
          v-else>
          <button type="button" class="btn btn-sm btn-primary px-3"
          :disabled="isDiscount"
          @click="useCoupon">
            套用優惠券
            <Spinner :spin-item="code"/>
          </button>
        </div>
        <p class="text-primary" v-if="!isDiscount">
          總計金額：$ <span class="fs-4">{{ $cash(Math.round(datas.total)) }}</span> NTD
        </p>
        <div v-else>
          <small class="fs-7 text-muted">
            總計金額：$ {{ $cash(datas.total) }} NTD
          </small>
          <p class="text-primary">
            折扣後金額：$ <span class="fs-4">{{ $cash(Math.round(datas.final_total)) }}</span> NTD
          </p>
        </div>
      </div>
      <div class="col-md-6 p-5 bg-white min-vh-50">
        <h2 class="fs-4 mb-4">填寫訂購資訊</h2>
        <Form ref="order" v-slot="{ errors }" @submit="onSubmit">
          <ul class="list-unstyled">
            <li class="mb-3">
              <label for="email" class="form-label">
                <span class="text-danger">*</span>
                Email
              </label>
              <Field type="email" id="email" name="Email"
                class="form-control panya-input"
                :class="{ 'is-invalid': errors['Email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                inputmode="email"
                v-model="user.email"></Field>
              <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
            </li>
            <li class="mb-3">
              <label for="name" class="form-label">
                <span class="text-danger">*</span>
                收件人姓名
              </label>
              <Field type="name" id="name" name="姓名"
                class="form-control panya-input"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="user.name"></Field>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </li>
            <li class="mb-3">
              <label for="tel" class="form-label">
                <span class="text-danger">*</span>
                聯絡電話
              </label>
              <Field type="tel" id="tel" name="電話"
                class="form-control panya-input"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入手機號碼"
                :rules="isPhone"
                inputmode="tel"
                v-model="user.tel"></Field>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </li>
            <li class="mb-3">
              <label for="address" class="form-label">
                <span class="text-danger">*</span>
                收件地址
              </label>
              <Field type="text" id="address" name="地址"
                class="form-control panya-input"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="user.address"></Field>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </li>
            <li>
              <label for="message" class="form-label">備註</label>
              <textarea id="message" class="form-control panya-input" rows="3"
                v-model="message"></textarea>
            </li>
          </ul>
          <button type="submit" class="btn btn-primary w-100 py-3 mt-5">
            送出訂單
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiCheckout, apiPostCoupon } from '@/scripts/api';

export default {
  emits: ['page-loading', 'push-message', 'toggle-spinner', 'get-cart'],
  props: ['datas'],
  data() {
    return {
      user: {
        email: '',
        name: '',
        tel: '',
        address: '',
      },
      message: '',
      code: 'panyaonline70',
      carts: '',
      isDiscount: false,
    };
  },
  methods: {
    useCoupon() {
      const data = {
        code: this.code,
      };
      this.$emitter.emit('toggle-spinner', this.code);
      apiPostCoupon({ data })
        .then((res) => {
          this.$pushMessage(res);
          this.$emitter.emit('get-cart');
          this.isDiscount = true;
          this.$emitter.emit('toggle-spinner', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    isPhone(val) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(val) ? true : '請輸入正確的手機號碼';
    },
    onSubmit() {
      this.$emitter.emit('page-loading', true);
      apiCheckout({ data: { user: this.user, message: this.message } })
        .then((res) => {
          if (res.data.success) {
            this.$emitter.emit('get-cart');
            this.$refs.order.resetForm();
            this.$router.push(`/checkout/${res.data.orderId}`);
          }
          this.$pushMessage(res);
          this.$emitter.emit('page-loading', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
  },
  watch: {
    datas(val) {
      if (val.final_total !== val.total) {
        this.isDiscount = true;
      } else {
        this.isDiscount = false;
      }
    },
  },
  mounted() {
    this.$emit('get-cart');
    this.$emitter.emit('page-loading', true);
  },
  updated() {
    this.$emitter.emit('page-loading', false);
  },
};
</script>
