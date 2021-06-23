<template>
  <nav class="text-center">
    <ul class="pagination d-flex justify-content-center my-4"
      v-show="pages">
      <li class="page-item" :class="pages.has_pre ? '' : 'disabled'">
        <a class="page-link" href="#"
          @click.prevent="$emit('get-products', pages.current_page - 1)">
          <span>&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        v-for="(item, key) in pages.total_pages" :key="key"
        :class="item === pages.current_page ? 'active' : ''">
        <a class="page-link" href="#"
          @click.prevent="$emit('get-products', item)">
        {{ item }}</a>
      </li>
      <li class="page-item" :class="pages.has_next ? '' : 'disabled'">
        <a class="page-link" href="#"
          @click.prevent="$emit('get-products', pages.current_page + 1)">
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  // "pagination": {
  //       "total_pages": 1,
  //       "current_page": 1,
  //       "has_pre": false,
  //       "has_next": false,
  //       "category": null
  //     },
};
</script>
