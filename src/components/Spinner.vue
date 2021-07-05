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
  props: ['spinItem'],
  data() {
    return {
      isLoading: false,
      id: '',
    };
  },
  mounted() {
    this.$emitter.on('toggle-spinner', (val) => {
      const { id } = val;
      this.id = id;
      if (this.spinItem === this.id || this.spinItem === val) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });
  },
};
</script>
