<template>
  <div class="container-fluid px-3 px-md-0 pb-5">
    <div class="header">
      <h1 class="fs-4">常見問題</h1>
      <div
        class="container header-img bg-center fade-out"
        style="
          background-image: url('https://images.pexels.com/photos/6189287/pexels-photo-6189287.jpeg?w=1280');
        "
      ></div>
    </div>
    <div class="container">
      <article v-html="content" class="fade-out"></article>
    </div>
  </div>
</template>

<script>
import { apiGetAllArticles, apiGetArticleContent } from '@/scripts/api';

export default {
  data() {
    return {
      articles: [],
      content: '',
      fadeIn: {},
    };
  },
  methods: {
    getArticles() {
      apiGetAllArticles().then((res) => {
        this.articles = res.data.articles.filter((item) => item.tag.includes('常見問題'));
        this.getContent(this.articles[0]);
      });
    },
    getContent(data) {
      apiGetArticleContent(data.id).then((res) => {
        this.content = res.data.article.content;
        this.fadeIn = () => {
          const all = document.querySelectorAll('.fade-out');
          all.forEach((item) => item.classList.add('fade-in'));
          const links = document.querySelectorAll('article a');
          links.forEach((item) => item.setAttribute('target', '_blank'));
          this.$emitter.emit('page-loading', false);
        };
        setTimeout(this.fadeIn, 1000);
      });
    },
  },
  created() {
    this.getArticles();
  },
  mounted() {
    this.$emitter.emit('page-loading', true);
  },
  unmounted() {
    clearTimeout(this.fadeIn);
  },
};
</script>
