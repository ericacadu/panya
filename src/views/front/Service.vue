<template>
  <div class="container-fluid px-3 px-md-0 pb-5">
    <header>
      <h1 class="fs-4">常見問題</h1>
      <div
        class="container header-img bg-center fade-out"
        style="
          background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/panya/1627476299135.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=H%2B8y1mSvmHMVdREMF5nN%2Fukt7BSLo4apF89cH3EvEkqxasPTavysVDRFWpXICvONhsUu17dA7moAveXwUpzWp38lzNHstT0BxEJkmsj0twbLhQ0HStuuNuCP5Bo9Mru1vifgXDMMg7UJvoYF%2F47omqtwXDUrcPC1ooKBwfdWMtb0QNBKxLeNsq6NfNrfojkfarIdTR%2FnTCenlmCptOfwzll%2FCOrVqfu6FZiit2ZvteJU2oAMGcNfQLtfAoubyPMKOKN8EZ0c80VINO%2BgBZIfGiuZagSVLG7h2YXApOAAKqFzqTxJwkYW9PcA3wgwraxiREWrRjVP1wlTJF%2FgBYKspA%3D%3D');
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
          this.articles = res.data.articles.filter((item) => item.title.includes('常見問題'));
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
    this.$emitter.emit('page-loading', true);
    this.getArticles();
  },
  unmounted() {
    clearTimeout(this.fadeIn);
  },
};
</script>
