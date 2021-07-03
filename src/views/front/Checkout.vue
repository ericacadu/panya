<template>
  <div class="container px-3">
    <div class="row g-0" v-if="order.id">
      <div class="col-md-6 p-3">
        <p class="path d-block mb-4 fs-7 d-flex text-muted">
          <span>購物車</span>
          &nbsp;/&nbsp;
          <span>確認訂單</span>
          &nbsp;/&nbsp;
          <span class="text-primary">{{ this.$route.meta.title }}</span>
        </p>
        <h2 class="fs-4 d-flex mb-4">
          訂單內容&nbsp;
          <span class="text-danger" v-if="!order.is_paid">(未付款)</span>
          <span class="text-success" v-else>(已付款)</span>
        </h2>
        <ul class="list-unstyled">
          <li class="mb-1">訂單編號：{{ order.id }}</li>
          <li class="mb-4">訂購時間：{{ order.time }}</li>
          <li
            class="d-flex align-items-center mb-4"
            v-for="item in order.products"
            :key="item"
          >
            <div
              class="cart-img"
              :style="{ 'background-image': `url(${item.product.imageUrl})` }"
            ></div>
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
        <p class="text-muted m-0" v-if="code">優惠券代碼：{{ code }}</p>
        <p class="text-primary">
          訂單金額：$ <span class="fs-4">{{ Math.round(order.total) }}</span> NTD
        </p>
      </div>
      <div class="col p-5 bg-white">
        <h2 class="fs-4 d-flex mb-4">訂購資訊</h2>
        <ul class="list-unstyled">
          <li class="d-flex">
            <p class="col-4">Email：</p>
            <p class="col">{{ user.email }}</p>
          </li>
          <li class="d-flex">
            <p class="col-4">收件人姓名：</p>
            <p class="col">{{ user.name }}</p>
          </li>
          <li class="d-flex">
            <p class="col-4">聯絡電話</p>
            <p class="col">{{ user.tel }}</p>
          </li>
          <li class="d-flex">
            <p class="col-4">收件地址：</p>
            <p class="col">{{ user.address }}</p>
          </li>
          <li class="d-flex">
            <p class="col-4">備註：</p>
            <p class="col" v-if="order.message">{{ order.message }}</p>
            <p class="col" v-else>無</p>
          </li>
        </ul>
        <button type="submit" class="btn btn-primary w-100 py-3"
          v-if="!order.is_paid"
          @click="payOrder">信用卡付款</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetOrder, apiPayOrder } from '@/scripts/api';
import { getDate, getTime } from '@/scripts/methods';

export default {
  data() {
    return {
      order: {},
      user: {},
      code: '',
    };
  },
  methods: {
    getOrder() {
      const { id } = this.$route.params;
      apiGetOrder(id)
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.order = res.data.order;
          this.order.time = `${getDate(this.order.create_at * 1000)} ${getTime(this.order.create_at * 1000)}`;
          this.user = this.order.user;
          if (this.order.id) {
            this.$emitter.emit('page-loading', false);
          }
        });
    },
    payOrder() {
      const { id } = this.$route.params;
      this.$emitter.emit('page-loading', true);
      apiPayOrder(id)
        .then((res) => {
          if (res.data.success) {
            this.getOrder();
          }
          this.$pushMessage(res);
          this.$emitter.emit('page-loading', false);
        });
    },
  },
  beforeCreate() {
    this.$emitter.emit('page-loading', true);
  },
  created() {
    this.getOrder();
  },
};
</script>
