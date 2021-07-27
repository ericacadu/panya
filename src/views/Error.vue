<template>
  <div class="container-fluid error">
    <div class="container min-vh-100">
      <h1 class="display-5 ls-1 fw-bolder text-primary">404 Not Found</h1>
      <h2 class="fs-6 fs-md-4 ls-md-1 text-secondary">
        Oops！您要找的頁面被小精靈吃掉了
      </h2>
      <router-link class="btn btn-outline-primary rounded-0 my-4" to="/"
        >回 PANYA 首頁</router-link
      >
      <div class="pacmaneat my-5">
        <div class="path">
          <div class="pacman">
            <div class="top"></div>
            <div class="bottom"></div>
          </div>
          <div class="cover"></div>
        </div>
        <span class="cookie">
          <i class="fas fa-lg fa-cookie-bite"></i>
        </span>
        <span class="cookie">
          <i class="fas fa-lg fa-cookie"></i>
        </span>
        <span class="cookie">
          <i class="fas fa-lg fa-cookie-bite"></i>
        </span>
        <span class="cookie">
          <i class="fas fa-lg fa-cookie"></i>
        </span>
        <span class="cookie">
          <i class="fas fa-lg fa-cookie-bite"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['page-loading'],
  mounted() {
    this.$emitter.emit('page-loading', false);
  },
};
</script>
