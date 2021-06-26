<template>
  <div class="loading bouncecookie"
    :class="isLoading ? '' : 'd-none fade'">
    <i class="fas fa-2x fa-cookie-bite cookie"></i>
    <span>loading</span>
  </div>
</template>
<script>
export default {
  props: ['isLoading'],
};
</script>
