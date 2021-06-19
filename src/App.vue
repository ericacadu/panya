<template>
  <router-view/>
  <Toast></Toast>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    $route(to) {
      const nowTitle = to.meta.title || '';
      document.title = `${nowTitle} PANYA`;
    },
  },
};
</script>

<style lang="sass">
.toast.hide
  display: none
</style>
