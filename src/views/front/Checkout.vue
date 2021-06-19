<template>
  <div class="container min-vh-100 p-3">
    <div class="row g-0">
      <div class="col-md-6 p-3">
        <small class="path d-block mb-4">首頁 / 訂單結帳</small>
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
          訂單金額：$ <span class="fs-4">{{ order.total }}</span> NTD
        </p>
      </div>
      <div class="col p-5 bg-light">
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
            <p class="col-4">收件電話：</p>
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
import { apiGetOrder, apiPayOrder } from '../../assets/js/api';
import { scrollTop } from '../../assets/js/plugins';
import mitt from '../../assets/js/mitt';

export default {
  data() {
    return {
      order: {},
      user: {},
    };
  },
  methods: {
    getOrder() {
      const { id } = this.$route.params;
      apiGetOrder(id)
        .then((res) => {
          if (res.data.success) {
            this.order = JSON.parse(JSON.stringify(res.data.order));
            this.getTime(this.order.create_at);
            this.user = this.order.user;
          } else {
            mitt.emit('toast-message', {
              msg: res.data.message,
              theme: 'danger',
            });
          }
        })
        .catch((err) => {
          mitt.emit('toast-message', {
            msg: err,
            theme: 'danger',
          });
        });
    },
    payOrder() {
      const { id } = this.$route.params;
      apiPayOrder(id)
        .then((res) => {
          if (res.data.success) {
            mitt.emit('toast-message', {
              msg: res.data.message,
              theme: 'success',
            });
            this.getOrder();
          } else {
            mitt.emit('toast-message', {
              msg: res.data.message,
              theme: 'danger',
            });
          }
        })
        .catch((err) => {
          mitt.emit('toast-message', {
            msg: err,
            theme: 'danger',
          });
        });
    },
    getTime(date) {
      const now = new Date(date * 1000);
      const year = now.getFullYear();
      const m = now.getMonth() + 1;
      const d = now.getDate();
      const month = m < 10 ? `0${m}` : m;
      const day = d < 10 ? `0${d}` : d;
      const hour = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();
      this.order.time = `${year} / ${month} / ${day} ${hour}:${min}:${sec}`;
    },
  },
  mounted() {
    scrollTop();
  },
  created() {
    this.getOrder();
  },
};
</script>
