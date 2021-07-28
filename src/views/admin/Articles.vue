<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between mb-3">
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
        <div class="col-2">{{ item.create_date }}</div>
        <div class="col-4 text-start">{{ item.title }}</div>
        <div class="col-3 text-start">{{ item.tagstr }}</div>
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
    <Pagination :pages="pages" @get-datas="getArticles"></Pagination>
    <ArticleModal :modal-data="modalData" @update-data="updateArticle">
      <template #title>{{ modalTitle }}</template>
    </ArticleModal>
    <DeleteModal :modalData="deleteData" @delete-data="deleteArticle">
      <template #title>{{ modalTitle }}</template>
      <template #default>
        是否刪除
        <span class="text-danger"> {{ deleteData.title }} </span>
        文章
        <small class="text-muted">(刪除後將無法恢復)</small>
      </template>
    </DeleteModal>
  </div>
</template>

<script>
import { apiGetArticles, apiUpdateArticle, apiDeleteArticle } from '@/scripts/api';
import { bsModal, getDate } from '@/scripts/methods';
import ArticleModal from '@/components/AdminArticleModal.vue';
import DeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  emits: ['page-loading', 'push-message'],
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
          this.pages = res.data.pagination;
          this.articles.forEach((item) => {
            const atc = item;
            if (atc.tag) {
              atc.tagstr = atc.tag.toString().split(',').join('、');
            } else {
              atc.tagstr = atc.tag;
            }
            atc.create_date = getDate(item.create_at);
          });
          this.$emitter.emit('page-loading', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
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
      this.$emitter.emit('page-loading', true);
      apiUpdateArticle(method, { data }, id)
        .then((res) => {
          if (res.data.success) {
            this.getArticles();
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
        this.modal = bsModal('articleModal');
        this.isModal = 'edit';
        this.modalTitle = '編輯文章';
        this.modalData = JSON.parse(JSON.stringify(item));
        this.$emitter.emit('page-loading', true);
      } else if (isModal === 'delete') {
        this.modal = bsModal('deleteModal');
        this.modalTitle = '刪除文章';
        this.deleteData = item;
      } else {
        this.modal = bsModal('articleModal');
        this.isModal = 'add';
        this.modalData = {
          author: 'Erica',
          create_at: new Date().getTime(),
          isPublic: true,
          content: '',
        };
        this.modalTitle = '新增文章';
      }
      this.modal.show();
    },
    deleteArticle(item) {
      this.$emitter.emit('page-loading', true);
      apiDeleteArticle(item.id)
        .then((res) => {
          if (res.data.success) {
            this.getArticles();
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
  },
  created() {
    this.$emitter.emit('page-loading', true);
    this.getArticles();
  },
};
</script>
