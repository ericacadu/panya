<template>
  <div class="container p-3">
      about
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$emitter.emit('page-loading', true);
  },
  mounted() {
    this.$emitter.emit('page-loading', false);
    this.$emit('close-cart');
  },
};
</script>
