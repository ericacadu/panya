<template>
  <div class="loading bouncecookie"
    :class="isLoading ? '' : 'd-none fade'">
    <i class="fas fa-2x fa-cookie-bite cookie"></i>
    <span>loading</span>
  </div>
</template>
<script>
import { bsToast } from '@/scripts/methods';

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    this.$emitter.on('page-loading', (val) => {
      this.isLoading = val;
    });
  },
  watch: {
    isLoading() {
      bsToast('toast').hide();
    },
  },
};
</script>
