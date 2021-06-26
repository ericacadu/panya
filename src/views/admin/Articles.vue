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
      <li class="col-3 text-start">標籤</li>
      <li class="col-1">啟用</li>
      <li class="col-2"></li>
    </ul>
    <ul class="list-group list-group-flush shadow-sm">
      <li class="list-group-item p-2"
        v-for="item in articles" :key="item.id">
        <div class="col-2">{{ getDate(item.create_at) }}</div>
        <div class="col-4 text-start">{{ item.title }}</div>
        <div class="col-3 text-start">{{ item.tag.toString().split(',').join('、') }}</div>
        <div class="col-1 text-success">
          <span class="material-icons fs-5"
            v-if="item.isPublic"
            >check_circle</span
          >
        </div>
        <div class="col-2 d-flex justify-content-center">
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
    <ArticleModal :modal-data="modalData" @update-data="updateArticle">
      <template #title>{{ modalTitle }}</template>
    </ArticleModal>
    <DeleteModal></DeleteModal>
  </div>
</template>

<script>
import { apiGetArticles, apiUpdateArticle } from '@/scripts/api';
import { bsModal, getDate } from '@/scripts/methods';
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
      isModal: '',
      modalTitle: '',
      apiInfo: {
        method: '',
        id: '',
      },
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
    getDate(date) {
      return getDate(date);
    },
    updateArticle(data) {
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
      apiUpdateArticle(method, { data }, id)
        .then((res) => {
          if (res.data.success) {
            this.getArticles();
            this.modal.hide();
          }
          this.$pushMessage(res);
        });
    },
    openModal(isModal, item) {
      if (isModal === 'edit') {
        this.modal = bsModal('articleModal');
        this.isModal = 'edit';
        this.modalTitle = '編輯文章';
        this.modalData = JSON.parse(JSON.stringify(item));
      } else if (isModal === 'delete') {
        this.modal = bsModal('deleteModal');
        this.modalTitle = '刪除文章';
        this.deleteData = item;
      } else {
        this.modal = bsModal('articleModal');
        this.modalData = {
          tag: [],
          author: 'Erica',
          create_at: new Date().getTime(),
          content: '',
          isPublic: false,
        };
        this.modalTitle = '新增文章';
      }
      this.modal.show();
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
