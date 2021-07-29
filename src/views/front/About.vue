<template>
  <div class="container-fluid px-3 px-md-0 pb-5">
    <header>
      <h1 class="fs-4">關於 PANYA</h1>
      <div
        class="container header-img fade-out"
        style="
          background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/panya/1627475932702.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BsJv%2Bj2U5ysjsLH4eVzTuWDaQVQDuOoRxmrmGkEY46AJzKFvJp4bdyJxirtXqqqszlXJ%2FT94S%2BOG9i%2FIDL%2Bg%2FDRr82DyP4QZplfezIXysG1P0%2BsbZv5BEe0lRS4cHYtiuYl6DnrGf0WVyt0lj0Ccu4n8ujq6D0nt5Wt8PAzrWxUXj7XXNNlKb73XHl3C1JiwmRiVjVzw1PjOsvA2osDqFVCuHYHCK7NYlMsG9wCFe%2BmOGdEluoF6ZBKUYPi9fMO3swfOxwlxcyxPWVBtPPrEz2gB%2B4KZkTXCiBPa1VXFbn32uWlnemkVFuz%2BThRDvGjyKwSE1yqg7MhFJvcryD5uAQ%3D%3D');
        "
      ></div>
    </header>
    <div class="container">
      <article v-html="content" class="fade-out"></article>
    </div>
  </div>
</template>

<script>
import { apiGetAllArticles, apiGetArticleContent } from '@/scripts/api';

export default {
  emits: ['page-loading', 'push-message'],
  data() {
    return {
      articles: [],
      content: '',
      fadeIn: {},
    };
  },
  methods: {
    getArticles() {
      apiGetAllArticles()
        .then((res) => {
          this.articles = res.data.articles.filter((item) => item.title.includes('關於PANYA'));
          this.getContent(this.articles[0]);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    getContent(data) {
      apiGetArticleContent(data.id)
        .then((res) => {
          this.content = res.data.article.content;
          this.fadeIn = () => {
            const all = document.querySelectorAll('.fade-out');
            all.forEach((item) => item.classList.add('fade-in'));
            const links = document.querySelectorAll('article a');
            links.forEach((item) => item.setAttribute('target', '_blank'));
            this.$emitter.emit('page-loading', false);
          };
          setTimeout(this.fadeIn, 1000);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
  },
  mounted() {
    this.getArticles();
    this.$emitter.emit('page-loading', true);
  },
  unmounted() {
    clearTimeout(this.fadeIn);
  },
};
</script>
