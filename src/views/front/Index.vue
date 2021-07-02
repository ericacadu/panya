<template>
  <div class="front container-fluid g-0 min-vh-100 text-dark">
    <Navbar />
    <router-view class="min-vh-100" />
    <div class="bg-dark py-5 min-vh-25 text-light">
      <div class="container">
        <router-link class="nav-link d-inline-block" to="/login"
          >登入後台</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/FrontNavbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      toggleNav: false,
      toggleCart: false,
      isDisabled: '',
    };
  },
  watch: {
    toggleCart() {
      if (this.toggleCart === true) {
        this.toggleNav = false;
      }
    },
  },
  methods: {
    closeCart() {
      this.toggleCart = false;
      this.toggleNav = false;
    },
    openCart() {
      this.toggleCart = true;
    },
  },
};
</script>
<style scope lang="sass">
@import '@/assets/css/front'
</style>
