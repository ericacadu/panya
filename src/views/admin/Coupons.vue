<template>
  <div class="container-fluid">
    <div class="text-end mb-3">
      <button class="btn btn-primary ms-auto" type="button" @click="openModal">
        <i class="material-icons me-1">add_circle_outline</i>
        新增優惠券
      </button>
    </div>
    <ul
      class="row g-0 list-unstyled rounded p-2 products-list-header text-nowrap"
    >
      <li class="col-3 text-start">優惠券標題</li>
      <li class="col-2">優惠碼</li>
      <li class="col-1">折扣</li>
      <li class="col">起始日</li>
      <li class="col">截止日</li>
      <li class="col-1">啟用</li>
      <li class="col-2"></li>
    </ul>
    <ul class="list-group list-group-flush shadow-sm">
      <li class="list-group-item p-2" v-for="item in coupons" :key="item.id">
        <div class="col-3 text-start">{{ item.title }}</div>
        <div class="col-2">{{ item.code }}</div>
        <div class="col-1">{{ item.percent }}</div>
        <div class="col">{{ getDate(item.start_date) }}</div>
        <div class="col" :class="item.due_date < today ? 'text-danger' : ''">
          {{ getDate(item.due_date) }}
          <small class="d-block" v-if="item.due_date < today">(已過期)</small>
        </div>
        <div class="col-1 text-success">
          <span class="material-icons fs-5" v-if="item.is_enabled"
            >check_circle</span
          >
        </div>
        <div class="col-2 d-flex justify-content-start">
          <button
            class="btn btn-sm btn-outline-primary fs-7"
            type="button"
            @click="openModal('edit', item)"
          >
            編輯
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
    <Pagination :pages="pages" @get-datas="getCoupons"></Pagination>
    <CouponModal :modalData="modalData" @update-data="updateCoupons">
      <template #title>
        {{ modalTitle }}
      </template>
    </CouponModal>
    <DeleteModal :modalData="deleteData" @delete-data="deleteCoupon">
      <template #title>{{ modalTitle }}</template>
      <template #default>
        是否刪除
        <span class="text-danger"> {{ deleteData.title }} </span>
        優惠券？
        <small class="text-muted">(刪除後將無法恢復)</small>
      </template>
    </DeleteModal>
  </div>
</template>

<script>
import { apiGetCoupons, apiUpdateCoupon, apiDeleteCoupon } from '@/scripts/api';
import { bsModal, getDate } from '@/scripts/methods';
import CouponModal from '@/components/AdminCouponModal.vue';
import DeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  emits: ['page-loading', 'push-message'],
  components: {
    CouponModal,
    DeleteModal,
  },
  data() {
    return {
      coupons: [],
      modal: {},
      modalData: {},
      deleteData: {},
      modalTitle: '',
      isModal: '',
      apiInfo: {
        method: '',
        id: '',
      },
      today: new Date(),
      pages: {},
    };
  },
  methods: {
    getCoupons() {
      apiGetCoupons()
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage();
          }
          this.coupons = res.data.coupons;
          this.pages = res.data.pagination;
          this.coupons.forEach((item) => {
            const newItem = item;
            if (item.due_date < this.today) {
              newItem.is_enabled = 0;
            }
          });
          this.$emitter.emit('page-loading', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    getDate(date) {
      return getDate(date);
    },
    updateCoupons(data) {
      let { method, id } = this.apiInfo;
      switch (this.isModal) {
        case 'edit':
          method = 'put';
          id = data.id;
          break;
        default:
          method = 'post';
          id = '';
          break;
      }
      this.$emitter.emit('page-loading', true);
      apiUpdateCoupon(method, { data }, id)
        .then((res) => {
          if (res.data.success) {
            this.getCoupons();
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
    deleteCoupon(item) {
      this.$emitter.emit('page-loading', true);
      apiDeleteCoupon(item.id)
        .then((res) => {
          if (res.data.success) {
            this.getCoupons();
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
      if (isModal === 'edit') {
        this.modal = bsModal('couponModal');
        this.modalData = { ...item };
        this.isModal = 'edit';
        this.modalTitle = `編輯優惠券：${item.id}`;
      } else if (isModal === 'delete') {
        this.modal = bsModal('deleteModal');
        this.deleteData = item;
        this.modalTitle = `刪除優惠券：${item.code}`;
      } else {
        this.modal = bsModal('couponModal');
        this.modalData = {};
        this.modalTitle = '新增優惠券';
        this.modalData = {
          start_date: this.today.getTime(),
          due_date: this.today.getTime(),
          percent: 100,
        };
        this.isModal = '';
      }
      this.modal.show();
    },
  },
  created() {
    this.$emitter.emit('page-loading', true);
    this.getCoupons();
  },
};
</script>
