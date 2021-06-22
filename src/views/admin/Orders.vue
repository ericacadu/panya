<template>
  <div class="container-fluid p-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="input-group mw-30">
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
        @click="opdenModal('delete')"
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
            @click="opdenModal('edit', item)"
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
} from '../../assets/js/api';
import {
  bsModal,
  bsToast,
  getDate,
  getTime,
} from '../../assets/js/plugins';
import OrderModal from '../../components/admin/orderModal.vue';
import DeleteModal from '../../components/admin/deleteModal.vue';
import mitt from '../../assets/js/mitt';

export default {
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
    };
  },
  methods: {
    getOrders() {
      apiGetOrders()
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            this.orderDatas(this.orders);
            this.filterDatas = this.orders;
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
        order.qty = 0;
        Object.values(item.products).forEach((el) => {
          order.qty += el.qty;
        });
      });
    },
    updateOrder(data) {
      apiUpdateOrder(data.id, { data })
        .then((res) => {
          if (res.data.success) {
            this.getOrders();
            mitt.emit('toast-message', {
              msg: res.data.message,
              theme: 'success',
            });
          } else {
            mitt.emit('toast-message', {
              msg: res.data.message,
              theme: 'danger',
            });
          }
          this.modal.hide();
        })
        .catch((err) => {
          mitt.emit('toast-message', { msg: err, theme: 'danger' });
        });
    },
    deleteOrder(item) {
      let func = {};
      if (!this.deleteData.id) {
        func = () => apiDeleteOrders();
      } else {
        func = () => apiDeleteOrder(item.id);
      }
      func()
        .then((res) => {
          if (res.data.success) {
            this.getOrders();
            mitt.emit('toast-message', {
              msg: res.data.message,
              theme: 'success',
            });
            this.modal.hide();
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
    opdenModal(isModal = 'edit', item) {
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
  },
  created() {
    this.getOrders();
  },
  unmounted() {
    bsToast('toast').hide();
  },
};
</script>
