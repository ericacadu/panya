<template>
  <div class="admin container-fluid row g-0 min-vh-100 bg-dark">
    <div class="col-lg-2 text-light">
      <nav
        class="
          navbar navbar-dark navbar-expand-lg
          p-3
          d-flex
          flex-lg-column
          align-items-start
        "
      >
        <div class="navbar-brand fs-6 fw-light">PANYA</div>
        <button
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav-collapse"
        >
          <i class="navbar-toggler-icon"></i>
        </button>
        <div class="collapse navbar-collapse" id="nav-collapse">
          <ul class="navbar-nav d-flex flex-column mt-lg-4">
            <li class="nav-item">
              <router-link class="nav-link px-0" to="/admin/products"
                >商品管理</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link px-0" to="/admin/orders"
                >訂單管理</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link px-0" to="/admin/coupons"
                >優惠券管理</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link px-0 disabled" to="/"
                >文章管理</router-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="col-lg-10 bg-light min-vh-100 shadow-md">
      <nav
        class="p-3 bg-white d-flex justify-content-between align-items-center"
      >
        <ol class="breadcrumb m-0">
          <li class="breadcrumb-item">
            {{ path }}
            <i class="fas fa-angle-right"></i>
          </li>
          <li class="breadcrumb-item active">{{ page }}</li>
        </ol>
        <span class="ms-auto me-3 text-secondary">
          {{ status }}
        </span>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="logout"
        >
          登出
        </button>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { apiUserCheck, apiUserLogout } from '../../assets/js/api';
import mitt from '../../assets/js/mitt';

export default {
  data() {
    return {
      path: '',
      page: '',
      status: '',
      message: '',
      theme: '',
    };
  },
  watch: {
    $route() {
      this.page = this.$route.meta.title;
    },
  },
  methods: {
    checking() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)panyaToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      apiUserCheck()
        .then((res) => {
          if (res.data.success) {
            this.status = '已登入';
            mitt.emit('toast-message', { msg: this.status, theme: 'success' });
          } else {
            this.status = res.data.message;
            mitt.emit('toast-message', { msg: res.data.message, theme: 'danger' });

            this.$router.push('/login');
          }
        })
        .catch((err) => {
          mitt.emit('toast-message', { msg: err, theme: 'danger' });
        });
    },
    logout() {
      apiUserLogout().then((res) => {
        if (res.data.success) {
          document.cookie = `panyaToken= ; expires=${new Date()}`;
          this.$router.push('/login');
        }
        mitt.emit('toast-message', { msg: res.data.message, theme: 'danger' });
      }).catch((err) => {
        mitt.emit('toast-message', { msg: err, theme: 'danger' });
      });
    },
  },
  created() {
    this.path = this.$route.matched[0].meta.title;
    this.page = this.$route.meta.title;
    this.checking();
  },
};
</script>

<style scope lang="sass">
@import '@/assets/css/admin.sass'
.navbar-brand
  letter-spacing: .5rem
.navbar-toggler:not(.collapsed)
  border-color: rgba($light, .5)
.breadcrumb-item
  color: $gray-600
  svg
    margin-left: 5px
    transform: scale(.9)
  &.active
    color: $gray-700
.btn .material-icons
  font-size: $font-size-base * 1.2
</style>
