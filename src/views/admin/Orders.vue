<template>
  <div class="container-fluid p-3">
    <ul
      class="row g-0 list-unstyled rounded p-2 products-list-header text-nowrap"
    >
      <li class="col-2">日期</li>
      <li class="col-3 text-start">訂單編號</li>
      <li class="col-1">數量</li>
      <li class="col-1">金額</li>
      <li class="col-1">訂單狀態</li>
      <li class="col-2">付款日期</li>
      <li class="col-2"></li>
    </ul>
    <ul class="list-group list-group-flush shadow-sm">
      <li class="list-group-item p-2" v-for="item in orders" :key="item.id">
        <div class="col-2 overflow-hidden">
          {{ item.create_date }}
           <small class="d-block text-secondary">{{ item.create_time }}</small>
        </div>
        <div class="col-3 overflow-hidden text-start">{{ item.id }}</div>
        <div class="col-1">{{ item.total_qty }}</div>
        <div class="col-1">{{ item.total }}</div>
        <div class="col-1 text-success">
          <span class="d-block text-success" v-if="item.is_paid">已付款</span>
          <span class="text-danger" v-else>未付款</span>
        </div>
        <div class="col-2">
          <p class="m-0" v-if="item.is_paid">
            <small class="d-block text-secondary">{{ item.paid_day }}</small>
            <small class="d-block text-secondary">{{ item.paid_time }}</small>
          </p>
        </div>

        <div class="col-2 d-flex justify-content-start">
          <button
            class="btn btn-sm btn-outline-primary fs-7"
            type="button"
            @click="opdenModal(item)"
          >
            查看訂單
          </button>
          <button
            class="btn btn-sm btn-outline-danger fs-7 ms-2 ms-md-3"
            type="button"
            @click="opdenModal('delete', item)"
          >
            刪除
          </button>
        </div>
      </li>
    </ul>

    <!-- <DeleteModal :modalData="deleteData" @delete-product="deleteProduct">
      <template #title>{{ modalTitle }}</template>
      <template #default>
        是否刪除
        <span class="text-danger"> {{ deleteData.title }} </span>
        商品？
        <small class="text-muted">(刪除後將無法恢復)</small>
      </template>
    </DeleteModal> -->
    <OrderModal :modal-data="modalData"></OrderModal>
  </div>
</template>

<script>
import { apiGetOrders } from '../../assets/js/api';
import {
  bsModal, bsToast, getDate, getTime,
} from '../../assets/js/plugins';
import OrderModal from '../../components/admin/orderModal.vue';
import mitt from '../../assets/js/mitt';

export default {
  components: {
    OrderModal,
  },
  data() {
    return {
      orders: {},
      modalData: {},
    };
  },
  methods: {
    getOrders() {
      apiGetOrders()
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            this.orderDatas(this.orders);
          } else {
            mitt.emit('toast-message', {
              msg: res.data.message,
              theme: 'danger',
            });
          }
        })
        .catch((err) => {
          mitt.emit('toast-message', { msg: err, theme: 'danger' });
        });
    },
    orderDatas(data) {
      data.forEach((item) => {
        const order = item;
        order.create_date = getDate(item.create_at);
        order.create_time = getTime(item.create_at);
        if (item.paid_date) {
          order.paid_day = getDate(item.paid_date);
          order.paid_time = getTime(item.paid_date);
        }
        order.total_qty = 0;
        Object.values(item.products).forEach((el) => {
          order.total_qty += el.qty;
        });
      });
    },
    opdenModal(item) {
      console.log(item);
      this.modalData = JSON.parse(JSON.stringify(item));
      bsModal('orderModal').show();
    },
  },
  created() {
    this.getOrders();
  },
  mounted() {
  },
  unmounted() {
    bsToast('toast').hide();
  },
};
</script>

<style lang="sass" scoped>
*
  // outline: 1px solid red
</style>
