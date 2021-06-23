<template>
  <div class="container-fluid p-3">
    <p class="text-end">
      <button class="btn btn-primary ms-auto" type="button" @click="opdenModal">
        <i class="material-icons me-1">add_circle_outline</i>
        新增商品
      </button>
    </p>
    <ul
      class="row g-0 list-unstyled rounded p-2 products-list-header text-nowrap"
    >
      <li class="col-1 d-none d-md-block">分類</li>
      <li class="col-4 text-start">商品名稱</li>
      <li class="col-2">原價</li>
      <li class="col-2">售價</li>
      <li class="col-1">啟用</li>
      <li class="col-3 col-md-2"></li>
    </ul>
    <ul class="list-group list-group-flush shadow-sm">
      <li class="list-group-item p-2" v-for="item in products" :key="item.id">
        <div class="col-1 d-none d-md-block">{{ item.category }}</div>
        <div class="col-4 text-start">{{ item.title }}</div>
        <div class="col-2">{{ item.origin_price }}</div>
        <div class="col-2">{{ item.price }}</div>
        <div class="col-1 text-success">
          <span class="material-icons fs-5" v-if="item.is_enabled"
            >check_circle</span
          >
        </div>
        <div class="col-3 col-md-2 d-flex justify-content-center">
          <button
            class="btn btn-sm btn-outline-primary fs-7"
            type="button"
            @click="opdenModal('edit', item)"
          >
            編輯
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
    <Pagination :pages="pages" @get-products="getProducts"></Pagination>
    <ProductModal :modalData="modalData" @update-product="updateProduct">
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
  apiGetProducts,
  apiUpdateProducts,
  apiDeleteProducts,
} from '@/scripts/api';
import { bsModal, bsToast } from '@/scripts/methods';
import ProductModal from '@/components/productModal.vue';
import DeleteModal from '@/components/deleteModal.vue';

export default {
  components: {
    ProductModal,
    DeleteModal,
  },
  data() {
    return {
      products: [],
      pages: [],
      modal: {},
      modalTitle: '',
      isModal: 'add',
      modalData: [],
      deleteData: [],
      apiInfo: {
        method: '',
        id: '',
      },
    };
  },
  methods: {
    getProducts(page) {
      apiGetProducts(page)
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.products = res.data.products;
          this.pages = res.data.pagination;
        });
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
      apiUpdateProducts(method, { data }, id)
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
            this.modal.hide();
          }
          this.$pushMessage(res);
        });
    },
    deleteProduct(item) {
      apiDeleteProducts(item.id)
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
            this.modal.hide();
          }
          this.$pushMessage(res);
        });
    },
    opdenModal(isModal = 'add', item) {
      if (isModal === 'edit') {
        this.modal = bsModal('productModal');
        this.isModal = 'edit';
        this.modalTitle = '編輯商品';
        this.modalData = JSON.parse(JSON.stringify(item));
        if (!this.modalData.imagesUrl) {
          this.modalData.imagesUrl = [];
        }
      } else if (isModal === 'delete') {
        this.modal = bsModal('deleteModal');
        this.modalTitle = '刪除商品';
        this.deleteData = item;
      } else {
        this.modal = bsModal('productModal');
        this.modalTitle = '新增商品';
        this.isModal = 'add';
        this.modalData = {
          imagesUrl: [],
          category: '選擇類別',
          unit: '選擇單位',
        };
      }
      this.modal.show();
    },
  },
  mounted() {
    this.getProducts();
  },
  unmounted() {
    bsToast('toast').hide();
  },
};
</script>
