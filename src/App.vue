<template>
  <router-view/>
  <ToastMessage></ToastMessage>
  <PageLoading/>
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
@import '@/assets/css/reset'
.toast.hide
  display: none
// .spinner
//   display: none
</style>
