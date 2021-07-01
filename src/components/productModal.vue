<template>
  <div
    class="modal fade"
    id="productModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark p-3 text-light">
          <slot name="title"></slot>
          <button type="button" class="btn-close me-1" data-bs-dismiss="modal">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body">
          <!-- content -->
          <ul
            class="nav nav-pills rounded p-2 mb-3"
            id="pills-tab"
            ref="pills-tab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-info-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-info"
                type="button"
                role="tab"
              >
                商品資訊
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-content-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-content"
                type="button"
                role="tab"
              >
                商品內容
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-photo-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-photo"
                type="button"
                role="tab"
              >
                商品圖片
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-relative-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-relative"
                type="button"
                role="tab"
              >
                關聯商品
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-info"
              role="tabpanel"
            >
              <!-- 商品資訊 -->
              <div class="row g-2">
                <div class="col-8">
                  <label class="form-label" for="product-title">商品名稱</label>
                  <input
                    type="text"
                    id="product-title"
                    class="form-control"
                    placeholder="輸入商品名稱"
                    v-model="datas.title"
                  />
                </div>
                <div class="col-4">
                  <label class="form-label" for="product-category"
                    >商品類別</label
                  >
                  <select
                    id="product-category"
                    class="form-control form-select"
                    v-model="datas.category"
                  >
                    <option value="選擇類別" selected disabled>選擇類別</option>
                    <option
                      v-for="(item, i) in category"
                      :key="i"
                      :value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="col-4 mt-2">
                  <label class="form-label" for="product-origin-price"
                    >原價</label
                  >
                  <input
                    type="number"
                    min="0"
                    id="product-origin-price"
                    class="form-control"
                    placeholder="輸入原價"
                    v-model.number="datas.origin_price"
                  />
                </div>
                <div class="col-4 mt-2">
                  <label class="form-label" for="product-price">售價</label>
                  <input
                    type="number"
                    min="0"
                    id="product-price"
                    class="form-control"
                    placeholder="輸入售價"
                    v-model.number="datas.price"
                  />
                </div>
                <div class="col-4 mt-2">
                  <label class="form-label" for="product-unit">單位</label>
                  <select
                    id="product-unit"
                    class="form-control form-select"
                    v-model="datas.unit"
                  >
                    <option value="選擇單位" selected disabled>選擇單位</option>
                    <option v-for="(item, i) in unit" :key="i" :value="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <hr class="mt-4" />
                <div class="col-4 d-flex align-items-center">
                  <label class="form-label m-0" for="product-active"
                    >啟用商品</label
                  >
                  <div class="switch-group ms-2">
                    <input
                      type="checkbox"
                      id="product-active"
                      role="button"
                      v-model="datas.is_enabled"
                      :checked="datas.is_enabled"
                    />
                    <div class="ico_switch"></div>
                  </div>
                </div>
                <div class="col-4 d-flex align-items-center">
                  <label class="form-label m-0" for="product-promote"
                    >啟用推薦</label
                  >
                  <div class="switch-group ms-2">
                    <input
                      type="checkbox"
                      id="product-promote"
                      role="button"
                      v-model="datas.is_promote"
                      :checked="datas.is_promote"
                    />
                    <div class="ico_switch"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="pills-content" role="tabpanel">
              <!-- 商品內容 -->
              <div class="row g-0">
                <div class="col-12">
                  <label class="form-label" for="product-desc">商品描述</label>
                  <textarea
                    id="product-desc"
                    class="form-control"
                    placeholder="輸入商品描述"
                    row="5"
                    v-model="datas.description"
                  />
                </div>
                <div class="col-12 mt-2">
                  <label class="form-label" for="product-content"
                    >商品內容</label
                  >
                  <input type="text"
                    class="form-control"
                    id="product-content"
                    placeholder="輸入商品內容"
                    v-model="datas.content" />
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="pills-photo" role="tabpanel">
              <!-- 商品圖片 -->
              <div class="row g-0">
                <div
                  class="col-12 d-flex justify-content-between"
                  v-if="!datas.imagesUrl.length"
                >
                  <div
                    class="place-image rounded"
                    v-for="(img, i) in 3"
                    :key="i"
                  >
                    <i class="material-icons">photo</i>
                  </div>
                </div>
                <div class="col-12 d-flex" v-else>
                  <div
                    class="show-image rounded"
                    v-for="(img, i) in datas.imagesUrl"
                    :key="i"
                    :class="datas.imageUrl == img ? 'active' : ''"
                    :style="{ 'background-image': `url(${img})` }"
                  >
                    <span
                      class="btn-close m-2 p-2"
                      role="button"
                      @click="removeImage(img)"
                    >
                      <i class="material-icons">remove</i>
                    </span>
                    <label :for="'main-image' + i" role="button" class="py-1">
                      <input
                        type="radio"
                        :id="'main-image' + i"
                        @click="datas.imageUrl = img"
                        :checked="img == datas.imageUrl"
                      />
                      <span v-if="img == datas.imageUrl"
                        ><i class="fas fa-star text-warning"></i
                      ></span>
                      <span v-else
                        ><i class="far fa-star text-warning"></i
                      ></span>
                      設定主圖
                    </label>
                  </div>
                </div>
                <div class="col-12 mt-3">
                  <label class="form-label" for="product-image-url"
                    >圖片連結</label
                  >
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      id="product-image-url"
                      placeholder="輸入圖片連結"
                      v-model="tempUrl"
                      :disabled="datas.imagesUrl.length >= 3"
                    /><button
                      class="btn btn-outline-secondary"
                      :disabled="datas.imagesUrl.length >= 3"
                      @click="uploadImage"
                    >
                      上傳連結
                    </button>
                  </div>
                </div>
                <div class="col-12 mt-3">
                  <label class="form-label" for="product-upload-file"
                    >上傳檔案</label
                  >
                  <div class="input-group">
                    <input
                      type="file"
                      name="file-to-upload"
                      class="form-control"
                      id="product-upload-file"
                      ref="upload-file"
                      @change="getUploadFile"
                      :disabled="datas.imagesUrl.length >= 3"
                    /><button
                      class="btn btn-outline-secondary"
                      @click="uploadFile"
                      :disabled="datas.imagesUrl.length >= 3"
                    >
                      上傳檔案
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="pills-relative" role="tabpanel">
              <!-- 關聯商品 -->
              <div class="col-12">
                <label class="form-label" for="relative-products"
                  >選擇關聯商品</label
                >
                <div
                  class="form-control overflow-scroll"
                  style="max-height: 10rem;"
                >
                  <div
                    class="form-check"
                    v-for="(item, i) in products"
                    :key="i"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="item.id"
                      :checked="item.is_relativ"
                      v-model="item.is_relativ"
                      @click="item.is_relativ = !item.is_relativ,
                              toggleProduct(item)"
                    />
                    <label class="form-check-label" :for="item.id">
                      {{ item.title }}
                    </label>
                  </div>
                </div>
              </div>
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
import { apiUploadFile, apiGetAllProducts } from '@/scripts/api';

export default {
  props: ['modalData'],
  data() {
    return {
      products: [],
      datas: {
        imageUrl: '',
        imagesUrl: [],
        category: '選擇類別',
        unit: '選擇單位',
        relative: [],
      },
      category: ['麵包', '蛋糕', '餅乾'],
      unit: ['個', '袋', '片', '盒'],
      tempUrl: '',
      uploadData: '',
    };
  },
  methods: {
    getProducts() {
      apiGetAllProducts().then((res) => {
        if (!res.data.success) {
          this.$pushMessage(res);
        }
        const all = Object.values(res.data.products).reverse();
        this.products = all.filter((item) => item.id !== this.datas.id);
        this.filterSelected();
        this.$emitter.emit('page-loading', false);
      });
    },
    filterSelected() {
      this.products.forEach((item) => {
        const status = item;
        const isExist = this.datas.relative.filter((val) => val.indexOf(item.id) !== -1);
        if (isExist.length > 0) {
          status.is_relativ = true;
        } else {
          status.is_relativ = false;
        }
      });
    },
    toggleProduct(item) {
      const isExist = this.datas.relative.filter((val) => val.indexOf(item) !== -1);
      if (isExist.length <= 0 && item.is_relativ) {
        this.datas.relative.push(item.id);
      } else {
        this.datas.relative.splice(item.id, 1);
      }
    },
    uploadImage() {
      const isImage = this.tempUrl.trim();
      const isRepeat = this.datas.imagesUrl.find((item) => item === isImage);
      if (isImage !== '') {
        if (isRepeat) {
          this.$pushMessage(false, '連結網址不可重複');
          return;
        }
        this.datas.imagesUrl.push(this.tempUrl);
        this.tempUrl = '';
      } else {
        this.$pushMessage(false, '請輸入連結網址');
      }
    },
    getUploadFile() {
      const { 0: file } = this.$refs['upload-file'].files;
      this.uploadData = file;
    },
    uploadFile() {
      const formData = new FormData();
      formData.append('add-to-upload', this.uploadData);
      if (!this.$refs['upload-file'].value) {
        this.$pushMessage(false, '沒有選擇檔案');
        return;
      }
      apiUploadFile(formData).then((res) => {
        if (res.data.success) {
          this.datas.imagesUrl.push(res.data.imageUrl);
          this.$refs['upload-file'].value = '';
          this.uploadData = '';
        }
        this.$pushMessage(res, res.data.message || '上傳成功');
      });
    },
    removeImage(item) {
      const result = this.datas.imagesUrl.filter((img) => item !== img);
      this.datas.imagesUrl = result;
      if (item === this.datas.imageUrl) {
        this.autoPinImage(this.datas);
      }
    },
    autoPinImage(item) {
      const { 0: main } = item.imagesUrl;
      this.datas.imageUrl = main || '';
    },
    updateTabs() {
      const pills = document.querySelectorAll('.nav-pills .nav-link');
      const panes = document.querySelectorAll('.tab-pane');
      const changeTab = (elemt) => {
        elemt.forEach((item) => item.classList.remove('active'));
        elemt[0].classList.add('active');
        elemt[0].classList.add('show');
      };
      changeTab(pills);
      changeTab(panes);
    },
  },
  watch: {
    modalData() {
      this.datas = this.modalData;
      this.updateTabs();
      this.getProducts();
    },
    datas: {
      handler(val) {
        if (!val.imageUrl) {
          this.autoPinImage(val);
        }
        if (val.imagesUrl.length <= 0) {
          this.datas.imageUrl = '';
        }
      },
      deep: true,
    },
  },
};
</script>
