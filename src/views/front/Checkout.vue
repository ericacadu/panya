<template>
  <div class="container">
    <div class="row g-0 p-3" v-if="order.id">
      <ul class="steps row g-0 list-unstyled mb-4">
        <li class="col-4">
          <small class="ls-3">STEP1</small>
          <span>確認訂單</span>
        </li>
        <li class="col-4" :class="order.is_paid ? '' : 'active'">
          <small class="ls-3">STEP2</small>
          <span>建立訂單</span>
        </li>
        <li class="col-4" :class="order.is_paid ? 'active' : ''">
          <small class="ls-3">STEP3</small>
          <span>完成訂單</span>
        </li>
      </ul>
    </div>
    <div class="row g-0 justify-content-between" v-if="order.id">
      <div class="col-md-6 col-lg-5 px-3">
        <h2 class="fs-4 d-flex mb-4">
          訂單內容&nbsp;
          <span class="text-danger" v-if="!order.is_paid">(未付款)</span>
          <span class="text-success" v-else>(已付款)</span>
        </h2>
        <ul class="list-unstyled">
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
              <div class="col-7 pe-2">
                <p class="m-0">{{ item.product.title }}</p>
                <small>數量：{{ item.qty }}</small>
              </div>
              <div class="col-5 ls-1 text-end">$ {{ $cash(item.product.price) }} NTD</div>
            </div>
          </li>
        </ul>
        <hr>
        <p class="text-primary">
          總計金額：$ <span class="fs-4">{{ $cash(Math.round(order.total)) }}</span> NTD
        </p>
      </div>
      <div class="col-md-6 p-4 py-5 p-md-5 bg-white">
        <h2 class="fs-4 d-flex mb-4">訂購資訊</h2>
        <ul class="list-unstyled">
          <li class="d-flex">
            <p class="col-4">訂單金額：</p>
            <p class="col"
            :class="order.is_paid ? 'text-success' : 'text-danger'">
              $ <b class="fs-5">{{ $cash(Math.round(order.total)) }}</b> NTD
            </p>
          </li>
          <li class="d-flex">
            <p class="col-4 text-nowrap">訂單編號：</p>
            <p class="col">{{ order.id }}</p>
          </li>
          <li class="d-flex">
            <p class="col-4">訂購時間：</p>
            <p class="col">{{ order.time }}</p>
          </li>
          <li class="d-flex" v-if="code">
            <p class="col-4">優惠券代碼：</p>
            <p class="col">{{ code }}</p>
          </li>
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
        <button type="submit" class="btn btn-primary w-100 py-3 mt-5"
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
  emits: ['page-loading', 'push-message', 'toggle-spinner'],
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
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
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
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
  },
  created() {
    this.$emitter.emit('page-loading', true);
    this.getOrder();
  },
};
</script>
