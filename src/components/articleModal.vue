<template>
  <div
    class="modal fade"
    id="articleModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div
      class="
        modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable
      "
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-dark p-3 text-light">
          <slot name="title"></slot>
          <button type="button" class="btn-close me-1" data-bs-dismiss="modal">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body">
          <!-- content start -->
          <div class="row">
            <div class="col-4">
              <div id="list-example" class="list-group sticky-top">
                <a
                  class="list-group-item list-group-item-action"
                  href="#list-item-1"
                  >Item 1</a
                >
                <a
                  class="list-group-item list-group-item-action"
                  href="#list-item-2"
                  >Item 2</a
                >
                <a
                  class="list-group-item list-group-item-action"
                  href="#list-item-3"
                  >Item 3</a
                >
                <a
                  class="list-group-item list-group-item-action"
                  href="#list-item-4"
                  >Item 4</a
                >
              </div>
            </div>
            <div class="col-8">
              <div
                id="scrollspy"
                data-bs-spy="scroll"
                data-bs-target="#list-example"
                data-bs-offset="0"
                tabindex="0"
              >
                <h4 id="list-item-1">Item 1</h4>
                <p>
                  This is some placeholder content for the scrollspy page. Note
                  that as you scroll down the page, the appropriate navigation
                  link is highlighted. It's repeated throughout the component
                  example. We keep adding some more example copy here to
                  emphasize the scrolling and highlighting.
                </p>
                <h4 id="list-item-2">Item 2</h4>
                <p>
                  This is some placeholder content for the scrollspy page. Note
                  that as you scroll down the page, the appropriate navigation
                  link is highlighted. It's repeated throughout the component
                  example. We keep adding some more example copy here to
                  emphasize the scrolling and highlighting.
                </p>
                <h4 id="list-item-3">Item 3</h4>
                <p>
                  This is some placeholder content for the scrollspy page. Note
                  that as you scroll down the page, the appropriate navigation
                  link is highlighted. It's repeated throughout the component
                  example. We keep adding some more example copy here to
                  emphasize the scrolling and highlighting.
                </p>
                <h4 id="list-item-4">Item 4</h4>
                <p>
                  This is some placeholder content for the scrollspy page. Note
                  that as you scroll down the page, the appropriate navigation
                  link is highlighted. It's repeated throughout the component
                  example. We keep adding some more example copy here to
                  emphasize the scrolling and highlighting.
                </p>
              </div>
            </div>
          </div>
          <!-- content end -->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-data', datas)"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bsScrollSpy } from '@/scripts/methods';

export default {
  props: ['modalData'],
  data() {
    return {
      scrollspy: {},
    };
  },
  watch: {
    modalData() {
      this.scrollspy = bsScrollSpy('scrollspy');
      console.log(this.scrollspy);
    },
  },
  mounted() {},
};
</script>
