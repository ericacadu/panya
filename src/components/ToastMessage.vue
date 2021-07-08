<template>
  <div
    class="toast mw-60 mw-md-auto p-1 fade"
    id="toast"
    :class="data.style ? `toast-${data.style}` : 'hide'"
    data-bs-delay="2500"
  >
    <div class="d-flex">
      <div class="toast-body" v-html="data.content"></div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        data-bs-dismiss="toast"
      ></button>
    </div>
  </div>
</template>

<script>
import { bsToast } from '@/scripts/methods';

export default {
  data() {
    return {
      toast: {},
      data: {},
    };
  },
  mounted() {
    this.toast = bsToast('toast');
    this.$emitter.on('push-message', (message) => {
      const { style = 'success', content } = message;
      this.data.style = style;
      this.data.content = content;
      this.toast.show();
    });
  },
};
</script>
