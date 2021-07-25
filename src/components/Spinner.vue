<template>
  <div class="loading bounceball"
    :class="isLoading ? '' : 'd-none fade'">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script>
export default {
  props: {
    spinItem: {
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
      itemId: '',
    };
  },
  mounted() {
    this.$emitter.on('toggle-spinner', (val) => {
      const { id } = val;
      this.itemId = id;
      if (this.spinItem === this.itemId || this.spinItem === val) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });
  },
};
</script>
