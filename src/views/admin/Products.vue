<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between mb-3">
      <select
        class="form-select"
        v-model="filterInput"
        @change="filterProducts(1)"
      >
        <option value="all" selected>全部商品</option>
        <option v-for="(item, key) in category" :key="key" :value="item">
          {{ item }}
        </option>
      </select>

      <button class="btn btn-primary ms-auto" type="button" @click="openModal">
        <i class="material-icons me-1">add_circle_outline</i>
        新增商品
      </button>
    </div>
    <ul
      class="row g-0 list-unstyled rounded p-2 products-list-header text-nowrap"
    >
      <li class="col-1 d-none d-md-block">分類</li>
      <li class="col-3 text-start">商品名稱</li>
      <li class="col-2">原價</li>
      <li class="col-2">售價</li>
      <li class="col-1">啟用</li>
      <li class="col-1">推薦</li>
      <li class="col-3 col-md-2"></li>
    </ul>
    <ul class="list-group list-group-flush shadow-sm">
      <li class="list-group-item p-2" v-for="item in filterDatas" :key="item.id">
        <div class="col-1 d-none d-md-block">{{ item.category }}</div>
        <div class="col-3 text-start">{{ item.title }}</div>
        <div class="col-2">{{ item.origin_price }}</div>
        <div class="col-2">{{ item.price }}</div>
        <div class="col-1 text-success">
          <span class="material-icons fs-5" v-if="item.is_enabled"
            >check_circle</span
          >
        </div>
        <div class="col-1 text-warning">
          <span class="material-icons fs-5" v-if="item.is_promote"
            >check_circle</span
          >
        </div>
        <div class="col-3 col-md-2 d-flex justify-content-center">
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
    <Pagination :pages="pages" @get-datas="filterProducts"></Pagination>
    <ProductModal :modalData="modalData" @update-data="updateProduct">
      <template #title>{{ modalTitle }}</template>
    </ProductModal>
    <DeleteModal :modalData="deleteData" @delete-data="deleteProduct">
      <template #title>{{ modalTitle }}</template>
      <template #default>
        是否刪除
        <span class="text-danger"> {{ deleteData.title }} </span>
        商品？
        <small class="text-muted">(刪除後將無法恢復)</small>
      </template>
    </DeleteModal>
  </div>
</template>

<script>
import {
  apiGetAllProducts,
  apiUpdateProducts,
  apiDeleteProducts,
} from '@/scripts/api';
import { bsModal, navigator } from '@/scripts/methods';
import ProductModal from '@/components/AdminProductModal.vue';
import DeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  emits: ['page-loading', 'push-message'],
  components: {
    ProductModal,
    DeleteModal,
  },
  data() {
    return {
      products: [],
      category: [],
      pages: {},
      modal: {},
      modalTitle: '',
      isModal: '',
      modalData: [],
      deleteData: [],
      apiInfo: {
        method: '',
        id: '',
      },
      filterDatas: [],
      filterInput: 'all',
      tempArry: [],
    };
  },
  methods: {
    getAllProducts(page = 1) {
      apiGetAllProducts()
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.products = Object.values(res.data.products).reverse();
          const arry = this.products.map((item) => item.category);
          const newSet = new Set(arry);
          this.category = [...newSet];
          this.filterProducts(page);
          this.$emitter.emit('page-loading', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    filterProducts(page) {
      if (this.filterInput === 'all') {
        this.tempArry = this.products;
      } else {
        this.tempArry = this.products.filter(
          (item) => item.category === this.filterInput,
        );
      }
      const newNavigator = navigator(page, this.tempArry);
      this.pages = newNavigator.pages;
      this.filterDatas = newNavigator.newArray;
      this.now_page = this.pages.current_page;
    },
    updateProduct(data) {
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
      apiUpdateProducts(method, { data }, id)
        .then((res) => {
          if (res.data.success) {
            this.getAllProducts(this.pages.current_page);
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
    deleteProduct(item) {
      this.$emitter.emit('page-loading', true);
      apiDeleteProducts(item.id)
        .then((res) => {
          if (res.data.success) {
            this.getAllProducts(this.pages.current_page);
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
        this.modal = bsModal('productModal');
        this.isModal = 'edit';
        this.modalTitle = '編輯商品';
        this.modalData = JSON.parse(JSON.stringify(item));
        if (!this.modalData.imagesUrl) {
          this.modalData.imagesUrl = [];
        }
        if (!this.modalData.relative) {
          this.modalData.relative = [];
        }
        this.$emitter.emit('page-loading', true);
      } else if (isModal === 'delete') {
        this.isModal = 'delete';
        this.modal = bsModal('deleteModal');
        this.modalTitle = '刪除商品';
        this.deleteData = item;
      } else {
        this.modal = bsModal('productModal');
        this.isModal = 'add';
        this.modalTitle = '新增商品';
        this.modalData = {
          imagesUrl: [],
          relative: [],
        };
      }
      this.modal.show();
    },
  },
  created() {
    this.$emitter.emit('page-loading', true);
    this.getAllProducts();
  },
};
</script>
