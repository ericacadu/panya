<template>
  <div class="container px-3">
    <div class="row g-0">
      <div class="col-md-6 p-3">
        <small class="path d-block mb-4">首頁 / 確認訂單</small>
        <h2 class="fs-4 d-flex mb-4">
          確認訂單內容
          <button class="btn btn-sm btn-outline-primary ms-2"
            type="button"
            @click="$emit('open-cart')"
          >修改品項</button>
        </h2>
        <ul class="list-unstyled">
          <li
            class="d-flex align-items-center mb-4"
            v-for="item in cart.carts"
            :key="item"
          >
            <div class="cart-img">
              <img :src="item.product.imageUrl" />
            </div>
            <div class="cart-cont col px-3 d-flex">
              <div class="col-6">
                <p class="m-0">{{ item.product.title }}</p>
                <small>數量：{{ item.qty }}</small>
              </div>
              <div class="col-6 ls-1">$ {{ item.product.price }} NTD</div>
            </div>
          </li>
        </ul>
        <hr>
        <p>
          總計金額：$ <span class="fs-4">{{ totalPrice }}</span> NTD
        </p>
      </div>
      <div class="col p-5 bg-light min-vh-50">
        <h2 class="fs-4 mb-4">填寫訂購資訊</h2>
        <Form ref="order" v-slot="{ errors }" @submit="onSubmit">
          <ul class="list-unstyled">
            <li class="mb-3">
              <label for="email" class="form-label">Email</label>
              <Field type="email" id="email" name="Email"
                class="form-control panya-input"
                :class="{ 'is-invalid': errors['Email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="user.email"></Field>
              <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
            </li>
            <li class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <Field type="name" id="name" name="姓名"
                class="form-control panya-input"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="user.name"></Field>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </li>
            <li class="mb-3">
              <label for="tel" class="form-label">聯絡電話</label>
              <Field type="tel" id="tel" name="電話"
                class="form-control panya-input"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話"
                :rules="isPhone"
                v-model="user.tel"></Field>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </li>
            <li class="mb-3">
              <label for="address" class="form-label">收件地址</label>
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
          <button type="submit" class="btn btn-primary w-100 py-3">送出訂單</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiCheckout } from '@/scripts/api';

export default {
  props: ['cartData', 'totalPrice', 'isDisabled'],
  data() {
    return {
      cart: [],
      user: {
        email: '',
        name: '',
        tel: '',
        address: '',
      },
      message: '',
    };
  },
  methods: {
    isPhone(val) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(val) ? true : '請輸入正確的電話號碼';
    },
    onSubmit() {
      apiCheckout({ data: { user: this.user, message: this.message } })
        .then((res) => {
          if (res.data.success) {
            this.$emit('get-carts');
            this.$refs.order.resetForm();
            this.$router.push(`/checkout/${res.data.orderId}`);
          }
          this.$pushMessage(res);
        });
    },
  },
  watch: {
    cartData() {
      this.cart = this.cartData;
      this.cart.carts.reverse();
    },
  },
  beforeCreate() {
    this.$emitter.emit('change-status', true);
  },
  created() {
    this.$emit('get-carts');
    this.cart = this.cartData;
  },
  mounted() {
    this.$emit('close-cart');
  },
};
</script>
