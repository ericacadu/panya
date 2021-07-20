<template>
  <div
    class="
      container-fluid
      min-vh-100
      bg-dark
      py-5
      d-md-flex
      align-items-md-center
    "
  >
    <div class="login row g-0 rounded mx-auto flex-column flex-lg-row">
      <div
        class="col col-lg-5 sticky-img"
        :style="`background-image: url(${stickyImg})`"
      ></div>
      <form
        class="
          col col-lg-7
          bg-white
          p-4
          d-flex
          flex-column
          justify-content-start
          needs-validation
        "
        novalidate
        @submit.prevent="signin"
      >
        <h1 class="fs-4 fw-bold mb-4 text-center">登入後台</h1>
        <div class="form-floating mb-3">
          <input
            type="email"
            id="email"
            class="form-control panya-input"
            required
            data-valid="false"
            placeholder="請輸入 Email"
            v-model="user.username"
          />
          <label for="email">Email</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            id="password"
            class="form-control panya-input"
            required
            data-valid="false"
            placeholder="請輸入密碼"
            v-model="user.password"
          />
          <label for="password">Password</label>
        </div>
        <button
          class="btn btn-dark w-100 mt-auto"
          type="submit"
          @click="signin"
        >
          登入
        </button>
        <router-link to="./" class="btn btn-outline-primary text-center mt-1">
          回首頁</router-link
        >
      </form>
    </div>
    <div class="bg-blur" :style="`background-image: url(${imgUrl})`"></div>
  </div>
</template>

<script>
import { apiUserLogin } from '@/scripts/api';
import invalidMix from '@/mixins/InvalidMix.vue';

export default {
  emits: ['page-loading', 'push-message'],
  mixins: [invalidMix],
  data() {
    return {
      imgUrl:
        'https://images.unsplash.com/photo-1447078806655-40579c2520d6?w=1080',
      stickyImg:
        'https://images.unsplash.com/photo-1613703155029-7323926e221c?w=1080',
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      if (!this.isValid) {
        return;
      }
      this.$emitter.emit('page-loading', true);
      apiUserLogin(this.user)
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(false, '帳號密碼錯誤');
            this.$emitter.emit('page-loading', false);
          } else {
            const { token, expired } = res.data;
            document.cookie = `panyaToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('/admin/products');
          }
        })
        .catch((err) => {
          this.$pushMessage(err);
          this.$emitter.emit('page-loading', false);
        });
    },
  },
  watch: {
    user: {
      handler() {
        this.validation();
      },
      deep: true,
    },
  },
  mounted() {
    this.$emitter.emit('page-loading', false);
  },
};
</script>
