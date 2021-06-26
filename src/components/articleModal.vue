<template>
  <div
    class="modal fade"
    id="articleModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark p-3 text-light">
          <slot name="title"></slot>
          <button type="button" class="btn-close me-1" data-bs-dismiss="modal">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body">
          <!-- content start -->
          <div class="row g-2">
            <div class="col-8">
              <label for="title" class="form-label">文章標題</label>
              <input
                type="text"
                id="title"
                class="form-control"
                placeholder="輸入標題"
                v-model="datas.title"
              />
            </div>
            <div class="col-4">
              <label for="author" class="form-label">作者名稱</label>
              <input
                type="text"
                id="author"
                class="form-control"
                v-model="datas.author"
              />
            </div>
            <div class="col-6">
              <label for="tags" class="form-label">文章標籤</label>
              <label for="tags" class="form-control input-tags"
                :class="datas.tag > 0 ? 'p-1' : ''">
                <div
                  class="btn btn-sm alert-primary btn-tags"
                  v-for="(item, key) in datas.tag"
                  :key="key"
                >
                  <span>{{ item }}</span>
                  <i class="material-icons fs-7" role="button"
                    @click="removeTag(item, key)">
                    clear
                  </i>
                </div>
                <input
                  type="text"
                  id="tags"
                  class="col"
                  :placeholder="datas.tag.length > 0
                    ? '': '輸入標籤，用 [ENTER] 新增' "
                  v-model="insertTag"
                  @keydown.enter="pushTags"
                />
              </label>
            </div>
            <div class="col-6">
              <label for="date" class="form-label">發佈日期</label>
              <v-date-picker
                color="indigo"
                class="inline-block h-full"
                v-model="datas.create_at"
                :model-config="modelConfig"
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <div class="input-group">
                    <input
                      class="form-control"
                      id="date"
                      :value="inputValue"
                    />
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="togglePopover()"
                    >
                      <i class="far fa-calendar-alt fa-lg"></i>
                    </button>
                  </div>
                </template>
              </v-date-picker>
            </div>
          </div>
          <div class="row g-2 mt-3">
            <h4 class="fs-5">編輯文章</h4>
            <ckeditor
              :editor="editor"
              :config="editorConfig"
              v-model="datas.content"
            ></ckeditor>
          </div>
          <div class="row g-2">
            <div class="col d-flex align-items-center mt-3">
              <label class="form-label m-0" for="article-active"
                >是否公開</label
              >
              <div class="switch-group ms-2">
                <input type="checkbox" id="article-active" role="button"
                  v-model="datas.isPublic"
                  :checked="datas.isPublic"/>
                <div class="ico_switch"></div>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: ['modalData'],
  data() {
    return {
      datas: {
        tag: [],
      },
      insertTag: '',
      scrollspy: {},
      modelConfig: {
        type: 'number',
      },
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'blockQuote', 'undo', 'redo',
        ],
      },
    };
  },
  methods: {
    pushTags() {
      if (this.insertTag.trim()) {
        this.datas.tag.push(this.insertTag.trim());
        this.insertTag = '';
      }
    },
    removeTag(tag, key) {
      const newArry = this.datas.tag.filter(
        (item, index) => item !== tag && key !== index,
      );
      this.datas.tag = newArry;
    },
  },
  watch: {
    modalData() {
      this.datas = { ...this.modalData };
      if (!this.datas.tag) {
        this.datas.tag = [];
      }
      this.insertTag = '';
      console.log(this.datas);
    },
    datas: {
      handler(val) {
        console.log(val);
      },
      deep: true,
    },
  },
};
</script>

<style lang="sass">
.ck.ck-editor
  width: 100% !important
  .ck-content
    min-height: 30vh !important
.ck.ck-balloon-panel
  z-index: 2000 !important
</style>
