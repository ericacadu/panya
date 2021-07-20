import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VCalendar from 'v-calendar';
import fontawesome from '@fortawesome/fontawesome-free/js/all';
// validate start
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// validate end
import ToastMessage from '@/components/ToastMessage.vue';
import Pagination from '@/components/Pagination.vue';
import Logo from '@/components/IconLogo.vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Spinner from '@/components/Spinner.vue';
import PageLoading from '@/components/PageLoading.vue';
import emitter from '@/scripts/mitt';
import router from '@/router';
import App from '@/App.vue';
import { pushMessageState, cash } from '@/scripts/methods';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$cash = cash;
app.config.globalProperties.$pushMessage = pushMessageState;

app.component('ToastMessage', ToastMessage)
  .component('Pagination', Pagination)
  .component('Spinner', Spinner)
  .component('PageLoading', PageLoading)
  .component('Logo', Logo)
  .component('Form', Form)
  .component('Field', Field)
  .component('ErrorMessage', ErrorMessage)
  .use(VCalendar, {})
  .use(CKEditor)
  .use(fontawesome)
  .use(VueAxios, axios)
  .use(router)
  .mount('#app');
