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
          <!-- content start -->
          <div class="nav rounded p-2 mb-3 d-flex align-items-center">
            <div>
              訂單狀態：
              <span class="text-success" v-if="datas.is_paid">已付款</span>
              <span class="text-danger" v-else>未付款</span>
            </div>
            <router-link
              type="button"
              class="btn btn-sm btn-outline-secondary ms-2"
              target="_blank"
              :to="`/checkout/${datas.id}`"
              v-if="!datas.is_paid"
              >付款連結</router-link
            >
            <small class="ms-auto text-secondary" v-if="datas.final_edit">
              最後修改時間：{{ datas.final_edit }}
            </small>
          </div>
          <!-- 訂購資訊 -->
          <div class="row g-3 d-md-flex">
            <div class="col-md-6">
              <h3 class="fs-5 d-flex mb-3">
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
              </h3>
              <ul class="list-unstyled">
                <li class="d-flex align-items-center mb-2">
                  <span class="form-label m-0 col-4">建立時間：</span>
                  <span>{{ datas.create_date }} {{ datas.create_time }}</span>
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
                    id="message"
                    class="form-control"
                    row="3"
                    placeholder="無"
                    v-model="datas.message"
                    :disabled="!isEditInfo"
                  />
                </li>
              </ul>
            </div>
            <!-- 商品細項 -->
            <div class="col-md-6">
              <div class="d-flex align-items-center">
                <h3 class="fs-5 m-0">商品內容</h3>
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
                <small class="text-danger ms-auto" v-if="code">優惠碼：{{ code }}</small>
              </div>
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  border
                  rounded
                  p-2
                  my-2
                "
              >
                <p class="m-0">品項：{{ datas.qty }}</p>
                <p class="m-0">
                  訂單金額：
                  <span class="fs-5 fw-bold text-danger">{{
                    $cash(Math.round(datas.total))
                  }}</span>
                </p>
              </div>
              <ul class="list-unstyled">
                <li
                  class="d-flex align-items-center mb-2"
                  v-for="item in products"
                  :key="item"
                >
                  <div
                    class="cart-img"
                    :style="{
                      'background-image': `url(${item.product.imageUrl})`,
                    }"
                  ></div>
                  <div class="cart-cont col px-3 d-flex">
                    <div class="col-5">
                      <p class="m-0">{{ item.product.title }}</p>
                      <small>$ {{ $cash(Math.round(item.final_total)) }} NTD</small>
                    </div>
                    <div class="col-5 d-flex align-items-center text-nowrap">
                      數量：
                      <input
                        type="number"
                        min="1"
                        max="10"
                        class="form-control form-control-sm"
                        v-model.number="item.qty"
                        :disabled="!isEditProduct"
                      />
                    </div>
                    <div
                      class="
                        col-2
                        d-flex
                        align-items-center
                        justify-content-end
                      "
                    >
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="刪除後將無法恢復"
                        :disabled="!isEditProduct"
                        @click="removeProduct(item)"
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
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
          <button type="button" class="btn btn-danger" @click="updateOrder">
            更新訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate, getTime, bsTooltip } from '@/scripts/methods';

export default {
  props: ['modalData'],
  emits: ['update-order', 'push-message'],
  data() {
    return {
      datas: {},
      user: {},
      products: [],
      isEditInfo: false,
      isEditProduct: false,
      edit_count: 0,
      final_edit: '',
      code: '',
      percent: 100,
    };
  },
  methods: {
    updateTotal(data) {
      this.datas.total = 0;
      this.datas.qty = 0;
      Object.values(data).forEach((item) => {
        const newPrice = item;
        newPrice.final_total = item.product.price * item.qty * (this.percent / 100);
        this.datas.total += item.final_total;
        this.datas.qty += item.qty;
      });
    },
    removeProduct(item) {
      this.products = Object.values(this.products).filter(
        (elemt) => elemt.id !== item.id,
      );
      this.checkProducts();
      Array.from(document.querySelectorAll('.tooltip')).forEach((node) => node.remove());
    },
    checkProducts() {
      const num = Object.values(this.products).length;
      if (num <= 0) {
        this.$pushMessage(false, '訂單內不可清空商品');
        this.products = this.datas.products;
        return;
      }
      Object.values(this.products).forEach((val) => {
        const elemt = val;
        if ((num > 1 && val.qty < 1) || (num <= 1 && val.qty < 1)) {
          elemt.qty = 1;
          this.$pushMessage(false, '訂單內不可清空商品');
        }
      });
      this.updateTotal(this.products);
    },
    updateOrder() {
      if (!this.isEditInfo && !this.isEditProduct) {
        this.$emit('update-order', this.datas);
      } else {
        this.$pushMessage(false, '訂單內容尚未修改完成');
      }
    },
  },
  watch: {
    modalData() {
      this.datas = this.modalData;
      this.products = this.modalData.products;
      this.user = this.modalData.user;
      this.isEditInfo = false;
      this.isEditProduct = false;
      this.edit_count = 0;
      const { coupon } = Object.values(this.products)[0];
      if (Object.values(this.products)[0].coupon) {
        this.code = coupon.code;
        this.percent = coupon.percent;
      } else {
        this.code = '';
        this.percent = 100;
      }
      setTimeout(() => {
        bsTooltip();
      }, 100);
    },
    datas: {
      handler() {
        this.datas.products = this.products;
        this.datas.user = this.user;
      },
      deep: true,
    },
    isEditInfo(val) {
      if (!val) {
        this.edit_count += 1;
      }
    },
    isEditProduct(val) {
      if (!val) {
        this.checkProducts();
        this.edit_count += 1;
      }
    },
    edit_count(val) {
      if (val > 0) {
        const now = Math.floor(Date.now());
        this.final_edit = `${getDate(now)} ${getTime(now)}`;
        this.datas.final_edit = this.final_edit;
      }
    },
  },
};
</script>
