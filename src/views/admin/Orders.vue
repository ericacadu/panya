<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="input-group order-filter">
        <input
          type="text"
          class="form-control"
          :placeholder="placeholder"
          v-model="searchInput"
        />
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item"
            role="button"
            @click="placeholder = '輸入訂單編號',
                    searchMode = 'searchOrder'"
            :class="searchMode === 'searchOrder' ? 'active' : '' "
          >{{ searchOrder }}</li>
          <li class="dropdown-item"
            role="button"
            @click="placeholder = '輸入 Email',
                    searchMode = 'searchEmail'"
            :class="searchMode === 'searchEmail' ? 'active' : '' "
          >{{ searchEmail }}</li>
        </ul>
      </div>
      <button
        class="btn btn-danger ms-auto"
        type="button"
        @click="openModal('delete')"
      >
        <i class="material-icons me-1">delete</i>
        刪除全部訂單
      </button>
    </div>
    <ul
      class="row g-0 list-unstyled rounded p-2 products-list-header text-nowrap"
    >
      <li class="col-2">日期</li>
      <li class="col-3 text-start">訂單編號</li>
      <li class="col-1">品項</li>
      <li class="col-1">金額</li>
      <li class="col-1">訂單狀態</li>
      <li class="col-2">付款日期</li>
      <li class="col-2"></li>
    </ul>
    <ul class="list-group list-group-flush shadow-sm">
      <li class="list-group-item p-2" v-for="item in filterDatas" :key="item.id">
        <div class="col-2 overflow-hidden">
          {{ item.create_date }}
          <small class="d-block text-secondary">{{ item.create_time }}</small>
        </div>
        <div class="col-3 overflow-hidden text-start">{{ item.id }}</div>
        <div class="col-1">{{ item.qty }}</div>
        <div class="col-1">{{ $cash(Math.round(item.total)) }}</div>
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
            @click="openModal('edit', item)"
          >
            查看訂單
          </button>
          <button
            class="btn btn-sm btn-outline-danger fs-7 ms-2 ms-md-3"
            type="button"
            @click="openModal('delete', item)"
          >
            刪除
          </button>
        </div>
      </li>
    </ul>
    <Pagination :pages="pages" @get-datas="getOrders"></Pagination>
    <DeleteModal :modalData="deleteData" @delete-data="deleteOrder">
      <template #title>{{ modalTitle }}</template>
      <template #default>
        是否刪除
        <span class="text-danger" v-if="deleteData.id">
          {{ deleteData.id }}
        </span>
        <b class="text-danger" v-else> 全部 </b>
        訂單？
        <small class="text-muted">(刪除後將無法恢復)</small>
      </template>
    </DeleteModal>
    <OrderModal
      :modal-data="modalData"
      @update-order="updateOrder"
    ></OrderModal>
  </div>
</template>

<script>
import {
  apiGetOrders,
  apiUpdateOrder,
  apiDeleteOrder,
  apiDeleteOrders,
} from '@/scripts/api';
import {
  bsModal,
  getDate,
  getTime,
} from '@/scripts/methods';
import OrderModal from '@/components/AdminOrderModal.vue';
import DeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  emits: ['page-loading', 'push-message'],
  components: {
    OrderModal,
    DeleteModal,
  },
  data() {
    return {
      modal: {},
      orders: [],
      modalData: {},
      deleteData: {},
      modalTitle: '',
      filterDatas: [],
      placeholder: '',
      searchInput: '',
      searchOrder: '查詢訂單',
      searchEmail: '查詢 Email',
      searchMode: '',
      pages: {},
    };
  },
  methods: {
    getOrders(page) {
      apiGetOrders(page)
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.orders = res.data.orders;
          // 避免商品被刪光導致 null object 錯誤
          this.orders.forEach((item) => {
            if (!item.products) {
              const obj = item;
              obj.products = Object.assign('', {});
            }
          });
          this.orderDatas(this.orders);
          this.pages = res.data.pagination;
          this.filterDatas = this.orders;
          this.isLoading = false;
          this.$emitter.emit('page-loading', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    orderDatas(data) {
      data.forEach((item) => {
        const order = item;
        order.create_date = getDate(item.create_at * 1000);
        order.create_time = getTime(item.create_at * 1000);
        if (item.paid_date) {
          order.paid_day = getDate(item.paid_date * 1000);
          order.paid_time = getTime(item.paid_date * 1000);
        }
        order.qty = 0;
        Object.values(item.products).forEach((el) => {
          order.qty += el.qty;
        });
      });
    },
    updateOrder(data) {
      this.$emitter.emit('page-loading', true);
      apiUpdateOrder(data.id, { data })
        .then((res) => {
          if (res.data.success) {
            this.getOrders();
            this.modal.hide();
          }
          this.$pushMessage(res);
          this.$emitter.emit('page-loading', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    deleteOrder(item) {
      let func = {};
      if (!this.deleteData.id) {
        func = () => apiDeleteOrders();
      } else {
        func = () => apiDeleteOrder(item.id);
      }
      this.$emitter.emit('page-loading', true);
      func()
        .then((res) => {
          if (res.data.success) {
            this.getOrders();
            this.modal.hide();
          }
          this.$pushMessage(res);
          this.$emitter.emit('page-loading', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    openModal(isModal, item) {
      if (isModal === 'delete') {
        this.modal = bsModal('deleteModal');
        this.modalTitle = '刪除訂單';
        if (!item) {
          this.deleteData = {};
          this.deleteData.id = '';
        } else {
          this.deleteData = item;
        }
      } else {
        this.modal = bsModal('orderModal');
        this.modalData = JSON.parse(JSON.stringify(item));
      }
      this.modal.show();
    },
    filterOrders(val) {
      this.filterDatas = this.orders.filter(
        (item) => item.id.trim().toLowerCase().match(val),
      );
    },
    filterEmails(val) {
      this.filterDatas = this.orders.filter(
        (item) => item.user.email.trim().toLowerCase().match(val),
      );
    },
  },
  watch: {
    searchMode() {
      this.searchInput = '';
      this.filterDatas = this.orders;
    },
    searchInput(val) {
      const keyword = val.trim().toLowerCase();
      if (this.searchMode === 'searchEmail') {
        this.filterEmails(keyword);
      } else {
        this.filterOrders(keyword);
      }
    },
  },
  mounted() {
    this.placeholder = '輸入訂單編號';
    this.searchMode = 'searchOrder';
    this.$emitter.emit('page-loading', true);
    this.getOrders();
  },
};
</script>
