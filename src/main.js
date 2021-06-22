import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
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
import Logo from '@/components/logo.vue';
import Cart from '@/components/bag.vue';
import 'bootstrap/dist/js/bootstrap.esm';
import emitter from '@/scripts/mitt';
import router from '@/router';
import App from '@/App.vue';
import { pushMessageState } from '@/scripts/methods';

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
app.config.globalProperties.$pushMessage = pushMessageState;

app.component('ToastMessage', ToastMessage);
app.component('Logo', Logo);
app.component('Cart', Cart);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(fontawesome);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
