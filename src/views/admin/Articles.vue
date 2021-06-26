<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between mb-3">
      <!-- <select
        class="form-select mw-25"
        v-model="filterInput"
        @change="filterProducts(1)"
      >
        <option value="all" selected>全部文章</option>
        <option v-for="(item, key) in tags" :key="key" :value="item">
          {{ item }}
        </option>
      </select> -->

      <button class="btn btn-primary ms-auto" type="button" @click="openModal">
        <i class="material-icons me-1">add_circle_outline</i>
        新增文章
      </button>
    </div>
    <ul
      class="row g-0 list-unstyled rounded p-2 products-list-header text-nowrap"
    >
      <li class="col-2">日期</li>
      <li class="col-4 text-start">文章名稱</li>
      <li class="col-2">標籤</li>
      <li class="col-1">啟用</li>
      <li class="col-3"></li>
    </ul>
    <ul class="list-group list-group-flush shadow-sm">
      <li class="list-group-item p-2">
        <!--  v-for="item in products" :key="item.id" -->
        <div class="col-2">日期</div>
        <div class="col-4 text-start">文章名稱</div>
        <div class="col-2">標籤</div>
        <div class="col-1 text-success">
          <!--  v-if="item.is_enabled" -->
          <span class="material-icons fs-5"
            >check_circle</span
          >
        </div>
        <div class="col-3 d-flex justify-content-center">
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
    <ArticleModal :modalData="modalData">
      <template #title>{{ modalTitle }}</template>
    </ArticleModal>
    <DeleteModal></DeleteModal>
  </div>
</template>

<script>
import { apiGetArticles } from '@/scripts/api';
import { bsModal } from '@/scripts/methods';
import ArticleModal from '@/components/articleModal.vue';
import DeleteModal from '@/components/deleteModal.vue';

export default {
  components: {
    ArticleModal,
    DeleteModal,
  },
  data() {
    return {
      articles: [],
      modalData: {},
      deleteData: {},
      modal: {},
      tags: [],
      pages: {},
      modalTitle: '',
    };
  },
  methods: {
    getArticles() {
      apiGetArticles()
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.articles = res.data.articles;
        });
    },
    openModal() {
      this.modal = bsModal('articleModal');
      this.modalData = {};
      this.modalTitle = '新增文章';
      this.modal.show();
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
