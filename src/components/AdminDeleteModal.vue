<template>
  <div class="modal fade" id="deleteModal" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark p-3 text-light">
          <slot name="title"></slot>
          <button type="button" class="btn-close me-1" data-bs-dismiss="modal">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body pt-4 pb-5">
          <!-- content -->
          <slot></slot>
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
            class="btn btn-danger"
            @click="$emit('delete-data', datas)"
          >
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modalData'],
  emits: ['delete-data'],
  data() {
    return {
      datas: {},
    };
  },
  watch: {
    modalData() {
      this.datas = this.modalData;
    },
  },
};
</script>
