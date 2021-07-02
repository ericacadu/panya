<template>
  <div class="container-fluid sticky-top"
    :class="toggleNav ? 'position-fixed vh-100 overflow-hidden' : ''">
    <nav
      class="navbar navbar-expand-md navbar-light sticky-top"
      :class="toggleNav ? 'show' : ''"
    >
      <div class="container py-2 px-3 text-secondary">
        <router-link to="/">
          <Logo class="nav-brand col-3 col-md-1 me-5" role="button"></Logo>
        </router-link>
        <div class="collapse navbar-collapse" :class="toggleNav ? 'show' : ''">
          <ul class="navbar-nav">
            <li class="navbar-itemd">
              <router-link
                class="nav-link"
                to="/about"
                @click="toggleNav = fale"
                >關於panya</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                class="nav-link"
                to="/products?category=all&page=1"
                @click="toggleNav = fale"
                >手感烘焙</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                class="nav-link"
                to="/service"
                @click="toggleNav = fale"
                >售後服務</router-link
              >
            </li>
          </ul>
        </div>
        <div
          class="nav-cart col"
          @click="$emitter.emit('toggle-cart', true), (toggleNav = fale)"
        >
          <div role="button">
            <Cart></Cart>
            <!-- <small class="mx-1">購物車</small> -->
            <span class="badge rounded-pill fw-normal ms-1" id="cart-num">
              {{ datas.sum }}
            </span>
          </div>
        </div>
        <button
          class="navbar-toggler col-2 border-0"
          type="button"
          @click="toggleNav = !toggleNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <CartModal />
    </nav>
    <div class="overlay" :class="toggleNav ? 'show' : ''">
      <div class="overlay-inner" @click="toggleNav = fale"></div>
    </div>
  </div>
</template>

<script>
import CartModal from '@/components/FrontCartModal.vue';

export default {
  props: ['datas'],
  components: {
    CartModal,
  },
  data() {
    return {
      toggleNav: false,
    };
  },
};
</script>
