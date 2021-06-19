<template>
  <div
    class="toast p-1 m-3 fade"
    id="toast"
    :class="theme ? `toast-${theme} text-${theme}` : 'hide'"
    data-bs-delay="2500"
  >
    <div class="d-flex">
      <div class="toast-body">{{ message }}</div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        data-bs-dismiss="toast"
      ></button>
    </div>
  </div>
</template>

<script>
import { bsToast } from '../assets/js/plugins';
import mitt from '../assets/js/mitt';

export default {
  data() {
    return {
      toast: {},
      message: '',
      theme: '',
    };
  },
  mounted() {
    this.toast = bsToast('toast');
    mitt.on('toast-message', (args) => {
      this.message = args.msg;
      this.theme = args.theme;
      this.toast.show();
    });
  },
};
</script>
<style lang="sass">
.toast
  position: fixed
  left: 50%
  top: 0
  transform: translateX(-50%)
  z-index: 99999
</style>
