<template>
  <form
    class="modal fade needs-validation"
    id="couponModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    novalidate
    @submit.prevent
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark p-3 text-light">
          <slot name="title">新增優惠券</slot>
          <button type="button" class="btn-close me-1" data-bs-dismiss="modal">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body">
          <!-- content start -->
          <div class="row g-2">
            <div class="col-5">
              <label for="title" class="form-label">優惠券標題</label>
              <input
                type="text"
                class="form-control"
                placeholder="輸入標題"
                id="title"
                v-model.trim="datas.title"
                required
              />
            </div>
            <div class="col-5">
              <label for="code" class="form-label">優惠碼</label>
              <input
                type="text"
                class="form-control"
                placeholder="輸入優惠碼"
                id="code"
                v-model.trim="datas.code"
                required
              />
            </div>
            <div class="col">
              <label for="percent" class="form-label">折扣 (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                class="form-control no-valid"
                id="percent"
                v-model.number="datas.percent"
              />
            </div>
            <div class="d-flex justify-content-between">
              <label for="start-date" class="form-label col-6 m-0"
                >起始日</label
              >
              <label for="end-dete" class="form-label col-6 m-0 ps-3">&nbsp;截止日</label>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="col">
                <v-date-picker color="indigo" class="inline-block h-full"
                  v-model="datas.start_date"
                  :model-config="modelConfig">
                  <template v-slot="{ inputValue, togglePopover }">
                    <div class="input-group">
                      <input class="form-control"
                        id="start-date"
                        :value="inputValue"
                      />
                      <button class="btn btn-sm btn-outline-primary"
                        @click="togglePopover()">
                        <i class="far fa-calendar-alt fa-lg"></i>
                      </button>
                    </div>
                  </template>
                </v-date-picker>
              </div>
              <div class="col-1 text-center">～</div>
              <div class="col">
                <v-date-picker color="indigo" class="inline-block h-full"
                  v-model="datas.due_date"
                  :model-config="modelConfig">
                  <template v-slot="{ inputValue, togglePopover }">
                    <div class="input-group">
                      <input class="form-control"
                        id="end-date"
                        :value="inputValue"
                      />
                      <button class="btn btn-sm btn-outline-primary"
                        @click="togglePopover()">
                        <i class="far fa-calendar-alt fa-lg"></i>
                      </button>
                    </div>
                  </template>
                </v-date-picker>
              </div>
            </div>
          </div>
          <hr class="my-4" />
          <div class="d-flex align-items-center">
            <label class="form-label m-0" for="coupon-active">是否啟用</label>
            <div class="switch-group ms-2">
              <input
                type="checkbox"
                id="coupon-active"
                role="button"
                v-model="datas.is_enabled"
                :checked="
                  datas.is_enabled
                    ? (datas.is_enabled = 1)
                    : (datas.is_enabled = 0)
                "
                :disabled="datas.due_date < today"
              />
              <div class="ico_switch"></div>
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
            type="submit"
            class="btn btn-primary"
            @click="updateDatas"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import invalidMix from '@/mixins/InvalidMix.vue';

export default {
  props: ['modalData'],
  mixins: [invalidMix],
  emits: ['page-loading', 'push-message', 'update-data'],
  data() {
    return {
      datas: {},
      modelConfig: {
        type: 'number',
      },
      today: new Date(),
    };
  },
  methods: {
    updateDatas() {
      if (!this.isValid) {
        return;
      }
      this.$emit('update-data', this.datas);
    },
  },
  watch: {
    modalData() {
      this.datas = { ...this.modalData };
      document.querySelector('form').classList.remove('was-validated');
      this.validation();
    },
    datas: {
      handler(val, oldVal) {
        if (val.due_date < this.today) {
          this.datas.is_enabled = 0;
        }
        if (val.due_date < val.start_date) {
          this.$pushMessage(false, '截止日不可小於起始日');
          this.datas.due_date = oldVal.due_date;
        }
      },
      deep: true,
    },
  },
};
</script>
