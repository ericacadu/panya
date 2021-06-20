<template>
  <div
    class="modal fade"
    id="orderModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark p-3 text-light">
          訂單編號：{{ datas.id }}
          <button type="button" class="btn-close me-1" data-bs-dismiss="modal">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body">
          <!-- content -->
          <div class="nav rounded p-2 mb-3 d-flex align-items-center">
            <div>
              訂單狀態：
              <span class="text-success" v-if="datas.is_paid">已付款</span>
              <span class="text-danger" v-else>未付款</span>
            </div>
            <a
              type="button"
              class="btn btn-sm btn-outline-secondary ms-2"
              target="_blank"
              :href="`${url}/#/checkout/${datas.id}`"
              v-if="!datas.is_paid"
            >付款連結</a>
            <small class="ms-auto text-secondary"
              v-if="datas.final_edit">
              最後修改時間：{{ datas.final_edit }}
            </small>
          </div>
          <div class="row g-3 d-md-flex">
            <div class="col-md-6">
              <h2 class="fs-4 d-flex mb-3">
                訂購資訊
                <button
                  type="button"
                  class="btn btn-sm ms-2"
                  :class="isEditInfo ? 'btn-danger' : 'btn-primary'"
                  @click="isEditInfo = !isEditInfo"
                >
                  <span v-if="!isEditInfo">修改</span>
                  <span v-else>完成</span>
                </button>
              </h2>
              <ul class="list-unstyled">
                <li class="mb-1">
                  建立時間：{{ datas.create_date }} {{ datas.create_time }}
                </li>
                <li class="d-flex align-items-center mb-1">
                  <label for="email" class="form-label m-0 col-4"
                    >Email：</label
                  >
                  <input
                    type="email"
                    id="email"
                    class="form-control form-control-sm"
                    v-model="user.email"
                    :disabled="!isEditInfo"
                  />
                </li>
                <li class="d-flex align-items-center mb-1">
                  <label for="name" class="form-label m-0 col-4"
                    >收件人姓名：</label
                  >
                  <input
                    type="text"
                    id="name"
                    class="form-control form-control-sm"
                    v-model="user.name"
                    :disabled="!isEditInfo"
                  />
                </li>
                <li class="d-flex align-items-center mb-1">
                  <label for="tel" class="form-label m-0 col-4"
                    >聯絡電話：</label
                  >
                  <input
                    type="text"
                    id="tel"
                    class="form-control form-control-sm"
                    v-model="user.tel"
                    :disabled="!isEditInfo"
                  />
                </li>
                <li class="d-flex align-items-center mb-1">
                  <label for="address" class="form-label m-0 col-4"
                    >收件地址：</label
                  >
                  <input
                    type="text"
                    id="address"
                    class="form-control form-control-sm"
                    v-model="user.address"
                    :disabled="!isEditInfo"
                  />
                </li>
                <li class="d-flex align-items-start mb-1">
                  <label for="message" class="form-label m-0 col-4">備註</label>
                  <textarea
                    id="product-desc"
                    class="form-control"
                    row="3"
                    placeholder="無"
                    v-model="datas.message"
                    :disabled="!isEditInfo"
                  />
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <h2 class="fs-4 d-flex mb-3">
                商品細項
                <button
                  type="button"
                  class="btn btn-sm ms-2"
                  v-if="!datas.is_paid"
                  :class="isEditProduct ? 'btn-danger' : 'btn-primary'"
                  @click="isEditProduct = !isEditProduct"
                >
                  <span v-if="!isEditProduct">修改</span>
                  <span v-else>完成</span>
                </button>
              </h2>
            </div>
          </div>
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
            @click="$emit('update-product', datas)"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate, getTime } from '../../assets/js/plugins';
// import { apiUploadFile } from '../../assets/js/api';
// import mitt from '../../assets/js/mitt';

export default {
  props: ['modalData'],
  data() {
    return {
      datas: {},
      user: {},
      isEditInfo: false,
      isEditProduct: false,
      url: 'https://ericacadu.github.io/panya',
      edit_count: 0,
      final_edit: '',
    };
  },
  // methods: {

  // },
  watch: {
    modalData() {
      this.datas = this.modalData;
      this.user = this.modalData.user;
      this.user.message = this.modalData.message;
      this.isEditInfo = false;
      this.isEditProduct = false;
    },
    isEditInfo(val) {
      if (!val) {
        this.edit_count += 1;
      }
    },
    isEditProduct(val) {
      if (!val) {
        this.edit_count += 1;
      }
    },
    edit_count(val) {
      if (val > 0) {
        const now = Math.floor(Date.now() / 1000);
        this.final_edit = `${getDate(now)} ${getTime(now)}`;
        this.datas.final_edit = this.final_edit;
      }
    },
  },
};
</script>
<style lang="sass" scoped>
*
  // outline: 1px solid red
</style>
