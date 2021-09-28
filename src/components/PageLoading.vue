<template>
  <div class="loading bouncecookie"
    :class="[status ? '' : 'fade', show]">
    <i class="fas fa-2x fa-cookie-bite cookie"></i>
    <span>loading</span>
  </div>
</template>
<script>

export default {
  data() {
    return {
      show: '',
    };
  },
  computed: {
    status() {
      return this.$store.state.isLoading;
    },
  },
  watch: {
    status(val) {
      const body = document.querySelector('body');
      if (val) {
        this.show = '';
        body.setAttribute('class', 'mh-100vh overflow-hidden');
      } else {
        setTimeout(() => {
          this.show = 'd-none';
          body.setAttribute('class', '');
        }, 200);
      }
    },
  },
};
</script>
