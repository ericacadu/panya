<template>
  <div class="container-fluid min-vh-100 bg-dark py-5 d-md-flex align-items-md-center">
    <div
      class="login row g-0 rounded mx-auto flex-column flex-lg-row"
    >
      <div
        class="col col-lg-5 min-vh-lg-60 sticky-img"
        :style="`background-image: url(${stickyImg})`"
      ></div>
      <div class="col col-lg-7 bg-white p-4 d-flex flex-column justify-content-start"
      >
        <h1 class="fs-4 fw-bold mb-4 text-center">登入後台</h1>
        <form @submit.prevent>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control text-start"
              id="email"
              placeholder="admin@email.com"
              v-model="username"
            />
            <label for="email">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control text-start"
              id="password"
              placeholder="admin"
              v-model="password"
            />
            <label for="password">Password</label>
          </div>
        </form>
        <button
          class="btn btn-dark w-100 mt-auto"
          type="button"
          @click="signin"
        >
          登入
        </button>
        <router-link to="./" class="btn btn-outline-primary text-center mt-1">
        回首頁</router-link>
      </div>
    </div>
    <div class="bg-blur" :style="`background-image: url(${imgUrl})`"></div>
  </div>
</template>

<script>
import { apiUserLogin } from '@/scripts/api';

export default {
  data() {
    return {
      imgUrl:
        'https://images.unsplash.com/photo-1447078806655-40579c2520d6?w=1080',
      stickyImg:
        'https://images.unsplash.com/photo-1613703155029-7323926e221c?w=1080',
      username: '',
      password: '',
    };
  },
  methods: {
    signin() {
      const data = {
        username: this.username,
        password: this.password,
      };
      this.$emitter.emit('page-loading', true);
      apiUserLogin(data)
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(false, '帳號密碼錯誤');
            this.$emitter.emit('page-loading', false);
          } else {
            const { token, expired } = res.data;
            document.cookie = `panyaToken=${token}; expires=${new Date(
              expired,
            )}`;
            this.$router.push('/admin/products');
          }
        });
    },
  },
  mounted() {
    this.$emitter.emit('page-loading', false);
  },
};
</script>
