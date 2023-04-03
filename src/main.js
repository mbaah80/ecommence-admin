import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Breadcrumbs from './components/bread-crumbs.vue'
import VueFeather from 'vue-feather';
import firebase from 'firebase/app';
import 'firebase/firestore';
import PxCard from './components/pxcard.vue';
import VueApexCharts from 'vue-apexcharts';
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'
//import CKEditor from "@ckeditor/ckeditor5-vue";
import { VueEditor } from "vue2-editor";
import StarRating from "vue-star-rating";
import GlobalCategoryModal from "./components/modals/globalCategoryModal.vue";
import VueDropzone from 'vue2-dropzone';
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Toasted from 'vue-toasted';
import config from '../config.json'
import {
    ValidationObserver,
    ValidationProvider,
    extend,
    localize,

} from "vee-validate";
import ZoomOnHover from "vue-zoom-on-hover";
Vue.use(ZoomOnHover);
import env from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
// Multi language add
import { defaultLocale, localeOptions } from './constants/config'
import VueI18n from 'vue-i18n';
// import i18n translation languages
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import commonTable from './components/commonTable.vue';

Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});
localize("en", env);
// config for firebase

Vue.use(Toasted, {
    iconPack: 'fontawesome'
});
Vue.component('commonTable', commonTable);
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueI18n);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component('VueEditor', VueEditor);
Vue.component('VueDropzone', VueDropzone);
Vue.use(VueDropzone);
Vue.component('GlobalCategoryModal', GlobalCategoryModal)
Vue.component('StarRating', StarRating);
Vue.use(VueEditor);
//Vue.use(CKEditor);
Vue.config.productionTip = false
Vue.use(BootstrapVue);
import './assets/scss/app.scss'
import './assets/scss/admin.scss'
Vue.component('Breadcrumbs', Breadcrumbs);
Vue.use(VueFeather);
Vue.use(require('vue-chartist'))
Vue.component(PxCard.name, PxCard)

firebase.initializeApp(config.firebase);
const messages = { en: en, es: es, pt: pt, fr: fr };
const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale;
const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages,
    silentTranslationWarn: true
});
export const db = firebase.firestore();

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')