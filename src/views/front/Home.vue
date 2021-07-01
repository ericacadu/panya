<template>
  <div class="">
    <div class="banner">
      <div
        class="
          container
          min-vh-65
          d-flex
          align-items-center
          justify-content-center
          flex-column
        "
      >
        <h1 class="fs-3 fw-normal ls-5 text-light">
          用天然食材，做出溫暖人心的麵包
        </h1>
        <a href="#" class="btn btn-outline-light px-5 mt-3">探索美味</a>
      </div>
    </div>
    <div class="container">
      <h2 class="fs-4 text-center p-5">只有用心，才能暖心</h2>
      <div class="row g-0 bg-white">
        <div class="col p-5">
          <h3 class="fs-5">堅持天然食材</h3>
          我們堅持使用在地小農種植的天然食材
          <br />
          選用當季新鮮水果及優質麵粉
          <br />
          不使用人工香料及膨鬆劑等添加物
        </div>
        <div class="col p-5 ms-auto">
          <h3 class="fs-5">沒有負擔的美味</h3>
          選用低卡奶油，嚴格把關麵包熱量
          <br />
          尋找健康食材替代高熱量原料
          <br />
          好吃不怕胖，美味也可以零負擔
        </div>
        <div class="col p-5">
          <h3 class="fs-5">美食與美感</h3>
          我們重視美食，也重視美感
          <br />
          經過不斷嘗試與實驗，追求味蕾與視覺融合
          <br />
          用心帶給消費者加倍的幸福感
        </div>
      </div>
      <h2 class="fs-4 text-center p-5">熱銷商品</h2>
    </div>
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

<style lang="sass" scoped>
*
  // outline: 1px solid red
</style>
