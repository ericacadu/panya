<template>
  <div class="container-fluid min-vh-100 bg-dark py-5 d-md-flex align-items-md-center">
    <div
      class="login row g-0 rounded-3 mx-auto d-flex flex-column flex-lg-row"
    >
      <div
        class="col col-lg-4 min-vh-lg-60 sticky-img"
        :style="`background-image: url(${stickyImg})`"
      ></div>
      <div class="col col-lg-8 bg-white p-4 d-flex flex-column justify-content-start"
      >
        <h1 class="fs-4 fw-bold mb-4">登入後台</h1>
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
        <div class="alert alert-danger" v-if="message">
          {{ message }}
        </div>
        <button
          class="btn btn-dark w-100 py-2 mt-auto"
          type="button"
          @click="signin"
        >
          登入
        </button>
        <router-link to="./" class="text-center mt-3">回首頁</router-link>
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
      // imgUrl: '',
      // stickyImg: '',
      imgUrl:
        'https://images.unsplash.com/photo-1447078806655-40579c2520d6?w=1080',
      stickyImg:
        'https://images.unsplash.com/photo-1613703155029-7323926e221c?w=1080',
      username: '',
      password: '',
      message: '',
    };
  },
  methods: {
    signin() {
      const data = {
        username: this.username,
        password: this.password,
      };
      this.$emitter.emit('change-status', true);
      apiUserLogin(data)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `panyaToken=${token}; expires=${new Date(
              expired,
            )}`;
            this.$router.push('/admin/products');
          } else {
            this.$pushMessage(res);
          }
        });
    },
  },
  beforeMount() {
    this.$emitter.emit('change-status', true);
  },
  mounted() {
    this.$emitter.emit('change-status', false);
  },
};
</script>

<style lang="sass" scope>
@import '@/assets/css/admin.sass'
.login
  position: relative
  z-index: 2
  overflow: hidden
  width: 90%
  max-width: 500px

.bg-blur
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  z-index: 0
  background-repeat: no-repeat
  background-size: cover
  background-position: center center
  width: 100vw
  height: 100vh
  opacity: .5
  filter: blur(1rem)
  -webkit-filter: blur(1rem)

.sticky-img
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  min-height: 8em
</style>
